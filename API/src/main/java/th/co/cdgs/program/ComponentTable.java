package th.co.cdgs.program;

import org.bson.codecs.pojo.annotations.BsonProperty;

public class ComponentTable {
	@BsonProperty("id")
	private String id;
	@BsonProperty("label")
	private String label;
	@BsonProperty("attribute")
	private String attribute;
	@BsonProperty("property")
	private String property;
	@BsonProperty("event")
	private String event;
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getLabel() {
		return label;
	}
	public void setLabel(String label) {
		this.label = label;
	}
	public String getAttribute() {
		return attribute;
	}
	public void setAttribute(String attribute) {
		this.attribute = attribute;
	}
	public String getProperty() {
		return property;
	}
	public void setProperty(String property) {
		this.property = property;
	}
	public String getEvent() {
		return event;
	}
	public void setEvent(String event) {
		this.event = event;
	}
}
