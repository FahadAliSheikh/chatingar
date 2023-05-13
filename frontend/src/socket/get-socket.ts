import { io, Socket } from "socket.io-client";
import { useMemo } from "react";

// const SOCKET_URL = "http://localhost:5000";
const SOCKET_URL = import.meta.env.VITE_BASE_URL || "http://192.168.100.6:5000";
console.log(SOCKET_URL);
let socket: Socket;

export const onSocketConnected = (callback: any) => {
  socket.on("connected", callback);
};
export const emitSocketSetup = (data: any) => {
  socket.emit("setUp", data);
};
export const onSocketGetUsers = (callback: any) => {
  socket.on("getUsers", callback);
};

export const offSocketGetUsers = () => {
  socket.off("getUsers");
};
export const emitSocketSendMessage = (data: any) => {
  socket.emit("new message", data);
};

export const onSocketReceiveMessage = (callback: any) => {
  socket.on("message received", callback);
};

export const offSocketReceiveMessage = () => {
  socket.off("message received");
};

export const emitSocketRemoveUser = (user: any) => {
  socket.emit("removeUser", user);
};

export const onSocketRemoveUser = (user: any) => {
  socket.on("removeUser", user);
};

export const offSocketRemoveUser = () => {
  socket.off("removeUser");
};

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
