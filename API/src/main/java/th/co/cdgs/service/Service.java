package th.co.cdgs.service;

import org.bson.codecs.pojo.annotations.BsonProperty;

public class Service {
	private String service;
	private String method;
	private String action;
	@BsonProperty("method_name")
	private String methodName;
	@BsonProperty("input_parameter")
	private String inputParameter;
	@BsonProperty("example_response")
	private String exampleResponse;
	private String description;
	
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
