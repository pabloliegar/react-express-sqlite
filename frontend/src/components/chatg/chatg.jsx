import React, { useEffect, useState } from "react";
import "./chatg.css";
import { io } from "socket.io-client";
import {useAuth} from "@/hooks/useAuth"
const socket = io("http://localhost:4000");

export function Chatg() {
  const {auth} = useAuth();
  const [tweets, setTweets] = useState([]);
  const [newTweetText, setNewTweetText] = useState("");

  useEffect(() => {
    socket.on("newTweet", (tweet) => {
      setTweets((prevTweets) => [tweet, ...prevTweets]);
    });

    return () => {
      socket.off("newTweet");
    };
  }, []);

  const handleSendTweet = () => {
    const text = newTweetText.trim();
    if (text === "") return;

    // Construir un tweet básico (puedes ajustar con más datos)
    const tweetToSend = {
      id: Date.now(),  // id temporal, el servidor debería asignar uno definitivo
      username: auth?.me?.[0].nombre || "Usuario",
      handle: auth?.me?.[0].email || "@usuario",
      text,
      comments: [],
      retweets: 0,
      likes: 0,
      views: 0,
    };

    // Emitir el tweet al servidor
    socket.emit("sendTweet", tweetToSend);

    // Opcional: limpiar el input (la actualización llegará por socket)
    setNewTweetText("");
  };

  return (
    <div className="feed">
      <div className="new-tweet-form" style={{ marginBottom: "1rem" }}>
        <textarea
          rows={3}
          placeholder="¿Qué está pasando?"
          value={newTweetText}
          onChange={(e) => setNewTweetText(e.target.value)}
          style={{ width: "100%", resize: "vertical" }}
        />
        <button onClick={handleSendTweet} style={{ marginTop: "0.5rem" }}>
          Twittear
        </button>
      </div>

      {tweets.map((tweet, index) => (
        <div
          className="tweet"
          key={tweet.id || index}
          style={{ cursor: "default" }}
        >
          <div className="header">
          
            <span className="username">{tweet.username}</span>
            {tweet.handle && <span className="handle">-{tweet.handle}</span>}
          </div>

          {tweet.title && (
            <div className="image-section">
              <h3>{tweet.title}</h3>
            </div>
          )}

          {tweet.text && <div className="text">{tweet.text}</div>}

          {tweet.quote && (
            <div className="quote-tweet">
              <div className="header">
                <span className="username">{tweet.quote.username}</span>
                <span className="handle">{tweet.quote.handle}</span>
              </div>
              <div className="text">{tweet.quote.text}</div>
            </div>
          )}

          <div className="icons">
            <span>💬 {tweet.comments?.length || 0}</span>
            <span>🔁 {tweet.retweets || 0}</span>
            <span>❤️ {tweet.likes || 0}</span>
            <span>👁 {tweet.views || 0}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
