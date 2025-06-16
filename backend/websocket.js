// websocket.js
import { Server } from "socket.io";

export default function(server) {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado:", socket.id);

  // Envía un tweet de ejemplo cuando se conecta un cliente
  setTimeout(() => {
    socket.emit("newTweet", {
      username: "Marko",
      handle: "@kenstannie · 1m",
      text: "This game needs more content...",
      comments: [
        { user: "alex", text: "Totally agree" },
        { user: "luna", text: "But it’s still fun tho" }
      ],
      quote: {
        username: "Star Rail Universe",
        handle: "@StarRailVerse1 · 2m",
        text: "New features coming in version 3.4!"
      },
      retweets: 2,
      likes: 50,
      views: "1.1K"
    });
  }, 100);

  // O podrías emitir un tweet cada 10 segundos por ejemplo
  setInterval(() => {
    const tweet = {
      username: "BotUser",
      handle: "@bot · now",
      text: `Random message ${Math.floor(Math.random() * 1000)}`,
      comments: [
        { user: "ana", text: "Nice!" },
        { user: "john", text: "Meh..." }
      ],
      retweets: Math.floor(Math.random() * 10),
      likes: Math.floor(Math.random() * 200),
      views: `${(Math.random() * 10).toFixed(1)}K`
    };
    socket.emit("newTweet", tweet);
  }, 10000);

  socket.on("disconnect", () => {
    console.log("Cliente desconectado:", socket.id);
  });
});
}
