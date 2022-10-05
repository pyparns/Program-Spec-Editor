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

import org.bson.types.ObjectId;

import th.co.cdgs.program.Program;


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
    public void update(String id, Program program) {
    	ProgramSpec spec = programSpecRepository.findById(new ObjectId(id));
    	spec.setLatest(spec.getLatest() + 1);
    	spec.getPrograms().add(program);
        programSpecRepository.update(spec);
    }
    
    @DELETE
    @Path("/{id}")
    public void delete(String id) {
        ProgramSpec spec = programSpecRepository.findById(new ObjectId(id));
        programSpecRepository.delete(spec);
    }
}
