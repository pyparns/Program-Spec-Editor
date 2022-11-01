package th.co.cdgs.systemAnalyst;

import javax.enterprise.context.ApplicationScoped;

import io.quarkus.mongodb.panache.PanacheMongoRepository;

@ApplicationScoped
public class SystemAnalystRepository implements PanacheMongoRepository<SystemAnalyst> {

}
