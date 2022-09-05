package th.co.cdgs.image;

import java.util.List;

import org.bson.codecs.pojo.annotations.BsonProperty;
import org.bson.types.ObjectId;

import th.co.cdgs.action.Action;
import th.co.cdgs.component.Component;

public class Image {
	private ObjectId id;

	@BsonProperty("image_name")
	private String imageName;
	
	private List<Component> components;
	
	private List<Action> actions;

	public ObjectId getId() {
		return id;
	}

	public void setId(ObjectId id) {
		this.id = id;
	}

	public String getImageName() {
		return imageName;
	}

	public void setImageName(String imageName) {
		this.imageName = imageName;
	}

	public List<Component> getComponents() {
		return components;
	}

	public void setComponents(List<Component> components) {
		this.components = components;
	}

	public List<Action> getActions() {
		return actions;
	}

	public void setActions(List<Action> actions) {
		this.actions = actions;
	}
}
