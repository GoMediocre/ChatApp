const messageWindow = document.getElementById("messages");
var roomName;

var txt = document.getElementById("txtArea").value;

document.getElementById("txtArea").addEventListener("keydown", function(e) {
    if (e.keyCode == 13) {
        e.preventDefault();
        sendMesg();
    }
});

function sendMesg() {
    var msg = document.getElementById("txtArea").value;
    if (msg != "") {
        addMessageToWindow("self", msg);
        var msgObject = { room_name: roomName, message: msg };
        var jsonMessage = JSON.stringify(msgObject);
        socket.send(jsonMessage);
        console.log(msg);
        document.getElementById("txtArea").value = "";
    }
}

function addMessageToWindow(sender, message) {
    if (sender != "self") {
        var message = event.data;
        var messageJSON = JSON.parse(message);
        var mes = messageJSON.message;
        messageWindow.innerHTML += `<div class="messages receivedMessage"><p>${mes}</p></div>`;
    } else {
        messageWindow.innerHTML += `<div class="messages sentMessage"><p>${message}</p></div>`;
    }
    var msgs = document.getElementById("originalMessageArea");
    msgs.scrollTop = msgs.scrollHeight;
}

function updateConnectionStatus(statusid, room) {
    roomName = room;
    const status = document.getElementById("userStatus");

    if (statusid == 200) {
        status.innerHTML += `<p>Connected</p>`;
    } else {
        status.innerHTML += "<p>Waiting</p>"
    }
}

//-----------------------------------------------------Web socket starts here----------------------------------------------------//

var socket = new WebSocket("ws://localhost:8080/Chat-Application/action");

socket.onerror = function(event) {
    onError(event);
};

socket.onopen = function(event) {
    onOpen(event);
};

socket.onmessage = function(event) {
    onMessage(event);
};

function onMessage(event) {
    var message = event.data;
    var messageJSON = JSON.parse(message);

    if (messageJSON.type === "connection_status") {
        var status = messageJSON.connection_status;
        var roomName = " ";
        if (status == 200) {
            roomName = messageJSON.room_name;
        }
        updateConnectionStatus(status, roomName);
    } else {
        var status = messageJSON.message;
        addMessageToWindow(event.data);
    }
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