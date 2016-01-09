
<%--
  Created by IntelliJ IDEA.
  User: Ruby
  Date: 2015/8/18
  Time: 18:12
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://www.rapid-framework.org.cn/rapid" prefix="rapid" %>
<rapid:override name="title">资源分类管理</rapid:override>
<rapid:override name="head">
    <script type="text/javascript" src="../../js/admin/resourcemgr/resourceCategorymgr.js"></script>
</rapid:override>
<rapid:override name="mainName">资源分类管理</rapid:override>
<rapid:override name="mainIcon">icon-page_world</rapid:override>
<rapid:override name="body">

<div class="easyui-layout" fit="true">
     <div region="west" title="分类列表" style="width: 200px;">
         <ul id="tag_tree">
         </ul>
     </div>
     <div region="center" title="分类列表" >
         <div data-options="region:'center',title:'分类列表'" iconCls="icon-page_world">
         		<div id="cateogrytb" style="padding:5px;height:auto;background:#fafafa;border:1px solid #ccc">
      <input id="search_tag" class="easyui-searchbox" prompt="输入分类名搜索..." searcher="reloadSubTag" style="width: 300px;align-items: center; display: none;">
        <a href="#" class="easyui-linkbutton" plain="true" iconCls="icon-add" onclick="addTag()">分类</a>
        <a href="#" class="easyui-linkbutton" plain="true" iconCls="icon-add" onclick="addSubTag()">子分类</a>
    </div>
    <table style="width:auto;height:505px;" toolbar="#cateogrytb" id="tag_tree_grid" class="easyui-datagrid"
            data-options="singleSelect:true,collapsible:true" rownumbers="true"
         pagination="true">
 </div>
     </div>
 </div>
      
<div id="treeContextMenuforRCategory" class="easyui-menu" style="width:120px;">
    <div onclick="appendRCategory()" data-options="iconCls:'icon-add'">添加</div>
    <div onclick="removeRCategory()" data-options="iconCls:'icon-remove'">删除</div>
    <div onclick="editRCategory()" data-options="iconCls:'icon-edit'">编辑</div>
</div>

<div id="add_tag_dlg" class="easyui-dialog" style="width: 400px; height: 120px; padding: 10px 20px;"
     data-options="closed:true,title:'添加分类'" buttons="#add_tag_dlg_buttons">
    <form id="add_tag_form" method="post">
        <div class="fitem">
            <label>分类名</label>
            <input name="name" class="easyui-validatebox" required="true" type="text" />
            <input name="parent_id" type="hidden"/>
        </div>
    </form>
</div>
<div id="add_tag_dlg_buttons">
    <a href="javascript:void(0)" class="easyui-linkbutton" onclick="saveTag();" iconcls="icon-save">保存</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" onclick="javascript:$('#add_tag_dlg').dialog('close')" iconcls="icon-cancel">取消</a>
</div>

<div id="add_subtag_dlg" class="easyui-dialog" style="width: 400px; height: 120px; padding: 10px 20px;"
     data-options="closed:true,title:'添加子分类'" buttons="#add_subtag_dlg_buttons">
    <form id="add_subtag_form" method="post">
        <div class="fitem">
            <label>子分类名</label>
            <input name="name" class="easyui-validatebox" required="true" type="text" />
            <input name="parent_id" type="hidden"/>
        </div>
    </form>
</div>
<div id="add_subtag_dlg_buttons">
    <a href="javascript:void(0)" class="easyui-linkbutton" onclick="saveSubTag();" iconcls="icon-save">保存</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" onclick="javascript:$('#add_subtag_dlg').dialog('close')" iconcls="icon-cancel">取消</a>
</div>

<div id="modify_tag_dlg" class="easyui-dialog" style="width: 400px; height: 120px; padding: 10px 20px;"
     data-options="closed:true,title:'编辑分类'" buttons="#modify_tag_dlg_buttons">
    <form id="modify_tag_form" method="post">
        <div class="fitem">
            <label>
                名称
            </label>
            <input name="name" class="easyui-validatebox" required="true" type="text" />
            <input name="id" type="hidden"/>
            <input name="parent_id" type="hidden"/>
        </div>
    </form>
</div>
<div id="modify_tag_dlg_buttons">
    <a href="javascript:void(0)" class="easyui-linkbutton" onclick="modifyTag();" iconcls="icon-save">保存</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" onclick="javascript:$('#modify_tag_dlg').dialog('close')"
       iconcls="icon-cancel">取消</a>
</div>
</rapid:override>

<!-- extends from base.jsp -->
<%@ include file="../../layout/admin/rmgr-base.jsp" %>