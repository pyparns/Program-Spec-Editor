package th.co.cdgs.program;

import org.bson.codecs.pojo.annotations.BsonProperty;

public class ServiceTable {
	@BsonProperty("id")
	private String id;
	@BsonProperty("service")
	private String service;
	@BsonProperty("method")
	private String methid;
	@BsonProperty("action")
	private String action;
	@BsonProperty("detail")
	private DetailServiceTable detail;
}
