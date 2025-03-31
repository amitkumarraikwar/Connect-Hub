import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { createServer } from "http";
import { Server } from "socket.io";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

// Load environment variables
dotenv.config();

// Initialize Express App
const app = express();
const httpServer = createServer(app); // Create an HTTP server
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// WebRTC Signaling with Socket.io
io.on("connection", (socket) => {
  console.log(`New client connected: ${socket.id}`);

  // Handle Call Request
  socket.on("callUser", ({ from, to, signal }) => {
    io.to(to).emit("incomingCall", { from, signal });
  });

  // Answer Call
  socket.on("answerCall", ({ to, signal }) => {
    io.to(to).emit("callAccepted", { signal });
  });

  // Handle Disconnection
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Connect to MongoDB and Start Server
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () =>
  console.log(`🔥 Server running on http://localhost:${PORT}`)
);
