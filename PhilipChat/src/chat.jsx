import "./chat.css";
import React, { useState, useEffect } from "react";

export default function Chat({ author }) {
  const [messages, setMessages] = useState([]);
  const url = "https://chat.avalon.build/chat";

  async function fetchMessages() {
    const response = await fetch(url);
    const messagesData = await response.json();
    setMessages(messagesData);
  }

  useEffect(() => {
    fetchMessages();
  }, []);

  const entirePage = messages.map((m) => {
    if (author === m.author) {
      return (
        <div className="message author">
          <div className="user-author">{m.author}</div>
          <div className="user-message">{m.message}</div>
        </div>
      );
    } else {
      return (
        <div className="message">
          <div className="user-author">{m.author}</div>
          <div className="user-message">{m.message}</div>
        </div>
      );
    }
  });

  async function handleMessage() {
    const newMessage = document.querySelector(".message-input").value;
    const data = {
      author: author,
      message: newMessage,
    };
    await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    await fetchMessages();
  }

  return (
    <div>
      <form>
        <input
          type="text"
          maxLength="255"
          required
          className="message-input"
          placeholder="put your message here"
        />
      </form>
      <div className="message-button">
        {" "}
        <button onClick={fetchMessages}>Refresh</button>
        <button onClick={handleMessage}>Submit</button>
      </div>
      <div className="chat-page-content">{entirePage}</div>
    </div>
  );
}
