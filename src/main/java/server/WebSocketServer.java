package server;

import org.json.JSONObject;

import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.ServerSocket;
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Queue;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.logging.Level;
import java.util.logging.Logger;

@ServerEndpoint("/action")
public class WebSocketServer {
      private static final Map<Integer, Session> clients = new ConcurrentHashMap<>();
      private static Queue<Integer> waitingQueue = new ArrayDeque<>();

      @OnMessage
      public void onMessage(String message, Session session) throws IOException {
            JSONObject messageJSON = new JSONObject(message);
            String room_name = messageJSON.getString("room_name");
            String users[] = room_name.split("#");

            for(String user: users) {
                  int user_id = Integer.parseInt(user);
                  if(user_id != Integer.parseInt(session.getId())) {
                        JSONObject peerMessageJSON = new JSONObject();
                        peerMessageJSON.put("type", "message");
                        peerMessageJSON.put("message", messageJSON.getString("message"));
                        clients.get(user_id).getAsyncRemote().sendText(peerMessageJSON.toString());
                  }
            }
      }

      @OnOpen
      public void onOpen (Session session) {
            Integer sessionID = Integer.parseInt(session.getId());
            clients.put(sessionID, session);
            connectUsers(sessionID);
      }

      private void connectUsers(int sessionID) {
            JSONObject responseJSON = new JSONObject();
            if(!waitingQueue.isEmpty()) {
                  Integer waitingMember = waitingQueue.poll();
                  String roomName = sessionID + "#" + waitingMember;
                  responseJSON.put("type", "connection_status");
                  responseJSON.put("room_name", roomName);
                  responseJSON.put("connection_status", 200);
                  clients.get(sessionID).getAsyncRemote().sendText(responseJSON.toString());
                  clients.get(waitingMember).getAsyncRemote().sendText(responseJSON.toString());
            } else {
                  waitingQueue.add(sessionID);
                  responseJSON.put("type", "connection_status");
                  responseJSON.put("connection_status", 203);
                  clients.get(sessionID).getAsyncRemote().sendText(responseJSON.toString());
            }
      }

      @OnClose
      public void onClose (Session session) {
            clients.remove(session);
            waitingQueue.remove(session.getId());
      }

      @OnError
      public void onError(Throwable error) {
            Logger.getLogger(WebSocketServer.class.getName()).log(Level.SEVERE, null, error);
      }
}
