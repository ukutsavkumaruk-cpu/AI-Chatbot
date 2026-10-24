import { useState,useEffect  } from 'react'
import Header from './components/Header'
import Section from './components/Section'
import { sendQuery } from './components/service'


function App() {
  
  const [query, setQuery] = useState('')
  const [messages, setMessages] = useState([])
  const [isLoading,setIsLoading] = useState(false)

  useEffect(() => {
  console.log(messages)
  }, [messages])

  async function handleSubmit (event) {
    try{
        event.preventDefault()
        const message = query.trim()

        if (!message) return

        setMessages((currentMessages) => [...currentMessages, {
        id: crypto.randomUUID(),
        text: message,
        role: "user",
        }])

        setIsLoading(true)
        setQuery('')

        const response = await sendQuery(message)
        

        if(!response.success){
          throw new Error(response.errMessage)
        }

        setMessages((currentMessages) => [...currentMessages, {
        id: crypto.randomUUID(),
        text: response.reply,
        role: "agent",
        }])
      }
    catch(err){
      console.log("Error while getting response",err)
      alert(err)
      
    }
    finally{
      setIsLoading(false)
    }
  }




  return (
    <main className="flex min-h-[100svh] flex-col box-border p-[clamp(24px,6vw,72px)] max-[600px]:pt-8 max-[600px]:px-[18px] max-[600px]:pb-5">
      <Header messages={messages} />

      <Section messages={messages} isLoading={isLoading}></Section>

      <form
        className="rounded-[20px] border border-[var(--border)] bg-[var(--bg)] p-4 shadow-[var(--shadow)] focus-within:border-[var(--accent)] focus-within:shadow-[0_0_0_3px_var(--accent-bg)]"
        onSubmit={handleSubmit}
      >
        <label className="sr-only" htmlFor="chat-query">
          Message
        </label>
        <textarea
          id="chat-query"
          className="box-content block min-h-[76px] w-full resize-y border-0 bg-transparent p-[2px] [font:inherit] leading-[1.5] text-[var(--text-h)] outline-0 placeholder:text-[var(--text)] placeholder:opacity-75"
          name='message'
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Type your question..."
          rows={3}
        />
        <div className="flex items-center justify-between gap-4 border-t border-[var(--border)] pt-3">
          <button
            className="box-content inline-flex w-full cursor-pointer items-center justify-center gap-[10px] rounded-xl border-0 bg-[var(--accent)] px-4 py-[10px] [font:inherit] text-[14px] font-semibold leading-[inherit] text-white focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[var(--text-h)] disabled:cursor-not-allowed disabled:opacity-[0.45]"
            type="submit"
            disabled={!query.trim()}
          >
            Send
          </button>
        </div>
      </form>
    </main>
  )
}

export default App
