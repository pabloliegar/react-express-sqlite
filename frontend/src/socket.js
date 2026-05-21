import { io } from "socket.io-client";
import {ip} from "../src/ip"
export const socket = io(`http://${ip}:4000`);
   