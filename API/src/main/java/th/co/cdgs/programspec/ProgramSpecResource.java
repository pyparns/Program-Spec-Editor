package th.co.cdgs.programspec;

import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
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
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.StreamingOutput;

import org.bson.types.ObjectId;
import org.jboss.resteasy.reactive.MultipartForm;
import org.jboss.resteasy.reactive.multipart.FileUpload;

import th.co.cdgs.program.Program;
import th.co.cdgs.user.FullNameResponse;


@Path("/programspec")
@Consumes("application/json")
@Produces("application/json")
public class ProgramSpecResource {
    @Inject
    ProgramSpecRepository programSpecRepository;
    
    // Save file
    public static String saveFile(byte[] bytes, java.nio.file.Path path) throws IOException {
        Files.write(path, bytes);
        return "success";
    }
     
    @GET
    public List<ProgramSpec> list() {
        return programSpecRepository.listAll();
    }
    
    @GET
    @Path("/{id}")
    public ProgramSpec getByid(String id) {
    	return programSpecRepository.findById(new ObjectId(id));
    }

    @GET
    @Path("/account/{accId}")
    public List<ProgramSpec> getByAccId(String accId) {
        return programSpecRepository.list("accId", accId);
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
        try {
        	String fileName = formData.getFile().fileName().toLowerCase();
        	String root = System.getProperty("user.home") + "/Desktop/ProgramSpecFile/";
        	String located = root + fileName;
        	
        	File theDir = new File(root);
        	if (!theDir.exists()){
        	    theDir.mkdirs();
        	}
            
            Integer count = 0;
            String type = located.substring(located.length() - 4);
            java.nio.file.Path path = Paths.get(located);
            while (Files.exists(path) && !Files.isDirectory(path))
                path = Paths.get(located.substring(0, located.length()-4) + " (" + ++count + ")" + type);
            
            String statusSave = saveFile(Files.readAllBytes(formData.getFile().uploadedFile()), path);
            if (count > 0) fileName = fileName.substring(0, fileName.length()-4) + " (" + count + ")" + type;
            System.out.println(statusSave);
            return Response.ok(fileName).status(200).build();
        } catch (Exception e) {
            e.printStackTrace();
            return Response.ok(e).status(500).build();
        }
    }
    
    @GET
    @Path("/file/{filePath}")
    public Response getFile(String filePath) throws Exception {
//    	InputStream is = getClass().getClassLoader().getResourceAsStream("untitled1.png");
//    	System.out.println("---- 1 ----");
//    	System.out.println(is);
//
//    	OutputStream outputStream = null;
//    	try {
//    		
//    	File file = new File("C:/Users/piyap/Pictures/add-program-page.png");
//    	outputStream = new FileOutputStream(file);
//    	
//    	int read = 0;
//        byte[] bytes = new byte[1024];
//        while ((read = is.read(bytes)) != -1) {
//            outputStream.write(bytes, 0, read);
//        }
//    	} finally {
//    		outputStream.close();    		
//    	}
    	
//    	System.out.println("---- 2 ----");
//    	// o
//    	String located = "./src/main/resources/assets/specs/" + filePath.toLowerCase();
//    	java.nio.file.Path path = Paths.get(located);
//    	System.out.println(path);
//    	try {
//			BufferedReader reader = Files.newBufferedReader(path);
//			System.out.println(reader);
//			return Response.ok().status(200).build();
//		} catch (IOException e) {
//			e.printStackTrace();
//			return Response.ok(e).status(200).build();
//		}
    	
//    	return Response.ok(is, MediaType.APPLICATION_OCTET_STREAM)
//    		      .build();
    	
    	String folder = System.getProperty("user.home") + "/Desktop/ProgramSpecFile/";
    	
    	final java.nio.file.Path file = Paths.get(folder + filePath);
    	System.out.println(file);
    	
		if (Files.exists(file)) {
			System.out.println("inif");
			final StreamingOutput so = (OutputStream output) -> Files.copy(file, output);
			System.out.println(so);
			return Response.ok(so).header(HttpHeaders.CONTENT_TYPE, "image/png")
					.header(HttpHeaders.CONTENT_DISPOSITION, filePath).build();
		} else {
			System.out.println("inelse");
			return Response.noContent().build();			
		}
    }
}
