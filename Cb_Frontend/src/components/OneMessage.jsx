function OneMessage({message}){

  return <>
      <p className={message.role === "user" ? "chat__message_user" : "chat__message_agent"}>
              {message.text}
      </p>
  </>
}

export default OneMessage;