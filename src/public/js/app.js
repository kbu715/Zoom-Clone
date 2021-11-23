const socket = new WebSocket(`ws://${window.location.host}`); //'localhost:3060'
// socket: connection to the server


socket.addEventListener("message", (message) => {
  console.log("New message: ", message.data);
});

socket.addEventListener("close", () => {
  console.log("Disconnected from Server ❌");
});

setTimeout(() => {
  socket.send("Hello from the Browser!!!");
}, 10000);