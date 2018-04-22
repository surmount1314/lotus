package com.lotus.learn.struts2.action;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.util.Arrays;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.activiti.bpmn.model.BpmnModel;
import org.activiti.engine.ProcessEngine;
import org.activiti.engine.impl.ProcessEngineImpl;
import org.activiti.engine.impl.bpmn.diagram.ProcessDiagramGenerator;
import org.activiti.engine.impl.context.Context;
import org.activiti.engine.runtime.ProcessInstance;
import org.apache.struts2.ServletActionContext;

import com.lotus.learn.sec.service.interfaces.ISecSV;

public class LoginAction extends BaseAction {
	private String name;
	private String password;
	private ProcessEngine processEngine;
	private ISecSV secSV;

	public void login() throws Exception {
		List list = secSV.querySecFunction();
		System.out.println();
	}
	
	/**
	 * 输出返回结果
	 * 
	 * @param result
	 * @throws IOException
	 */
	private String returnResult(String result) throws IOException {
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/xml;charset=utf-8");
		response.setCharacterEncoding("utf-8");
		PrintWriter out = response.getWriter();
		out.write(result);
		out.flush();
		out.close();
		
		return null;
	}
	
	public void login1(){
//		RepositoryService repositoryService = processEngine.getRepositoryService();
//		String deploymentId = repositoryService 
//		  .createDeployment() 
//		  .addClasspathResource("com/lotus/learn/activiti/bpmns/MyProcess.bpmn") 
//		  .deploy() 
//		  .getId();
//		
//		Map<String, Object> variables = new HashMap<String, Object>(); 
//		variables.put("employeeName", "Kermit"); 
//		variables.put("numberOfDays", new Integer(4)); 
//		variables.put("vacationMotivation", "I'm really tired!"); 
//		       
//		RuntimeService runtimeService = processEngine.getRuntimeService(); 
//		ProcessInstance  processInstance = runtimeService.startProcessInstanceByKey("myProcess", variables); 
		Context.setProcessEngineConfiguration(((ProcessEngineImpl) processEngine).getProcessEngineConfiguration());
		
		ProcessInstance processInstance = processEngine.getRuntimeService().createProcessInstanceQuery().list().get(0);
		BpmnModel bpmnModel1 = processEngine.getRepositoryService().getBpmnModel(processInstance.getProcessDefinitionId());
		InputStream is1 = ProcessDiagramGenerator.generateDiagram(bpmnModel1, "png", Arrays.asList(processInstance.getProcessInstanceId()));
		BufferedInputStream bis1 = new BufferedInputStream(is1);
		try {
			FileOutputStream fos = new FileOutputStream(new File("E:\\myeclipseproject\\LearnInOne\\test.png"));
			byte[] b = new byte[64];
			while (bis1.read(b) != -1) {
				fos.write(b);
			}
			fos.flush();
			fos.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		
	
		BpmnModel bpmnModel = processEngine.getRepositoryService().getBpmnModel(processInstance.getProcessDefinitionId());
		InputStream is = ProcessDiagramGenerator.generateDiagram(bpmnModel, "png",
				processEngine.getRuntimeService().getActiveActivityIds(processInstance.getProcessInstanceId()));
		BufferedInputStream bis = new BufferedInputStream(is);
		try {
//			FileOutputStream fos = new FileOutputStream(new File("E:\\myeclipseproject\\LearnInOne\\test.png"));
//			byte[] b = new byte[64];
//			while (bis.read(b) != -1) {
//				fos.write(b);
//			}
//			fos.flush();
//			fos.close();
			byte[] b = new byte[64];
			while (bis.read(b) != -1) {
				getResponse().getOutputStream().write(b);
//				fos.write(b);
			}
			getResponse().getOutputStream().flush();
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		
		
		
		/*HistoricProcessInstance processInstance = processEngine.getHistoryService().createHistoricProcessInstanceQuery().list().get(0);
		BpmnModel bpmnModel = processEngine.getRepositoryService().getBpmnModel(processInstance.getProcessDefinitionId());
		InputStream is = ProcessDiagramGenerator.generateDiagram(bpmnModel, "png", Arrays.asList(processInstance.getEndActivityId()));
		BufferedInputStream bis = new BufferedInputStream(is);
		BufferedReader br = new BufferedReader(new InputStreamReader(bis));
		try {
//			FileOutputStream fos = new FileOutputStream(new File("E:\\myeclipseproject\\LearnInOne\\test.png"));
			byte[] b = new byte[64];
			while (bis.read(b) != -1) {
				getResponse().getOutputStream().write(b);
//				fos.write(b);
			}
			getResponse().getOutputStream().flush();
//			fos.flush();
//			fos.close();
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}*/
		
		/*HistoricProcessInstance hprocessInstance = processEngine.getHistoryService().createHistoricProcessInstanceQuery().list().get(0);
		BpmnModel bpmnModel = processEngine.getRepositoryService().getBpmnModel(hprocessInstance.getProcessDefinitionId());
		InputStream is = ProcessDiagramGenerator.generateDiagram(bpmnModel, "png", Arrays.asList(hprocessInstance.getEndActivityId()));
		BufferedInputStream bis = new BufferedInputStream(is);
		BufferedReader br = new BufferedReader(new InputStreamReader(bis));
		try {
//			FileOutputStream fos = new FileOutputStream(new File("E:\\myeclipseproject\\LearnInOne\\test.png"));
			byte[] b = new byte[64];
			while (bis.read(b) != -1) {
				getResponse().getOutputStream().write(b);
//				fos.write(b);
			}
			getResponse().getOutputStream().flush();
//			fos.flush();
//			fos.close();
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}*/
		
//		List<Task> tasks = processEngine.getTaskService().createTaskQuery().taskAssignee("kermit1").list();
//		List<Task> tasks1 = processEngine.getTaskService().createTaskQuery().taskCandidateGroup("management1").list();
//		List<Task> tasks2 = processEngine.getTaskService().createTaskQuery().taskCandidateUser("fozzie2").list();
//		processEngine.getTaskService().complete(tasks2.get(0).getId());
		
		// Verify that we started a new process instance 
		System.out.println("Number of process instances: " + processEngine.getRuntimeService().createProcessInstanceQuery().count());
		System.out.println(111);
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public ProcessEngine getProcessEngine() {
		return processEngine;
	}

	public void setProcessEngine(ProcessEngine processEngine) {
		this.processEngine = processEngine;
	}

	public ISecSV getSecSV() {
		return secSV;
	}

	public void setSecSV(ISecSV secSV) {
		this.secSV = secSV;
	}
}