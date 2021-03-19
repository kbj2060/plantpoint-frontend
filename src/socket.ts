import io from 'socket.io-client';
import {WS} from "./reference/secret";

const socket = io(WS).connect();

export default socket;