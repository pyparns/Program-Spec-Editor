package th.co.cdgs.programspec;

import javax.enterprise.context.ApplicationScoped;

import io.quarkus.mongodb.panache.PanacheMongoRepository;

@ApplicationScoped
public class ProgramSpecRepository implements PanacheMongoRepository<ProgramSpec> {
	public ProgramSpec findByProjectName(String projectName) {
        return find("projectName", projectName).firstResult();
    }
}
