const messageWindow = document.getElementById("messages");

var txt = document.getElementById("txtArea").value;

document.getElementById("txtArea").addEventListener("keydown", function (e) {
  if (e.keyCode == 13) {
    e.preventDefault();
    var msg = document.getElementById("txtArea").value;
    addMessageToWindow("self", msg);
    document.getElementById("txtArea").value = "";
  }
});

let i = 0;
function addMessageToWindow(sender, message) {
  console.log(i % 2);
  if (i % 2 == 0) {
    messageWindow.innerHTML += `<div class="messages sentMessage"><p>${message}</p></div>`;
  } else {
    messageWindow.innerHTML += `<div class="messages receivedMessage"><p>${message}</p></div>`;
  }
  var msgs = document.getElementById("originalMessageArea");
  msgs.scrollTop = msgs.scrollHeight;
  i++;
}

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
