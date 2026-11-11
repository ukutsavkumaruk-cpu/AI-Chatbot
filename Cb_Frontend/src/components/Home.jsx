import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { addMessage,clearCurrentChat,removeMessage,setConversationId,setConversations} from "../features/chat/chatSlice";
import { getChat, sendQuery,getConversations } from "./service";
import ChatHero from "./ChatHero";
import Section from "./Section";
import { login } from '../features/auth/userAuthSlice'


export default function Home() {
  const messages = useSelector((state) => state.chat.messages);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const conversationId = useSelector((state) => state.chat.conversationId)
  

  useEffect(() => {
    try {
      const checkUser = async () => {
        const response = await fetch("http://localhost:3010/api/auth/check",{
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        console.log(data)

        if(data.isLoggedIn){
          const Conversations = await getConversations();
          dispatch(login(data.User));
          console.log(Conversations)
          dispatch(setConversations(Conversations.conversations));
        } else {
          navigate("/Signup");
          
        }
      };
      checkUser();

      async function fetchChat() {
        if(conversationId){
            const result = await getChat(conversationId);
            result.reply.map((el) => {
            dispatch(addMessage(el));
          });
        }
      }
      fetchChat();
    } catch (error) {
      console.log("Got error in fetching chat", error);
    }
  }, [dispatch]);

  async function handleSubmit(event) {
    let optimisticMessageId;
    let submittedMessage = "";

    try {
      event.preventDefault();
      const message = query.trim();

      if (!message) return;

      let authenticated = isLoggedIn;
      if (!authenticated) {
        const response = await fetch("http://localhost:3010/api/auth/check", {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        authenticated = data.isLoggedIn;
        if (authenticated) {
          dispatch(login(data.User));
        }
      }

      if (!authenticated) {
        navigate("/login");
        return;
      }

      submittedMessage = message;
      optimisticMessageId = crypto.randomUUID();
      dispatch(
        addMessage({
          _id: optimisticMessageId,
          contents: message,
          role: "user",
        }),
      );

      setIsLoading(true);
      setQuery("");
      
      const response = await sendQuery(message,conversationId);

      if (!response.success) {
        throw new Error(response.error);
      }

      dispatch(setConversationId(response.conversationId))

      localStorage.setItem(
      "conversationId",
      response.conversationId
      );
      dispatch(
        addMessage({
          contents: response.reply,
          role: "agent",
        }),
      );
    } catch (err) {
      if (optimisticMessageId) {
        dispatch(removeMessage(optimisticMessageId));
        setQuery((currentQuery) => currentQuery || submittedMessage);
      }
      console.log("Error while getting response", err);
      
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <main className="flex h-full min-h-0 min-w-0 flex-1 flex-col">
        <div className="mx-auto flex min-h-0 w-full max-w-4xl flex-1 flex-col px-4 sm:px-6">
          {messages.length === 0 && <ChatHero />}

          <Section
            className={`chat-scrollbar min-h-0 w-full flex-1 overflow-y-auto py-3 ${
              messages.length === 0 ? "hidden" : "flex flex-col gap-3"
            }`}
            messages={messages}
            isLoading={isLoading}
          />

          <form
            className="mb-2 mt-3 rounded-2xl border border-(--border) bg-(--bg) p-2.5 shadow-(--shadow) transition focus-within:border-(--accent) focus-within:shadow-[0_0_0_3px_var(--accent-bg)] sm:mb-3 sm:p-3"
            onSubmit={handleSubmit}
          >
            <label className="sr-only" htmlFor="chat-query">
              Message
            </label>
            <textarea
              id="chat-query"
              className="box-border block min-h-12 max-h-32 w-full resize-y border-0 bg-transparent p-1 text-sm leading-5 text-(--text-h) outline-0 placeholder:text-(--text) placeholder:opacity-75"
              name="message"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Message Chatie"
              rows={2}
            />
            <div className="flex items-center justify-between border-t border-(--border) pt-2">
              <span className="hidden text-xs text-(--text) sm:inline">
                AI can make mistakes. Check important information.
              </span>
              <button
                className="ml-auto inline-flex size-9 cursor-pointer items-center justify-center rounded-full bg-(--accent) text-white transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--text-h) disabled:cursor-not-allowed disabled:opacity-40"
                type="submit"
                aria-label="Send message"
                disabled={!query.trim() || isLoading} 
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="size-4"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path
                    d="M12 19V5m0 0L6 11m6-6 6 6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </form>
          <p className="mb-2 text-center text-[10px] text-(--text) sm:mb-3">
            Chatie can make mistakes. Verify important information.
          </p>
        </div>
      </main>
    </>
  );
}
