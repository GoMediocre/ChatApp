const express = require('express')
const path = require('path')
const { Server } = require('socket.io')
const redis = require('redis')
const client = redis.createClient()

const app = express()
app.use(express.static(path.join(__dirname, 'public')))
const port = process.env.PORT || 4000;
const server = app.listen(port, () => console.log("Server started at :" +  port))

client.on('connect', function() {
    console.log('Connection established with Redis Server at port 6379');
});

const clientMap = new Map();
const io = new Server(server);

io.on('connection', async (socket) => {
    await handleNewClientConnection(socket.id);

    socket.on('send', (data) => {
        const connectedWith = clientMap[socket.id];
        socket.to(connectedWith).emit("message", data);
    })

    socket.on('disconnect', async () => {
        console.log("Disconnecting socket : ", socket.id);
        const connectedWith = clientMap[socket.id];
        deleteFromQueue(socket.id);
        if (connectedWith !== undefined) {
            console.log("Socket Id: " + socket.id + " is connected with " + connectedWith);
            clientMap.delete(socket);
            clientMap.delete(connectedWith);
            await handleNewClientConnection(connectedWith);
        }
    })
})

async function handleNewClientConnection(socketId) {
    try {
        const isPending = await isAnyClientPendingToConnect();
        console.log("isPending", isPending);
        if (isPending) {
            await mapClients(socketId);
        } else {
            await queueClient(socketId);
        }
    } catch (err) {
        console.log("Error while connecting clients: ", err);
        queueClient(socketId);
    }
}

async function isAnyClientPendingToConnect() {
    return new Promise((resolve, reject) => {
        client.scard('clients', (err, len) => {
            console.log("Clients pending to connect:" + len);
            if (err) reject(err);
            resolve(len > 0);
        })
    })
}

async function mapClients(socketId) {
    console.log("Mapping client: ", socketId);
    client.spop('clients', (err, connectTo) => {
        if (err) {
            console.log(err);
            queueClient(socketId);
            return;
        }
        console.log("Popped client: " + connectTo);
        if (socketId === connectTo) {
            queueClient(socketId);
            return;
        }
        clientMap[socketId] = connectTo;
        clientMap[connectTo] = socketId;
        io.to(connectTo).emit('connectedStatus', true);
        io.to(socketId).emit('connectedStatus', true);
        return connectTo;
    })
}

async function queueClient(socketId) {
    console.log("Queueing client: " + socketId);
    client.sadd('clients', socketId, (err, reply) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log("Pushed " + reply);
        io.to(socketId).emit('connectedStatus', false);
    })
}

function deleteFromQueue(socketId) {
    console.log("Removing client " + socketId);
    client.srem('clients', socketId, (err, reply) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log("Removed client " + reply);
    })
}
