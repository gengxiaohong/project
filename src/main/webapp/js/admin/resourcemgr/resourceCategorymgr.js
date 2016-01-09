$(function () {
    $("#tag_tree").tree({
    	url: "/bcms/proxy?url=tag&parent_id=0&method=GET",
        lines: true,
        formatter: function (node) {
            return node.name;
        },
        onContextMenu: function (e, node) {
            showContextMenu(e, node);
        },
        onSelect:function(node){
        	var mg = $("#tag_tree_grid");
            if (mg) {
            	mg.datagrid({url:"/bcms/proxy?url=tag/"+node.id+"&method=GET"});
            }
        },  
        loadFilter: function (data, parent) {
        	if(data.rows!= undefined && data.rows != null) {
        		var rows = data.rows;
        		for (var i = 0; i < rows.length; i++) {
        			rows[i].iconCls = "icon-06";
                }
        		return data.rows;
        	}
        }
    });
    
    $("#tag_tree_grid").datagrid({
    	url: "/bcms/proxy?url=tag&parent_id=0&method=GET",
        idField: 'id',
        treeField: 'name',
        fitColumns: true,
        columns: [[
            {field: 'id', title: 'id', width: "10%"},
            {field: 'name', width: '60%', title: '分类名'},
            {field: 'parent_id', title: '分类名', hidden: true},
            {
                field: '_operate', width: '20%', align: 'center', title: '操作',
                formatter: function (value, row, index) {
                    return '<a class="tablelink" href="javascript:void(0)" onclick="clickModifyTag(' + row.id + ')">修改</a>&nbsp;&nbsp;<a class="tablelink" href="javascript:void(0)" onclick="delTag(' + row.id + ')">删除</a>';
                }
            }
        ]],
        loadFilter: function (data) {
        	if(data.rows != undefined && data.rows != null) {
        		return data;
        	} else {
        		var newdata = {};
        		newdata.total = data.children.length;
        		newdata.rows = data.children;
        		return newdata;
        	}
        }
    });
});

function showContextMenu(e, node) {
    e.preventDefault();
    $("#treeContextMenuforRCategory").menu("show", {
        left: e.pageX,
        top: e.pageY
    });
}

function addTag() {
    $("#add_tag_form").form('clear');
    $('#add_tag_dlg input[name=parent_id]').val("0");
    $("#add_tag_dlg").dialog("open");
}

function saveTag(){
	var node = $("#tag_tree").tree("getSelected");
    var name=$("#add_tag_dlg input[name=name]").val();
    var parent_id=$("#add_tag_dlg input[name=parent_id]").val();
    $.post("/bcms/proxy", {
        method: "post",
        url: "/tag/",
        name: name,
        parent_id: parent_id
    }, function (data) {
        var result = JSON.parse(data);
        if (!result.id) {
            $.messager.alert('提示',result.msg);
        } else {
            $('#add_tag_dlg').dialog('close');
            reloadTag(node);
        }
    });
}

function addSubTag() {
    var node = $("#tag_tree").tree("getSelected");
    $("#add_subtag_form").form('clear');
    if (node) {
    	$('#add_subtag_dlg input[name=parent_id]').val(node.id);
        $("#add_subtag_dlg").dialog("open");
    } else {
    	$.messager.alert("请选择父分类！");
        return;
    }
}

function saveSubTag(){
	var node = $("#tag_tree").tree("getSelected");
    var name=$("#add_subtag_dlg input[name=name]").val();
    var parent_id=$("#add_subtag_dlg input[name=parent_id]").val();
    $.post("/bcms/proxy", {
        method: "post",
        url: "/tag/",
        name: name,
        parent_id: parent_id
    }, function (data) {
        var result = JSON.parse(data);
        if (!result.id) {
            $.messager.alert('提示',result.msg);
        } else {
            $('#add_subtag_dlg').dialog('close');
            reloadTag(node);
        }
    });
}

//点击编辑分类
function clickModifyTag(id){
    $('#tag_tree_grid').datagrid('selectRecord', id);
    var row = $('#tag_tree_grid').datagrid('getSelected');
    if(row) {
        $('#modify_tag_dlg input[name=name]').val(row.name);
        $('#modify_tag_dlg input[name=id]').val(id);
        $('#modify_tag_dlg input[name=parent_id]').val(row.parent_id);
        $('#modify_tag_dlg').dialog('open').window('resize',{
        	left:($(window).width()-400)/2,
        	top:($(window).height()-120)/2
        });
    }else{
        $.messager.alert("提示", "请选择要编辑的行！", "info");
        return;
    }
}

function modifyTag(){
	var node = $("#tag_tree").tree("getSelected");
    var id=$("#modify_tag_dlg input[name=id]").val();
    var name=$("#modify_tag_dlg input[name=name]").val();
    var parent_id=$("#modify_tag_dlg input[name=parent_id]").val();
    $.post("/bcms/proxy", {method:"put",url: "tag/"+id,name:name,parent_id:parent_id}, function (result) {
        var obj= $.parseJSON(result);
        if (!obj.id) {
        	 $.messager.alert('提示',obj.msg);
        } else {
            $('#modify_tag_dlg').dialog('close');
            reloadTag(node);
        }
    });
}

function delTag(id){
	var node = $("#tag_tree").tree("getSelected");
	$('#tag_tree_grid').datagrid('selectRecord', id);
    var row = $('#tag_tree_grid').datagrid('getSelected');
    if(row) {
        $.messager.confirm('确认', '确认删除?', function (data) {
            if(data) {
                $.post("/bcms/proxy", {method: "delete", url: "tag/" + id }, function (result) {
                    var obj= $.parseJSON(result);
                    if (obj.success==false) {
                    	$.messager.alert("删除失败!");
                    } else {
                    	reloadTag(node);
                    }
                });
            }
        });
    }else{
        $.messager.alert("提示", "请选择要删除的分类！", "info");
        return;
    }
}

function appendRCategory() {
	addSubTag();
}

function editRCategory() {
    var tree = $("#tag_tree");
    var selectNode = tree.tree("getSelected");
    if (selectNode) {
    	$('#modify_tag_dlg input[name=name]').val(selectNode.name);
        $('#modify_tag_dlg input[name=id]').val(selectNode.id);
        $('#modify_tag_dlg input[name=parent_id]').val(selectNode.parent_id);
        $('#modify_tag_dlg').dialog('open').window('resize',{
        	left:($(window).width()-400)/2,
        	top:($(window).height()-120)/2
        });
    } else {
        alert("选中要编辑的行！");
    }
}

function removeRCategory() {
    var tree = $("#tag_tree");
    var selectNode = tree.tree("getSelected");
    if (selectNode) {
    	$.messager.confirm('确认', '确认删除?', function (data) {
            if(data) {
                $.post("/bcms/proxy", {method: "delete", url: "tag/" + selectNode.id }, function (result) {
                    var obj= $.parseJSON(result);
                    if (obj.success==false) {
                    	$.messager.alert("删除失败!");
                    } else {
                    	$("#tag_tree").tree("reload");
                    }
                });
            }
        });
    }
}

function reloadTag(node){
	$("#tag_tree").tree("reload");

	if(node) {//选中父分类
		$("#tag_tree").tree("select", node.target);
	} else {
		$("#tag_tree_grid").datagrid("reload");
	}
}

function reloadSubTag(){
	$("#tag_tree_grid").datagrid("load",{
		name:$('#search_tag').val()
	});
}

