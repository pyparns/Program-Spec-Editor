package th.co.cdgs.program;

import java.time.LocalDateTime;

import org.bson.codecs.pojo.annotations.BsonProperty;

public class Program {
	@BsonProperty("program_id")
	private String programId;
	@BsonProperty("program_name")
	private String programName;
	@BsonProperty("project_id")
	private String projectId;
	@BsonProperty("system_id")
	private String systemId;
	@BsonProperty("system_analyst_id")
	private String systemAnalystId;
	@BsonProperty("status")
	private String status;
	@BsonProperty("version")
	private Integer version;
	@BsonProperty("date")
	private LocalDateTime date;
	@BsonProperty("sheet")
	private String sheet;
	
	public String getProgramId() {
		return programId;
	}
	public void setProgramId(String programId) {
		this.programId = programId;
	}
	public String getProgramName() {
		return programName;
	}
	public void setProgramName(String programName) {
		this.programName = programName;
	}
	public String getProjectId() {
		return projectId;
	}
	public void setProjectId(String projectId) {
		this.projectId = projectId;
	}
	public String getSystemId() {
		return systemId;
	}
	public void setSystemId(String systemId) {
		this.systemId = systemId;
	}
	public String getSystemAnalystId() {
		return systemAnalystId;
	}
	public void setSystemAnalystId(String systemAnalystId) {
		this.systemAnalystId = systemAnalystId;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public Integer getVersion() {
		return version;
	}
	public void setVersion(Integer version) {
		this.version = version;
	}
	public LocalDateTime getDate() {
		return date;
	}
	public void setDate(LocalDateTime date) {
		this.date = date;
	}
	public String getSheet() {
		return sheet;
	}
	public void setSheet(String sheet) {
		this.sheet = sheet;
	}
}
