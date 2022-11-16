package th.co.cdgs.program;

import java.util.List;

import org.bson.codecs.pojo.annotations.BsonProperty;

public class ServiceComponent {
	@BsonProperty("title")
	private String title;
	@BsonProperty("host")
	private String host;
	@BsonProperty("port")
	private String port;
	@BsonProperty("context_root")
	private String contextRoot;
	@BsonProperty("er_diagram")
	private String erDiagram;
	@BsonProperty("class_diagram")
	private String classDiagram;
	@BsonProperty("services")
	private List<ServiceTable> services;
	
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getHost() {
		return host;
	}
	public void setHost(String host) {
		this.host = host;
	}
	public String getPort() {
		return port;
	}
	public void setPort(String port) {
		this.port = port;
	}
	public String getContextRoot() {
		return contextRoot;
	}
	public void setContextRoot(String contextRoot) {
		this.contextRoot = contextRoot;
	}
	public String getErDiagram() {
		return erDiagram;
	}
	public void setErDiagram(String erDiagram) {
		this.erDiagram = erDiagram;
	}
	public String getClassDiagram() {
		return classDiagram;
	}
	public void setClassDiagram(String classDiagram) {
		this.classDiagram = classDiagram;
	}
	public List<ServiceTable> getServices() {
		return services;
	}
	public void setServices(List<ServiceTable> services) {
		this.services = services;
	}
}
