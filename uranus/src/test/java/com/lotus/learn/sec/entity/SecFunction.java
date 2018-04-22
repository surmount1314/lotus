package com.lotus.learn.sec.entity;

import java.sql.Timestamp;

/**
 * SecFunction entity. @author MyEclipse Persistence Tools
 */

public class SecFunction implements java.io.Serializable {

	// Fields

	private Long funcId;
	private Long entClassId;
	private String funcCode;
	private String name;
	private Long domainId;
	private String notes;
	private Long parentId;
	private Long funcLevel;
	private Long funSeq;
	private String viewname;
	private String dllPath;
	private String funcImg;
	private String funcArg;
	private String funcType;
	private String verifyMode;
	private Long loginMode;
	private Long busiType;
	private Long busiScene;
	private Long moduleType;
	private Long moduleEntId;
	private String helpUrl;
	private Long entrance;
	private Long dispType;
	private Long auditLevel;
	private Long auditFlag;
	private Long state;
	private String ext1;
	private String ext2;
	private Long doneCode;
	private Timestamp createDate;
	private Timestamp doneDate;
	private Timestamp validDate;
	private Timestamp expireDate;
	private Long opId;
	private Long orgId;
	private Long creatorId;

	// Constructors

	/** default constructor */
	public SecFunction() {
	}

	/** minimal constructor */
	public SecFunction(Long funcId, String name, Long parentId) {
		this.funcId = funcId;
		this.name = name;
		this.parentId = parentId;
	}

	/** full constructor */
	public SecFunction(Long funcId, Long entClassId, String funcCode, String name, Long domainId, String notes, Long parentId, Long funcLevel,
			Long funSeq, String viewname, String dllPath, String funcImg, String funcArg, String funcType, String verifyMode, Long loginMode,
			Long busiType, Long busiScene, Long moduleType, Long moduleEntId, String helpUrl, Long entrance, Long dispType, Long auditLevel,
			Long auditFlag, Long state, String ext1, String ext2, Long doneCode, Timestamp createDate, Timestamp doneDate, Timestamp validDate,
			Timestamp expireDate, Long opId, Long orgId, Long creatorId) {
		this.funcId = funcId;
		this.entClassId = entClassId;
		this.funcCode = funcCode;
		this.name = name;
		this.domainId = domainId;
		this.notes = notes;
		this.parentId = parentId;
		this.funcLevel = funcLevel;
		this.funSeq = funSeq;
		this.viewname = viewname;
		this.dllPath = dllPath;
		this.funcImg = funcImg;
		this.funcArg = funcArg;
		this.funcType = funcType;
		this.verifyMode = verifyMode;
		this.loginMode = loginMode;
		this.busiType = busiType;
		this.busiScene = busiScene;
		this.moduleType = moduleType;
		this.moduleEntId = moduleEntId;
		this.helpUrl = helpUrl;
		this.entrance = entrance;
		this.dispType = dispType;
		this.auditLevel = auditLevel;
		this.auditFlag = auditFlag;
		this.state = state;
		this.ext1 = ext1;
		this.ext2 = ext2;
		this.doneCode = doneCode;
		this.createDate = createDate;
		this.doneDate = doneDate;
		this.validDate = validDate;
		this.expireDate = expireDate;
		this.opId = opId;
		this.orgId = orgId;
		this.creatorId = creatorId;
	}

	// Property accessors

	public Long getFuncId() {
		return this.funcId;
	}

	public void setFuncId(Long funcId) {
		this.funcId = funcId;
	}

	public Long getEntClassId() {
		return this.entClassId;
	}

	public void setEntClassId(Long entClassId) {
		this.entClassId = entClassId;
	}

	public String getFuncCode() {
		return this.funcCode;
	}

	public void setFuncCode(String funcCode) {
		this.funcCode = funcCode;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Long getDomainId() {
		return this.domainId;
	}

	public void setDomainId(Long domainId) {
		this.domainId = domainId;
	}

	public String getNotes() {
		return this.notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
	}

	public Long getParentId() {
		return this.parentId;
	}

	public void setParentId(Long parentId) {
		this.parentId = parentId;
	}

	public Long getFuncLevel() {
		return this.funcLevel;
	}

	public void setFuncLevel(Long funcLevel) {
		this.funcLevel = funcLevel;
	}

	public Long getFunSeq() {
		return this.funSeq;
	}

	public void setFunSeq(Long funSeq) {
		this.funSeq = funSeq;
	}

	public String getViewname() {
		return this.viewname;
	}

	public void setViewname(String viewname) {
		this.viewname = viewname;
	}

	public String getDllPath() {
		return this.dllPath;
	}

	public void setDllPath(String dllPath) {
		this.dllPath = dllPath;
	}

	public String getFuncImg() {
		return this.funcImg;
	}

	public void setFuncImg(String funcImg) {
		this.funcImg = funcImg;
	}

	public String getFuncArg() {
		return this.funcArg;
	}

	public void setFuncArg(String funcArg) {
		this.funcArg = funcArg;
	}

	public String getFuncType() {
		return this.funcType;
	}

	public void setFuncType(String funcType) {
		this.funcType = funcType;
	}

	public String getVerifyMode() {
		return this.verifyMode;
	}

	public void setVerifyMode(String verifyMode) {
		this.verifyMode = verifyMode;
	}

	public Long getLoginMode() {
		return this.loginMode;
	}

	public void setLoginMode(Long loginMode) {
		this.loginMode = loginMode;
	}

	public Long getBusiType() {
		return this.busiType;
	}

	public void setBusiType(Long busiType) {
		this.busiType = busiType;
	}

	public Long getBusiScene() {
		return this.busiScene;
	}

	public void setBusiScene(Long busiScene) {
		this.busiScene = busiScene;
	}

	public Long getModuleType() {
		return this.moduleType;
	}

	public void setModuleType(Long moduleType) {
		this.moduleType = moduleType;
	}

	public Long getModuleEntId() {
		return this.moduleEntId;
	}

	public void setModuleEntId(Long moduleEntId) {
		this.moduleEntId = moduleEntId;
	}

	public String getHelpUrl() {
		return this.helpUrl;
	}

	public void setHelpUrl(String helpUrl) {
		this.helpUrl = helpUrl;
	}

	public Long getEntrance() {
		return this.entrance;
	}

	public void setEntrance(Long entrance) {
		this.entrance = entrance;
	}

	public Long getDispType() {
		return this.dispType;
	}

	public void setDispType(Long dispType) {
		this.dispType = dispType;
	}

	public Long getAuditLevel() {
		return this.auditLevel;
	}

	public void setAuditLevel(Long auditLevel) {
		this.auditLevel = auditLevel;
	}

	public Long getAuditFlag() {
		return this.auditFlag;
	}

	public void setAuditFlag(Long auditFlag) {
		this.auditFlag = auditFlag;
	}

	public Long getState() {
		return this.state;
	}

	public void setState(Long state) {
		this.state = state;
	}

	public String getExt1() {
		return this.ext1;
	}

	public void setExt1(String ext1) {
		this.ext1 = ext1;
	}

	public String getExt2() {
		return this.ext2;
	}

	public void setExt2(String ext2) {
		this.ext2 = ext2;
	}

	public Long getDoneCode() {
		return this.doneCode;
	}

	public void setDoneCode(Long doneCode) {
		this.doneCode = doneCode;
	}

	public Timestamp getCreateDate() {
		return this.createDate;
	}

	public void setCreateDate(Timestamp createDate) {
		this.createDate = createDate;
	}

	public Timestamp getDoneDate() {
		return this.doneDate;
	}

	public void setDoneDate(Timestamp doneDate) {
		this.doneDate = doneDate;
	}

	public Timestamp getValidDate() {
		return this.validDate;
	}

	public void setValidDate(Timestamp validDate) {
		this.validDate = validDate;
	}

	public Timestamp getExpireDate() {
		return this.expireDate;
	}

	public void setExpireDate(Timestamp expireDate) {
		this.expireDate = expireDate;
	}

	public Long getOpId() {
		return this.opId;
	}

	public void setOpId(Long opId) {
		this.opId = opId;
	}

	public Long getOrgId() {
		return this.orgId;
	}

	public void setOrgId(Long orgId) {
		this.orgId = orgId;
	}

	public Long getCreatorId() {
		return this.creatorId;
	}

	public void setCreatorId(Long creatorId) {
		this.creatorId = creatorId;
	}

}