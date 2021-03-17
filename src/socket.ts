import io from 'socket.io-client';

const ENDPOINT = 'http://localhost:4000/switch';
const socket = io(ENDPOINT,{
  path:'/ws',
}).connect();

export default socket;