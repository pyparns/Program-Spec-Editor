package th.co.cdgs.programspec;

import javax.enterprise.context.ApplicationScoped;

import io.quarkus.mongodb.panache.PanacheMongoRepository;

@ApplicationScoped
public class ProgramSpecRepository implements PanacheMongoRepository<ProgramSpec> {
	public ProgramSpec findByProgramId(String programId) {
        return find("programId", programId).firstResult();
    }
}
