package th.co.cdgs.ui;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

import javax.imageio.ImageIO;
import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.jboss.resteasy.reactive.MultipartForm;
import org.jboss.resteasy.reactive.RestForm;
import org.jboss.resteasy.reactive.multipart.FileUpload;


@Path("/api/image")
@Consumes("application/json")
@Produces("application/json")
public class UiResource {
	
	@GET
    @Produces(MediaType.MULTIPART_FORM_DATA)
    public DownloadFormData getFile() {
		DownloadFormData df = new DownloadFormData();
		df.setName("image1.png");
		df.setFile(new File("image1.png"));
        return new DownloadFormData();
    }
	
//	@POST
//    @Produces(MediaType.APPLICATION_JSON)
//    @Consumes(MediaType.MULTIPART_FORM_DATA)
//    @Path("form")
//    public String form(@MultipartForm FormData formData) {
//        // return something
//    }
}
