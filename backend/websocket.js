// websocket.js
import {WebSocketServer } from 'ws';

export default function (server) {
  const wss = new WebSocketServer ({ server });

  wss.on('connection', (ws) => {
    console.log('Cliente WS conectado');

    ws.on('message', (msg) => {
      console.log('Mensaje recibido:', msg)

      wss.clients.forEach(client => {
        if (client !== ws && client.readyState === wss.OPEN) {
          client.send(`Echo desde servidor: ${msg}`);
        }
      });
    });

    ws.on('close', () => {
      console.log('Cliente WS desconectado');
    });
  });
}
