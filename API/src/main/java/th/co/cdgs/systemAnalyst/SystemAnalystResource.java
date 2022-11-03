package th.co.cdgs.systemAnalyst;

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

import org.bson.types.ObjectId;

@Path("/systemanalyst")
@Consumes("application/json")
@Produces("application/json")
public class SystemAnalystResource {
	@Inject
	SystemAnalystRepository systemAnalystRepository;

	@GET
	public List<SystemAnalyst> getSystemAnalysts() {
		return systemAnalystRepository.listAll();
	}

	@GET
	@Path("/{id}")
	public SystemAnalyst getSystemAnalyst(String id) {
		return systemAnalystRepository.findById(new ObjectId(id));
	}
	
	@POST
    public List<SystemAnalyst> create(SystemAnalyst analyst) {
		systemAnalystRepository.persist(analyst);
		return systemAnalystRepository.listAll();
    }
	
	@PUT
    @Path("/{id}")
    public void update(String id, SystemAnalyst analyst) {
		analyst.setId(new ObjectId(id));
    	systemAnalystRepository.update(analyst);
    }
	
	@DELETE
    @Path("/{id}")
    public void delete(String id) {
        SystemAnalyst analyst = systemAnalystRepository.findById(new ObjectId(id));
        systemAnalystRepository.delete(analyst);
    }
}
