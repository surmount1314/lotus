package com.lotus.learn.log.service.impl;

import com.lotus.learn.log.dao.interfaces.ILogDAO;
import com.lotus.learn.log.service.interfaces.ILogSV;
import com.lotus.learn.sec.entity.CoreProcProcessDefinition;

public class LogSVImpl implements ILogSV {
	private ILogDAO logDAO;

	public void saveProcDef(CoreProcProcessDefinition s) throws Exception {
		logDAO.saveProcDef(s);
	}

	public ILogDAO getLogDAO() {
		return logDAO;
	}

	public void setLogDAO(ILogDAO logDAO) {
		this.logDAO = logDAO;
	}

}
