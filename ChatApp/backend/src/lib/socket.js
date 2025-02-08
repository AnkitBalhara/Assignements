import express from "express";
import { Server } from "socket.io";
import http from "http";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

// io.on("connection", (socket) => {
//   console.log("User Connected socket Id :-", socket.id);

//   socket.on("disconnect", (socket) => {
//     console.log("User Disconnected :-", socket.id);
//   });
// });

io.on("connection", (socket) => {
  console.log("User Connected socket Id :-", socket.id);

  socket.on("disconnect", () => {
    console.log("User Disconnected :-", socket.id);
  });
});


export { io, app, server };
