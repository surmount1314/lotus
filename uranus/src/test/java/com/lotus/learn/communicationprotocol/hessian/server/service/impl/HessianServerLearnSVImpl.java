package com.lotus.learn.communicationprotocol.hessian.server.service.impl;

import com.caucho.hessian.server.HessianServlet;
import com.lotus.learn.communicationprotocol.hessian.server.service.interfaces.IHessianServerLearnSV;

public class HessianServerLearnSVImpl extends HessianServlet implements IHessianServerLearnSV {
	public String sayHello(String name) throws Exception {
		return "hello, " + name;
	}

}
