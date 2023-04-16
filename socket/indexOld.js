const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:5173",
  },
});

let onlineUsers = [];

const addOnlineUsers = (onlineUser) => {
  !onlineUsers.some((user) => user._id === onlineUser._id) &&
    onlineUsers.push(onlineUser);
};
const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return onlineUsers.find((user) => user._id === userId);
};
const getOffLineUser = (socketId) => {
  return onlineUsers.find((user) => user.socketId === socketId);
};
io.on("connection", (socket) => {
  // connect
  console.log("a user connected", socket.id);

  // Store newly connected user
  socket.on("addOnlineUsers", (onlineUser) => {
    onlineUser.socketId = socket.id;
    addOnlineUsers(onlineUser);

    // Send newly connected users to client
    io.emit("getOnlineUsers", onlineUsers);
  });

  // Reverive a message from client
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    if (user) {
      // Send messages to client
      io.to(user.socketId).emit("getMessage", {
        senderId,
        text,
      });
    }
  });

  // disconnect
  socket.on("disconnect", (userId) => {
    console.log("a user disconnected");
    let offLineUser = getOffLineUser(socket.id);
    removeUser(socket.id);
    io.emit("getOffLineUser", offLineUser);
  });
});
