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

const welcome = document.getElementById('welcome');
const form = welcome.querySelector('#welcome form');
const room = document.getElementById("room");

room.hidden = true;

let roomName;

function addMessage(message) { // add to List
  const ul = room.querySelector("ul");
  const li = document.createElement("li");

  li.innerText = message;
  ul.appendChild(li);
}

function handleMessageSubmit(event) {
  event.preventDefault();
  const input = room.querySelector("#msg input");
  const value = input.value;
  socket.emit("new_message", value, roomName, () => {
    addMessage(`You: ${value}`)
  })
  input.value = "";
}

function handleSubmit(event) {
  event.preventDefault();
  const nickInput = form.querySelector("[name='nick']");
  const roomInput = form.querySelector("[name='room']");
  const nickInputValue = nickInput.value;
  const roomInputValue = roomInput.value;

  if(nickInputValue && roomInputValue) {
    socket.emit("nickname", nickInputValue);  
    socket.emit("enter_room", roomInputValue, showRoom);
  }
  roomName = roomInputValue;
  nickInput.value = "";
  roomInput.value = "";
}

function showRoom() {
  welcome.hidden = true;
  room.hidden = false;
  const h3 = room.querySelector("h3");
  h3.innerText = `Room ${roomName}`;

  const msgForm = room.querySelector("#msg");
  msgForm.addEventListener("submit", handleMessageSubmit);
}



form.addEventListener("submit", handleSubmit);




socket.on("welcome", (user) => {
  addMessage(`${user} joined!!!`);
})

socket.on("bye", (left) => {
  addMessage(`${left} left ㅠㅠ`);
})

socket.on("new_message", addMessage) // addMessage === (msg) => { addMessage(msg) }