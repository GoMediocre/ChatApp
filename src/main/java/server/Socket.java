package server;

import model.Room;
import org.json.JSONObject;
import queue.Queue;

import javax.websocket.*;
import java.io.IOException;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.logging.Level;
import java.util.logging.Logger;

public class Socket {

    private static final Map<String , Room> clients = new ConcurrentHashMap<>();
    private Queue queue = new Queue();
    @OnMessage
    public void onMessage(String message, Session session, String id) throws IOException {

        Room room = clients.get(id);
        Session from = room.getFrom();
        Session to = room.getTo();
         if (from != session)
             from.getAsyncRemote().sendText(message);
         else
             to.getAsyncRemote().sendText(message);
    }

    @OnOpen
    public void onOpen (Session session) {
        JSONObject responseJSON = new JSONObject();
        if (!queue.isEmpty()) {
            Room room = queue.deQueue().getRoom();
            room.setTo(session);
            clients.put(Integer.toString((int)(Math.random() * 50 + 1)), room);
            responseJSON.put("type", "connection_status");
            responseJSON.put("connection_status", 200);
            session.getAsyncRemote().sendText(responseJSON.toString());
            room.getFrom().getAsyncRemote().sendText(responseJSON.toString());
        } else {
            Room room = new Room();
            room.setFrom(session);
            queue.enQueue(room);
        }
    }

    @OnClose
    public void onClose (Session session) {
        clients.remove(session);
//        waitingQueue.remove(session.getId());
    }

    @OnError
    public void onError(Throwable error) {
        Logger.getLogger(WebSocketServer.class.getName()).log(Level.SEVERE, null, error);
    }
}
