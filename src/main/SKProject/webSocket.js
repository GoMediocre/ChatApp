
        var socket = new WebSocket("ws://localhost:8080/action");
        // var webSocket = ('ws://echo.websocket.org ');

        socket.onerror = function(event) {
            onError(event)
        };

        socket.onopen = function(event) {
            onOpen(event)
        };

        socket.onmessage = function(event) {
            onMessage(event)
        };

        function onMessage(event) {
            // document.getElementById('messages').innerHTML 
            // += '<br />Received message: ' + event.data;
        }

        function onOpen(event) {
            console.log("Hello World")
            // document.getElementById('messages').innerHTML 
            // = 'Connection established';
        }

        function onError(event) {
            alert("Error");
            //alert(event.data);
        }

        function send() {
            var txt = document.getElementById('txtid').value;
            console.log(txt);
            socket.send(txt);
            return false;
        }