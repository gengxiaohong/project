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
        singleSelect: false,
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
                sortable: true
            }
            ]
        ]
    });
});
function addTopic(){
    $('#add_topic_dlg').dialog('open').dialog("setTitle", "添加专题");
    $("#add_tag_form").form("clear");
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
        var node = $("#resourceTree").combotree("getValue");
        var is_published = $("#is_published").combotree("getValue");
        $.post("/bcms/proxy", {
            method: "POST",
            url: "special/",
            name: name,
            description: description,
            resource_ids: parseInt(node),
            is_published: parseInt(is_published)
        }, function (data) {
            if (data.id != undefined) {
                //alert("ok........");
                if (waitFile.fileId != null) {
                    $.post("/bcms/proxy", {
                        url: "file/detail/" + fileId,
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
        window.location.href = "/bcms/admin/resourcemgr/topicmgr.jsp";
    } else {
        alert("资源创建失败!");
    }
}

function editTopic(){
    var row = $('#rGrid').datagrid('getSelected');
    if (row) {
      //  initModify(row);
        $('#modify_topic_dlg').dialog('open').dialog('setTitle', '编辑专题');;
    } else {
        $.messager.alert("提示", "请选择要编辑的行！", "info");
        return;
    }
}

function initModify(row) {
	 var name = $("#modify_topic_dlg input[name=name]").val();
	 var description = $('#modify_topic_dlg input[name=descr]').val();
	 var resource_ids = $('#modify_topic_dlg input[name=resources]').val();
	 var is_published=$("#modify_topic_dlg .gender_combobox").combobox("getValue");
    $.post("/bcms/proxy", {method: "put", url: "special/"}, function (result) {
        var obj = $.parseJSON(result);
        if (obj.success == false) {
            alert(obj.msg);
        } else {
            $("#modify_topic_dlg .group_tree").combotree('loadData', formatGroupListData(obj));
            var t = [];
            for (var i = 0; i < row.groups.length; i++) {
                t[i] = row.groups[i].id;
            }
            $("#modify_topic_dlg .group_tree").combotree('setValues', t);
        }
    });


}


function modifyTopic(){
	var name = $("#name10").textbox("getValue");
    var description = $("#descr").textbox("getValue");
    var node = $("#resourceTree").combotree("getValue");
    var is_published = $("#is_published").combotree("getValue");
    $.post("/bcms/proxy", {method:"put",url: "special/",
    	name: name,
        description: description,
        resource_ids: parseInt(node),
        is_published: parseInt(is_published)
    	}, function (result) {
        var obj= $.parseJSON(result)
        if (obj.success==false) {
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
    $("#resourceTree").combotree({
        loadFilter: function (data) {
            for (var i = 0; i < data.rows.length; i++) {
                data.rows[i].text = data.rows[i].name;
            }
            return data.rows;
        }
    });

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