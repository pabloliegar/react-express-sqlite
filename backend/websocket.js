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
socket.on("sendTweet", (tweet) => {
    // Aquí puedes guardar el tweet en BD o procesar

    // Emitir a todos los clientes el nuevo tweet
    io.emit("newTweet", tweet);
  });
})
}
