import io from 'socket.io-client';

var socket = io.connect('localhost:3000');
socket.on('place/createPlace', place => {
  console.log(place);
});



export { socket };
