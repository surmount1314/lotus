package com.lotus.learn.log.dao.impl;

import java.util.List;

import com.lotus.learn.hibernate.dao.BaseDao;
import com.lotus.learn.log.dao.interfaces.ILogDAO;
import com.lotus.learn.sec.entity.CoreProcProcessDefinition;

public class LogDAOImpl implements ILogDAO {
	private BaseDao baseDao;

	public List saveProcDef(CoreProcProcessDefinition s) throws Exception {
		baseDao.saveDatas(s);
		return null;
	}
	
	public BaseDao getBaseDao() {
		return baseDao;
	}
	
	public void setBaseDao(BaseDao baseDao) {
		this.baseDao = baseDao;
	}
}
