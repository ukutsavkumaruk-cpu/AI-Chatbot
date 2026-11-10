import { useSelector,useDispatch } from "react-redux";
import {clearCurrentChat,setMessages,setConversationId} from '../features/chat/chatSlice'
import {getOneConversation} from './service'

function Sidebar({ isOpen = false, onClose }) {
  const conversations = useSelector((state) => state.chat.conversations)
  const dispatch = useDispatch();
  console.log(conversations)

  async function handleNewChat(){
    dispatch(clearCurrentChat())
    localStorage.removeItem("conversationId");
  }
  async function handleConversation(event){
    console.log("Receiveed fron onecclick: ",event.currentTarget.id)
    const request_Conv_Id =  event.currentTarget.id;
    const result = await getOneConversation(request_Conv_Id);
    if(result.success){
      localStorage.removeItem("conversationId");
      localStorage.setItem("conversationId",request_Conv_Id);
      dispatch(clearCurrentChat())
      dispatch(setConversationId(request_Conv_Id))
      dispatch(setMessages(result.Message))
    }
    else{
      console.log("Coversation Not found in the db")
    }
  }

  return (
    <>
      {isOpen && (
        <button
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          type="button"
          aria-label="Close conversation sidebar"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-[min(84vw,280px)] flex-col border-r border-(--border) bg-(--code-bg) p-3 transition-transform duration-200 md:inset-y-0 md:left-0 md:z-20 md:h-svh md:w-65 md:shrink-0 md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Conversation sidebar"
      >
        <div className="mb-6 flex items-center justify-between px-1">
          <a className="flex items-center gap-2.5 text-inherit no-underline" href="#" aria-label="Chatie home">
            <span className="flex size-8 items-center justify-center rounded-lg bg-(--accent) text-sm font-bold text-white">
              C
            </span>
            <span className="text-base font-semibold tracking-tight text-(--text-h)">Chatie</span>
          </a>
          <button
            className="flex size-9 items-center justify-center rounded-lg text-(--text) transition hover:bg-(--bg) hover:text-(--text-h) md:hidden"
            type="button"
            aria-label="Close conversation sidebar"
            onClick={onClose}
          >
            <svg viewBox="0 0 24 24" fill="none" className="size-5" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <button
          className="mb-6 flex w-full items-center gap-3 rounded-xl border border-(--border) bg-(--bg) px-3 py-2.5 text-left text-sm font-semibold text-(--text-h) shadow-sm transition hover:border-(--accent-border) hover:bg-white/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)"
          type="button" onClick={handleNewChat}
        >
          <svg viewBox="0 0 24 24" fill="none" className="size-4.5 text-(--accent)" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path d="M12 5v14M5 12h14" strokeLinecap="round" />
          </svg>
          New chat
        </button>

        <div className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-(--text)">
          Recent conversations
        </div>
        <nav className="chat-scrollbar min-h-0 flex-1 space-y-1.5 overflow-y-auto" aria-label="Past conversations">
          {conversations.length > 0 ? (
            conversations.map((conversation) => (
              <button
                className="group flex w-full min-w-0 items-center gap-2.5 rounded-xl border border-transparent px-2.5 py-2 text-left text-sm text-(--text-h) transition hover:border-(--border) hover:bg-(--bg) focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-(--accent)"
                key={conversation._id}
                id={conversation._id}
                type="button"
                title={conversation.title}
                onClick={handleConversation}
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white/70 text-(--accent) transition group-hover:bg-(--accent-bg)">
                  <svg viewBox="0 0 24 24" fill="none" className="size-4" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                    <path d="M7 18.5 3.5 20l1.2-3.6A8 8 0 1 1 7 18.5Z" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8 10h8M8 13.5h5" strokeLinecap="round" />
                  </svg>
                </span>
                <span className="min-w-0 flex-1 truncate font-medium">{conversation.title}</span>
                <svg viewBox="0 0 24 24" fill="none" className="size-4 shrink-0 text-(--text) opacity-0 transition group-hover:opacity-70" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <path d="m9 18 6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            ))
          ) : (
            <p className="rounded-xl border border-dashed border-(--border) px-3 py-3 text-xs leading-relaxed text-(--text)">
              Your conversations will appear here.
            </p>
          )}
        </nav>

        <div className="mt-3 border-t border-(--border) pt-3">
          <button
            className="flex w-full items-center gap-3 rounded-xl p-2 text-left transition hover:bg-(--bg)"
            type="button"
            aria-label="User account"
          >
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-(--accent-bg) text-(--accent)">
              <svg viewBox="0 0 24 24" fill="none" className="size-5" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                <circle cx="12" cy="8" r="3.25" />
                <path d="M5.5 20c.6-3.2 2.8-5 6.5-5s5.9 1.8 6.5 5" strokeLinecap="round" />
              </svg>
            </span>
            <span className="min-w-0 flex-1 truncate text-sm font-medium text-(--text-h)">Your account</span>
            <svg viewBox="0 0 24 24" fill="none" className="size-4 text-(--text)" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="m9 18 6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
