import express from 'express'
import http from 'http'
import cors from 'cors';
import { usersRouter,tweetsRouter } from './routes/routes.js'
import WebSocketServer from './websocket.js' // asegúrate de que este archivo también use export default
const app = express()
app.use(express.json());
const server = http.createServer(app)
// Importar rutas

app.use(cors({
  origin: 'http://localhost:5173', // Solo permite peticiones desde el frontend
  credentials: true
}));

app.use('/api/usuarios', usersRouter);
app.use('/api/tweets', tweetsRouter);

// Inicializar WebSocket con el servidor HTTP
WebSocketServer(server);

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
