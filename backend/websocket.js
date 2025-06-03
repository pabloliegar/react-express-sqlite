const WebSocket = require('ws');

module.exports = function (server) {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', (ws) => {
    console.log('Cliente WS conectado');

    ws.on('message', (msg) => {
      console.log('Mensaje recibido:', msg);

      // Echo a todos los clientes conectados (menos al que envió)
      wss.clients.forEach(client => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(`Echo desde servidor: ${msg}`);
        }
      });
    });

    ws.on('close', () => {
      console.log('Cliente WS desconectado');
    });
  });
};
