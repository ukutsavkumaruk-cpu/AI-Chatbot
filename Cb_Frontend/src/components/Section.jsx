import '../App.css'
function Section({messages}){

return<>

    {messages.length === 0 ? (<p className="chat__empty">Your conversation will appear here.</p>) : (messages.map((message) => (
      <div className={message.role === "user" ? "chat__messages_user" : "chat__messages_agent"}>
        <p className={message.role === "user" ? "chat__message_user" : "chat__message_agent"} key={`${message.id}`}>
              {message.text}
            </p>
      </div>
            
          ))
        )}
  </>
}
export default Section;