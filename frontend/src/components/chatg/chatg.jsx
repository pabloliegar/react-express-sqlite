import React, { useEffect, useState } from "react";
import "./chatg.css";
import { io } from "socket.io-client";

const socket = io("http://localhost:4000");

export function Chatg() {
  const [tweets, setTweets] = useState([]);
  const [expandedTweetIndex, setExpandedTweetIndex] = useState(null);

  useEffect(() => {
    socket.on("newTweet", (tweet) => {
      setTweets((prevTweets) => [tweet, ...prevTweets]);
    });

    return () => {
      socket.off("newTweet");
    };
  }, []);

  const toggleComments = (index) => {
    setExpandedTweetIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="feed">
      {tweets.map((tweet, index) => (
        <div
          className="tweet"
          key={index}
          onClick={() => toggleComments(index)}
          style={{ cursor: "pointer" }}
        >
          <div className="header">
            <span className="username">{tweet.username}</span>
            {tweet.handle && <span className="handle">{tweet.handle}</span>}
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

          {expandedTweetIndex === index && tweet.comments && (
            <div className="comments">
              {tweet.comments.map((comment, i) => (
                <div key={i} className="comment">
                  <span className="comment-user">{comment.user}:</span> {comment.text}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
