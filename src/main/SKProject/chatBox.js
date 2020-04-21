    var socket = new WebSocket("ws://localhost/url");

    websocket.onopen = function() {

    }

    websocket.onmessage = function processMessage(message) {
        var jsonData = JSON.parse(message.data)
    }

    websocket.onclose = function() {

    }
    
    function sendMessage() {
        var message = document.getElementById("sbmt").value;
        sendServer(message);
    }

    //reference link -> https://www.youtube.com/watch?v=BikL52HYaZg
    function sendServer(message) {
        console.log("Hello World");
        websocket.send(message);
    }