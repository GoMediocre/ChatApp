package server;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.ServerSocket;
import java.net.Socket;

public class SocSocket {

      ServerSocket ss = null;
      private int port = 8080;

      public void gerUserInput() throws IOException {
          ss = new ServerSocket(port);
          Socket s = ss.accept();
          BufferedReader br = new BufferedReader(new InputStreamReader(s.getInputStream()));
            String str = br.readLine();
      }
}
