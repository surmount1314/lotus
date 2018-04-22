package com.lotus.learn.sec.entity;

import java.sql.Timestamp;

/**
 * CoreProcProcessDefinition entity. @author MyEclipse Persistence Tools
 */

public class CoreProcProcessDefinition implements java.io.Serializable {

	// Fields

	private String processDefinitionId;
	private String processName;
	private String processKey;
	private Integer processVersion;
	private String resourceBakLocation;
	private Integer isNewestVersion;
	private String creator;
	private Timestamp createDate;

	// Constructors

	/** default constructor */
	public CoreProcProcessDefinition() {
	}

	/** minimal constructor */
	public CoreProcProcessDefinition(String processDefinitionId) {
		this.processDefinitionId = processDefinitionId;
	}

	/** full constructor */
	public CoreProcProcessDefinition(String processDefinitionId, String processName, String processKey, Integer processVersion,
			String resourceBakLocation, Integer isNewestVersion, String creator, Timestamp createDate) {
		this.processDefinitionId = processDefinitionId;
		this.processName = processName;
		this.processKey = processKey;
		this.processVersion = processVersion;
		this.resourceBakLocation = resourceBakLocation;
		this.isNewestVersion = isNewestVersion;
		this.creator = creator;
		this.createDate = createDate;
	}

	// Property accessors

	public String getProcessDefinitionId() {
		return this.processDefinitionId;
	}

	public void setProcessDefinitionId(String processDefinitionId) {
		this.processDefinitionId = processDefinitionId;
	}

	public String getProcessName() {
		return this.processName;
	}

	public void setProcessName(String processName) {
		this.processName = processName;
	}

	public String getProcessKey() {
		return this.processKey;
	}

	public void setProcessKey(String processKey) {
		this.processKey = processKey;
	}

	public Integer getProcessVersion() {
		return this.processVersion;
	}

	public void setProcessVersion(Integer processVersion) {
		this.processVersion = processVersion;
	}

	public String getResourceBakLocation() {
		return this.resourceBakLocation;
	}

	public void setResourceBakLocation(String resourceBakLocation) {
		this.resourceBakLocation = resourceBakLocation;
	}

	public Integer getIsNewestVersion() {
		return this.isNewestVersion;
	}

	public void setIsNewestVersion(Integer isNewestVersion) {
		this.isNewestVersion = isNewestVersion;
	}

	public String getCreator() {
		return this.creator;
	}

	public void setCreator(String creator) {
		this.creator = creator;
	}

	public Timestamp getCreateDate() {
		return this.createDate;
	}

	public void setCreateDate(Timestamp createDate) {
		this.createDate = createDate;
	}

}