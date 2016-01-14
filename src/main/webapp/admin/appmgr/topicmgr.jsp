<%--
  Created by IntelliJ IDEA.
  User: ligson
  Date: 2015/8/11
  Time: 15:47
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<head>
	<jsp:include page="../../layout/admin/adminheader.jsp"/>
    <script type="text/javascript" src="../../js/admin/social/commentmgr.js"></script>
    <script type="text/javascript" src="../../js/spark-md5.js"></script>
    <script type="text/javascript" src="../../js/common/fileutils.js"></script>
    <script type="text/javascript" src="http://42.62.52.40:8000/static/flow.js"></script>
    <script type="text/javascript" src="../../js/admin/topicmgr.js"></script>
</head>
<body>
<div id="rGridTbr" style="height:30px;line-height:30px;">
    <a href="javascript:void(0)" class="easyui-linkbutton" onclick="addTopic()" plain="true"
       iconCls="icon-add"
       title="添加">添加</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" onclick="editTopic()" plain="true" iconCls="icon-ok"
       title="修改">修改</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" onclick="delTopic()" plain="true" iconCls="icon-remove"
       title="删除">删除</a>|<label>名称:<input type="text" class="easyui-textbox" id="name"/></label>
    <a href="javascript:void(0)" class="easyui-linkbutton" onclick="reloadgrid()" plain="true" iconCls="icon-search"
       title="搜索"></a>
</div>
<div data-options="region:'center',title:'专题管理'" iconCls="icon-page_world">
    <div id="container">
        <table id="rGrid">
        </table>
    </div>
</div>

<div id="add_topic_dlg" title="添加专题" class="easyui-dialog" style="width:850px; height:auto; padding: 10px;"
     closed="true">
    <form id="add_tag_form" method="post">
        <input id="poster_url" type="hidden" value=""/>
    	<table class="table">
    		<tr>
    			<td><label>专题名称</label></td>
    			<td><input id="name10" name="name" class="easyui-textbox" required="true" type="text" value="" /></td>
    		</tr>
    		<tr>
    			<td><label>状态</label></td>
    			<td>
    				<select class="easyui-combobox" id="is_published">
		                <option value="1">启用</option>
		                <option value="0">禁用</option>
		            </select>
    			</td>
    		</tr>
    		<tr>
    			<td><label>专题海报</label></td>
    			<td>
    				<input type="text" class="easyui-filebox" buttonText="选择文件" id="fileIpt">&nbsp;&nbsp;<a class="easyui-linkbutton" onclick="startUpload()">上传</a>
	                <ul class="list-group" id="fileList">
	                </ul>
    			</td>
    		</tr>
    		<tr>
    			<td><label>资源检索</label></td>
    			<td>
    				<div id="cc"  class="easyui-layout" style="width:630px;height:300px;align:center;">
	                <div data-options="region:'west',title:'资源库',split:true" style="width:210px;">
	                     <div id="resourceTree"></div>
	                </div>
	                <div data-options="region:'center',title:'待选资源'" style="padding:5px;">
	<!--                               资源名称： <input class="easyui-textbox" style="width:150px" id="sourcename"> -->
	<!--                     <a href="#" class="easyui-linkbutton" iconCls="icon-search" onclick="reloadResource();">搜索</a> -->
	                    <ul id="resource_list" class="easyui-datalist"></ul>
	                </div>
	                <div data-options="region:'east',title:'已选资源',split:true" style="width:210px;">
	                    <ul id="select_resource_list" class="easyui-datalist"></ul>
	                </div>
	            </div>
    			</td>
    		</tr>
    		<tr>
    			<td><label>描述</label></td>
    			<td>
    				<input id="descr" class="easyui-textbox" data-options="multiline:true" style="width:630px;height: 50px;">
    			</td>
    		</tr>
    	</table>
    	<a href="javascript:void(0)" class="easyui-linkbutton" onclick="saveTopic()" iconcls="icon-save">保存</a>
	    <a href="javascript:void(0)" class="easyui-linkbutton" onclick="javascript:$('#add_topic_dlg').dialog('close')"
	       iconcls="icon-cancel">取消</a>
    </form>
</div>

<div id="modify_topic_dlg" title="编辑专题" class="easyui-dialog" style="width: 850px; height: auto; padding: 10px;"
     closed="true">
    <form id="modify_topic_form" method="post">
        <input type="hidden" name="id"/>
        <table class="table">
    		<tr>
    			<td><label>专题名称</label></td>
    			<td><input id="name10" name="name" class="easyui-validatebox" required="true" type="text" value="" /></td>
    		</tr>
    		<tr>
    			<td><label>状态</label></td>
    			<td>
    				<select class="easyui-combobox publish_combobox" name="is_published" data-options="valueField:'id',textField:'text',panelHeight:'auto'">
		                <option value="1">启用</option>
		                <option value="0">禁用</option>
		            </select>
    			</td>
    		</tr>
    		<tr>
    			<td><label>专题海报</label></td>
    			<td>
    				<input id="fileList" name="fileList" class="easyui-validatebox" required="true" type="text" value="" />
    			</td>
    		</tr>
    		<tr>
    			<td><label>资源检索</label></td>
    			<td>
    				<div id="cc"  class="easyui-layout" style="width:630px;height:300px;align:center;">
		                <div data-options="region:'west',title:'资源库',split:true" style="width:210px;">
		                     <div id="resourceTree"></div>
		                </div>
		                <div data-options="region:'center',title:'待选资源'" style="padding:5px;">
		                    <ul id="resource_list" class="easyui-datalist"></ul>
		                </div>
		                <div data-options="region:'east',title:'已选资源',split:true" style="width:210px;">
		                    <ul id="select_resource_list" class="easyui-datalist"></ul>
		                </div>
		            </div>
    			</td>
    		</tr>
    		<tr>
    			<td><label>描述</label></td>
    			<td>
    				<input id="descr" name="description" class="easyui-validatebox" data-options="multiline:true" style="width:630px;height:50px">
    			</td>
    		</tr>
    	</table>
    	<a href="javascript:void(0)" class="easyui-linkbutton" onclick="modifyTopic()" iconcls="icon-save">保存</a>
	    <a href="javascript:void(0)" class="easyui-linkbutton" onclick="javascript:$('#modify_topic_dlg').dialog('close')"
	       iconcls="icon-cancel">取消</a>
    </form>
</div>
</body>
