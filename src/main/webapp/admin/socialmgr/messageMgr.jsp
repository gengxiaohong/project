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
    </div>
    <div style="float:right;">
     <!--  标题: <input class="easyui-textbox" style="width:150px" id="name">
      <a href="#" class="easyui-linkbutton" iconCls="icon-search" onclick="reloadgrid();">搜索</a> -->
      <input class="easyui-searchbox" style="width:200px;height:24px;" id="name" prompt="请输入标题..." searcher="reloadgrid">
    </div>  
    <div style="clear:both;"></div>
  </div>
</body>
<%-- </rapid:override> --%>

<!-- extends from base.jsp -->
<%-- <%@ include file="../../layout/admin/socialmgr-base.jsp" %> --%>