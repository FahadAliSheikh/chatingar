// import { io, Socket } from "socket.io-client";
// import { useMemo } from "react";

// const SOCKET_URL = "http://localhost:4000";

// let socket: Socket;

// export const getSocket = () => {
//   console.log("get socket running!");
//   if (!socket) {
//     socket = io(SOCKET_URL);
//   }

//   return socket;
// };
// export const useSocket = () => {
//   const socket = useMemo(() => getSocket(), []);

//   return socket;
// };
