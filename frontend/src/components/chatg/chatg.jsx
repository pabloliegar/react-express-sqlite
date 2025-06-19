import React, { useEffect, useState } from "react";
import "./chatg.css";
import { io } from "socket.io-client";
import { useAuth } from "@/hooks/useAuth";
import { TweetDetail } from "@/components/TweetDetail/TweetDetail";
import {useTweets} from "@/hooks/useTweets"; 
 // Asegúrate de que este archivo exista

const socket = io("http://localhost:4000");

export function Chatg() {
  const { getTweets, createTweet } = useTweets();
  const { auth } = useAuth();
  const [tweets, setTweets] = useState([]);
  const [newTweetText, setNewTweetText] = useState("");
  const [selectedTweet, setSelectedTweet] = useState(null);

  useEffect(() => {
    socket.on("newTweet", (tweet) => {
      setTweets((prevTweets) => [tweet, ...prevTweets]);
      console.log("Nuevo tweet recibido:", tweet);
    });

    return () => {
      socket.off("newTweet");
    };
  }, []);
  useEffect(() => {
  const fetchTweets = async () => {
    const loadedTweets = await getTweets();
    console.log("Tweets cargados:", loadedTweets);
    const normalizedTweets = loadedTweets.map((t) => ({
      ...t,
      text: t.texto, // adaptar el campo
      retweets: 0,
      likes: 0,
      views: 0,
       total_comentarios: t.total_comentarios || 0, // si viene del backend
      username: t.nombre || "Usuario", // si viene del backend
      handle: t.email || "",             // opcional
    }));

    setTweets(normalizedTweets);
  };

  fetchTweets();
}, []);

  const handleSendTweet = async () => {
  const text = newTweetText.trim();
  if (!text || !auth?.me?.[0]?.id) return;

  try {
    const createdTweet = await createTweet({
      userId: auth.me[0].id,
      text,
    });

    // Ahora lo emites a todos los clientes por socket (incluido tú)
    socket.emit("sendTweet", {
      ...createdTweet,
      username: auth.me[0].nombre,
      handle: auth.me[0].email,
      total_comentarios: 0, // Inicialmente 0, puedes actualizarlo después
      retweets: 0,
      likes: 0,
      views: 0,
    });

    setNewTweetText("");
  } catch (error) {
    console.error("Error al crear el tweet:", error);
  }
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
    <>
    
    <div className="chatg-container">
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
  onClick={() => setSelectedTweet(tweet)}
>
  <div className="tweet-header">
    <span className="username">{tweet.username}</span>
    {tweet.handle && <span className="handle"> @{tweet.handle}</span>}
  </div>

  <div className="tweet-text">{tweet.text}</div>

  <div className="tweet-icons">
    <span>💬 {tweet.total_comentarios}</span>
    <span>🔁 {tweet.retweets}</span>
    <span>❤️ {tweet.likes}</span>
    <span>👁 {tweet.views}</span>
  </div>
</div>
      ))}
    </div>
    </div>
    </>
  );
}
