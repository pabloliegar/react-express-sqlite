// websocket.js
import { Server } from "socket.io";

export default function(server) {
  const io = new Server(server, {
    cors: {
     origin: [
    "http://localhost:5173",   // web dev
    "http://192.168.68.51:5173", // web desde red local
    "capacitor://localhost",   // móvil Capacitor
    "http://10.0.2.2:4000",    // Android emulator
    "http://localhost:4000"    // iOS emulator / web
  ],
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
 socket.on("addComment", ({ tweetId, comment }) => {
  io.emit("updateComments", { tweetId, comment });
});
})
}
