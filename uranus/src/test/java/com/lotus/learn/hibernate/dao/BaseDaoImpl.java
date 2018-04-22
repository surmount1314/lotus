package com.lotus.learn.hibernate.dao;

import java.io.Serializable;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.Collection;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.HibernateException;
import org.hibernate.LockMode;
import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.orm.hibernate4.HibernateCallback;
import org.springframework.orm.hibernate4.support.HibernateDaoSupport;

/**
 * @see 添加可以---------########请不要随便修改 此类
 * 
 * @author credit004
 *
 */
@SuppressWarnings("all")
public class BaseDaoImpl extends HibernateDaoSupport implements BaseDao {

	private final Log log = LogFactory.getLog(getClass());
	
	public List queryHql(String hql, Object param) throws Exception{
		
		List resultList = null;
		
		try {
			resultList = getHibernateTemplate().find(hql, param);
		} catch (Exception e) {
			log.error("DataBase ERROR 038---"+e.getMessage());
			throw new Exception("query hql:"+ hql + "error!");
		}
		
		if(resultList == null || resultList.size() == 0){
			return null;
		}
		
		return resultList;
	}

	public List queryHql(String hql, Object[] params) throws Exception{
		
		List resultList = null;
		
		try {
			resultList = getHibernateTemplate().find(hql, params);
		} catch (Exception e) {
			log.error("DataBase ERROR 058---"+e.getMessage());
			throw new Exception("query hql:"+ hql + "error!");
		}
		
//		if(resultList == null || resultList.size() == 0){
//			return null;
//		}
		
		return resultList;
	}

	public List queryHql(String hql) throws Exception{
		
		List resultList = null;
		
		try {
			resultList = getHibernateTemplate().find(hql);
		} catch (Exception e) {
			log.error("DataBase ERROR 077---"+e.getMessage());
			throw new Exception("query hql:"+ hql + "error!");
		}
		
		if(resultList == null || resultList.size() == 0){
			return null;
		}
		
		return resultList;
	}

	public boolean saveDatas(Object object) throws Exception{
		
		try {
			getHibernateTemplate().save(object);
			return true;
		} catch (Exception e) {
			log.error("DataBase ERROR 096---"+e.getMessage());
			throw new Exception("saveDatas error!");
		}
	}

	/**
	 * add by weipf
	 */
	public boolean saveOrUpdateDatas(Object object) throws Exception{
		try {
			getHibernateTemplate().saveOrUpdate(object);
		} catch (Exception e) {
			log.error("DataBase ERROR 109---"+e.getMessage());
			throw new Exception("saveOrUpdateDatas error!");
		}
		return true;
	}
	
	public boolean deleteDatas(Object object) throws Exception{
		try {
			getHibernateTemplate().delete(object);
		} catch (Exception e) {
			log.error("DataBase ERROR 126---"+e.getMessage());
			throw new Exception("deleteDatas error!");
		}
		return true;
	}

	public boolean updateDatas(Object object) throws Exception{
		try {
			getHibernateTemplate().update(object);
		} catch (Exception e) {
			log.error("DataBase ERROR 136---"+e.getMessage());
			throw new Exception("updateDatas error!");
		}
		return true;
	}

	@SuppressWarnings("unchecked")
	public List queryHql(final String hql, final int start, final int limit) throws Exception{
		
		List prlist = null;
		
		try {
			prlist = getHibernateTemplate().execute(new HibernateCallback() {
				 public Object doInHibernate(Session session)
				 throws HibernateException {
				 Query query = session.createQuery(hql);
				 if(start>0)
					 query.setFirstResult(start);
				 if(limit>0)
					 query.setMaxResults(limit);
				 List list = query.list();
				 return list;
				 }
			});
		} catch (Exception e) {
			log.error("DataBase ERROR 161---"+e.getMessage());
			throw new Exception("queryHql "+hql+" for pages error!");
		}

		return prlist;
	}
	
	public List queryHql(final String hql, final Object param, final int start, final int limit) throws Exception{
		
		List prlist = null;

		try {
			prlist = getHibernateTemplate().execute(
				new HibernateCallback() {
					public Object doInHibernate(Session session)
							throws HibernateException {
						Query query = session.createQuery(hql);

						if (param instanceof Integer) {
							query.setInteger(0, (Integer) param);
						} else if (param instanceof String) {
							query.setString(0, (String) param);
						} else if(param instanceof Timestamp){
							query.setTimestamp(0, (Timestamp)param);
						}
						if(start>0)
							 query.setFirstResult(start);
						 if(limit>0)
							 query.setMaxResults(limit);
						List list = query.list();
						return list;
					}
				});
		} catch (Exception e) {
			log.error("DataBase ERROR 195---"+e.getMessage());
			throw new Exception("queryHql "+hql+" for pages error!");
		}

		return prlist;
	}
	
	public List queryHql(final String hql, final Object[] params, final int start, final int limit) throws Exception{
		
		List prlist = null;
		
		try {
			prlist = getHibernateTemplate().execute(new HibernateCallback() {
				 public Object doInHibernate(Session session)
				 throws HibernateException {
				 Query query = session.createQuery(hql);
				 
				 //注入参数
				 for(int i=0; i<params.length; i++){
					 
					 if(params[i] instanceof Integer){
						 query.setInteger(i, (Integer)params[i]);
					 }else if(params[i] instanceof String){
						 query.setString(i, (String)params[i]);
					 }else if(params[i] instanceof Timestamp){
						 query.setTimestamp(i, (Timestamp)params[i]);
					 }else if(params[i] instanceof Float){
						 query.setFloat(i, (Float)params[i]);
					 }
				 }
				 if(start>0)
					 query.setFirstResult(start);
				 if(limit>0)
					 query.setMaxResults(limit);
				 List list = query.list();
				 return list;
				 }
			});
		} catch (Exception e) {
			log.error("DataBase ERROR 234---"+e.getMessage());
			throw new Exception("queryHql "+hql+" for pages error!");
		}

		return prlist;
	}

	public boolean excuteSQL(String queryString) throws Exception{
		try {
			getHibernateTemplate().bulkUpdate(queryString);
		} catch (Exception e) {
			log.error("DataBase ERROR 245---"+e.getMessage());
			throw new Exception("excuteSQL "+queryString+"  error!");
		}
		return true;
	}

	public boolean excuteSQL(String queryString, Object value) throws Exception{
		try {
			getHibernateTemplate().bulkUpdate(queryString, value);
		} catch (Exception e) {
			log.error("DataBase ERROR 255---"+e.getMessage());
			throw new Exception("excuteSQL "+queryString+"  error!");
		}
		return true;
	}

	public boolean excuteSQL(String queryString, Object[] values) throws Exception{
		try {
			getHibernateTemplate().bulkUpdate(queryString, values);
		} catch (Exception e) {
			log.error("DataBase ERROR 265---"+e.getMessage());
			throw new Exception("excuteSQL "+queryString+"  error!");
		}
		return true;
	}
	
	public Object getById(Class entityClass, Serializable id) throws Exception{
		try {
			return getHibernateTemplate().get(entityClass, id);
		} catch (Exception e) {
			log.error("DataBase ERROR 275---"+e.getMessage());
			throw new Exception("getObjectById error!");
		}
	}

	public Object getById(Class entityClass, Serializable id, LockMode lockMode) throws Exception{
		try {
			return getHibernateTemplate().get(entityClass, id, lockMode);
		} catch (Exception e) {
			log.error("DataBase ERROR 283---"+e.getMessage());
			throw new Exception("getObjectById error!");
		}
	}

	public boolean deleteDatas(Class entityClass ,Serializable id) throws Exception{
		try {
			Object o = getHibernateTemplate().get(entityClass, id);
			getHibernateTemplate().delete(o) ;
		} catch (Exception e) {
			log.error("DataBase ERROR 294---"+e.getMessage());
			throw new Exception("deleteDatas by id error!");
		}
		return true;
	}


	public boolean updatePartDatas(Object object, Serializable id) throws Exception {
		
		try {
			getHibernateTemplate().update(getHibernateTemplate().get(object.getClass(), id));
			return true;
		} catch (Exception e) {
			log.error("dataBase ERROR 307"+e.getMessage());
			throw new Exception(e);
		}
		
	}

	public void deleteAll(Collection entities){
		getHibernateTemplate().deleteAll(entities);
	}
	public List findByExample(Object o) {
		return getHibernateTemplate().findByExample(o) ;
	}
}
