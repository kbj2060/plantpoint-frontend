import io from 'socket.io-client';

const ENDPOINT = 'http://localhost:4000';
const socket = io(ENDPOINT,{
  transports: [ 'websocket'],
  path:'/ws',
}).connect();

export default socket;