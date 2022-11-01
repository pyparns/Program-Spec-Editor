package th.co.cdgs.project;

import javax.enterprise.context.ApplicationScoped;

import io.quarkus.mongodb.panache.PanacheMongoRepository;

@ApplicationScoped
public class ProjectRepository implements PanacheMongoRepository<Project> {

}
