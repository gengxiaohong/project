/**
 * Created by ligson on 2015/8/17.
 *  "libId": "库id",
 "libName": "库名称",
 "categoryId": "分类id",
 "categoryName": "分类名称"
 "playNum": "点播数",
 "recommendNum": "推荐数",
 "collectNum": "收藏数"
 */
$(function () {
	loadChildResources();
});
function createChildRes(){
	$("#add_childres_dialog").dialog("open");
	initResourceList();
}
function delResource(metaId) {
    $.post("/bcms/proxy?url=resource/" + metaId + "&method=DELETE", {}, function (data) {
        if (data.id != undefined) {
            $("#rGrid").datagrid("reload");
        }
    }, "json");
}
function delResource() {
    var rows = $('#rGrid').datagrid("getSelections");
    if (rows.length > 0) {
        $.messager.confirm('确认', '确认删除?', function (data) {
            if (data) {
                for (var i = 0; i < rows.length; i++) {
                    $.post("/bcms/proxy", {method: "delete", url: "resource/" + rows[i].id + "/"}, function (result) {
                        var obj = $.parseJSON(result);
                        if (obj.success == false) {
                        	$.messager.alert("提示", "删除失败！", "info");
                        } else {
                        	loadChildResources();
                        }
                    });
                }
            }
        })
    } else {
        $.messager.alert("提示", "请选择要删除的行！", "info");
        return;
    }
}
function addMetaItems() {
    $(".items-container").append("<div class='items'>" + $(".items").html() + "</div>");
}

function addField() {
    $("#fieldHref").before("<br/><input type=\"text\" class=\"easyui-textbox\">");
}
function getParentId(){
	var url = location.search; //获取url中"?"符后的字串
	   if (url.indexOf("?") != -1) {    //判断是否有参数
	     return url.substr(1).split("=")[1];
	   }else{
		   $.messager.alert('提示','无法获取父资源信息','error');
	   }
}
function reloadgrid(ids) {
    $('#rGrid').datagrid('options').queryParams.id = ids;
    $("#rGrid").datagrid('reload');
}
// 子资源管理
function initResourceList() {
    $.post("/bcms/proxy", {method: "get", url: "resource/"}, function (result) {
        var obj = jQuery.parseJSON(result);
        if (obj.success==false) {
            $.messager.alert('提示',obj.msg,'error');
        } else {
            var rows = $('#select_resources_list').datalist("getData").rows;
            /*for (var j = 0; j < rows.length; j++) {
                for (var x = 0; x < obj.length; x++) {
                    if (rows[j].id == obj[x].id) {
                        obj[x].checked = true;
                    }
                }
            }*/
            for (var i = 0; i < rows.length; i++) {
                    var sIndex = $("#select_resources_list").datalist('getRowIndex', rows[i]);
                    $("#select_resources_list").datalist('deleteRow', sIndex);
            }
            $("#add_childres_dialog #resources_list").datalist({
                checkbox: true,
                singleSelect:false,
                textField: 'name',
                valueField: 'id',
                data: obj,
                onCheck: function (index, row) {
                    $("#add_childres_dialog #select_resources_list").datalist('appendRow', {'id': row.id, 'text': row.name});
                },
                onUncheck:function(index,row) {
                    var rows = $("#select_resources_list").datalist('getRows');
                    for (var i = 0; i < rows.length; i++) {
                        if (rows[i].id == row.id) {
                            var sIndex = $("#select_resources_list").datalist('getRowIndex', rows[i]);
                            $("#select_resources_list").datalist('deleteRow', sIndex);
                        }
                    }
                }
            });
        }
    });
}
function saveResource(){
	var rows = $("#select_resources_list").datalist('getRows');
	var pId = getParentId();
	 ajaxLoading();
	for(var i=0;i<rows.length;i++){
		$.post("/bcms/proxy", {
            method: "PUT",
            url: "resource/"+rows[i].id,
            parent_id:pId
        }, function (data) {
            if (data.id != undefined) {
            	
            } else {
                $.messager.alert('提示',"添加子资源异常!",'error');
            }
        }, "json");
	}
	ajaxLoadEnd();
	$("#add_childres_dialog").dialog("close");
	loadChildResources();
}
function loadChildResources(){
	$.post("/bcms/proxy", {method: "get", url: "resource/" + getParentId() + "/"}, function (result) {
	    var obj = $.parseJSON(result);
	    if (obj.success == false) {
	    	 $.messager.alert("提示", "获取资源明细失败！", "error");
	    } else {
	    	var ds = JSON.stringify(obj.children);
	    	var dat = [{"id":"1","name":"abc"},{"id":"2","name":"abcd"}];
	    	var childDs = {"rows":$.parseJSON(ds),"total":obj.children.length}
	    	$("#rGrid").datagrid('loadData',childDs);
	    }
	});
}