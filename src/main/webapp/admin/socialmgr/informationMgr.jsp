<%--
  Created by IntelliJ IDEA.
  User: Ruby
  Date: 2015/8/18
  Time: 18:11
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://www.rapid-framework.org.cn/rapid" prefix="rapid" %>
<rapid:override name="title">资讯管理</rapid:override>
<rapid:override name="head">
  <script type="text/javascript" src="../../js/admin/social/informationmgr.js"></script>
  <script type="text/javascript" src="../../js/ckeditor/ckeditor.js"></script>
</rapid:override>
<rapid:override name="mainName">资讯管理</rapid:override>
<rapid:override name="mainIcon">icon-page_world</rapid:override>
<rapid:override name="body">
<div id="information_tabs" class="easyui-tabs" fit="true">
  <div title="资讯列表" style="padding:0px">
    <table id="information_table" fit="true"></table>
  </div>
</div>
  <div id="tb" style="padding:5px">
      	
        <input class="easyui-textbox" style="width:200px" id="name" placeholder="请输入资讯名称">
        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-search" onclick="reloadgrid();">搜索</a> <span style="color:silver;">|</span> 
        	<a href="javascript:void(0)" onclick="newInformation();" class="easyui-linkbutton" data-options="iconCls:'icon-add'">添加</a>
        
  </div>

</rapid:override>

<!-- extends from base.jsp -->
<%@ include file="../../layout/admin/socialmgr-base.jsp" %>


