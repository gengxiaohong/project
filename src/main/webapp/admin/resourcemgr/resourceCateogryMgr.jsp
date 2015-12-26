
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
    <script type="text/javascript" src="../../js/admin/social/tagmgr.js"></script>
</rapid:override>
<rapid:override name="mainName">资源分类管理</rapid:override>
<rapid:override name="mainIcon">icon-page_world</rapid:override>
<rapid:override name="body">
      <div id="tb" style="padding:5px;background:#fafafa;border:1px solid #ccc">
        <input id="search_tag" class="easyui-searchbox" prompt="输入标签名称搜索..." searcher="reloadTag" style="width: 300px;align-items: center; display: none;">
          <a href="#" onclick="clickAddTag();" class="easyui-linkbutton" plain="true" iconCls="icon-add">添加分类</a>
      </div>
      <div id="tag_tree_grid" fit="true"></div>


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

<div id="modify_tag_dlg" class="easyui-dialog" style="width: 400px; height: 120px; padding: 10px 20px;"
     data-options="closed:true,title:'编辑分类'" buttons="#modify_tag_dlg_buttons">
    <form id="modify_tag_form" method="post">
        <div class="fitem">
            <label>
                分类名
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