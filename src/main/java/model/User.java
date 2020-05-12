package model;

import javax.xml.bind.annotation.XmlRootElement;

import org.codehaus.jackson.annotate.JsonProperty;

@XmlRootElement
public class User {

	
    private String name;
	
    private String email;
	
    private String gender;
    
   
    public String getName() {
        return name;
    }

   
    public String getEmail() {
        return email;
    }

   
    public String getGender() {
        return gender;
    }

   
    public void setName(String name) {
        this.name = name;
    }

   
    public void setEmail(String email) {
        this.email = email;
    }

   
    public void setGender(String gender) {
        this.gender = gender;
    }
}
