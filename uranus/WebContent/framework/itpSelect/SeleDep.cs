/**
 * ��Ȩ���У���Ȩ����(C) 2008,����ͨѶ
 * �ļ���ţ�
 * ϵͳ��ţ�
 * ϵͳ���ƣ�ѡ����֯�ؼ�(.NET)����
 * ������ߣ��˽���
 * �������ߣ��˽���
 * ������ڣ�2008-7-24
 * ����ļ���
 * ����ժҪ��ѡ����֯���ÿؼ���ѯģ̬��
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
	/// WebForm1 ��ժҪ˵����
	/// </summary>
	public class SelForm1 : System.Web.UI.Page
	{
        protected global::System.Web.UI.HtmlControls.HtmlGenericControl ttt;
	
		private void Page_Load(object sender, System.EventArgs e)
		{
			// �ڴ˴������û������Գ�ʼ��ҳ��      
            ttt.InnerHtml = "tttttt";
			
		}
		#region Web ������������ɵĴ���
		override protected void OnInit(EventArgs e)
		{
			//
			// CODEGEN: �õ����� ASP.NET Web ���������������ġ�
			//
			InitializeComponent();
			base.OnInit(e);
		}
		
		/// <summary>
		/// �����֧������ķ��� - ��Ҫʹ�ô���༭���޸�
		/// �˷��������ݡ�
		/// </summary>
		private void InitializeComponent()
		{    
			this.Load += new System.EventHandler(this.Page_Load);

		}
		#endregion

	
	}
}
