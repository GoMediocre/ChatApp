package database;

import common.ConfigUtil;
import model.User;

import javax.ws.rs.core.Response;
import java.sql.*;
import java.util.Properties;

public class dbConnectionImpl implements UserDao {

    private static dbConnectionImpl daoImpl;
    private Connection connection = null;

    private dbConnectionImpl() {
        Properties properties = ConfigUtil.loadProperty();
        try {
            String driverClassName = properties.getProperty("mysql.CONNECTION_DRIVER");
            String url = properties.getProperty("mysql.CONNECTION_URL");
            String userName = properties.getProperty("mysql.username");
            String password = properties.getProperty("mysql.password");
            Class.forName(driverClassName);
            connection = DriverManager.getConnection(url, userName, password);
            System.out.println("-----------------"+url + " " + userName + " " + password);
        } catch (ClassNotFoundException | SQLException | NullPointerException ex) {
           // throw new RuntimeException(ex.getMessage());
            ex.printStackTrace();
        }
    }

    public static dbConnectionImpl getInstance() {
        if (daoImpl == null) {
            daoImpl = new dbConnectionImpl();
        }
        return daoImpl;
    }

    @Override
    public Response insertUser(User user) {
        String query = "INSERT INTO user(name, email, gender) VALUES (?, ?, ?)";
        ResultSet rs = null;
        try {
            PreparedStatement pstmt = connection.prepareStatement(query, Statement.RETURN_GENERATED_KEYS);
            pstmt.setString(1, user.getName());
            pstmt.setString(2, user.getEmail());
            pstmt.setString(3,  "MALE");
//            pstmt.setString(3,  user.getGender().toString());
            pstmt.executeUpdate();
            System.out.println("data updated");
            rs = pstmt.getGeneratedKeys();
//            int id = 0;
//                if (rs.next())
//             id = rs.getInt(1);
//            System.out.println("----"+id);
//            rs = checkWaitingUser();
//            if (rs == null) {
//                return Response.status(Response.Status.OK).entity("Failed").build();
//            }
//            setConnection(rs);
            return Response.status(Response.Status.OK).entity("Success").build();
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
        return null;
    }

    private void setConnection(ResultSet rs) throws SQLException {
        if (rs.next()) {
            
        }
    }


    private ResultSet checkWaitingUser() {
        String query = "SELECT * FROM userStatus WHERE status = 'W' ORDER BY time DESC";
        ResultSet rs = null;
        try {
            PreparedStatement pstmt = connection.prepareStatement(query);
            rs = pstmt.executeQuery();
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
        return rs;
    }

    private void insertRowUserStatus() {

    }

    @Override
    public void insertRow(String message) {

    }

    @Override
    public String getRow() {
        return null;
    }
}
