package th.co.cdgs.program;

import java.util.List;

import org.bson.codecs.pojo.annotations.BsonProperty;

public class UiComponent {
	@BsonProperty("title")
	private String title;
	@BsonProperty("component_page")
	private List<ComponentPage> componentPage;
	
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public List<ComponentPage> getComponentPage() {
		return componentPage;
	}
	public void setComponentPage(List<ComponentPage> componentPage) {
		this.componentPage = componentPage;
	}
}
