import Loader from './Loader';
import OneMessage from './OneMessage';

function Section({messages,isLoading}){

  return <>
    {messages.length === 0 ? (
      <p className="chat__empty">Your conversation will appear here.</p>
    ) : (
      messages.map((message) => (
        <div
          key={message.id}
          className={message.role === "user" ? "chat__messages_user" : "chat__messages_agent"}
        >
          <OneMessage message={message} />
        </div>
      ))
    )}
    {isLoading && (
      <div className="chat__messages_agent" role="status" aria-label="Waiting for AI response">
        <Loader />
      </div>
    )}
  </>
}
export default Section;