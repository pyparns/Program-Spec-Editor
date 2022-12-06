package th.co.cdgs.user;

import java.util.List;

import org.bson.codecs.pojo.annotations.BsonProperty;
import org.bson.types.ObjectId;

import io.quarkus.mongodb.panache.common.MongoEntity;

@MongoEntity(collection = "account")
public class User {
	private ObjectId id;
	
	@BsonProperty("first_name")
	private String firstName;
	
	@BsonProperty("last_name")
	private String lastName;
	
	private String email;
	
	private String username;
	
	private String password;
	
	private String token;

	private List<String> bookmark;

	public ObjectId getId() {
		return id;
	}

	public void setId(ObjectId id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}
	
	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public List<String> getBookmark() {
		return bookmark;
	}

	public void setBookmark(List<String> bookmark) {
		this.bookmark = bookmark;
	}
	
}
