package th.co.cdgs.program;

import org.bson.codecs.pojo.annotations.BsonProperty;

public class ActionTable {
	@BsonProperty("id")
	private String id;
	@BsonProperty("action")
	private String action;
	@BsonProperty("description")
	private String description;
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getAction() {
		return action;
	}
	public void setAction(String action) {
		this.action = action;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
}
