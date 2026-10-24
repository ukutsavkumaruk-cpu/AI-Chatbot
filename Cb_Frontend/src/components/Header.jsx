function Header({messages}){

    return<>
    <header className="mb-10 text-center max-[600px]:mb-6" >
        <h3 className="my-[1em] text-[1.17em] font-bold">CHATIE</h3>
        {messages.length == 0?  <h1 className="mt-[12px] mb-[8px] [font-family:var(--heading)] text-[clamp(32px,6vw,48px)] font-bold tracking-[-0.05em] text-[#8055c7]">How can I help</h1> : "" }
       
    </header>
    </>
}
export default Header;