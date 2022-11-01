package th.co.cdgs.project;

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

@Path("/project")
@Consumes("application/json")
@Produces("application/json")
public class ProjectResource {
	@Inject
	ProjectRepository projectRepository;

	@GET
	public List<Project> getUsers() {
		return projectRepository.listAll();
	}
	
	@POST
    public List<Project> create(Project project) {
		projectRepository.persist(project);
		return projectRepository.listAll();
    }
	
	@PUT
    @Path("/{id}")
    public void update(String id, Project project) {
    	project.setId(new ObjectId(id));
    	projectRepository.update(project);
    }
	
	@DELETE
    @Path("/{id}")
    public void delete(String id) {
        Project project = projectRepository.findById(new ObjectId(id));
        projectRepository.delete(project);
    }
}
