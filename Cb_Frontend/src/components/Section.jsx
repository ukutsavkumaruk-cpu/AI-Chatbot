import { useSelector } from 'react-redux';
import Loader from './Loader';
import OneMessage from './OneMessage';

function Section({isLoading,className = ''}){

  const messages = useSelector((state) => state.chat.messages);
  console.log("Ye rahi redux se aayi messages: ", messages)
  return (
    <section className={className} aria-label="Chat messages">
      {messages.map((message) => (
        <div
          key={message._id}
          className={
            message.role === "user"
              ? "flex w-full justify-end py-2"
              : "flex w-full justify-start py-2"
          }
        >
          <OneMessage message={message} />
        </div>
      ))}
      {isLoading && (
        <div className="flex w-full justify-start py-2" role="status" aria-label="Waiting for AI response">
          <Loader />
        </div>
      )}
    </section>
  )
}
export default Section;