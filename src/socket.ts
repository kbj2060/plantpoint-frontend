import io from 'socket.io-client';
import {WS} from "./reference/secret";

const socket = io(WS,{
  path:'/ws',
}).connect();

export default socket;