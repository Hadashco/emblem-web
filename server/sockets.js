var io = require('socket.io');
var sockets;
var listeners = {};

var listenToSocket = function(socket) {
  Object.keys(listeners).forEach(event => {
    socket.on(event, data => {
      listeners[event].forEach(func => {
        func(data);
      });
    });
  });
};

module.exports = {
  broadcast: function(type, data) {
    if (!sockets) {
      throw 'No sockets have been attached to server.';
    }
    sockets.emit(type, data);
  },
  registerListener: function(type, func) {
    if (!listeners[type]) {
      listeners[type] = [func];
    } else {
      listeners[type].push(func);
    }
  },
  addSockets: function(server) {
    sockets = io(server);
    sockets.on('connection', socket => {
      console.log('a new connection!');
      listenToSocket(socket);
    });
  }
};
