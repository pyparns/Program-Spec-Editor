package th.co.cdgs.programspec;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.bson.types.ObjectId;
import org.jboss.resteasy.reactive.MultipartForm;

import th.co.cdgs.program.Program;


@Path("/programspec")
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
    
    @POST
    @Path("/upload")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    public Response upload(@MultipartForm FormData formData) {
        System.out.println(">>>>");
        try {
            System.out.println(formData.getDescription());
            System.out.println("input  = " + formData.getFile().uploadedFile());
            System.out.println("inputFile = " + formData.getFile().fileName());
            
            System.out.println("<<<<");
            String located = "./src/main/resources/assets/specs/" + formData.getFile().fileName().toLowerCase(); // located File
            String statusSave = saveFile(Files.readAllBytes(formData.getFile().uploadedFile()), located);
            System.out.println(statusSave);
            return Response.ok(formData.getDescription()).status(200).build();
        } catch (Exception e) {
            e.printStackTrace();
            return Response.ok(e).status(500).build();
        }
    }
    
    public static String saveFile(byte[] bytes, String located) throws IOException {
        System.out.println("readfile");
        java.nio.file.Path path = Paths.get(located);
        Files.write(path, bytes);
        return "success";
    }
}
