package userAPI;

import database.UserDao;
import database.dbConnectionImpl;
import model.User;


//We add extra details :-
	
public class UserAPIImpl implements UserAPI {

	private static UserAPIImpl userApiImpl;
//	private static UserDao userDao = dbConnectionImpl.getInstance();
	
	private UserAPIImpl() {
		
	}
	
	public static UserAPIImpl getInstance() {
		if (userApiImpl == null) {
			userApiImpl = new UserAPIImpl();
		}
		return userApiImpl;
	}

    @Override
    public void insertUserInfo(User user) {
        user.setName(encryption(user.getName()));
        user.setEmail(encryption(user.getEmail()));
        dbConnectionImpl.getInstance().insertUser(user);
    }

    @Override
    public void insertMessage() {
        dbConnectionImpl.getInstance().insertRow("");
    }

    @Override
    public String getMessage() {
        dbConnectionImpl.getInstance().getRow();
        return null;
    }

    private String encryption(String str) {
    	System.out.println(str);
        String encryptedStr = "";
        char s = 0;
        for (int i = 0; i < str.length(); ++i) {
            s = (char) (str.charAt(i) + 2);
            encryptedStr += s;
        }
        return encryptedStr;
    }

}
