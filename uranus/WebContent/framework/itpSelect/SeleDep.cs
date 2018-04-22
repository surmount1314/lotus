/**
 * 版权所有：版权所有(C) 2008,中兴通讯
 * 文件编号：
 * 系统编号：
 * 系统名称：选择组织控件(.NET)开发
 * 设计作者：潘金龙
 * 编码作者：潘金龙
 * 完成日期：2008-7-24
 * 设计文件：
 * 内容摘要：选择组织复用控件查询模态框
*/

using System;
using System.Collections;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Web;
using System.Web.SessionState;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.HtmlControls;

namespace ZTE.ITC.ZteMultiSelect
{
	/// <summary>
	/// WebForm1 的摘要说明。
	/// </summary>
	public class SelForm1 : System.Web.UI.Page
	{
        protected global::System.Web.UI.HtmlControls.HtmlGenericControl ttt;
	
		private void Page_Load(object sender, System.EventArgs e)
		{
			// 在此处放置用户代码以初始化页面      
            ttt.InnerHtml = "tttttt";
			
		}
		#region Web 窗体设计器生成的代码
		override protected void OnInit(EventArgs e)
		{
			//
			// CODEGEN: 该调用是 ASP.NET Web 窗体设计器所必需的。
			//
			InitializeComponent();
			base.OnInit(e);
		}
		
		/// <summary>
		/// 设计器支持所需的方法 - 不要使用代码编辑器修改
		/// 此方法的内容。
		/// </summary>
		private void InitializeComponent()
		{    
			this.Load += new System.EventHandler(this.Page_Load);

		}
		#endregion

	
	}
}
