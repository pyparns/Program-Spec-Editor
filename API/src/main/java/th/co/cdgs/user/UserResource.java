package th.co.cdgs.user;

import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;

import org.bson.types.ObjectId;

@Path("/api/user")
@Consumes("application/json")
@Produces("application/json")
public class UserResource {
	@Inject
    UserRepository userRepository;
	
	public String generateToken(String username, String password) {
		try {
			String secret = "spec@editor";
		    Algorithm algorithm = Algorithm.HMAC512(secret);
		    String token = JWT.create()
		        .withIssuer("auth0")
		        .withClaim("username", username)
		        .withClaim("password", password)
		        .sign(algorithm);
		    return token;
		} catch (JWTCreationException exception){
		    //Invalid Signing configuration / Couldn't convert Claims.
			return null;
		}
	}
	
	@GET
	public List<User> getUsers() {
		return userRepository.listAll();
	}
	
	@GET
	@Path("/{id}")
	public User getUserById(String id) {
		return userRepository.findById(new ObjectId(id));
	}
	
	@GET
	@Path("/{token}")
	public User getUserByToken(String token) {
		return userRepository.find("token", token).firstResult();
	}
	
	@POST
	@Path("/authentication")
	public User authentication(LoginForm loginForm) {
		System.out.println(loginForm.getUsername() + " : " + loginForm.getPassword());
		User user = userRepository.find("username", loginForm.getUsername()).firstResult();
		System.out.println(user.getPassword());
		if (loginForm.getPassword() != user.getPassword()) user = null;
		return user;
	}
	
	@POST
	@Path("/register")
    public Response create(User user) {
		String token = generateToken(user.getUsername(), user.getPassword());
		user.setToken(token);
        userRepository.persist(user);
        return Response.status(201).build();
    }
	
	@PUT
    @Path("/{id}")
    public void update(String id, User user) {
    	user.setId(new ObjectId(id));
        userRepository.update(user);
    }
	
	@DELETE
    @Path("/{id}")
    public void delete(String id) {
        User user = userRepository.findById(new ObjectId(id));
        userRepository.delete(user);
    }
}
