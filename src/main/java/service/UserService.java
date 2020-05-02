package service;

import userAPI.UserAPI;
import userAPI.UserAPIImpl;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import model.User;


@Path("/user")
public class UserService {
	
	/** Don't forget implement interface */
	private static UserAPI userApi = UserAPIImpl.getInstance();
	
	
    @POST
    @Path("/data")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createUserData(User user) {
    	System.out.println("I am service");
         userApi.insertUserInfo(user);
        return Response.ok("I am response").build();
    }
}
