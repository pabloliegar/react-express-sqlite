import React, { useEffect, useState } from "react";
import "./chatg.css";
import { io } from "socket.io-client";
import { useAuth } from "@/hooks/useAuth";
import { TweetDetail } from "@/components/TweetDetail/TweetDetail";

const socket = io("http://localhost:4000");

export function Chatg() {
  const { auth } = useAuth();
  const [tweets, setTweets] = useState([]);
  const [newTweetText, setNewTweetText] = useState("");
  const [selectedTweet, setSelectedTweet] = useState(null);

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
    if (!text) return;

    const tweetToSend = {
      id: Date.now(),
      username: auth?.me?.[0].nombre || "Usuario",
      handle: auth?.me?.[0].email || "@usuario",
      text,
      retweets: 0,
      likes: 0,
      views: 0,
      // no comments aquí
    };

    socket.emit("sendTweet", tweetToSend);
    setNewTweetText("");
  };

  if (selectedTweet) {
    return (
      <TweetDetail
        tweet={selectedTweet}
        onBack={() => setSelectedTweet(null)}
        socket={socket}
        currentUser={auth?.me?.[0]}
      />
    );
  }

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

      {tweets.map((tweet) => (
        <div
          key={tweet.id}
          className="tweet"
          style={{ cursor: "pointer" }}
          onClick={() => setSelectedTweet(tweet)}
        >
          <div className="header">
            <span className="username">{tweet.username}</span>
            {tweet.handle && <span className="handle">-{tweet.handle}</span>}
          </div>

          {tweet.text && <div className="text">{tweet.text}</div>}

          <div className="icons">
            <span>💬 0</span> {/* Comentarios no gestionados aquí */}
            <span>🔁 {tweet.retweets || 0}</span>
            <span>❤️ {tweet.likes || 0}</span>
            <span>👁 {tweet.views || 0}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
