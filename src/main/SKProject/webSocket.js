var socket = new WebSocket("ws://localhost:8080/Chat-Application/action");
// var webSocket = ('ws://echo.websocket.org ');
const messageWindow = document.getElementById("messages");

socket.onerror = function (event) {
  onError(event);
};

socket.onopen = function (event) {
  onOpen(event);
};

socket.onmessage = function (event) {
  onMessage(event);
};

function onMessage(event) {
    addMessageToWindow(`${event.data}`);
    
}

function addMessageToWindow(message) {
    messageWindow.innerHTML += `<div>${message}</div>`
}

function onOpen(event) {
  console.log("Hello World");
}

function onError(event) {
  alert("Error");
}

function send() {
  var txt = document.getElementById("txtid").value;
  console.log(txt);
  socket.send(txt);
  return false;
}

