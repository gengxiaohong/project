<%--
  Created by IntelliJ IDEA.
  User: ligson
  Date: 2015/8/11
  Time: 15:47
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://www.rapid-framework.org.cn/rapid" prefix="rapid" %>
<rapid:override name="title">创建资源</rapid:override>
<rapid:override name="head">
    <script type="text/javascript" src="../../js/admin/rmgr.js"></script>
    <script type="text/javascript" src="../../js/spark-md5.js"></script>
    <script type="text/javascript" src="../../js/common/fileutils.js"></script>
    <script type="text/javascript" src="http://42.62.52.40:8000/static/flow.js"></script>
    <script type="text/javascript" src="../../js/admin/resourcemgr/createresource.js"></script>
</rapid:override>
<rapid:override name="mainName">创建资源</rapid:override>
<rapid:override name="mainIcon">icon-page_world</rapid:override>
<rapid:override name="body">
     <form id="createResourceForm">
     	<input id="subMeta10" type="hidden" value=""/>
        <table >
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
                <td><label>资源库</label></td>
                <td><select id="resourceTree" url="/bcms/proxy?url=resourcelibrary/&method=GET" class="easyui-combotree"
                            data-options="method:'POST',required:true"
                            style="width:200px;"></select></td>
            </tr>
            <tr>
                <td><label>资源分类</label></td>
                <td><select id="tagTree" url="/bcms/proxy?url=tag/&method=GET" class="easyui-combotree" multiple="true"
                            data-options="method:'POST',required:true"
                            style="width:200px;"></select></td>
            </tr>
            <tr>
                <td><label>标签:</label></td>
                <td><input id="tagname" type="text" class="easyui-textbox" style="width:200px;"/></td>
            </tr>
            <tr>
                <td><label>文件:</label></td>
                <td><input type="text" class="easyui-filebox" buttonText="选择文件" id="fileIpt">&nbsp;&nbsp;<a class="easyui-linkbutton" onclick="startUpload()">上传</a></td>
            </tr>
            <tr>
                <td></td>
                <td>
                    <ul class="list-group" id="fileList">
                    </ul>
                </td>
            </tr>
           
            <tr>
                <td colspan="2"  style="text-align: center;padding:10px;">
                    <a class="easyui-linkbutton" iconCls="icon-ok" onclick="submitFormforCreateResource()">提交</a>
                    <a class="easyui-linkbutton" iconCls="icon-back" onclick="forwardCldList()">子资源列表</a>
                </td>
            </tr>
        </table>
    </form>
</rapid:override>

<!-- extends from base.jsp -->
<%@ include file="../../layout/admin/rmgr-base.jsp" %>

