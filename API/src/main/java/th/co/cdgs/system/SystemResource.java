package th.co.cdgs.system;

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

@Path("/system")
@Consumes("application/json")
@Produces("application/json")
public class SystemResource {
	@Inject
	SystemRepository systemRepository;

	@GET
	public List<System> getSystems() {
		return systemRepository.listAll();
	}

	@GET
	@Path("/{id}")
	public System getSystem(String id) {
		return systemRepository.findById(new ObjectId(id));
	}
	
	@POST
    public List<System> create(System system) {
		systemRepository.persist(system);
		return systemRepository.listAll();
    }
	
	@PUT
    @Path("/{id}")
    public void update(String id, System system) {
    	system.setId(new ObjectId(id));
    	systemRepository.update(system);
    }
	
	@DELETE
    @Path("/{id}")
    public void delete(String id) {
        System system = systemRepository.findById(new ObjectId(id));
        systemRepository.delete(system);
    }
}
