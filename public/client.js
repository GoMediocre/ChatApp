var socket = io();

const chatNameInput = document.getElementById('chat-name');
var chatMessagesList = document.getElementById('chat-messages-list');
const chatInputForm = document.getElementById('chat-input-form');
const chatInputMessage = document.getElementById('chat-input-message');

chatInputForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (chatInputMessage !== '') {
        sendMessage();
    }
});

function sendMessage(data) {
    const dataToServer = {
        name: chatNameInput.value,
        message: chatInputMessage.value
    }
    socket.emit('send', dataToServer);
    addMessageToUI(true, dataToServer);
    chatInputMessage.value = "";
}

socket.on('message', (data) => {
    addMessageToUI(false, data);
});

function addMessageToUI(isOwn, data) {
    var li = `<li id="message-right" class="${isOwn ? 'message-right': 'message-left'}">
                <p class="${isOwn ? 'sender-message': 'receiver-message'} messager-name">${isOwn ? 'You' : data.name}</p>
                <p class="message">${data.message}</p>
                </li>`;
    chatMessagesList.innerHTML += li;
}