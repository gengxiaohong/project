<%--
  Created by IntelliJ IDEA.
  User: Ruby
  Date: 2015/8/28
  Time: 19:04
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%-- <%@ taglib uri="http://www.rapid-framework.org.cn/rapid" prefix="rapid" %>
<rapid:override name="title">站内消息管理</rapid:override>
<rapid:override name="head"> --%>
<head>
<jsp:include page="../../layout/admin/adminheader.jsp"/>
  <script type="text/javascript" src="../../js/admin/social/messagemgr.js"></script>
  <script type="text/javascript" src="../../js/ckeditor/ckeditor.js"></script>
</head>
<%-- </rapid:override>
<rapid:override name="mainName">站内消息管理</rapid:override>
<rapid:override name="mainIcon">icon-page_world</rapid:override>
<rapid:override name="body"> --%>
<body>
  <!-- <div id="message_tabs" class="easyui-tabs" fit="true">
    <div title="消息列表" style="padding:0px"> -->
      <table id="message_table" fit="true"></table>
    <!-- </div>
  </div> -->
  <div id="tb" style="padding:5px">
    <div style="float:left;">
      <a href="#" onclick=" newMessage();" class="easyui-linkbutton" data-options="iconCls:'icon-add'">添加</a>
      <!-- &nbsp;<span>|</span>
   		<a href="javascript:void(0)" onclick="deleteMegs();" class="easyui-linkbutton" data-options="iconCls:'icon-remove'">删除</a> -->
    </div>
    <div style="float:right;">
     <!--  标题: <input class="easyui-textbox" style="width:150px" id="name">
      <a href="#" class="easyui-linkbutton" iconCls="icon-search" onclick="reloadgrid();">搜索</a> -->
      <input class="easyui-searchbox" style="width:200px;height:24px;" id="name" prompt="请输入标题..." searcher="reloadgrid">
    </div>  
    <div style="clear:both;"></div>
  </div>
  <!--add new  message dialog  -->
  <div id="add_message_dialog" class="easyui-dialog" data-options="title:'发送站内信',closed:true,modal:true" buttons="#add_message_buttons" style="width:800px;height:400px;overflow:auto;">
		<div class="easyui-layout" style="width:730px;height:300px;align:center;">
		<form action="add_message_form">
			<div data-options="region:'north',split:false,border:false" style="padding:3px 5px;">
				标题: <input id="name1" class="easyui-validatebox" required="true" type="text" />
			</div>
			<div id="deptList" data-options="region:'west',title:'部门列表',split:true" style="width:310px;">
				<div id="department_tree"></div>
			</div>
			<div data-options="region:'center',title:'待选用户'" style="padding:5px;">
				<ul id="user_list" class="easyui-datalist"></ul>
			</div>
			<div data-options="region:'east',title:'已选用户',split:true" style="width:210px;">
				<ul id="select_user_list" class="easyui-datalist"></ul>
			</div>
			</form>
		</div>
		<div>
				<input id="content1" class="easyui-validatebox" required="true" type="text" />
				<script type="text/javascript">CKEDITOR.replace("content1",{
  				        toolbar : 'Basic',
  				        uiColor : '#9AB8F3',
  				        placeholder:'请输入消息内容'
  				    });</script>
			</div>
	</div>
	<div id="add_message_buttons">
		<a href="javascript:void(0)" class="easyui-linkbutton" onclick="saveMessage();" iconcls="icon-save" >保存</a>
		<a href="javascript:void(0)" class="easyui-linkbutton" onclick="javascript:$('#add_message_dialog').dialog('close');" iconcls="icon-cancel">取消</a>
	</div>
</body>
<%-- </rapid:override> --%>

<!-- extends from base.jsp -->
<%-- <%@ include file="../../layout/admin/socialmgr-base.jsp" %> --%>