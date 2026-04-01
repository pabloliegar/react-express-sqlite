import { Server } from "socket.io";
import mysql from "mysql2/promise";

export default async function initWebSocket(server) {

  const db = await mysql.createPool({
    host: "localhost",
    user: "usuario",
    password: "pablo",
    database: "users"
  });

  const io = new Server(server, {
    cors: {
      origin: [
        "http://localhost:5173",
        "http://192.168.68.51:5173",
        "capacitor://localhost",
        "http://10.0.2.2:4000",
        "http://localhost:4000"
      ],
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  let usuariosConectados = {};

  io.on("connection", (socket) => {
    console.log("Cliente conectado:", socket.id);

    // =========================
    // 🔐 LOGIN USUARIO
    // =========================
    socket.on("login", async (userId) => {
      usuariosConectados[userId] = socket.id;

      await db.query(
        "UPDATE usuarios SET conectado = 1 WHERE id = ?",
        [userId]
      );

      emitirUsuarios();
    });

    // =========================
    // ❌ DESCONECTAR
    // =========================
    socket.on("disconnect", async () => {
      let userId = null;

      for (let id in usuariosConectados) {
        if (usuariosConectados[id] === socket.id) {
          userId = id;
          delete usuariosConectados[id];
          break;
        }
      }

      if (userId) {
        await db.query(
          "UPDATE usuarios SET conectado = 0 WHERE id = ?",
          [userId]
        );
      }

      emitirUsuarios();
    });

    // =========================
    // 🐦 TWEETS
    // =========================
    socket.on("sendTweet", async (tweet) => {
      // opcional: guardar en BD
      // await db.query("INSERT INTO tweets ...")

      io.emit("newTweet", tweet);
    });

    // =========================
    // 💬 COMENTARIOS
    // =========================
    socket.on("addComment", ({ tweetId, comment }) => {
      io.emit("updateComments", { tweetId, comment });
    });
  });

  // =========================
  // 🔄 EMITIR USUARIOS
  // =========================
  async function emitirUsuarios() {
    try {
      const [rows] = await db.query("SELECT * FROM usuarios");
      io.emit("usuarios", rows);
    } catch (err) {
      console.error(err);
    }
  }
}