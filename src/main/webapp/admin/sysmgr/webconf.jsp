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
</head>
<body>
	<div data-options="region:'center',title:'Web服务配置'" iconCls="icon-config">
	    <div id="container" style="padd"doc/资源接口.md"ing:10px;">
	        <form id="ff" method="post">
	            <table cellpadding="5">
	                <tr>
	                    <td>Web服务器IP:</td>
	                    <td><input class="easyui-textbox" type="text" name="name" data-options="required:true"/></td>
	                </tr>
	                <tr>
	                    <td>端口:</td>
	                    <td><input class="easyui-textbox" type="text" name="email"
	                               data-options="required:true"/></td>
	                </tr>
	                <tr>
	                    <td>服务状态:</td>
	                    <td><img src="../../images/red.gif" style="width:25px;height:25px;"></td>
	                    <td><a class="easyui-linkbutton" href="./webservermonitor.jsp">查看详情</a></td>
	                </tr>
	            </table>
	        </form>
	        <div style="text-align:left;">
	            <a href="javascript:void(0)" class="easyui-linkbutton" onclick="submitForm()">保存</a>
	            <a href="javascript:void(0)" class="easyui-linkbutton" onclick="clearForm()">重置</a>
	        </div>
	    </div>
	</div>
</body>
