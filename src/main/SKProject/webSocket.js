
        var webSocket =  new WebSocket('ws://localhost:8080/chatApp/action');

        webSocket.onerror = function(event) {
            onError(event)
        };

        webSocket.onopen = function(event) {
            onOpen(event)
        };

        webSocket.onmessage = function(event) {
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
            webSocket.send(txt);
            return false;
        }