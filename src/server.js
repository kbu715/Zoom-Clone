import http from "http";
// import { WebSocketServer } from 'ws';
import SocketIO from 'socket.io';
// import { Server } from "socket.io";
// import { instrument } from "@socket.io/admin-ui";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));


/*
const handleListen = () => console.log(`Listening on http://localhost:3060`);
// app.listen(3060, handleListen);

const httpServer = http.createServer(app);

// http 서버 위에 webSocket(ws) 서버를 만들 수 있도록 함
const wss = new WebSocketServer({ server: httpServer }); // This can handle http and ws protocol // This is not required

// function handleConnection(socket) { // socket: 연결된 브라우저와의 contact(연락)라인
//   console.log(socket);
// }


// fake DB
const sockets = [];

wss.on("connection", (socket) => {
  sockets.push(socket);
  socket["nickname"] = "Anonymous"; // default nickname
  console.log("Connected to Browser ✅");
  socket.on("close", () => console.log("Disconnected from the Browser ❌"));

  socket.on("message", (message) => {
    const parsedMessage = JSON.parse(message);
    switch (parsedMessage.type) {
      case "new_message":
        sockets.forEach((aSocket) => {
          aSocket.send(`${socket.nickname}: ${parsedMessage.payload}`);
        });
      case "nickname":
        socket["nickname"] = parsedMessage.payload;
      default:
        break;
    }
    // const messageToString = message.toString("utf-8");
    // sockets.forEach(aSocket => aSocket.send(messageToString));
  })
});


httpServer.listen(3060, handleListen);
*/


/*  SOCKET.IO  */

/*
const httpServer = http.createServer(app);
// const wsServer = SocketIO(httpServer);
const wsServer = new Server(httpServer, {
  cors: {
    origin: ["https://admin.socket.io"],
    credentials: true,
  },
});

instrument(wsServer, {
  auth: false,
});

function getPublicRooms() {
  const { sockets: { adapter: { sids, rooms } } } = wsServer;
  const publicRooms = [];
  rooms.forEach((_, key) => {
    if(sids.get(key) === undefined) { // sids: map // to separate private rooms from public rooms 
      publicRooms.push(key);
    }
  })
  return publicRooms;
}

function getCountRoom(roomName) {
  return wsServer.sockets.adapter.rooms.get(roomName)?.size;
}

wsServer.on("connection", (socket) => {
  socket["nickname"] = "anonymous";
  socket.onAny((event) => {
    console.log(`Socket Event: ${event}`);
  })
  socket.on("enter_room", (roomName, done) => {
    socket.join(roomName);
    done();
    socket.to(roomName).emit("welcome", socket.nickname, getCountRoom(roomName)); // emit to others except for me!
    wsServer.sockets.emit("room_change", getPublicRooms());
  });

  socket.on("disconnecting", () => {
    socket.rooms.forEach((room) => socket.to(room).emit("bye", socket.nickname, getCountRoom(room) - 1)); // don't leave room yet (right before leaving the room) so we minus 1
  })

  socket.on("disconnect", () => {
    wsServer.sockets.emit("room_change", getPublicRooms());
  });

  socket.on("new_message", (msg, room, done) => {
    socket.to(room).emit("new_message", `${socket.nickname}: ${msg}`);
    done(); // it runs on the client side
  })

  socket.on("nickname", nickname => socket["nickname"] = nickname);
});

const handleListen = () => console.log(`Listening on http://localhost:3000`);
httpServer.listen(3000, handleListen);

*/




// VIDEO CALL

const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer);


wsServer.on("connection", (socket) => {
  socket.on("join_room", (roomName) => {
    socket.join(roomName);
    socket.to(roomName).emit("welcome");
  });

  socket.on("offer", (offer, roomName) => {
    socket.to(roomName).emit("offer", offer);
  })

  socket.on("answer", (answer, roomName) => {
    socket.to(roomName).emit("answer", answer);
  })

  socket.on("ice", (ice, roomName) => {
    socket.to(roomName).emit("ice", ice);
  })
});


const handleListen = () => console.log(`Listening on http://localhost:3000`);
httpServer.listen(3000, handleListen);