import { io, Socket } from "socket.io-client";
import { useMemo } from "react";

// const SOCKET_URL = "http://localhost:5000";
const SOCKET_URL =
  // process.env.REACT_APP_BASE_URL || "http://192.168.100.6:5000";
  import.meta.env.VITE_BASE_URL || "http://192.168.100.6:5000";
console.log(SOCKET_URL);
let socket: Socket;

export const getSocket = () => {
  if (!socket) {
    socket = io(SOCKET_URL);
  }

  return socket;
};
export const useSocket = () => {
  const socket = useMemo(() => getSocket(), []);

  return socket;
};
