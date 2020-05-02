package auth;

import java.io.IOException;
import java.util.Base64;
import java.util.StringTokenizer;

public class BasicAuthenticationHelper {
    public boolean authenticate(String authCredentials) {

        if (authCredentials == null) {
            return false;
        }

        String encodedUserPassword = authCredentials.replaceFirst("Basic" + " ", "");
        String usernameAndPassword = null;
        try {
            byte[] decodedBytes = Base64.getDecoder().decode(encodedUserPassword);
            usernameAndPassword = new String(decodedBytes, "UTF-8");
        } catch (IOException e) {
            e.printStackTrace();
        }

        StringTokenizer tokenizer = new StringTokenizer(usernameAndPassword, ":");
        String username = tokenizer.nextToken();
        String password = tokenizer.nextToken();

        boolean authenticationStatus = "goatrip".equals(username) && "goatrip".equals(password);
        return authenticationStatus;
    }
}