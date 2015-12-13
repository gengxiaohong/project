/**
 * Created by Ruby on 2015/8/23.
 */
/**
 * Created by ligson on 2015/8/17.
 *   "id": "1",
 "name": "案例库1",
 "index": 2,
 "resourceNum": 12,
 "isVisible": true
 */
$(function () {
    $("#rGrid").datagrid({
    	rownumbers: true,
        singleSelect: true,
        url: "/bcms/proxy?url=special&method=GET",
        pagination: true,
        columns: [
            [
                {
                    field: 'id',
                    title: 'id',
                    width: 100,
                    sortable: true
                }, {
                field: 'name',
                title: '专题名称',
                width: 100,
                sortable: true
            }, {
                field: 'description',
                title: '描述',
                width: 100,
                sortable: true
            }, {
                field: 'is_published',
                title: '状态',
                width: 100,
                sortable: true,
                formatter:function(value){
                    if(value)
                    return '发布';
                    else
                    return '不发布';
                    }
            }
            ]
        ]
    });
});

function addTopic(){
	$("#add_tag_form").form("clear");
    $('#add_topic_dlg').dialog('open').dialog("setTitle", "添加专题");
    initResourceLibrary();
}
function initResourceLibrary() {
    $('#add_topic_dlg #resourceTree').tree({
        url: "/bcms/proxy?url=resourcelibrary/&method=GET",
        lines: true,
        onBeforeLoad: function (node, param) {
            ajaxLoading();
        },
        loadFilter: function (data) {
            return formatTreeData(data.rows);
        },
        onLoadSuccess: function (node, data) {
            ajaxLoadEnd();
        }, onClick: function (node) {
        	initResourceListByResourceLibrary(node);
        }
    });
}

function initResourceListByResourceLibrary(node) {
    $.post("/bcms/proxy", {method: "get", url: "resource/",library_id: node.id,page:1,rows:10000}, function (result) {
        var obj = jQuery.parseJSON(result);
        if (obj.success==false) {
            alert(obj.msg);
        } else {
            var rows = $('#select_resource_list').datalist("getData").rows;
            for (var j = 0; j < rows.length; j++) {
                for (var x = 0; x < obj.length; x++) {
                    if (rows[j].id == obj[x].id) {
                        obj[x].checked = true;
                    }
                }
            }
            $("#add_tag_form #resource_list").datalist({
                checkbox: true,
                singleSelect:false,
                textField: 'name',
                valueField: 'id',
                data: obj,
                onCheck: function (index, row) {
                    $("#add_tag_form #select_resource_list").datalist('appendRow', {'id': row.id, 'text': row.name});
                },
                onUncheck:function(index,row) {
                    var rows = $("#select_resource_list").datalist('getRows');
                    for (var i = 0; i < rows.length; i++) {
                        if (rows[i].id == row.id) {
                            var sIndex = $("#select_resource_list").datalist('getRowIndex', rows[i]);
                            $("#select_resource_list").datalist('deleteRow', sIndex);
                        }
                    }
                }
            });
        }
    });
}

function formatTreeData(data){
    var fin = [];
    for (var i = 0; i < data.length; i++) {
        var obj = data[i];
        obj.text = obj.name;
        if (obj.children && obj.children.length > 0) {
            obj.children = formatTreeData(obj.children);
        }
        fin.push(obj);
    }
    return fin;
}

function saveTopic(){
	var ff = $("#add_tag_form");
    if (!(waitFile.status && waitFile.hash)) {
        alert("请上传文件");
        return;
    }
    if (ff.form("validate")) {
        var name = $("#name10").textbox("getValue");
        var description = $("#descr").textbox("getValue");
        var rows = $('#select_resource_list').datalist("getData").rows;
        var is_published = $("#is_published").combotree("getValue");
        var resource_ids=[];
        for(var i=0;i<rows.length;i++){
        	resource_ids.push(rows[i].id);
        }
        
        $.post("/bcms/proxy", {
            method: "POST",
            url: "special/",
            name: name,
            description: description,
            resource_ids: JSON.stringify(resource_ids),
            is_published: is_published
        }, function (data) {
            if (data.id != undefined) {
                //alert("ok........");
                if (waitFile.fileId != null) {
                    $.post("/bcms/proxy", {
                        url: "file/detail/" + data.id,
                        method: "POST",
                        resource_id: data.id
                    }, function (data3) {
                        if (data3.id != undefined) {
                            submitSuccess(data3, data.id);
                        }
                    }, "json");
                } else {
                    $.post("/bcms/proxy", {
                        url: "file/" + waitFile.hash + "/checksum",
                        method: "GET"
                    }, function (data2) {
                        var fileId = data2.id;
                        if (fileId) {
                            $.post("/bcms/proxy", {
                                url: "file/detail/" + fileId,
                                method: "POST",
                                resource_id: data.id
                            }, function (data3) {
                                submitSuccess(data3, data.id);
                            }, "json");
                        }
                    }, "json");
                }
            } else {
                alert("资源创建失败!" + data.msg);
            }
        }, "json");
    } else {
        alert("表单参数不完整!");
    }
}

function submitSuccess(data3, resourceId) {
    if (data3.id != undefined) {
        alert("资源创建成功!");
        window.location.href = "/bcms/admin/appmgr/topicmgr.jsp";
    } else {
        alert("资源创建失败!");
    }
}

function editTopic(){
    var row = $('#rGrid').datagrid('getSelected');
    if (row) {
        initModify(row);
        $('#modify_topic_dlg').dialog('open').dialog('setTitle', '编辑专题');
        initModifyResourceLibrary();
    } else {
        $.messager.alert("提示", "请选择要编辑的行！", "info");
        return;
    }
}

function initModifyResourceLibrary() {
    $('#modify_topic_dlg #resourceTree').tree({
        url: "/bcms/proxy?url=resourcelibrary/&method=GET",
        lines: true,
        onBeforeLoad: function (node, param) {
            ajaxLoading();
        },
        loadFilter: function (data) {
            return formatTreeData(data.rows);
        },
        onLoadSuccess: function (node, data) {
            ajaxLoadEnd();
        }, onClick: function (node) {
        	initModifyResourceListByResourceLibrary(node);
        }
    });
}

function initModifyResourceListByResourceLibrary(node) {
    $.post("/bcms/proxy", {method: "get", url: "resource/",library_id: node.id,page:1,rows:10000}, function (result) {
        var obj = jQuery.parseJSON(result);
        if (obj.success==false) {
            alert(obj.msg);
        } else {
            var rows = $('#modify_topic_form #select_resource_list').datalist("getData").rows;
            for (var j = 0; j < rows.length; j++) {
                for (var x = 0; x < obj.rows.length; x++) {
                    if (rows[j].id == obj.rows[x].id) {
                    	obj.rows[x].checked = true;
                    }
                }
            }
            $("#modify_topic_form #resource_list").datalist({
                checkbox: true,
                singleSelect:false,
                textField: 'name',
                valueField: 'id',
                data: obj,
                onCheck: function (index, row) {
                    $("#modify_topic_form #select_resource_list").datalist('appendRow', {'id': row.id, 'text': row.name});
                },
                onUncheck:function(index,row) {
                	var rows = $('#modify_topic_form #select_resource_list').datalist("getData").rows;
                    for (var i = 0; i < rows.length; i++) {
                        if (rows[i].id == row.id) {
                            var sIndex = $("#modify_topic_form #select_resource_list").datalist('getRowIndex', rows[i]);
                            $("#modify_topic_form #select_resource_list").datalist('deleteRow', sIndex);
                        }
                    }
                }
            });
        }
    });
}

function initModify(row) {
	 $("#modify_topic_form").form("clear");
	 $("#modify_topic_form #resource_list").datalist('loadData', { total: 0, rows: [] });
	 $("#modify_topic_form #select_resource_list").datalist('loadData', { total: 0, rows: [] });
	 $("#modify_topic_dlg input[name=id]").val(row.id);
	 $("#modify_topic_dlg input[name=name]").val(row.name);
	 $('#modify_topic_dlg input[name=description]').val(row.description);
	 $("#modify_topic_dlg .publish_combobox").combobox('loadData', [{"id": true, "text": "启用"}, {"id": false, "text": "禁用"}]);
	 $("#modify_topic_dlg .publish_combobox").combobox('setValues', [row.is_published]);
	 
	 for (var i = 0; i < row.resource_ids.length; i++) {
		 $.post("/bcms/proxy", {method: "get", url: "resource/" + row.resource_ids[i]}, function (result) {
		        var obj = jQuery.parseJSON(result);
		        if (obj.success==false) {
		            alert(obj.msg);
		        } else {
		        	 $("#modify_topic_form #select_resource_list").datalist('appendRow', {'id': obj.id, 'text': obj.name});
		        }
		 });
	 }
	 
}


function modifyTopic() {
	var id=$('#modify_topic_form input[name=id]').val();
	var name = $("#modify_topic_dlg input[name=name]").val();
	var description = $('#modify_topic_dlg input[name=description]').val();
	var rows = $('#modify_topic_form #select_resource_list').datalist("getData").rows;
	var is_published = $("#modify_topic_form .publish_combobox").combotree("getValue");
	var resource_ids = [];
	for (var i = 0; i < rows.length; i++) {
		resource_ids.push(rows[i].id);
	}
	$.post("/bcms/proxy", {
		method : "put",
		url : "special/" + id,
		name : name,
		description : description,
		resource_ids : JSON.stringify(resource_ids),
		is_published : is_published
	}, function(result) {
		var obj = $.parseJSON(result)
		if (obj.success == false) {
			$('#modify_topic_dlg').dialog('close');
			alert(obj.msg);
		} else {
			$('#modify_topic_dlg').dialog('close');
			$("#rGrid").datagrid('reload');
		}
	});
}


function delTopic() {
    var rows = $('#rGrid').datagrid("getSelections");
    if (rows.length > 0) {
        $.messager.confirm('确认', '确认删除?', function (data) {
            if (data) {
                for (var i = 0; i < rows.length; i++) {
                    $.post("/bcms/proxy", {method: "delete", url: "special/" + rows[i].id + "/"}, function (result) {
                        var obj = $.parseJSON(result);
                        if (obj.success == false) {
                            alert("删除失败!");
                        } else {
                            $("#rGrid").datagrid('reload');
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


function getQueryParams(queryParams){
    var name=$("#name").val();
    queryParams.name=name;
    return queryParams;
}

function reloadgrid() {
    var queryParams = $('#rGrid').datagrid('options').queryParams;
    getQueryParams(queryParams);
    $('#rGrid').datagrid('options').queryParams = queryParams;
    $("#rGrid").datagrid('reload');
}

function reloadResource() {
//    var queryParams = $("#add_tag_form #resource_list").datalist('options').queryParams;
    var name=$("#sourcename").val();
//    queryParams.name=name;
//    $("#add_tag_form #resource_list").datalist('options').queryParams = queryParams;
//    $("#add_tag_form #resource_list").datalist('reload');
    
    $("#add_tag_form #resource_list").datalist('load',{
    	name: name
    });
//    $("#add_tag_form #resource_list").datalist('reload');
}

var flow;
function startUpload() {
    if (waitFile.file && waitFile.hash) {
        $.post("/bcms/proxy", {
            url: "file/" + waitFile.hash + "/checksum",
            method: "GET"
        }, function (data2) {
            var fileId = data2.id;
            if (fileId !== undefined) {
                waitFile.id = fileId;
                waitFile.status = true;
                $("#upload-" + waitFile.fileId).empty().append("秒传!");
            } else {
                flow.upload();
            }
        }, "json");
    }
}

var waitFile = {status: false};
$(function () {

    flow = new Flow({
        target: 'http://42.62.52.40:8000/file/upload',
        chunkSize: 1024 * 1024,
        testChunks: false,
        simultaneousUploads: 1,
        method: "POST",
        query: {
            user_id: 1
        }
    });
    var fileList = $("#fileList");
    flow.on("fileAdded", function (file, event) {
        var fileId = file.uniqueIdentifier;
        calFile48Hash(file.file, function (source, hash) {
            waitFile.hash = hash.toUpperCase();
            waitFile.file = source;
            waitFile.fileId = fileId;
            fileList.append("<li class=\"list-group-item\">" + source.name + "(文件大小:" + source.size + "字节,hash:" + hash.toUpperCase() + ",已上传:<span class=\"label label-info\" id=\"upload-" + fileId + "\">0%</span>)</li>");
        });
    });
    flow.on("fileProgress", function (file, chunk) {
        var fileId = file.uniqueIdentifier;
        $("#upload-" + fileId).empty().append(chunk.offset + "%");
    });

    flow.on('fileSuccess', function (file, message) {
        //console.log(file,message);
        waitFile.status = true;
        var fileId = file.uniqueIdentifier;
        $("#upload-" + fileId).empty().append("上传成功!");
    });

    flow.on('fileError', function (file, message) {
        //console.log(file, message);
        waitFile.status = false;
        //alert(file.name + "上传失败!" + message);
        var fileId = file.uniqueIdentifier;
        $("#upload-" + fileId).empty().append("上传失败!");
    });

    $("#fileIpt").filebox({
        onChange: function () {
            //var file = $("#fileIpt").find("input[type='file']");
            if (fileList.find("li").length > 0) {
                return;
            }
            var fileBoxId = $("#fileIpt").next().find("input[type='file']").attr("id");
            var fileIpt = document.getElementById(fileBoxId);
            var files = fileIpt.files;
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                //var fileName = file.name;
                //var fileSize = file.size;
                flow.addFile(file);

                /* var formData = new FormData();
                 formData.append("file", file);
                 formData.append("flowChunkNumber", 1);
                 formData.append("flowChunkSize", 1024*1024);
                 formData.append("flowCurrentChunkSize", 0);
                 formData.append("flowTotalSize", fileSize);
                 formData.append("flowIdentifier", fileSize + "-" + fileName);
                 formData.append("flowFilename", fileName);
                 formData.append("filename", fileName);
                 formData.append("flowRelativePath", fileName);
                 formData.append("flowTotalChunks", 1);
                 $.ajax({
                 url: "http://42.62.52.40:8000/file/upload",
                 type: 'POST',
                 data: formData,
                 processData: false,
                 contentType: false,
                 success: function (data1) {
                 alert(data1);
                 },
                 error: function (data2) {
                 alert(data2);
                 }
                 });*/
            }
        }
    });
    
    
    //$("#.parentResource")
    $.post("/bcms/proxy", {url: "taglibrary/page/1", method: "GET"}, function (data) {
        var result = data;
        var pr = $("#parentResource");
        for (var i = 0; i < result.length; i++) {
            var item = result[i];
            var tagTreeId = "tagTree-" + item.id;
            pr.after("<tr><td><label>" + item.name + ":</label></td><td><input id='" + tagTreeId + "' required='true' class=\"easyui-combotree\" style=\"width:200px;\"/></td></tr>");
            var tagTree = $("#" + tagTreeId);
            tagTree.combotree();
            tagTree.combotree('loadData', formatTagLibTreeGridData(item.tags));
        }

    }, "json");
});