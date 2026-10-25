function OneMessage({message}){

  return <>
      <p
        className={
          message.role === "user"
            ? "box-content max-w-[min(80%,560px)] [overflow-wrap:anywhere] whitespace-pre-wrap rounded-[18px_18px_4px_18px] border border-[var(--border)] bg-[#6697d07e] px-[18px] py-[14px] text-[var(--text-h)]"
            : "box-content max-w-[min(80%,560px)] [overflow-wrap:anywhere] whitespace-pre-wrap rounded-[18px_18px_18px_4px] border border-[var(--border)] bg-[#606962ae] px-[18px] py-[14px] text-[var(--text-h)]"
        }
      >
              {message.contents}
      </p>
  </>
}

export default OneMessage;