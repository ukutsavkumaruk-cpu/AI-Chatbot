import { useSelector, useDispatch } from "react-redux";
import { useState,useEffect  } from 'react'
import { addMessage } from "../features/chat/chatSlice";
import { sendQuery } from './service'
import ChatHero from './ChatHero'
import Section from './Section'




export default function Home(){

  const messages = useSelector((state)=> state.chat.messages)
  const dispatch = useDispatch();
  const [isLoading,setIsLoading] = useState(false)
  const [query, setQuery] = useState('')
    
  

  async function handleSubmit (event) {
    try{
        event.preventDefault()
        const message = query.trim()

        if (!message) return

        dispatch(addMessage({
          id: crypto.randomUUID(),
          text: message,
          role: "user",
        }));

        setIsLoading(true)
        setQuery('')

        const response = await sendQuery(message)
        

        if(!response.success){
          throw new Error(response.errMessage)
        }

        dispatch(addMessage({
          id: crypto.randomUUID(),
          text: response.reply,
          role: "agent",
        }));
      }
    catch(err){
      console.log("Error while getting response",err)
      alert(err)
      
    }
    finally{
      setIsLoading(false)
    }
  }


  return<>
    <main className="flex min-h-svh min-w-0 flex-1 flex-col">
        

        <div className="mx-auto flex min-h-0 w-full max-w-4xl flex-1 flex-col px-4 sm:px-6">
          {messages.length === 0 && <ChatHero />}

          <Section
            className={`min-h-0 w-full flex-1 overflow-y-auto py-4 ${
              messages.length === 0 ? 'hidden' : 'flex flex-col gap-3'
            }`}
            messages={messages}
            isLoading={isLoading}
          />

          <form
            className="mb-3 mt-4 rounded-3xl border border-(--border) bg-(--bg) p-3 shadow-(--shadow) transition focus-within:border-(--accent) focus-within:shadow-[0_0_0_3px_var(--accent-bg)] sm:mb-5 sm:p-4"
            onSubmit={handleSubmit}
          >
            <label className="sr-only" htmlFor="chat-query">
              Message
            </label>
            <textarea
              id="chat-query"
              className="box-content block min-h-19 w-full resize-y border-0 bg-transparent p-0.5 [font:inherit] leading-normal text-(--text-h) outline-0 placeholder:text-(--text) placeholder:opacity-75"
              name="message"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Message Chatie"
              rows={3}
            />
            <div className="flex items-center justify-between border-t border-(--border) pt-3">
              <span className="hidden text-xs text-(--text) sm:inline">
                AI can make mistakes. Check important information.
              </span>
              <button
                className="ml-auto inline-flex size-10 cursor-pointer items-center justify-center rounded-full bg-(--accent) text-white transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--text-h) disabled:cursor-not-allowed disabled:opacity-40"
                type="submit"
                aria-label="Send message"
                disabled={!query.trim()}
              >
                <svg viewBox="0 0 24 24" fill="none" className="size-5" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M12 19V5m0 0L6 11m6-6 6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </form>
          <p className="mb-3 text-center text-[11px] text-(--text) sm:mb-4">
            Chatie can make mistakes. Verify important information.
          </p>
        </div>
      </main>
  </>
}