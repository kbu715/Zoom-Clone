const messageList = document.querySelector('ul');
const messageForm = document.querySelector('form');

const socket = new WebSocket(`ws://${window.location.host}`); //'localhost:3060'
// socket: connection to the server

function handleOpen() {
  console.log("Connected to Server ✅");
}

socket.addEventListener("open", handleOpen);

socket.addEventListener("message", (message) => {
  console.log("New message: ", message.data);
});

socket.addEventListener("close", () => {
  console.log("Disconnected from Server ❌");
});

function handlSubmit(event) {
  event.preventDefault();
  const input = messageForm.querySelector('input');
  socket.send(input.value);
  input.value = "";
}

messageForm.addEventListener("submit", handlSubmit);