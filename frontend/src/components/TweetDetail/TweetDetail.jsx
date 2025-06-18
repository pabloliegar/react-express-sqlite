import React, { useEffect, useState } from "react";
import{ useComentarios } from "@/hooks/useComentarios";
export function TweetDetail({ tweet, onBack, socket, currentUser }) {
  const [comments, setComments] = useState([]);

  const { createcomentario} = useComentarios();
  useEffect(() => {
    setComments([]);
console.log("Cargando comentarios para el tweet:", tweet);
    function onNewComment({ tweetId, comment }) {
      if (tweetId === tweet.id) {
       
        setComments((prev) => [...prev, comment]);
      }
    }
     

  socket.on("updateComments", ({ tweetId, comment }) => {
    
  console.log("Recibido comentario:", comment);
  if (tweetId === tweet.id) {
    setComments((prev) => {
      if (prev.some(c => c.id === comment.id)) {
        console.log("Comentario duplicado ignorado:", comment.id);
       
        return prev;
      }
      return [...prev, comment];
    });
  }
});


    return () => {
      socket.off("updateComments", onNewComment);
    };
  }, [tweet.id, socket]);

  const [commentText, setCommentText] = useState("");

  const handleSendComment = () => {
    const text = commentText.trim();
    if (!text) return;

    const newComment = {
      id: Date.now(),
      user: currentUser?.nombre || "Anon",
      text,
    };
     createcomentario({ userId: currentUser?.id, text: newComment.text, tweetId: tweet.id })
     tweet.total_comentarios = (tweet.total_comentarios || 0) + 1;
    socket.emit("addComment", { tweetId: tweet.id, comment: newComment });
    setCommentText("");
  };

  return (
    <div className="tweet-detail">
      <button onClick={onBack} style={{ marginBottom: "1rem" }}>
        ← Volver
      </button>

      <div className="tweet">
        <div className="header">
          <span className="username">{tweet.username}</span>
          {tweet.handle && <span className="handle">-{tweet.handle}</span>}
        </div>
        {tweet.text && <div className="text">{tweet.text}</div>}
        <div className="icons">
          <span>💬 { tweet.total_comentarios || 0}</span>
          <span>🔁 {tweet.retweets || 0}</span>
          <span>❤️ {tweet.likes || 0}</span>
          <span>👁 {tweet.views || 0}</span>
        </div>
      </div>

      <div className="comments-section" style={{ marginTop: "1rem" }}>
        <h4>Comentarios</h4>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment?.id } className="comment">
              <b>{comment?.user ?? "Anon"}:</b> {comment?.text ?? ""}
            </div>
          ))
        ) : (
          <p>No hay comentarios aún</p>
        )}

        <textarea
          rows={2}
          placeholder="Añade un comentario..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          style={{ width: "100%", resize: "vertical", marginTop: "0.5rem" }}
        />
        <button onClick={handleSendComment} style={{ marginTop: "0.5rem" }}>
          Comentar
        </button>
      </div>
    </div>
  );
}
