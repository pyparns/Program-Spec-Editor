package th.co.cdgs.program;

import java.util.List;

import org.bson.codecs.pojo.annotations.BsonProperty;

public class ComponentPage {
	@BsonProperty("id")
	private String id;
	@BsonProperty("image")
	private String image;
	@BsonProperty("name")
	private String name;
	@BsonProperty("component_table")
	private List<ComponentTable> componentTable;
	@BsonProperty("action_table")
	private List<ActionTable> actionTable;
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public List<ComponentTable> getComponentTable() {
		return componentTable;
	}
	public void setComponentTable(List<ComponentTable> componentTable) {
		this.componentTable = componentTable;
	}
	public List<ActionTable> getActionTable() {
		return actionTable;
	}
	public void setActionTable(List<ActionTable> actionTable) {
		this.actionTable = actionTable;
	}
}
