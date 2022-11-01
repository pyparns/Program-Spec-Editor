package th.co.cdgs.systemAnalyst;

import org.bson.codecs.pojo.annotations.BsonProperty;
import org.bson.types.ObjectId;

import io.quarkus.mongodb.panache.common.MongoEntity;

@MongoEntity(collection = "system_analyst")
public class SystemAnalyst {
	private ObjectId id;
	
	@BsonProperty("system_analyst_name")
	private String systemAnalystName;

	public ObjectId getId() {
		return id;
	}

	public void setId(ObjectId id) {
		this.id = id;
	}

	public String getSystemAnalystName() {
		return systemAnalystName;
	}

	public void setSystemAnalystName(String systemAnalystName) {
		this.systemAnalystName = systemAnalystName;
	}
}
