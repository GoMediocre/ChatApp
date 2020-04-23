package server;

import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.ServerSocket;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;

@ServerEndpoint("/action")
public class WebSocketServer {

      private static final Set<Session> clients = Collections.synchronizedSet(new HashSet<Session>());

      /** For reference DB Connection*/
      //https://www.oracle.com/webfolder/technetwork/tutorials/obe/java/HomeWebsocket/WebsocketHome.html#

      /** Multiple Clint Communication */
      
      @OnMessage
      public void onMessage(String message, Session session)
              throws IOException {
    	  System.out.println("Hellow World");
            synchronized(clients){
                  // Iterate over the connected sessions
                  // and broadcast the received message
                  for(Session client : clients){
                        if (!client.equals(session)){
                              client.getBasicRemote().sendText(message);
                        }
                  }
            }
      }

      /** Single Client Only */
//      @OnMessage
//      public void onMessage(Session session,
//                            String message) {
//            if(message.trim().isEmpty())
//                  return;
//            try {
//                  session.getBasicRemote().sendText
//                          ("Received message "+count+": " + message);
//                  session.getBasicRemote().sendText
//                          ("Lucky number! "+new Random().nextInt(99));
//                  session.getBasicRemote().sendText
//                          ("-----------------------------------");
//            } catch (IOException ex) {
//
//            }
//            count++;
//      }
      
      @OnOpen
      public void onOpen (Session session) {
            // Add session to the connected sessions set
            clients.add(session);
      }

      @OnClose
      public void onClose (Session session) {
            // Remove session from the connected sessions set
            clients.remove(session);
      }

      @OnError
      public void onError(Throwable error) {
            Logger.getLogger(WebSocketServer.class.getName()).log(Level.SEVERE, null, error);
      }
}
