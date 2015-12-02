<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2015/8/12
  Time: 21:20
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<head>
	<jsp:include page="../../layout/admin/adminheader.jsp"/>
	<script src="../../js/admin/sysmgr/convertconf.js" type="text/javascript"></script>
</head>
<body>
	<div data-options="region:'center',title:'转码配置'" iconCls="icon-cdr_go">
	    <div id="container">
	        <form id="ff" method="post">
	            <table cellpadding="5">
	            	<tr>
	                    <td>转码服务注册名称:</td>
	                    <td><input class="easyui-textbox" type="text" id="sname" name="sname" data-options="required:true"/></td>
	                </tr>
	                <tr>
	                    <td>转码服务器IP:</td>
	                    <td><input class="easyui-textbox" type="text" id="ipAddr" name="ipAddr" data-options="disabled:true"/></td>
	                </tr>
	                <tr>
	                    <td>端口:</td>
	                    <td><input class="easyui-textbox" type="text" id="ipPort" name="ipPort"
	                               data-options="disabled:true"/></td>
	                </tr>
	                <tr>
	                    <td>服务状态:</td>
	                    <td><img src="../../images/red.gif" style="width:25px;height:25px;"></td>
	                    <td><a class="easyui-linkbutton" href="./convmonitor.jsp">查看详情</a></td>
	                </tr>
	            </table>
	            <div style="text-align:left;">
		        	<a class="easyui-linkbutton" onclick="submitForm()">提交</a>
		            <a class="easyui-linkbutton" onclick="clearForm()">重置</a>
		        </div>
	        </form>
	    </div>
	</div>
</body>