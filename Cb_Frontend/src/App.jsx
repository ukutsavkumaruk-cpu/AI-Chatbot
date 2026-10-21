import { useState,useEffect  } from 'react'
import './App.css'
import Header from './components/Header'
import Section from './components/Section'
import { sendQuery } from './components/service'

function App() {
  
  const [query, setQuery] = useState('')
  const [messages, setMessages] = useState([])

  useEffect(() => {
  console.log(messages)
  }, [messages])

  async function handleSubmit (event) {
    event.preventDefault()
    const message = query.trim()

    if (!message) return

    setMessages((currentMessages) => [...currentMessages, {
    id: crypto.randomUUID(),
    text: message,
    role: "user",
  }])
    setQuery('')
    const response = await sendQuery(message)
    console.log("Server ka frontend me response: ",response.reply)
    setMessages((currentMessages) => [...currentMessages, {
    id: crypto.randomUUID(),
    text: response.reply,
    role: "agent",
  }])
  }




  return (
    <main className="chat">
      <Header messages={messages} />
      <Section className="chat_messages" messages={messages}></Section>

      <form className="composer" onSubmit={handleSubmit}>
        <label className="composer__label" htmlFor="chat-query">
          Message
        </label>
        <textarea
          id="chat-query"
          className="composer__input"
          name='message'
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Type your question..."
          rows={3}
        />
        <div className="composer__footer">
          <button className="composer__send" type="submit" disabled={!query.trim()}>
            Send
          </button>
        </div>
      </form>
    </main>
  )
}

export default App
