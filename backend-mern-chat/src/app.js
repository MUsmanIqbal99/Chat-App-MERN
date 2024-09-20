import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { createServer } from "node:http";
import { Server } from "socket.io";

const app = express();
export const server = createServer(app);
export const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Define allowed origins
const allowedOrigins = ["http://localhost:5173"];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Enable set cookie
};

// Middlewares
app.use(cors(corsOptions));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Import routes
import userRouter from "./routes/user.routes.js";
import allUsersRouter from "./routes/users.routes.js";
import messageRouter from "./routes/message.routes.js";

// Import Custom error handler middleware
import { errorHandler } from "./middlewares/customError.middleware.js";
import { updateLastSeen } from "./utils/updateLastSeen.js";

app.use("/api/v1/user", userRouter);
app.use("/api/v1/users", allUsersRouter);
app.use("/api/v1/messages", messageRouter);

// Socket.io
export const getReceiverSocketId = (receiverId) => {
	return userSocketMap[receiverId];
};

const userSocketMap = {}; // {userId: socketId}

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId != "undefined") userSocketMap[userId] = socket.id;

  // io.emit() is used to send events to all the connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on('typing', (data) => {
    const { sender, receiver } = data || {};
    const receiverSocketId = userSocketMap[receiver];
    if (receiverSocketId) {
      io.to(receiverSocketId).emit('typing', sender);
    }
  });

  socket.on('stop typing', (data) => {
    const { sender, receiver } = data || {};
    const receiverSocketId = userSocketMap[receiver];
    if (receiverSocketId) {
      io.to(receiverSocketId).emit('stop typing', sender);
    }
  });

  // socket.on() is used to listen to the events. can be used both on client and server side
  socket.on("disconnect", async() => {
    console.log("user disconnected", socket.id);
    await updateLastSeen(userId)
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

// Error Handler Middleware
app.use(errorHandler);

export default app;
