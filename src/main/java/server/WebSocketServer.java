package server;

import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.*;
import java.util.logging.Level;
import java.util.logging.Logger;

@ServerEndpoint("/action/{gender}")
public class WebSocketServer {

      private static final Set<Session> users = Collections.synchronizedSet(new HashSet<Session>());
      private static final Map<String, String> map = new HashMap<>();

      /** For reference DB Connection*/
      //https://www.oracle.com/webfolder/technetwork/tutorials/obe/java/HomeWebsocket/WebsocketHome.html#

      /** Multiple Clint Communication */
      
      @OnMessage
      public void onMessage(String message, Session session)
              throws IOException {
    	  System.out.println("send message to client");
            synchronized(users){
                  // Iterate over the connected sessions
                  // and broadcast the received message
                  for(Session client : users){
                        if (!client.equals(session)){
                              String id = session.getId();

                              client.getBasicRemote().sendText(message);
                        }
                  }
            }
      }

      /** Single Client Only */
//      @OnMessage
//      public void onMessage(Session user,
//                            String message) {
//            if(message.trim().isEmpty())
//                  return;
//            try {
//                  user.getBasicRemote().sendText
//                          ("Received message "+count+": " + message);
//                  user.getBasicRemote().sendText
//                          ("Lucky number! "+new Random().nextInt(99));
//                  user.getBasicRemote().sendText
//                          ("-----------------------------------");
//            } catch (IOException ex) {
//
//            }
//            count++;
//      }

      @OnOpen
      public void onOpen (@PathParam("gender") String gender, Session user) {
            // Add user to the connected sessions set
    	  //ws://host/contextPath/websocket/[clientId].
    	  	System.out.println("I am on open");
    	  	System.out.println(gender);
            String id = user.getId();
//            user.getUserProperties().put("GENDER", gender);
//            user.getUserProperties().put("STATUS",  "NC");
            users.add(user);
//            searchPair(user);
      }

      private void searchPair(Session currentUser) {

            String currentUserGender = (String) currentUser.getUserProperties().get("GENDER");
            String currentUserStatus = (String) currentUser.getUserProperties().get("STATUS");
            for (Session user : users) {
                  String gender = (String) user.getUserProperties().get("GENDER");
                  String status = (String) user.getUserProperties().get("STATUS");
                  if (!currentUserGender.equals(gender) && currentUserStatus.equals(status)) {
                        //hear we find  two user :
                  }
            }
      }

      @OnClose
      public void onClose (Session session) {
            // Remove session from the connected sessions set
            users.remove(session);
      }

      @OnError
      public void onError(Throwable error) {
            Logger.getLogger(WebSocketServer.class.getName()).log(Level.SEVERE, null, error);
      }
}
