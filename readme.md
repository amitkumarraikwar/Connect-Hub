# Video Call App

A real-time video calling application built using **Next.js**, **Socket.io**, and **WebRTC**.

## 🚀 Features
- Peer-to-peer video calling using **WebRTC**
- Real-time signaling using **Socket.io**
- Support for audio and video communication
- Simple and easy-to-use UI

## 🛠️ Installation

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/video-call-app.git
cd video-call-app
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a **.env.local** file in the root directory and add:
```env
REACT_APP_SERVER_URL=http://localhost:5000
```

### 4. Start the Backend Server
Ensure you have a backend server with Socket.io. If you haven't set it up yet, create a **server.js** file with the following content:
```js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("New user connected: ", socket.id);
  socket.emit("me", socket.id);

  socket.on("callUser", ({ from, to, signal }) => {
    io.to(to).emit("incomingCall", { from, signal });
  });

  socket.on("answerCall", ({ to, signal }) => {
    io.to(to).emit("callAccepted", { signal });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(5000, () => console.log("Server running on port 5000"));
```
Start the backend:
```bash
node server.js
```

### 5. Start the Frontend
```bash
npm run dev
```

## 📌 Usage
1. Open **http://localhost:3000** in two browser tabs or devices.
2. Click **Call User** and use a valid **user ID**.
3. Accept the call in the second tab/device.
4. Enjoy real-time video communication!

## 🛠️ Troubleshooting
### 1. WebSocket Connection Failed
**Error:**
```
WebSocket connection to 'ws://localhost:3000/socket.io/?EIO=4&transport=websocket' failed.
```
**Fix:** Ensure the frontend is pointing to the backend server (`http://localhost:5000`) instead of `localhost:3000`.

### 2. CORS Issues
If you see CORS errors, ensure your backend allows cross-origin requests.

### 3. No Video Stream
Ensure you have granted camera and microphone permissions in your browser.

## 🔗 Technologies Used
- **Next.js** – Frontend framework
- **Socket.io** – Real-time communication
- **WebRTC** – Peer-to-peer video calling
- **Express.js** – Backend server

## 📜 License
This project is open-source under the [MIT License](LICENSE).

## 💡 Future Enhancements
- Chat messaging feature
- Screen sharing
- Group video calls

---
🎮 Built with ❤️ by Amit Kumar Raikwar

