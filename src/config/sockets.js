const {
  userConnected,
  userDisconnected,
  getUsersConnected,
} = require('../controllers/socketController');
const { tokenVerify } = require('../helpers/createToken');

class Sockets {
  constructor(io) {
    this.io = io;
    this.socketEvents();
  }

  socketEvents() {
    this.io.on('connection', async (socket) => {
      const [valid, uid] = await tokenVerify(socket.handshake.query['x-token']);
      if (!valid) {
        console.log('Token no valido  ');
        return socket.disconnect();
      }
      await userConnected(uid);
      //Emit all users
      this.io.emit('list-user', await getUsersConnected());
      socket.on('disconnect', async () => {
        await userDisconnected(uid);
      });
    });
  }
}

module.exports = Sockets;
