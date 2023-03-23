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
    const isAuthor = author === m.author;
    const className = isAuthor ? "message author" : "message";
    return (
      <div className={className} key={m.id}>
        <div className="user-author">{m.author}</div>
        <div className="user-message">{m.message}</div>
      </div>
    );
  });

  async function handleMessage() {
    const newMessage = document.querySelector(".message-input").value;
    const data = {
      author: author,
      message: newMessage,
    };
    try {
      await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      await fetchMessages();
    } catch (error) {
      alert("Network error. Please try again later.");
    }
  }

  return (
    <div>
      <form>
        <input
          type="text"
          maxLength="255"
          required
          className="message-input"
          placeholder="Put your message here"
        />
      </form>
      <div className="message-button">
        <button onClick={fetchMessages}>Refresh</button>
        <button onClick={handleMessage}>Submit</button>
      </div>
      <div className="chat-page-content">{entirePage}</div>
    </div>
  );
}
