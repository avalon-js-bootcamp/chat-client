import { useState } from "react";
import Login from "./login";
import "./App.css";
import Chat from "./chat";

function App() {
  const [page, setPage] = useState("Login");
  const [author, setAuthor] = useState(null);

  function pageChange(author) {
    setAuthor(author);
    setPage("Chat");
  }

  return (
    <div className="App">
      {page === "Login" && <Login onLogin={pageChange} />}
      {page === "Chat" && <Chat author={author} />}
    </div>
  );
}

export default App;
