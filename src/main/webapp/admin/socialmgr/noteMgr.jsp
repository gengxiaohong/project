<%--
  Created by IntelliJ IDEA.
  User: Ruby
  Date: 2015/8/28
  Time: 19:04
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%-- <%@ taglib uri="http://www.rapid-framework.org.cn/rapid" prefix="rapid" %>
<rapid:override name="title">笔记管理</rapid:override>
<rapid:override name="head"> --%>
<head>
<jsp:include page="../../layout/admin/adminheader.jsp"/>
  <script type="text/javascript" src="../../js/admin/social/notemgr.js"></script>
  <script type="text/javascript" src="../../js/ckeditor/ckeditor.js"></script>
  </head>
<%-- </rapid:override>
<rapid:override name="mainName">笔记管理</rapid:override>
<rapid:override name="mainIcon">icon-page_world</rapid:override>
<rapid:override name="body"> --%>
<body>
    <table id="note_table" data-options="fit:'true'">
    </table>
  <div id="tb" style="padding:3px">
    <div style="margin-bottom: 5px;">
      创建者: <input class="easyui-textbox" style="width:150px" id="username">
      是否公开:
      <select class="easyui-combobox" panelHeight="auto" style="width:100px" id="is_public">
        <option value="">全部</option>
        <option value="True">是</option>
        <option value="False">否</option>
      </select>
      <a href="#" class="easyui-linkbutton" iconCls="icon-search" onclick="reloadgrid();">搜索</a>
    </div>
  </div>
  </body>
<%-- </rapid:override> --%>
<%-- <%@ include file="../../layout/admin/socialmgr-base.jsp" %> --%>