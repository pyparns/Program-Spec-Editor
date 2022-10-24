package th.co.cdgs.programspec;

import javax.ws.rs.core.MediaType;

import org.jboss.resteasy.reactive.PartType;
import org.jboss.resteasy.reactive.RestForm;

import org.jboss.resteasy.reactive.multipart.FileUpload;

public class FormData {
	@RestForm
    @PartType(MediaType.TEXT_PLAIN)
    private String description;

    @RestForm("file")
    private FileUpload file;

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public FileUpload getFile() {
		return file;
	}

	public void setFile(FileUpload file) {
		this.file = file;
	}
}
