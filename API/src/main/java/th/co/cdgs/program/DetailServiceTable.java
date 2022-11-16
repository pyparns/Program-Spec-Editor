package th.co.cdgs.program;

import org.bson.codecs.pojo.annotations.BsonProperty;

public class DetailServiceTable {
	@BsonProperty("title")
	private String title;
	@BsonProperty("method_name")
	private String methodName;
	@BsonProperty("input_parameter")
	private String inputParameter;
	@BsonProperty("example_response")
	private String exampleResponse;
	@BsonProperty("description")
	private String description;
	
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getMethodName() {
		return methodName;
	}
	public void setMethodName(String methodName) {
		this.methodName = methodName;
	}
	public String getInputParameter() {
		return inputParameter;
	}
	public void setInputParameter(String inputParameter) {
		this.inputParameter = inputParameter;
	}
	public String getExampleResponse() {
		return exampleResponse;
	}
	public void setExampleResponse(String exampleResponse) {
		this.exampleResponse = exampleResponse;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
}
