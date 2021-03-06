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
    <script type="text/javascript" src="../../js/admin/user/user.js"></script>
    </head>
<body>
<div data-options="region:'center',title:'用户管理'">
    <div id="container">
        <table id="user_table"></table>
    </div>
</div>
<div id="tb" style="padding:3px">
    <div style="margin-bottom: 5px;">
    <a href="#" onclick="newUser();" class="easyui-linkbutton" data-options="iconCls:'icon-add'">添加</a>
    <a href="#" onclick="delUsers();" class="easyui-linkbutton" data-options="iconCls:'icon-cancel'">删除</a>
        </div>
        <div>
            用户名: <input class="easyui-textbox" style="width:150px" id="username">
            学号/教工号: <input class="easyui-textbox" style="width:150px" id="number">
            部门:
            <input class="easyui-combotree" panelHeight="200px" style="width:150px" id="department_id"/>
            身份:
            <select class="easyui-combobox" panelHeight="auto" style="width:100px" id="identity">
                <option value="">全部</option>
                <option value="1">学生</option>
                <option value="2">老师</option>
            </select>
            <a href="#" class="easyui-linkbutton" iconCls="icon-search" onclick="reloadgrid();">搜索</a>
        </div>
</div>

<div id="add_user_dlg" class="easyui-dialog" style="width: 400px; height: auto; padding: 10px 20px;"
     closed="true" buttons="#add_user_dlg_buttons">
    <div class="ftitle">
        添加用户
    </div>
    <form id="add_user_form" method="post">
        <div class="fitem">
            <label>
                账号&nbsp;
            </label>
            <input name="name" id="name" class="easyui-validatebox" missingMessage="账号必须填写" required="true" type="text"  />
        </div>
        <div class="fitem">
            <label>
                中文名
            </label>
            <input name="cn_name"  class="easyui-validatebox" type="text"  />
        </div>
        <div class="fitem">
            <label>
                密码&nbsp;
            </label>
            <input name="password" type="password" class="easyui-validatebox" missingMessage="账号必须填写" required="true" type="text" id="password"/>
        </div>
        <div class="fitem">
            <label>
                邮箱&nbsp;
            </label>
            <input name="email" class="easyui-validatebox" validType="email" invalidMessage="请填写正确的邮件格式" />
        </div>
        <div class="fitem">
            <label>
                手机&nbsp;
            </label>
            <input name="phone" class="easyui-validatebox" required="true" type="text" />
        </div>
        <div class="fitem">
            <label>
                编号&nbsp;
            </label>
            <input name="number" class="easyui-validatebox" type="text" />
        </div>
        <div class="fitem">
            <label>
                身份&nbsp;
            </label>
            <input class="easyui-combobox identity_combobox" data-options="valueField:'id',textField:'text',panelHeight:'auto'" name="identity"   />
        </div>
        <div class="fitem">
            <label>
                用户组</label>
            <input class="easyui-combotree group_tree" multiple="true" name="group"/>
        </div>
        <div class="fitem">
            <label>
                部门&nbsp;</label>
            <input class="easyui-combotree department_tree" name="department_id"/>
        </div>
        <div class="fitem">
            <label>
                性别&nbsp;
            </label>
            <input class="easyui-combobox gender_combobox" data-options="valueField:'id',textField:'text',panelHeight:'auto'" name="gender" required="true"  />
        </div>
        <div class="fitem">
            <label>
                存储(G)
            </label>
            <input name="disk_size" class="easyui-validatebox" type="text" />
        </div>
        <div class="fitem">
            <label>
                备注
            </label>
            <input name="description" class="easyui-validatebox" type="text" />
        </div>
    </form>
</div>

<div id="add_user_dlg_buttons">
    <a href="javascript:void(0)" class="easyui-linkbutton" onclick="saveUser()" iconcls="icon-save">保存</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" onclick="javascript:$('#add_user_dlg').dialog('close')"
       iconcls="icon-cancel">取消</a>
</div>

<div id="modify_user_dlg" class="easyui-dialog" style="width: 400px; height: auto; padding: 10px 20px;"
     closed="true" buttons="#modify_user_dlg_buttons">
    <div class="ftitle">
        修改用户
    </div>
    <form id="modify_user_form" method="post">
        <div class="fitem">
            <label>
                账号&nbsp;
            </label>
            <input name="name" disabled="true" class="easyui-validatebox" required="true" type="text" style="width:200px;" />
        </div>
        <div class="fitem">
            <label>
                中文名
            </label>
            <input name="cn_name"  class="easyui-validatebox" type="text" style="width:200px;" />
        </div>
        <div class="fitem">
            <label>
                邮箱&nbsp;
            </label>
            <input name="email" class="easyui-validatebox" type="text" style="width:200px;"/>
        </div>
        <div class="fitem">
            <label>
                手机&nbsp;
            </label>
            <input name="phone" class="easyui-validatebox" type="text" style="width:200px;"/>
        </div>
        <div class="fitem">
            <label>
                编号&nbsp;
            </label>
            <input name="number" class="easyui-validatebox" type="text" style="width:200px;"/>
        </div>
        <div class="fitem">
            <label>
                身份&nbsp;
            </label>
            <input class="easyui-combobox identity_combobox" data-options="valueField:'id',textField:'text',panelHeight:'auto'" name="identity"  style="width:200px;" />
        </div>
        <div class="fitem">
            <label>
                用户组</label>
            <input class="easyui-combotree group_tree" multiple="true" name="group" style="width:200px;"/>
        </div>
        <div class="fitem">
            <label>
                部门 &nbsp;</label>
            <input class="easyui-combotree department_tree" name="department_id" style="width:200px;"/>
        </div>
        <div class="fitem">
            <label>
                性别&nbsp;
            </label>
            <input class="easyui-combobox gender_combobox" data-options="valueField:'id',textField:'text',panelHeight:'auto'" name="gender" required="true"  style="width:200px;"/>
        </div>
        <div class="fitem">
            <label>
                存储(G)
            </label>
            <input name="disk_size" class="easyui-validatebox" type="text" style="width:200px;"/>
        </div>
        <div class="fitem">
            <label>
                备注 
            </label>
            <input name="description" class="easyui-validatebox" type="text" style="width:200px;"/>
        </div>
        <input type="hidden" name="id"/>
    </form>
</div>

<div id="modify_user_dlg_buttons">
    <a href="javascript:void(0)" class="easyui-linkbutton" onclick="modifyUser()" iconcls="icon-save">保存</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" onclick="javascript:$('#modify_user_dlg').dialog('close')"
       iconcls="icon-cancel">取消</a>
</div>
</body>
