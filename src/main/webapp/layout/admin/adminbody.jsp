<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2015/8/11
  Time: 16:47
  To change this template use File | Settings | File Templates.


--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!-- <div class="ui-mask">
    <p>正在加载页面,请稍后...</p>
</div> -->
<div data-options="region:'north',border:false,split:false">
    <!-- <div id="header-inner">
        <table cellpadding="0" cellspacing="0" style="width:100%;">
            <tbody>
            <tr>
                <td rowspan="2" style="width:20px;">
                </td>
                <td style="height:52px;">
                    <div style="color:#fff;font-size:22px;font-weight:bold;">
                        <a style="color:#fff;font-size:22px;font-weight:bold;text-decoration:none">资源管理平台</a>
                    </div>
                    <div style="color:#fff">
                        <a style="color:#fff;text-decoration:none">让一切资源使用的更方便!</a>
                    </div>
                </td>
                <td style="padding-right:5px;text-align:right;vertical-align:bottom;">
                    <div id="topmenu">
                        <a href="../../admin/usermgr/userMgr.jsp">用户管理</a>
                        <a href="../../admin/resourcemgr/rmgr.jsp">资源管理</a>
                        <a href="../../admin/metadata/metadataMgr.jsp">元数据管理</a>
                        <a href="../../admin/appmgr/topicmgr.jsp">应用管理</a>
                        <a href="../../admin/datacount/datacout.jsp">数据统计</a>
                        <a href="../../admin/sysmgr/webconf.jsp">服务管理</a>
                        <a target="socialmgr" href="../../admin/socialmgr/informationMgr.jsp">社会化功能管理</a>
                    	<a href="../../layout/admin/socialmgr-base.jsp">社会化功能管理</a>
                    </div>

                </td>
                <td style="padding-right:5px;text-align:right;vertical-align:bottom;">
                    <div id="user_toolbar">
                        <p>欢迎你,<a style="color:#FFF" iconCls="icon-user" class="easyui-linkbutton" plain="true" id="login_username"></a>&nbsp;&nbsp;
                            <a style="color:#FFF" class="easyui-linkbutton" iconCls="icon-control_power_blue"
                                    plain="true" href="../../admin/login.jsp">退出</a></p>
                    </div>
                </td>
            </tr>
            </tbody>
        </table>
    </div> -->
    <div class="logo">
		<div class="logo-left">
			<img src="../../images/menu/logo.jpg" />
		</div>
		<ul class="logo-right">

			<li><a
				href="../../admin/usermgr/userMgr.jsp"><span><img
						src="../../images/menu/user.png" /></span><br />
					<span>用户管理</span></a></li>
			<li><a  href="../../admin/resourcemgr/rmgr.jsp"><span><img
						src="../../images/menu/sources.png" /></span><br />
					<span>资源管理</span></a></li>
			<li><a href="../../layout/admin/metadatamgr-base.jsp"><span><img
						src="../../images/menu/data.png" /></span><br />
					<span>元数据管理</span></a></li>
			<li><a href="../../admin/appmgr/topicmgr.jsp"><span><img
						src="../../images/menu/application.png" /></span><br />
					<span>应用管理</span></a></li>
			<li><a
				href="../../admin/datacount/datacout.jsp"><span><img
						src="../../images/menu/datacount.png" /></span><br />
					<span>数据统计</span></a></li>
			<li><a
				href="../../layout/admin/systemmgr-base.jsp"><span><img
						src="../../images/menu/service.png" /></span><br />
					<span>服务管理</span></a></li>
			<li><a href="../../layout/admin/socialmgr-base.jsp"><span><img
						src="../../images/menu/social.png" /></span><br />
					<span>社会化功能管理</span></a></li>
			<li><a  href="../../admin/login.jsp"><span><img
						src="../../images/menu/return.png" /></span><br />
					<span>退出</span></a></li>
		</ul>
	</div>
	<div class="clear"></div>
    
</div>
<div data-options="region:'south',split:false" border="false">
    <p style="text-align:center;">Copyright © 2010-2015 www.boful.com</p><!-- id="footer-inner"  -->
</div>
