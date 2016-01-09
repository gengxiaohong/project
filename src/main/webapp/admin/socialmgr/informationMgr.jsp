<%--
  Created by IntelliJ IDEA.
  User: Ruby
  Date: 2015/8/18
  Time: 18:11
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<head>
<jsp:include page="../../layout/admin/adminheader.jsp"/>
<style type="text/css">
	#add_information_form table td{
		padding-top:5px;
	}
</style>
  <script type="text/javascript" src="../../js/admin/social/informationmgr.js"></script>
  <script type="text/javascript" src="../../js/ckeditor/ckeditor.js"></script>
</head>
<body style="padding:0px;margin:0px;">
    <table id="information_table" fit="true"></table>
  <div id="tb" style="padding:5px">
   		<div style="float:left;">
   		<a href="javascript:void(0)" onclick="newInformation();" class="easyui-linkbutton" data-options="iconCls:'icon-add'">添加</a>
   		</div>
      	<div style="float:right;">
      	<input class="easyui-searchbox" style="width:200px;height:24px;" id="name" prompt="请输入资讯名称..." searcher="reloadgrid">
      	</div>
      <div style="clear:both;"></div>
  </div>
  <div class="easyui-dialog" id="newInformationDialog" style="width:800px;height:400;padding-top:5px;overflow:auto;"
   data-options="title:'添加资讯',collapsible:true,modal:true,closed:true,buttons:'#add-dlg-buttons'">
  	<form id="add_information_form" method="post">
  		<table>
  			<tr>
  				<td colspan="2">资讯标题:<input id="name1" class="easyui-validatebox" required="true" type="text" /></td>
  			</tr>
  			<tr>
  				<td>开始时间:<input id="published_at1" class="easyui-datetimebox" required="true" type="text" /></td>
  				<td>结束时间:<input id="end_at1" class="easyui-datetimebox" required="true" type="text" /></td>
  			</tr>
  			<tr>
  				<td>查看部门:<input class="easyui-combotree add_department_tree" required="true" type="text" /></td>
  				<td>查看角色:<input class="easyui-combotree add_role_tree" required="true" type="text" /></td>
  			</tr>
  			<tr>
  				<td colspan="2">资讯内容:<input id="content1" class="easyui-validatebox" required="true" type="text" />
  					<script type="text/javascript">CKEDITOR.replace("content1",{
  				        toolbar : 'Basic',
  				        uiColor : '#9AB8F3'
  				    });</script>
  				</td>
  			</tr>
  		</table>
  	</form>
  </div>
  <div class="easyui-dialog" id="editInformationDialog" style="width:800px;height:400;overflow:auto;" closed="true"
   data-options="title:'编辑资讯',collapsible:true,buttons:'#edit-dlg-buttons'">
  	<form id="edit_information_form" method="post">
  		<table>
  			<tr>
  				<td colspan="2">标题:<input id="id" type="hidden">
  				<input id="name2" class="easyui-validatebox" required="true" type="text" /></td>
  			</tr>
  			<tr>
  				<td>开始时间:<input id="published_at2" class="easyui-datetimebox" required="true" type="text" /></td>
  				<td>结束时间:<input id="end_at2" class="easyui-datetimebox" required="true" type="text" /></td>
  			</tr>
  			<tr>
  				<td>查看部门:<input class="easyui-combotree modify_department_tree" required="true" type="text" /></td>
  				<td>查看角色:<input class="easyui-combotree modify_role_tree" required="true" type="text" /></td>
  			</tr>
  			<tr>
  				<td colspan="2">资讯内容:<input id="content2" class="easyui-validatebox" required="true" type="text" />
  					<script type="text/javascript">CKEDITOR.replace("content2",{
  				        toolbar : 'Basic',
  				        uiColor : '#9AB8F3'
  				    });</script>
  				</td>
  			</tr>
  		</table>
  	</form>
  </div>
   <div id="add-dlg-buttons">
		<a href="#" class="easyui-linkbutton" iconCls="icon-ok" onclick="saveInformation();">保存</a>
		<a href="#" class="easyui-linkbutton" iconCls="icon-cancel" onclick="javascript:$('#newInformationDialog').dialog('close')">取消</a>
	</div> 
	<div id="edit-dlg-buttons">
		<a href="#" class="easyui-linkbutton" iconCls="icon-ok" onclick="modifyInformation();">保存</a>
		<a href="#" class="easyui-linkbutton" iconCls="icon-cancel" onclick="javascript:$('#editInformationDialog').dialog('close')">取消</a>
	</div>
</body>