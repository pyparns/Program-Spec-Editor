package th.co.cdgs.programspec;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URISyntaxException;
import java.net.URL;
import java.nio.charset.StandardCharsets;
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
            String located = "./src/main/resources/assets/specs/" + fileName;
            
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
    @Path("/file/{fileName}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getFile(String fileName) {
    	String located = "./src/main/resources/assets/specs/" + fileName.toLowerCase();
    	java.nio.file.Path path = Paths.get(located);
    	System.out.println(path);
    	try {
			BufferedReader reader = Files.newBufferedReader(path);
			System.out.println(reader);
			return Response.ok().status(200).build();
		} catch (IOException e) {
			e.printStackTrace();
			return Response.ok(e).status(200).build();
		}
    	
    }
    
    @GET
    @Path("/test/file/{fileName}")
    @Produces(MediaType.APPLICATION_JSON)
    public File testGetFile(String fileName) throws IOException, URISyntaxException {
    	ProgramSpecResource app = new ProgramSpecResource();
    	String fileName1 = fileName.toLowerCase();
    	
    	InputStream is = app.getFileFromResourceAsStream(fileName1);
        printInputStream(is);
    	
    	File file = app.getFileFromResource(fileName1);
        printFile(file);
        
        return file;
    }
    private InputStream getFileFromResourceAsStream(String fileName) {
        ClassLoader classLoader = getClass().getClassLoader();
        InputStream inputStream = classLoader.getResourceAsStream(fileName);

        if (inputStream == null)
            throw new IllegalArgumentException("S file not found! " + fileName);
        else
            return inputStream;
    }
    private File getFileFromResource(String fileName) throws URISyntaxException{
        ClassLoader classLoader = getClass().getClassLoader();
        URL resource = classLoader.getResource(fileName);
        if (resource == null) {
            throw new IllegalArgumentException("file not found! " + fileName);
        } else {
            return new File(resource.toURI());
        }
    }
    private static void printInputStream(InputStream is) {
        try (InputStreamReader streamReader = new InputStreamReader(is, StandardCharsets.UTF_8); BufferedReader reader = new BufferedReader(streamReader)) {
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    // print a file
    private static void printFile(File file) {
        List<String> lines;
        try {
            lines = Files.readAllLines(file.toPath(), StandardCharsets.UTF_8);
            lines.forEach(System.out::println);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
