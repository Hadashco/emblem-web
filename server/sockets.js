const io = require('socket.io');
let sockets; // Provides same scope for sockets, below
let listeners = {};

const listenToSocket = socket => {
  Object.keys(listeners).forEach(event => {
    socket.on(event, data => {
      listeners[event].forEach(func => {
        func(data);
      });
    });
  });
};

module.exports = {
  broadcast: (type, data) => {
    if (!sockets) {
      throw 'No sockets have been attached to server.';
    }
    sockets.emit(type, data);
  },
  registerListener: (type, func) => {
    if (!listeners[type]) {
      listeners[type] = [func];
    } else {
      listeners[type].push(func);
    }
  },
  addSockets: server => {
    sockets = io(server);
    sockets.on('connection', socket => {
      console.log('a new connection!');
      listenToSocket(socket);
    });
  },
};
