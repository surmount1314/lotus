package com.lotus.learn.sec.service.impl;

import java.util.List;

import com.lotus.learn.hibernate.dao.interfaces.ISecDAO;
import com.lotus.learn.sec.service.interfaces.ISecSV;

public class SecSVImpl implements ISecSV {
	private ISecDAO secDao;

	public List querySecFunction() throws Exception {
		return secDao.querySecFunction();
	}
	
	public ISecDAO getSecDao() {
		return secDao;
	}

	public void setSecDao(ISecDAO secDao) {
		this.secDao = secDao;
	}
}
