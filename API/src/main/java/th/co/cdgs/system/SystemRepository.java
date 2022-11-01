package th.co.cdgs.system;

import javax.enterprise.context.ApplicationScoped;

import io.quarkus.mongodb.panache.PanacheMongoRepository;

@ApplicationScoped
public class SystemRepository implements PanacheMongoRepository<System> {

}
