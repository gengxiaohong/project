<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%-- <%@ taglib uri="http://www.rapid-framework.org.cn/rapid" prefix="rapid" %> --%>
<!DOCTYPE html>
<html lang="zh-cn">
<head>
    <!-- <title><rapid:block name="title"/>社会化功能管理</title> -->
    <title>社会化功能管理</title>
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
        .easyui-accordion ul {
			list-style-type: none;
			margin: 0px;
		}
		
		.easyui-accordion ul li {
			padding: 0px;
		}
		
		.easyui-accordion ul li a {
			text-decoration: none;
			color: inherit;
		}
		
		.easyui-accordion ul li div.hover a {
			color: #416AA3;
		}
		
		.easyui-accordion ul li div.selected {
			border: 1px solid #99BBE8;
			background: #E0ECFF;
			cursor: default;
		}
		
		.easyui-accordion ul li div.selected a {
			color: #416AA3;
			font-weight: bold;
		}
		#tabs  div{
			overflow:hidden;
		}
    </style>
    <%-- <rapid:block name="head"/> --%>
</head>
<body class="easyui-layout">
<jsp:include page="../../layout/admin/adminbody.jsp"/>
<div data-options="region:'west',split:true" title="系统菜单" style="width:200px;" iconCls="icon-application_side_boxes">
    <div class="easyui-accordion" id="treeMenu" fit="true">
        <div iconCls="icon-script" title="社会化管理" style="padding:5px 20px">
            <ul class="easyui-tree">
                <!-- <li><a target="mainFrame" id="inf" class="easyui-linkbutton" style="width:100%;text-align:left;"  iconCls="icon-user" plain="true" href="../../admin/socialmgr/informationMgr.jsp"><span>资讯管理</span></a></li>
                <li><a  target="mainFrame" id="com" class="easyui-linkbutton"  style="width:100%;text-align:left;"  iconCls="icon-edit" plain="true"  href="../../admin/socialmgr/commentMgr.jsp"><span>评论管理</span></a></li>
                <li><a  target="mainFrame" id="sco" class="easyui-linkbutton"  style="width:100%;text-align:left;"  iconCls="icon-user" plain="true"  href="../../admin/socialmgr/scoreMgr.jsp"><span>评分管理</span></a></li>
                <li><a  target="mainFrame" id="tag" class="easyui-linkbutton"  style="width:100%;text-align:left;"  iconCls="icon-user" plain="true"  href="../../admin/socialmgr/tagMgr.jsp"><span>标签管理</span></a></li>
                <li><a  target="mainFrame" id="not" class="easyui-linkbutton"  style="width:100%;text-align:left;"  iconCls="icon-user" plain="true"  href="../../admin/socialmgr/noteMgr.jsp"><span>笔记管理</span></a></li>
                <li><a  target="mainFrame" id="que" class="easyui-linkbutton"  style="width:100%;text-align:left;"  iconCls="icon-user" plain="true"  href="../../admin/socialmgr/questionMgr.jsp"><span>提问管理</span></a></li>
                <li><a  target="mainFrame" id="mes" class="easyui-linkbutton"  style="width:100%;text-align:left;"  iconCls="icon-user" plain="true"  href="../../admin/socialmgr/messageMgr.jsp"><span>站内消息管理</span></a></li> -->
            	<li><a target="mainFrame" href="../../admin/socialmgr/informationMgr.jsp">资讯管理</a></li>
                <li><a target="mainFrame" href="../../admin/socialmgr/commentMgr.jsp">评论管理</a></li>
                <li><a target="mainFrame" href="../../admin/socialmgr/scoreMgr.jsp">评分管理</a></li>
                <li><a target="mainFrame" href="../../admin/socialmgr/tagMgr.jsp">标签管理</a></li>
                <li><a target="mainFrame" href="../../admin/socialmgr/noteMgr.jsp">笔记管理</a></li>
                <li><a target="mainFrame" href="../../admin/socialmgr/questionMgr.jsp">提问管理</a></li>
                <li><a target="mainFrame" href="../../admin/socialmgr/messageMgr.jsp">站内消息管理</a></li>
            </ul>
        </div>

    </div>
</div>

<%-- <div data-options="region:'center',title:'<rapid:block name="mainName"/>'" iconCls="<rapid:block name="mainIcon"/>">
    <rapid:block name="body"/>
</div> --%>
<div data-options="region:'center',title:'社会化功能管理'" iconCls="icon-user">
    <div id="tabs" class="easyui-tabs" data-options="border:false,fit:true">
			<div title="资讯管理">
				<iframe id="contentPage" width="100%" height="100%"
				 frameborder="0"  scrolling="no" marginheight="0" marginwidth="0" src="../../admin/socialmgr/informationMgr.jsp"></iframe>
			</div>
	</div>
</div>
<script type="text/javascript">
	/* $(function(){
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
	}) */
	/**
	 * 
	 */
	$(function() {
		InitLeftMenu();
	})

	function InitLeftMenu() {
		$('.easyui-accordion li a').removeClass("tree-node-selected");
		$('.easyui-accordion li:eq(0) div').addClass("tree-node-selected");
		$('.easyui-accordion li a').click(function() {
			var tabTitle = $(this).text();
			var url = $(this).attr("href");
			addTab(tabTitle, url);
			$('.easyui-accordion li div').removeClass("tree-node-selected");
			$(this).parent().addClass("selected");
		}).hover(function() {
			$(this).parent().addClass("hover");
		}, function() {
			$(this).parent().removeClass("hover");
		});
	}

	function addTab(subtitle, url) {
		if (url == '' || url == null) {
			return;
		}
		if (!$('#tabs').tabs('exists', subtitle)) {
			$('#tabs').tabs('add', {
				title : subtitle,
				content : createFrame(url),
				closable : true

			});
		} else {
			$('#tabs').tabs('select', subtitle);
			var currTab = self.parent.$('#tabs').tabs('getSelected'); 
			$('#tabs').tabs('update', {
				tab : currTab,
				options : {
					content : createFrame(url)
				}
			});
		}
	}

	function createFrame(url) {
		var s = '<iframe name="mainFrame" scrolling="no" frameborder="0"  src="'
				+ url + '" style="width:100%;height:100%; "></iframe>';
		return s;
	}
</script>
</body>
</html>
