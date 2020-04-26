package service;

import userAPI.UserAPI;
import userAPI.UserAPIImpl;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;


@Path("user")
public class UserService {

    private static UserAPI impl = new UserAPIImpl();
    @GET
    @Path("/data")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public static Response createUserData() {
       // impl.insertUserInfo(user);
        System.out.println("Hello World");
        return null;
    }
}
