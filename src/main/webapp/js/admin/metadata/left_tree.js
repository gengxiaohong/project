/**
 * Created by Ruby on 2015/8/17.
 */
function ajaxLoadingforMetatree(){
    $("<div class=\"datagrid-mask\"></div>").css({display:"block",width:"100%",height:"100%"}).appendTo("#metadata_tree");
    $("<div class=\"datagrid-mask-msg\"></div>").html("正在处理，请稍候。。。").appendTo('#metadata_tree').css({display:"block",left:($('#metadata_tree').width() - 190) / 2,top:($('#metadata_tree').height() - 45) / 2});
}
function ajaxLoadEndforMetatree(){
    $(".datagrid-mask").remove();
    $(".datagrid-mask-msg").remove();
}

function addMetaLib() {
    var node = $("#metadata_tree").tree("getSelected");
    $("#add_metaLib_form").form('clear');
    if (node) {
        if (node.children_type) {
            $("#categoryId10").val(node.id);
            $("#addMetaLibDlg").dialog("open");
        } else {
            alert("请选择给元数据分类添加标准!");
            return;
        }
    } else {
        alert("请选择给元数据分类添加标准!");
        return;
    }
}


function addMetaCategory() {
    var node = $("#metadata_tree").tree("getSelected");
    $("#add_metaCategory_form").form('clear');
    var dlg = $("#addMetaCategoryDlg");
    if (node) {
        if (node.children_type) {
            dlg.find("input[name='parent_id']").val(node.id);
        } else {
            alert("您不能给元数据标准添加分类!");
            return;
        }
    }
    dlg.dialog("open");
}


function delMeta() {
    var node = $("#metadata_tree").tree("getSelected");
    if (node) {
        var url = node.children_type ? "metalibrarycategory/" + node.id : "metalibrary/" + node.id;
        $.post("/bcms/proxy", {url: url, method: "DELETE"}, function (data) {
            if (data.id != null) {
                $("#metadata_tree").tree("reload");
            } else {
                alert(data.msg);
            }
        }, "json");
    } else {
        alert("请选择要删除的元数据分类或者标准");
        return;
    }
}

function editMeta() {
    var node = $("#metadata_tree").tree("getSelected");
    if (node) {
        if (node.children_type) {
            $("#parent_id2").val(node.parent_id);
            $("#id2").val(node.id);
            $("#categoryName2").textbox("setValue", node.name);
            $("#categoryDesc2").textbox("setValue", node.description);
            $("#editMetaCategoryDlg").dialog("open");
        } else {
            $("#categoryId11").val(node.category_id);
            $("#id11").val(node.id);
            $("#desc11").textbox("setValue", node.description);
            $("#name11").textbox("setValue", node.name);
            $("#version11").textbox("setValue", node.version);
            $("#editMetaLibDlg").dialog("open");
        }
    } else {
        alert("请选择要编辑的元数据分类或者标准");
    }
}

function submitAddMetaLib() {
	if ($("#addMetaLibDlg").find("form").form("validate")) {
		var categoryId10 = parseInt($("#categoryId10").val());
	    if (categoryId10) {
	        var name10 = $("#name10").val();
	        var desc10 = $("#desc10").val();
	        var version10 = $("#version10").val();
	        $.post("/bcms/proxy", {
	            url: "metalibrary/",
	            method: "POST",
	            name: name10,
	            category_id: categoryId10,
	            version: version10,
	            description: desc10
	        }, function (data) {
	            if (data.id != null) {
	                $("#addMetaLibDlg").dialog("close");
	                $("#metadata_tree").tree("reload");
	            } else {
	                alert(data.msg);
	            }
	        }, "json");
	    }
	}
}

function submitModifyMetaLib() {
	if ($("#editMetaLibDlg").find("form").form("validate")) {
		var categoryId = parseInt($("#categoryId11").val());
	    var id = parseInt($("#id11").val());
	    var name = $("#name11").val();
	    var desc = $("#desc11").val();
	    var version = $("#version11").val();
	    $.post("/bcms/proxy", {
	        url: "metalibrary/" + id,
	        method: "put",
	        name: name,
	        category_id: categoryId,
	        version: version,
	        description: desc
	    }, function (data) {
	        if (data.id != null) {
	            $("#editMetaLibDlg").dialog("close");
	            $("#metadata_tree").tree("reload");
	        } else {
	            alert(data.msg);
	        }
	    }, "json");
	}
}

function submitAddMetaCategory() {
	if ($("#addMetaCategoryDlg").find("form").form("validate")) {
		var name = $("#categoryName1").textbox("getValue");
	    var desc = $("#categoryDesc1").textbox("getValue");
	    var parent_id = $("#addMetaCategoryDlg").find("input[name=parent_id]").val();
	    var params = {
	        url: "metalibrarycategory/",
	        method: "POST"
	    };
	    if (name) {
	        params.name = name;
	    } else {
	        return;
	    }
	    if (desc) {
	        params.description = desc;
	    }
	    if (parent_id) {
	        params.parent_id = parent_id;
	    }
	    $.post("/bcms/proxy", params, function (data) {
	        if (data.id != null) {
	            $("#addMetaCategoryDlg").dialog("close");
	            $("#metadata_tree").tree("reload");
	        } else {
	            if (data.success != null && data.success == false) {
	                alert(data.msg);
	            }
	        }
	    }, "json");
	}
}


function submitModifyMetaCategory() {
	if ($("#editMetaCategoryDlg").find("form").form("validate")) {
		var name = $("#categoryName2").textbox("getValue");
	    var desc = $("#categoryDesc2").textbox("getValue");
	    var parent_id = $("#parent_id2").val();
	    var id = $("#id2").val();
	    var params = {
	        url: "metalibrarycategory/" + id,
	        method: "put"
	    };
	    if (name) {
	        params.name = name;
	    } else {
	        return;
	    }
	    if (desc) {
	        params.description = desc;
	    }
	    if (parent_id) {
	        params.parent_id = parent_id;
	    }
	    $.post("/bcms/proxy", params, function (data) {
	        if (data.id != null) {
	            $("#editMetaCategoryDlg").dialog("close");
	            $("#metadata_tree").tree("reload");
	        } else {
	            if (data.success != null && data.success == false) {
	                alert(data.msg);
	            }
	        }
	    }, "json");
	}
}