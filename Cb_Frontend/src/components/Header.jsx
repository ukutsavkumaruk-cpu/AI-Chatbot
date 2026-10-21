import '../App.css'
function Header({messages}){

    return<>
    <header className="chat__header" >
        <h3>CHATIE</h3>
        {messages.length == 0?  <h1 className="chat__eyebrow">How can I help</h1> : "" }
       
    </header>
    </>
}
export default Header;