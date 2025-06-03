const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const WebSocketServer = require('./websocket');

app.use(express.json());

// Importar rutas

const usersRouter = require('./routes/users');


app.use('/api/users', usersRouter);

// Inicializar WebSocket con el servidor HTTP
WebSocketServer(server);

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
