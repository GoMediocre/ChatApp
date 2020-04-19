var websocket = new websocket("ws://localhost/url");
    websocket.onmessage = function processMessage(message) {
        var jsonData = JSON.parse(message.data)
    }
    //reference link -> https://www.youtube.com/watch?v=BikL52HYaZg
    function sendMessage() {
        websocket.send()
    }