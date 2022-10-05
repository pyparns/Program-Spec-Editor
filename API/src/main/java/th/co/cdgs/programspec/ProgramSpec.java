package th.co.cdgs.programspec;

import java.util.List;

import org.bson.codecs.pojo.annotations.BsonProperty;
import org.bson.types.ObjectId;

import io.quarkus.mongodb.panache.common.MongoEntity;
import th.co.cdgs.program.Program;

@MongoEntity(collection = "program_spec")
public class ProgramSpec {
	
	private ObjectId id;
	private List<Program> programs;
	private Integer latest;
	@BsonProperty("acc_id")
	private String accId;
	
	public ObjectId getId() {
		return id;
	}
	public void setId(ObjectId id) {
		this.id = id;
	}
	public List<Program> getPrograms() {
		return programs;
	}
	public void setPrograms(List<Program> programs) {
		this.programs = programs;
	}
	public Integer getLatest() {
		return latest;
	}
	public void setLatest(Integer latest) {
		this.latest = latest;
	}
	public String getAccId() {
		return accId;
	}
	public void setAccId(String accId) {
		this.accId = accId;
	}
}
