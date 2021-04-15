const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const Sockets = require('./sockets');
const connection = require('./dbConfig');
const cors = require('cors');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.server = http.createServer(this.app);
    connection(); 
    this.io = socketio(this.server, {
      
    });
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use('/api/v1/auth', require('../routes/authRoutes'));
    this.app.use('/api/v1/message', require('../routes/messageRoutes'));
  }

  configurarSockets() {
    new Sockets(this.io);
  }

  execute() {
    this.middlewares();
    this.configurarSockets();
    this.server.listen(this.port, () => {
      console.log('Server running on:', this.port);
    });
  }
}

module.exports = Server;
