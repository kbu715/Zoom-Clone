import http from "http";
import { WebSocketServer } from 'ws';
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3060`);
// app.listen(3060, handleListen);

const httpServer = http.createServer(app);

// http 서버 위에 webSocket(ws) 서버를 만들 수 있도록 함
const wss = new WebSocketServer({ server: httpServer }); // This can handle http and ws protocol // This is not required

httpServer.listen(3060, handleListen);