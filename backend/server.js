const express = require("express");
const dotenv = require("dotenv");
const { chats } = require("./data/data");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const userController = require("./controllers/userControllers");
const chatController = require("./controllers/chatControllers");
const cors = require("cors");

const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const app = express();
dotenv.config();
connectDB();

app.use(express.json());
// Enable CORS
app.use(cors());
app.use(
  cors({
    origin: "*",
    // origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Methods",
//     "GET,HEAD,OPTIONS,POST,PUT,DELETE"
//   );
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   next();
// });

app.get("/", (req, res) => {
  res.send("API is running!");
});

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, console.log(`Server started on port ${PORT}`));

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    // origin: "http://192.168.18.15:5173",
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});
// const io = new socket.Server(server, { cors: { origin: "*" } });

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

const getUserBySocket = (socketId) => {
  return users.find((user) => user.socketId === socketId);
};

io.on("connection", (socket) => {
  //when ceonnect
  console.log("a user connected:", socket.id);
  socket.emit("connected");
  //take userId and socketId from user
  socket.on("setUp", (user) => {
    console.log("inside setup");
    addUser(user._id, socket.id);
    userController.updateActiveStatue(user._id, true);
    console.log(users);
    io.emit("getUsers", users);
  });

  socket.on("removeUser", (user) => {
    console.log("inside remove user");
    removeUser(socket.id);
    console.log(users);
    userController.updateActiveStatue(user._id, false);
    chatController.updateActiveStatue(user._id, false);

    io.emit("getUsers", users);
  });
  //send and get message
  socket.on("new message", (newMessageReceived) => {
    console.log(newMessageReceived);
    const senderId = newMessageReceived.sender._id;
    console.log(newMessageReceived.chat.users);
    const receiver = newMessageReceived.chat.users.find(
      (member) => member._id !== senderId
    );
    console.log("--------------------------");
    console.log(senderId);
    console.log(receiver._id);
    console.log("--------------------------");

    const user = getUser(receiver._id);
    // console.log("found user", user);
    // console.log("all users", users);
    console.log("sending message to:", user.socketId);

    socket.to(user.socketId).emit("message received", newMessageReceived);
    // socket.emit("message received", newMessageReceived);
  });

  //when disconnect
  socket.on("disconnect", () => {
    console.log("------------refresing user-----------");
    console.log("a user disconnected!");
    const user = getUserBySocket(socket.id);
    console.log("found disconnected user", user);
    if (user) {
      userController.updateActiveStatue(user.userId, false);
    }
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
// io.on("connection", (socket) => {
//   console.log("connected to socket.io", socket.id);
//   io.emit("welcome", "testing to receive message on client from server");
//   socket.on("setUp", (userData) => {
//     console.log('inside setup')
//     socket.join(userData._id);
//     // console.log(userData._id);
//     console.log(socket.rooms);
//     socket.emit("connected", userData);
//   });

//   // socket.on("join chat", (room) => {
//   //   // socket.join(room);
//   //   // console.log("user joined room:", room);
//   //   console.log(socket.rooms);
//   // });

//   socket.on("typing", (room) => socket.in(room).emit("typing"));
//   socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

//   socket.on("new message", (newMessageReceived) => {
//     let chat = newMessageReceived.chat;
//     if (!chat.users) return console.log("chat.users not defined!");
//     chat.users.forEach((user) => {
//       console.log(newMessageReceived);
//       if (user._id == newMessageReceived.sender._id) return;
//       socket.to(user._id).emit("message received", newMessageReceived);
//       io.to(user._id).emit("message received", newMessageReceived);
//       // io.emit("message received", newMessageReceived);
//     });
//     // io.emit("message received", newMessageReceived);
//   });

//   socket.off("setup", () => {
//     console.log("User disconnected!");
//     socket.leave(userData._id);
//   });
// });
