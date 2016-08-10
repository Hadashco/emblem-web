import io from 'socket.io-client';

const socket = io.connect('localhost:3000');
socket.on('place/createPlace', place => {
  console.log(place);
});

export { socket };
