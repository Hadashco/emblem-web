import io from 'socket.io-client';
import { store } from './Store.js';

const socket = io.connect('localhost:3000');
socket.on('place/createPlace', place => {
  store.dispatch({type: 'addMarker', data: place});
});

export { socket };
