package th.co.cdgs.image;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

import javax.imageio.ImageIO;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

@Path("/api/image")
@Consumes("application/json")
@Produces("application/json")
public class ImageResource {
	@GET
	@Path("/{name}")
	public BufferedImage getImage(String name) {
		BufferedImage file = null;
		try {
			file = ImageIO.read(new File("/resources/assets/components/" + "image1.png"));
		} catch (IOException e) {
			e.printStackTrace();
		}
		return file;
	}
}
