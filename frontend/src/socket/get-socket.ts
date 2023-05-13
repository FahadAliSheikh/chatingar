import { io, Socket } from "socket.io-client";
import { useMemo } from "react";

// const SOCKET_URL = "http://localhost:5000";
const SOCKET_URL = import.meta.env.VITE_BASE_URL || "http://192.168.100.6:5000";
console.log(SOCKET_URL);
let socket: Socket;

export const onSocketConnected = (callback: any) => {
  socket.on("connected", callback);
};
export const offSocketConnected = () => {
  socket.off("connected");
};
export const emitSocketSetup = (data: any) => {
  socket.emit("set_up_user", data);
};
export const offSocketSetup = () => {
  socket.off("set_up_user");
};

export const onSocketGetUsers = (callback: any) => {
  socket.on("get_active_users", callback);
};

export const offSocketGetUsers = () => {
  socket.off("get_active_users");
};
export const emitSocketSendMessage = (data: any) => {
  socket.emit("send_message", data);
};

export const onSocketReceiveMessage = (callback: any) => {
  socket.on("receive_message", callback);
};

export const offSocketReceiveMessage = () => {
  socket.off("receive_message");
};

export const emitSocketRemoveUser = (user: any) => {
  socket.emit("remove_user", user);
};

export const onSocketRemoveUser = (user: any) => {
  socket.on("remove_user", user);
};

export const offSocketRemoveUser = () => {
  socket.off("remove_user");
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
