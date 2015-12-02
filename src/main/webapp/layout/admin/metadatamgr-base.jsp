<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="zh-cn">
<head>
    <title>元数据管理</title>
    <jsp:include page="../../layout/admin/adminheader.jsp"/>
    <script src="../../js/admin/metadata/left_tree.js" type="text/javascript"></script>
    <style type="text/css">
        .ftitle {
            font-size: 14px;
            font-weight: bold;
            padding: 5px 0;
            margin-bottom: 10px;
            border-bottom: 1px solid #ccc;
        }

        .fitem {
            margin-bottom: 5px;
        }

        .fitem label {
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
</head>
<body class="easyui-layout">
<jsp:include page="../../layout/admin/adminbody.jsp"/>
<div data-options="region:'west',split:true" title="系统菜单" style="width:200px;" iconCls="icon-application_side_boxes">
    <div class="easyui-accordion" id="treeMenu" fit="true">
        <div iconCls="icon-script" title="元数据" style="padding:5px 20px">
        	<div id="metatreebar">
	            <a href="#" class="easyui-linkbutton" plain="true" iconCls="icon-application_add"
	               onclick="addMetaCategory()">分类</a>
	            <a href="#" class="easyui-linkbutton" plain="true" iconCls="icon-add" onclick="addMetaLib()">标准</a>
	            <a href="#" class="easyui-linkbutton" plain="true" iconCls="icon-20130408025545236_easyicon_net_30"
	               onclick="delMeta();">删除</a>
	            <a href="#" class="easyui-linkbutton" plain="true" iconCls="icon-edit"
	               onclick="editMeta();">编辑</a>
	        </div>
	        <ul id="metadata_tree" toolbar="#metatreebar">
	        </ul>
	    </div>
	    <div iconCls="icon-script" title="结构类型" style="padding:5px 20px">
	        <ul class="easyui-tree" id="structure_tree">
	            <li><a target="mainFrame" ghref="../../admin/metadata/structureMgr.jsp">结构类型管理</a></li>
	        </ul>
	    </div>
	    <div iconCls="icon-script" title="词汇表" style="padding:5px 20px">
	        <ul id="vocabularydata_tree" class="easyui-tree">
	            <li><a target="mainFrame" ghref="../../admin/metadata/dicmgr.jsp?type=1">词汇表管理</a></li>
	        </ul>
	    </div>
	    <div iconCls="icon-script" title="编码表" style="padding:5px 20px">
	        <ul id="encodedata_tree" class="easyui-tree">
	            <li><a target="mainFrame" ghref="../../admin/metadata/codemgr.jsp?type=1">编码表管理</a></li>
	        </ul>
	    </div>
	</div>
</div>

<div id="addMetaLibDlg" class="easyui-dialog" title="添加元数据标准" style="width:300px;height:280px;" closed="true">
    <form>
        <input type="hidden" name="category_id" value="" id="categoryId10">
        <table class="table">
            <tr>
                <td><label>标准名称:</label></td>
                <td><input type="text" required="true" class="easyui-textbox" id="name10"/></td>
            </tr>
            <tr>
                <td><label>标准描述:</label></td>
                <td><input type="text" class="easyui-textbox" multiline="true" style="height:60px"
                           id="desc10"/>
                </td>
            </tr>
            <tr>
                <td><label>版本:</label></td>
                <td><input type="text" required="true" class="easyui-textbox"
                           id="version10" validType="number"/>
                </td>
            </tr>
            <tr>
                <td colspan="2" style="text-align:center;">
                    <a class="easyui-linkbutton" onclick="submitAddMetaLib()">提交</a>
                    <a class="easyui-linkbutton" onclick="$('#addMetaLibDlg').dialog('close')">取消</a>
                </td>
            </tr>
        </table>
    </form>
</div>

<div id="editMetaLibDlg" class="easyui-dialog" title="编辑元数据标准" style="width:300px;height:350px;" closed="true">
    <form>
        <input type="hidden" name="category_id" value="" id="categoryId11">
        <input type="hidden" name="id11" id="id11">
        <table class="table">
            <tr>
                <td><label>标准名称:</label></td>
                <td><input type="text" required="true" class="easyui-textbox" id="name11"/></td>
            </tr>
            <tr>
                <td><label>标准描述:</label></td>
                <td><input type="text" class="easyui-textbox" multiline="true" style="height:60px"
                           id="desc11"/>
                </td>
            </tr>
            <tr>
                <td><label>版本:</label></td>
                <td><input type="text" required="true" class="easyui-textbox"
                           id="version11" validType="number"/>
                </td>
            </tr>
            <tr>
                <td colspan="2" style="text-align:center;">
                    <a class="easyui-linkbutton" onclick="submitModifyMetaLib()">提交</a>
                    <a class="easyui-linkbutton" onclick="$('#editMetaLibDlg').dialog('close')">取消</a>
                </td>
            </tr>
        </table>
    </form>
</div>

<div id="addMetaCategoryDlg" class="easyui-dialog" title="添加元数据标准分类" style="width:350px;height:250px;" closed="true">
    <form>
        <input type="hidden" name="parent_id" value="">
        <table class="table">
            <tr>
                <td><label>元数据分类名称:</label></td>
                <td><input type="text" required="true" id="categoryName1" class="easyui-textbox"/></td>
            </tr>
            <tr>
                <td><label>元数据分类描述:</label></td>
                <td><input type="text" required="true" id="categoryDesc1" class="easyui-textbox" multiline="true"
                           style="height:60px"/>
                </td>
            </tr>

            <tr>
                <td colspan="2" style="text-align:center;">
                    <a class="easyui-linkbutton" onclick="submitAddMetaCategory()">提交</a>
                    <a class="easyui-linkbutton" onclick="$('#addMetaCategoryDlg').dialog('close')">取消</a>
                </td>
            </tr>
        </table>
    </form>
</div>

<div id="editMetaCategoryDlg" class="easyui-dialog" title="编辑元数据标准分类" style="width:350px;height:auto;" closed="true">
    <form>
        <input type="hidden" id="parent_id2" value="">
        <input type="hidden" id="id2" value="">
        <table class="table">
            <tr>
                <td><label>元数据分类名称:</label></td>
                <td><input type="text" required="true" id="categoryName2" class="easyui-textbox"/></td>
            </tr>
            <tr>
                <td><label>元数据分类描述:</label></td>
                <td><input type="text" required="true" id="categoryDesc2" class="easyui-textbox" multiline="true"
                           style="height:60px"/>
                </td>
            </tr>

            <tr>
                <td colspan="2" style="text-align:center;">
                    <a class="easyui-linkbutton" onclick="submitModifyMetaCategory()">提交</a>
                    <a class="easyui-linkbutton" onclick="$('#editMetaCategoryDlg').dialog('close')">取消</a>
                </td>
            </tr>
        </table>
    </form>
</div>
<div data-options="region:'center'">
    <div id="tabs" class="easyui-tabs" data-options="border:false,fit:true">
		<div title="元数据">
			<iframe id="contentPage" width="100%" height="100%"
			 frameborder="0"  scrolling="no" marginheight="0" marginwidth="0" src="../../admin/metadata/metadataMgr.jsp"></iframe>
		</div>
	</div>
</div>
<script type="text/javascript">
	$(function() {
		InitLeftMenu();
	})

	function InitLeftMenu() {
		$('.easyui-accordion li a').removeClass("tree-node-selected");
		$('.easyui-accordion li:eq(0) div').addClass("tree-node-selected");
		$('.easyui-accordion li a').click(function() {
			var tabTitle = $(this).text();
			var url = $(this).attr("ghref");
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
