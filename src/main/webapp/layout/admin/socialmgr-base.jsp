<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://www.rapid-framework.org.cn/rapid" prefix="rapid" %>
<!DOCTYPE html>
<html lang="zh-cn">
<head>
    <title><rapid:block name="title"/>-社会化管理</title>
    <jsp:include page="../../layout/admin/adminheader.jsp"/>
    <style type="text/css">
        .ftitle
        {
            font-size: 14px;
            font-weight: bold;
            padding: 5px 0;
            margin-bottom: 10px;
            border-bottom: 1px solid #ccc;
        }
        .fitem
        {
            margin-bottom: 5px;
        }
        .fitem label
        {
            display: inline-block;
            width: 80px;
        }
        li{
        	list-style-type:none;
        }
        .active{
        	background:#E6E6E6;
        }
    </style>
    <rapid:block name="head"/>
</head>
<body class="easyui-layout">
<jsp:include page="../../layout/admin/adminbody.jsp"/>
<div data-options="region:'west',split:false" title="系统菜单" style="width:200px;" iconCls="icon-application_side_boxes">
    <div class="easyui-accordion" id="treeMenu" fit="true">
        <div iconCls="icon-script" title="社会化管理" style="padding:5px 20px">
            <ul>
                <li><a id="inf" class="easyui-linkbutton" style="width:100%;text-align:left;"  iconCls="icon-user" plain="true" href="./informationMgr.jsp"><span>资讯管理</span></a></li>
                <li><a id="com" class="easyui-linkbutton"  style="width:100%;text-align:left;"  iconCls="icon-edit" plain="true"  href="./commentMgr.jsp"><span>评论管理</span></a></li>
                <li><a id="sco" class="easyui-linkbutton"  style="width:100%;text-align:left;"  iconCls="icon-user" plain="true"  href="./scoreMgr.jsp"><span>评分管理</span></a></li>
                <li><a id="tag" class="easyui-linkbutton"  style="width:100%;text-align:left;"  iconCls="icon-user" plain="true"  href="./tagMgr.jsp"><span>标签管理</span></a></li>
                <li><a id="not" class="easyui-linkbutton"  style="width:100%;text-align:left;"  iconCls="icon-user" plain="true"  href="./noteMgr.jsp"><span>笔记管理</span></a></li>
                <li><a id="que" class="easyui-linkbutton"  style="width:100%;text-align:left;"  iconCls="icon-user" plain="true"  href="./questionMgr.jsp"><span>提问管理</span></a></li>
                <li><a id="mes" class="easyui-linkbutton"  style="width:100%;text-align:left;"  iconCls="icon-user" plain="true"  href="./messageMgr.jsp"><span>站内消息管理</span></a></li>
            </ul>
        </div>

    </div>
</div>

<div data-options="region:'center',title:'<rapid:block name="mainName"/>'" iconCls="<rapid:block name="mainIcon"/>">
    <rapid:block name="body"/>
</div>
<script type="text/javascript">
	$(function(){
		var currenURL = window.location.pathname;
		if('/bcms/admin/socialmgr/informationMgr.jsp'== currenURL){
			$('#inf').addClass('active');
		}
		if('/bcms/admin/socialmgr/commentMgr.jsp'== currenURL){
			$('#com').addClass('active');		
		}
		if('/bcms/admin/socialmgr/scoreMgr.jsp'== currenURL){
			$('#sco').addClass('active');
		}
		if('/bcms/admin/socialmgr/tagMgr.jsp'== currenURL){
			$('#tag').addClass('active');
		}
		if('/bcms/admin/socialmgr/noteMgr.jsp'== currenURL){
			$('#not').addClass('active');
		}
		if('/bcms/admin/socialmgr/questionMgr.jsp'== currenURL){
			$('#que').addClass('active');
		}
		if('/bcms/admin/socialmgr/messageMgr.jsp'== currenURL){
			$('#mes').addClass('active');
		}
	})
</script>
</body>
</html>
