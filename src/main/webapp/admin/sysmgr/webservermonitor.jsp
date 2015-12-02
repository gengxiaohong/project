<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2015/8/12
  Time: 21:20
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<head>
	<jsp:include page="../../layout/admin/adminheader.jsp"/>
	<script type="text/javascript" src="../../js/Highcharts-4.1.7/js/highcharts.js"></script>
</head>
<body>
	<div data-options="region:'center',title:'Web服务状态监测'" iconCls="icon-control_equalizer_blue" style="padding:10px;">
	           <%-- <div id="container">
	            </div>--%>
	<iframe style="width:100%;height: 650px;" src="http://42.62.52.40:8001/#/accounts"></iframe>
	
	</div>
</body>
