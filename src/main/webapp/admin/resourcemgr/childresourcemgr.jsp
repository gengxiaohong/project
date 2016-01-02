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
    <script type="text/javascript" src="../../js/admin/resourcemgr/childresourcemgr.js"></script>
</rapid:override>
<rapid:override name="mainName">子资源管理</rapid:override>
<rapid:override name="mainIcon">icon-page_world</rapid:override>
<rapid:override name="body">
   <div id="rGridTbr" style="height:30px;line-height:30px;padding-bottom:3px;">
        <div style="float:left;">
	        <a href="javascript:void(0)" class="easyui-linkbutton" onclick="createChildRes()" plain="true" iconCls="icon-add" title="审核">添加</a>
	        <a href="javascript:void(0)" class="easyui-linkbutton" onclick="delResource()" plain="true" iconCls="icon-remove" title="删除">批量删除</a>
        </div>
        <div style="float:right;">
        	<input class="easyui-searchbox" prompt="按名称过滤..." searcher="reloadgrid" id="name" style="width:200px;height:24px;"/>
        </div>
        <div style="clear:both;"></div>
    </div>
     <!--创建资源  -->
   <div id="add_childres_dialog" class="easyui-dialog" data-options="title:'添加子资源',closed:true,modal:true" buttons="#add_childres_buttons" style="width:800px;height:400px;overflow:auto;">
		<div class="easyui-layout" style="width:530px;height:300px;align:center;">
		<form id="add_childres_form">
			<div data-options="region:'north',split:false,border:false" style="padding:3px 5px;">
				<input id="pId" class="easyui-validatebox"  type="hidden" />
				<input id="cId" class="easyui-validatebox"  type="hidden" />
				<input id="cName" class="easyui-validatebox"  type="hidden" />
				<input id="cComt" class="easyui-validatebox"  type="hidden" />
			</div>
			<div data-options="region:'center',title:'资源列表'" style="padding:5px;">
				<ul id="resources_list" class="easyui-datalist"></ul>
			</div>
			<div data-options="region:'east',title:'已选资源',split:true" style="width:210px;">
				<ul id="select_resources_list" class="easyui-datalist"></ul>
			</div>
			</form>
		</div>
	</div>
	<div id="add_childres_buttons">
		<a href="javascript:void(0)" class="easyui-linkbutton" onclick="saveResource();" iconcls="icon-save" >发送</a>
		<a href="javascript:void(0)" class="easyui-linkbutton" onclick="javascript:$('#add_childres_dialog').dialog('close');" iconcls="icon-cancel">撤消</a>
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
<%@ include file="../../layout/admin/rmgr-base.jsp" %>