const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:3000/socket.io/');

ws.on('open', function open() {
  console.log('connected');
  ws.send(Date.now());
});

ws.on('close', function close() {
  console.log('disconnected');
});

ws.on('message', function incoming(data) {
  console.log(data);
});
