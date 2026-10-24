import Loader from './Loader';
import OneMessage from './OneMessage';

function Section({messages,isLoading}){

  return <>
    {messages.length === 0 ? (
      <p className="my-auto self-center text-[15px] text-[var(--text)]"></p>
    ) : (
      messages.map((message) => (
        <div
          key={message.id}
          className={
            message.role === "user"
              ? "box-content flex h-[20px] w-full flex-1 flex-col items-end gap-3 py-4"
              : "box-content flex h-5 w-full flex-1 flex-col items-start gap-3 py-6"
          }
        >
          <OneMessage message={message} />
        </div>
      ))
    )}
    {isLoading && (
      <div className="box-content flex h-[20px] w-full flex-1 flex-col items-start gap-3 py-6" role="status" aria-label="Waiting for AI response">
        <Loader />
      </div>
    )}
  </>
}
export default Section;