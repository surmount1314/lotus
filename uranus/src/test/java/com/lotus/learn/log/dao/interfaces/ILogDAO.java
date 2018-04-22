package com.lotus.learn.log.dao.interfaces;

import java.util.List;

import com.lotus.learn.sec.entity.CoreProcProcessDefinition;

public interface ILogDAO {

	public List saveProcDef(CoreProcProcessDefinition s) throws Exception;
}
