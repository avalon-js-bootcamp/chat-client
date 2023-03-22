import "./login.css";
import { useState } from "react";

export default function Login({ onLogin }) {
  const [authorName, setAuthorName] = useState("");

  function handleLogin() {
    const user = document.querySelector(".userName-input").value;
    setAuthorName(user);
    onLogin(user);
  }

  return (
    <div className="login-page">
      <div className="username">
        <input
          type="text"
          maxLength="255"
          required
          className="userName-input"
          placeholder="User Name"
        />
        <div className="login-button">
          <button onClick={handleLogin}>Login</button>
        </div>
      </div>
    </div>
  );
}
