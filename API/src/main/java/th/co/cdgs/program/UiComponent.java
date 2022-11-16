package th.co.cdgs.program;

import java.util.List;

import org.bson.codecs.pojo.annotations.BsonProperty;

public class UiComponent {
	@BsonProperty("title")
	private String title;
	@BsonProperty("component_page")
	private List<ComponentPage> componentPage;
}
