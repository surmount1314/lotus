package com.lotus.learn.hibernate.dao.impl;

import java.util.List;

import com.lotus.learn.hibernate.dao.BaseDao;
import com.lotus.learn.hibernate.dao.interfaces.ISecDAO;

public class SecDAOImpl implements ISecDAO {
	private BaseDao baseDao;

	public List querySecFunction() throws Exception {
		return baseDao.queryHql("From SecFunction");
	}
	
	public BaseDao getBaseDao() {
		return baseDao;
	}
	
	public void setBaseDao(BaseDao baseDao) {
		this.baseDao = baseDao;
	}
}
