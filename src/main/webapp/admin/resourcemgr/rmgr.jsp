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
    <script type="text/javascript" src="../../js/spark-md5.js"></script>
    <script type="text/javascript" src="../../js/common/fileutils.js"></script>
    <script type="text/javascript" src="http://42.62.52.40:8000/static/flow.js"></script>
    <script type="text/javascript" src="../../js/admin/resourcemgr/createresource.js"></script>
</rapid:override>
<rapid:override name="mainName">资源库统计</rapid:override>
<rapid:override name="mainIcon">icon-page_world</rapid:override>
<rapid:override name="body">
    <div id="rGridTbr" style="height:30px;line-height:30px;padding-bottom:3px;">
        <div style="float:left;">
        	<a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-folder_up" title="上传" onclick="createResource()">上传资源</a>
        	<a href="javascript:void(0)" class="easyui-linkbutton" onclick="publishResource()" iconCls="icon-application_side_expand"
           title="发布">发布</a>
	        <a href="javascript:void(0)" class="easyui-linkbutton" onclick="passResource()" iconCls="icon-ok" title="审核">审核</a>
	        <a href="javascript:void(0)" class="easyui-linkbutton" onclick="delResource()"  iconCls="icon-remove" title="删除">批量删除</a>
        </div>
        <div style="float:right;">
        	<input class="easyui-searchbox" prompt="按名称过滤..." searcher="reloadgrid" id="name" style="width:200px;height:24px;"/>
        </div>
        <div style="clear:both;"></div>
    </div>
    <!--创建资源  -->
    <div class="easyui-dialog" id="createResourcesDialog" style="width:400px;height:300px;padding-top:5px;overflow:auto;"
   data-options="title:'创建资源',collapsible:true,modal:true,closed:true,buttons:'#add-dlg-buttons'">
  	<form id="createResourceForm">
     	<input id="subMeta10" type="hidden" value=""/>
        <table style="width:100%;">
            <tr>
                <td><label>资源名:</label></td>
                <td><input id="name10" type="text" class="easyui-textbox" required="true" style="width:200px;"/></td>
            </tr>
            <tr>
                <td><label>类型:</label></td>
                <td>
                    <select id="kind10" class="easyui-combobox" data-options="editable:false,required:true" style="width:200px;">
                        <option value="0">普通</option>
                        <option value="1">课程</option>
                        <option value="2">课时</option>
                        <option value="3">素材</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td><label>资源库:</label></td>
                <td><select id="resourceTree" url="/bcms/proxy?url=resourcelibrary/&method=GET" class="easyui-combotree"
                            data-options="method:'POST',required:true"
                            style="width:200px;"></select></td>
            </tr>
            <tr>
                <td><label>资源分类:</label></td>
                <td><select id="tagTree" url="/bcms/proxy?url=tag/&method=GET" class="easyui-combotree" multiple="true"
                            data-options="method:'POST',required:true"
                            style="width:200px;"></select></td>
            </tr>
            <tr>
                <td><label>标签:</label></td>
                <td><input id="tagname" type="text" class="easyui-textbox" style="width:200px;"/></td>
            </tr>
            <tr>
                <td><label>资源文件:</label></td>
                <td><input type="text" class="easyui-filebox" buttonText="选择文件" id="fileIpt">&nbsp;&nbsp;<a class="easyui-linkbutton" onclick="startUpload()">上传</a></td>
            </tr>
            <tr>
                <td colspan="2" id="fileList">
                </td>
            </tr>
            <tr>
                <td><label>海报:</label></td>
                <td><input type="text" class="easyui-filebox" buttonText="选择文件" id="fileIpt2">&nbsp;&nbsp;<a class="easyui-linkbutton" onclick="startUpload2()">上传</a></td>
            </tr>
            <tr>
                <td colspan="2" id="fileList2">
                </td>
            </tr>
        </table>
    </form>
  </div>
  <!--资源编辑  -->
  <div class="easyui-dialog" id="editResourcesDialog" style="width:400px;height:300px;padding-top:5px;overflow:auto;"
   data-options="title:'编辑资源',collapsible:true,modal:true,closed:true,buttons:'#edit-dlg-buttons'">
  	<form id="editResourceForm">
        <table class="table">
            <tr>
                <td class="col-md-2"><label>资源名:</label></td>
                <td class="col-md-10"><input id="name11" type="text" class="easyui-textbox" required="true"/></td>
            </tr>
            <tr>
                <td><label>类型:</label></td>
                <td>
                    <select id="kind11" class="easyui-combobox" editable="false" style="width:200px;">
                        <option value="0">普通</option>
                        <option value="1">课程</option>
                        <option value="2">课时</option>
                        <option value="3">素材</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td><label>资源库</label></td>
                <td><select id="resourceTree2" style="width:200px;" url="/bcms/proxy?url=resourcelibrary/&method=GET" class="easyui-combotree"
                            data-options="method:'POST',required:true"
                            style="width:200px;"></select></td>
            </tr>
            <tr>
                <td><label>资源分类</label></td>
                <td><select id="tagTree2" url="/bcms/proxy?url=tag/&method=GET" class="easyui-combotree" multiple="true"
                            data-options="method:'POST',required:true"
                            style="width:200px;"></select></td>
            </tr>
            <tr>
                <td><label>标签:</label></td>
                <td><input id="tagname2" type="text" class="easyui-textbox" style="width:200px;"/></td>
            </tr>
        </table>
        <input type="hidden" id="status11" value="">
        <input type="hidden" id="resourcelibrary_id11" value="">
        <input type="hidden" id="parent_id11" value="">
        <input type="hidden" id="recommend_number11" value="">
        <input type="hidden" id="click_number11" value="">
        <input type="hidden" id="id11" value="">
    </form>
  </div>
  <div id="add-dlg-buttons">
		<a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-ok" onclick="submitForm()">提交</a>
		<a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-cancel" onclick="javascript:$('#createResourcesDialog').dialog('close')">Cancel</a>
	</div>
	<div id="edit-dlg-buttons">
		<a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-ok" onclick="submitForm2()">提交</a>
		<a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-cancel" onclick="javascript:$('#editResourcesDialog').dialog('close')">Cancel</a>
	</div>
	<!--data grid  --> 
    <table id="rGrid" class="easyui-datagrid" data-options="fit:true">
    </table>
</rapid:override>

<!-- extends from base.jsp -->
<%@ include file="../../layout/admin/rmgr-base.jsp" %>