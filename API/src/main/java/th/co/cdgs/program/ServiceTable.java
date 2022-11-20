package th.co.cdgs.program;

import org.bson.codecs.pojo.annotations.BsonProperty;

public class ServiceTable {
	@BsonProperty("id")
	private String id;
	@BsonProperty("service")
	private String service;
	@BsonProperty("method")
	private String method;
	@BsonProperty("action")
	private String action;
	@BsonProperty("detail")
	private DetailServiceTable detail;
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getService() {
		return service;
	}
	public void setService(String service) {
		this.service = service;
	}
	public String getMethod() {
		return method;
	}
	public void setMethod(String method) {
		this.method = method;
	}
	public String getAction() {
		return action;
	}
	public void setAction(String action) {
		this.action = action;
	}
	public DetailServiceTable getDetail() {
		return detail;
	}
	public void setDetail(DetailServiceTable detail) {
		this.detail = detail;
	}
}
