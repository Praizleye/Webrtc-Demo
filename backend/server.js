const express = require("express");
const app = express();
const http = require("http").createServer(app);
const cors = require("cors");

const io = require("socket.io")(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());

const PORT = process.env.PORT || 3567;

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
const nameToSocketMapping = new Map();
const socketToNameMap = new Map();
io.on("connection", (socket) => {
  socket.on("join-room", ({ roomId, name }) => {
    socket.join(roomId);
    let userId = socket.id;

    // this enables me to create a new map and push this values to them so we get a map like this
    // name => a socket.id and
    // socket.id => name
    // you can uncomment out the clg to see the values generated.
    nameToSocketMapping.set(name, userId);
    socketToNameMap.set(userId, name);

    // console.log(nameToSocketMapping.set(name, userId));
    // console.log(socketToNameMap.set(userId, name));

    socket.emit("user-joined", { roomId, name });
    socket.broadcast
      .to(roomId)
      .emit("user-connected", { name, userId, roomId });
    console.log(`${name} and uniqueId ${userId} joined room with id ${roomId}`);
  });

  socket.on("broadcasting-channel", ({ name, offer }) => {
    //  Here we get the name which has been chained and passed to the new map function above
    const fromName = socketToNameMap.get(socket.id);
    const fromId = nameToSocketMapping.get(name);
    console.log("name", fromName);
    console.log("id", name);
    socket.to(fromId).emit("incoming-broadcast", { from: fromName, offer });
  });

  socket.on("accepted-broadcast-invite", ({ from, responseAnswer }) => {
    const socketId = nameToSocketMapping.get(from);
    console.log("socket to", socketId);
    socket.to(socketId).emit("accepted-broadcast", { responseAnswer });
  });
});

http.listen(PORT, () => {
  console.log(`listening on  ${PORT}`);
});

// console.log(roomUsers);
// roomUsers.forEach((value, key) => {
//   console.log(`${key},${value}`);
//   socket.broadcast
//     .to(roomId)
//     .emit("user-connected", { name: key, userId: value });
// });
