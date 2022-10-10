package th.co.cdgs.sheet;

import java.util.List;

import org.bson.codecs.pojo.annotations.BsonProperty;

import th.co.cdgs.service.Service;
import th.co.cdgs.ui.Ui;

public class Sheet {
	private String host;
	private String port;
	@BsonProperty("context_root")
	private String contextRoot;	
	@BsonProperty("er_diagram")
	private String erDiagram;
	@BsonProperty("class_diagram")
	private String classDiagram;
	private List<Service> services;
	private List<Ui> ui;
	
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
	public List<Service> getServices() {
		return services;
	}
	public void setServices(List<Service> services) {
		this.services = services;
	}
	public List<Ui> getUi() {
		return ui;
	}
	public void setUi(List<Ui> ui) {
		this.ui = ui;
	}
}
