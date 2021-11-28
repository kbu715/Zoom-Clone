/*

const messageList = document.querySelector('ul');
const nickForm = document.querySelector("#nick");
const messageForm = document.querySelector("#message");

const socket = new WebSocket(`ws://${window.location.host}`); //'localhost:3060'
// socket: connection to the server

function makeMessage(type, payload) {
  const msg = { type, payload };
  return JSON.stringify(msg);
}

function handleOpen() {
  console.log("Connected to Server ✅");
}

socket.addEventListener("open", handleOpen);

socket.addEventListener("message", (message) => {
  const li = document.createElement("li");
  li.innerText = message.data;
  messageList.append(li);
});

socket.addEventListener("close", () => {
  console.log("Disconnected from Server ❌");
});

function handlSubmit(event) {
  event.preventDefault();
  const input = messageForm.querySelector('input');
  const ls = localStorage.getItem("nickname");
  if(ls) {
    socket.send(makeMessage("nickname", ls));
  }
  socket.send(makeMessage("new_message", input.value));
  input.value = "";
}

function handleNickSubmit(event) {
  event.preventDefault();
  const input = nickForm.querySelector("input");
  localStorage.setItem("nickname", input.value);
  socket.send(makeMessage("nickname", input.value));
  input.value = "";
}

messageForm.addEventListener("submit", handlSubmit);
nickForm.addEventListener("submit", handleNickSubmit);

*/


const socket = io();