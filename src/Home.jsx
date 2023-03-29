import React, { useState, useEffect } from "react";
import "./Home.css";
export default function Home() {
  const [messages, setMessages] = useState([]);
  const [author, setAuthor] = useState();

  async function getMessages() {
    const response = await fetch("https://chat.avalon.build/chat");
    const messagesData = await response.json();
    setMessages(messagesData);
  }

  useEffect(() => {
    getMessages();
  }, []);

  function changeAuthor() {
    const user = document.querySelector(".username").value;
    const loginBox = document.querySelector(".login-box");
    const chatBox = document.querySelector(".chat-box");
    setAuthor(user);
    loginBox.classList.add("hidden");
    chatBox.classList.remove("hidden");
  }

  const chatHistory = messages.map((object) => {
    return (
      <div className="chat-block">
        <div className="chat-author">{object.author}</div>
        <div className="chat-message">{object.message}</div>
      </div>
    );
  });

  async function sendingMessages() {
    const messageInput = document.querySelector(".text-message").value;

    await fetch("https://chat.avalon.build/chat", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        author: author,
        message: messageInput,
      }),
    });
    await getMessages();
  }

  return (
    <div className="container">
      <div className="login-box">
        <div className="logo"></div>
        <div className="name">
          <input
            className="username"
            placeholder="Username here plzzzz"
            required
          ></input>
        </div>
        <button className="login-button" onClick={changeAuthor}>
          Log In
        </button>
      </div>
      <div className="chat-box hidden">
        <div className="top-chat-box">
          <input className="text-message" type="text" required />
          <div className="buttons">
            <button className="submit-message" onClick={sendingMessages}>
              submit
            </button>
            <button className="refresh-button" onClick={getMessages}>
              refresh
            </button>
          </div>
        </div>
        <div className="chat-history"> {chatHistory}</div>
      </div>
    </div>
  );
}
