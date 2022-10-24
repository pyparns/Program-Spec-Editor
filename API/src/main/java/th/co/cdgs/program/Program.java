package th.co.cdgs.program;

import java.time.LocalDateTime;

import org.bson.codecs.pojo.annotations.BsonProperty;

public class Program {
	@BsonProperty("project_name")
	private String projectName;	
	@BsonProperty("program_id")
	private String programId;
	@BsonProperty("program_name")
	private String programName;
	@BsonProperty("system_work_id")
	private String systemWorkId;
	@BsonProperty("system_work_name")
	private String systemWorkName;
	@BsonProperty("system_work_designer")
	private String systemWorkDesigner;
	@BsonProperty("status")
	private String status;
	@BsonProperty("version")
	private Integer version;
	@BsonProperty("date")
	private LocalDateTime date;
	@BsonProperty("sheet")
	private String sheet;
	
	public String getProjectName() {
		return projectName;
	}
	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}
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
	public String getSystemWorkId() {
		return systemWorkId;
	}
	public void setSystemWorkId(String systemWorkId) {
		this.systemWorkId = systemWorkId;
	}
	public String getSystemWorkName() {
		return systemWorkName;
	}
	public void setSystemWorkName(String systemWorkName) {
		this.systemWorkName = systemWorkName;
	}
	public String getSystemWorkDesigner() {
		return systemWorkDesigner;
	}
	public void setSystemWorkDesigner(String systemWorkDesigner) {
		this.systemWorkDesigner = systemWorkDesigner;
	}
	public String getSheet() {
		return sheet;
	}
	public void setSheet(String sheet) {
		this.sheet = sheet;
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
}
