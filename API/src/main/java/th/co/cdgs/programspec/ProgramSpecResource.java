package th.co.cdgs.programspec;

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

import org.acme.mongodb.panache.repository.Person;
import org.bson.types.ObjectId;


@Path("/api/programspec")
@Consumes("application/json")
@Produces("application/json")
public class ProgramSpecResource {
    @Inject
    ProgramSpecRepository programSpecRepository;
    
    @GET
    public List<ProgramSpec> list() {
        return programSpecRepository.listAll();
    }
    
    @GET
    @Path("/{id}")
    public ProgramSpec getByid(String id) {
    	return programSpecRepository.findById(new ObjectId(id));
    }
    
    @POST
    public Response create(ProgramSpec programSpec) {
        programSpecRepository.persist(programSpec);
        return Response.status(201).build();
    }
    
    @PUT
    @Path("/{id}")
    public void update(String id, ProgramSpec programSpec) {
    	programSpec.setId(new ObjectId(id));
    	if (programSpec.getProjectName() == null) {
    		programSpec.setProjectName("CDGS");
    	}
        programSpecRepository.update(programSpec);
    }
    
    @DELETE
    @Path("/{id}")
    public void delete(String id) {
        ProgramSpec person = programSpecRepository.findById(new ObjectId(id));
        programSpecRepository.delete(person);
    }
}
