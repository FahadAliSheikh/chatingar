import { io, Socket } from "socket.io-client";
import { useMemo } from "react";

// const SOCKET_URL = "http://localhost:5000";
const SOCKET_URL = "http://192.168.18.15:5000";

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
