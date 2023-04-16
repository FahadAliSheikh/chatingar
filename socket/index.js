const express = require("express");
const app = express();
const PORT = 4000;

//New imports
const http = require("http").Server(app);
const cors = require("cors");

app.use(cors());

const socketIO = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:5173",
  },
});

let onlineUsers = [
  {
    username: "faafaf",
    age: 18,
    gender: "male",
    country: "AU",
    uuid: "290f51b9-9b18-566d-80f1-697608360e56",
    socketID: "bLXRyKg3TgYZQeuGAAAF",
  },
];

const addOnlineUsers = (onlineUser) => {
  !onlineUsers.some((user) => user.uuid === onlineUser.uuid) &&
    onlineUsers.push(onlineUser);
};
const removeUser = (socketID) => {
  onlineUsers = onlineUsers.filter((user) => user.socketID !== socketID);
};

const getUser = (userId) => {
  return onlineUsers.find((user) => user.uuid === userId);
};
const getOffLineUser = (socketID) => {
  return onlineUsers.find((user) => user.socketID === socketID);
};

//Add this before the app.get() block
// socketIO.on("connection", (socket) => {
//   console.log(`⚡: ${socket.id} user just connected!`);

//   //Listens and logs the message to the console
//   socket.on("message", (data) => {
//     console.log(data);
//     socketIO.emit("messageResponse", data);
//   });

//   socket.on("typing", (data) => socket.broadcast.emit("typingResponse", data));

//   //Listens when a new user joins the server
//   socket.on("newUser", (data) => {
//     console.log("inside new user", data);
//     //Adds the new user to the list of users
//     users.push(data.user);
//     // console.log(users);
//     //Sends the list of users to the client
//     console.log(users);
//     socketIO.emit("newUserResponse", users);
//   });
//   socket.on("disconnect", () => {
//     console.log("🔥: A user disconnected");
//   });
// });
socketIO.on("connection", (socket) => {
  // connect
  // console.log("a user connected", socket.id);
  console.log(`⚡: ${socket.id} user just connected!`);

  // Store newly connected user
  socket.on("newUser", (onlineUser) => {
    onlineUser.socketID = socket.id;
    console.log("online suers", onlineUser);

    addOnlineUsers(onlineUser);
    console.log("online suers", onlineUsers);
    // Send newly connected users to client
    socketIO.emit("onlineUsers", onlineUsers);
  });
  // socketIO.emit("onlineUsers", onlineUsers);
  // Reverive a message from client
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    if (user) {
      // Send messages to client
      socketIO.to(user.socketID).emit("getMessage", {
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
    socketIO.emit("onlineUsers", onlineUsers);

    console.log(onlineUsers.length);
    socketIO.emit("getOffLineUser", offLineUser);
  });
});

app.get("/api", (req, res) => {
  res.json({
    message: "Hello world",
  });
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
