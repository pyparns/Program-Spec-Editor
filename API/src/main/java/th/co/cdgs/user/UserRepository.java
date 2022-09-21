package th.co.cdgs.user;

import java.util.List;

import javax.enterprise.context.ApplicationScoped;

import io.quarkus.mongodb.panache.PanacheMongoRepository;

@ApplicationScoped
public class UserRepository implements PanacheMongoRepository<User> {

}
