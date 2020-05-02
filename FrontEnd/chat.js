const messageWindow = document.getElementById("messages");

var txt = document.getElementById("txtArea").value;

document.getElementById("txtArea").addEventListener("keydown", function (e) {
  if (e.keyCode == 13) {
    e.preventDefault();
    sendMesg();
  }
});

function sendMesg() {
  var msg = document.getElementById("txtArea").value;
  addMessageToWindow("self", msg);
  socket.send(msg);
  document.getElementById("txtArea").value = "";
}

function addMessageToWindow(sender, message) {
  if (sender == "receive") {
    messageWindow.innerHTML += `<div class="messages receivedMessage"><p>${message}</p></div>`;
  } else {
    messageWindow.innerHTML += `<div class="messages sentMessage"><p>${message}</p></div>`;
  }
  var msgs = document.getElementById("originalMessageArea");
  msgs.scrollTop = msgs.scrollHeight;
}

//-----------------------------------------------------Web socket starts here----------------------------------------------------//

var socket = new WebSocket("ws://localhost:8080/Chat-Application/action");

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
  addMessageToWindow("receive", `${event.data}`);
}

function onOpen(event) {
  console.log("Hello World");
}

function onError(event) {
  alert("Error");
}

function sendMessage() {
  sendMesg();
}
