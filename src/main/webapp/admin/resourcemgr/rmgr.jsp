<%--
  Created by IntelliJ IDEA.
  User: libruy
  Date: 2015/8/11
  Time: 15:47
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://www.rapid-framework.org.cn/rapid" prefix="rapid" %>
<rapid:override name="title">资源列表</rapid:override>
<rapid:override name="head">
    <script type="text/javascript" src="../../js/admin/rmgr.js"></script>
</rapid:override>
<rapid:override name="mainName">资源库统计</rapid:override>
<rapid:override name="mainIcon">icon-page_world</rapid:override>
<rapid:override name="body">
    <div id="rGridTbr" style="height:30px;line-height:30px;padding-bottom:3px;">
        <div style="float:left;">
        	<a href="javascript:void(0)" class="easyui-linkbutton" onclick="publishResource()" iconCls="icon-application_side_expand"
           title="发布">发布</a>
	        <a href="javascript:void(0)" class="easyui-linkbutton" onclick="passResource()" iconCls="icon-ok" title="审核">审核</a>
	        <a href="javascript:void(0)" class="easyui-linkbutton" onclick="delResource()"  iconCls="icon-remove" title="删除">删除</a>
        </div>
        <div style="float:right;">
        	<input class="easyui-searchbox" prompt="按名称过滤..." searcher="reloadgrid" id="name" style="width:200px;height:24px;"/>
        </div>
        <div style="clear:both;"></div>
    </div>
    <table id="rGrid" class="easyui-datagrid" data-options="fit:true">
    </table>
</rapid:override>

<!-- extends from base.jsp -->
<%@ include file="../../layout/admin/rmgr-base.jsp" %>