import {io} from "socket.io-client";

// 9000은 맞음,
const ENDPOINT = 'localhost:9000';
const socket = io(ENDPOINT,{
  transports: [ 'websocket'],
  path:'/ws',
});

export default socket;