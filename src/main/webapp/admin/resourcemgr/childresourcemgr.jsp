<%--
  Created by IntelliJ IDEA.
  User: libruy
  Date: 2015/8/11
  Time: 15:47
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ taglib uri="http://www.rapid-framework.org.cn/rapid" prefix="rapid"%>
<rapid:override name="title">资源列表</rapid:override>
<rapid:override name="head">
	<script type="text/javascript"
		src="../../js/admin/resourcemgr/childresourcemgr.js"></script>
</rapid:override>
<rapid:override name="mainName">子资源管理</rapid:override>
<rapid:override name="mainIcon">icon-page_world</rapid:override>
<rapid:override name="body">
	<div id="rGridTbr"
		style="height: 30px; line-height: 30px; padding-bottom: 3px;">
			 <a href="javascript:void(0)"
				class="easyui-linkbutton" onclick="delcldResource()" plain="true"
				iconCls="icon-remove" title="删除">批量删除</a>
	</div>
	<table id="rGrid" class="easyui-datagrid"
		data-options="rownumbers:true,pagination:true,fit:true,fitColumns:true, toolbar:'#rGridTbr'">
		<thead>
			<tr>
				<th data-options="field:'ck',checkbox:true,width:100"></th>
				<th data-options="field:'id',width:100">id</th>
				<th data-options="field:'name',width:100">名称</th>
				<th data-options="field:'commiter',width:100,align:'right'">上传者</th>
			</tr>
		</thead>
	</table>
</rapid:override>

<!-- extends from base.jsp -->
<%@ include file="../../layout/admin/rmgr-base.jsp"%>