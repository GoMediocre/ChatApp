package commen;

import model.Gender;
import model.User;
import userAPI.UserAPIImpl;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class ConfigUtil {

    public static void main(String[] args) {
        User user = new User();
        user.setName("Jeyasingh");
        user.setEmail("jsinghalex@gmail.com");
        user.setGender(Gender.MALE);
        //UserAPIImpl obj = new UserAPIImpl();
//        obj.insertUserInfo(user);
    }

    public static Properties loadProperty() {
        Properties properties = new Properties();
//        ClassLoader classLoader = getClass().getClassLoader();
//        File file = new File(classLoader.getResource(fileName).getFile());
        try (InputStream input = ConfigUtil.class.getClassLoader().getResourceAsStream("config/dbconfig.properties")) {
            properties.load(input);
        } catch (IOException ex) {
            ex.printStackTrace();;
        }
        return properties;
    }
}
