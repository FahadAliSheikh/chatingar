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

const addUser = (newUser) => {
  !users.some((user) => user._id === newUser._id) && users.push(newUser);
};
// const addUser = (userId, socketId) => {
//   !users.some((user) => user.userId === userId) &&
//     users.push({ userId, socketId });
// };

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

// const getUser = (userId) => {
//   return users.find((user) => user.userId === userId);
// };
const getUser = (userId) => {
  return users.find((user) => user._id === userId);
};

const getUserBySocket = (socketId) => {
  return users.find((user) => user.socketId === socketId);
};

const searchUsers = (searchData) => {
  return users.filter((user) => {
    const { name, gender, country } = searchData;

    // Apply the search criteria one by one
    if (
      name &&
      name !== "" &&
      !user.name.toLowerCase().includes(name.toLowerCase())
    ) {
      return false;
    }

    if (gender && gender !== "" && user.gender !== gender) {
      return false;
    }

    if (country && country !== "" && user.country !== country) {
      return false;
    }

    // Add more conditions if needed...

    return true;
  });
};

io.on("connection", (socket) => {
  //when ceonnect
  console.log("a user connected:", socket.id);
  socket.emit("connected");
  //take userId and socketId from user
  socket.on("set_up_user", async (newUser) => {
    if (newUser) {
      // Add user to socket array
      // addUser(user._id, socket.id); // from db users
      delete newUser.token;
      newUser.socketId = socket.id;
      await addUser(newUser);
      // Update user's status in database
      // userController.updateActiveStatue(newUser._id, true);
      // Emit an event to all connected clients
      socket.emit("get_active_users", users);
      io.emit("get_new_single_user", newUser);
    }
  });

  socket.on("get_active_users", async (searchData) => {
    const filteredUsers = await searchUsers(searchData);
    socket.emit("get_active_users", filteredUsers);
  });

  socket.on("remove_user", async (user) => {
    // Remove user from socket array
    await removeUser(socket.id);
    // Update user's active status to false
    userController.updateActiveStatue(user._id, false);
    // Update user's chat status to false
    chatController.updateActiveStatue(user._id, false);
    // Emit socket event to all connected clients to remove user
    // io.emit("remove_user", user);
    // Emit socket event to all connected clients to get all active users
    io.emit("get_removed_user", user);
  });

  //send and get message
  socket.on("send_message", (newMessageReceived) => {
    const senderId = newMessageReceived.sender._id;
    if (!senderId) return;
    // find receiver of message from chat members
    const receiver = newMessageReceived.chat.users.find(
      (member) => member._id !== senderId
    );
    if (!receiver) return;
    // find user from socket array
    const user = getUser(receiver._id);
    if (!user) return;
    console.log("sending message to:", user.socketId);
    if (!user.socketId) return;
    // emit message to found user
    socket.to(user.socketId).emit("receive_message", newMessageReceived);
    // socket.emit("message received", newMessageReceived);
  });

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    const user = getUserBySocket(socket.id);
    if (!user) return;
    // if (user) {
    //   // update user's active status to false
    //   userController.updateActiveStatue(user.userId, false);
    // }
    // remove user from socket array
    removeUser(socket.id);
    // Emit socket message to all connected clients for updated
    // io.emit("get_active_users", users);
    io.emit("get_removed_user", user);
  });
});
