function OneMessage({message}){

  return <>
      <p
        className={
          message.role === "user"
            ? "box-border max-w-[min(80%,560px)] wrap-anywhere whitespace-pre-wrap rounded-[16px_16px_4px_16px] border border-(--accent-border) bg-(--message-user-bg) px-3.5 py-2.5 text-sm leading-5 text-(--text-h)"
            : "box-border max-w-[min(80%,560px)] [overflow-wrap:anywhere] whitespace-pre-wrap rounded-[16px_16px_16px_4px] border border-(--border) bg-(--message-agent-bg) px-3.5 py-2.5 text-sm leading-5 text-(--text-h)"
        }
      >
              {message.contents}
      </p>
  </>
}

export default OneMessage;