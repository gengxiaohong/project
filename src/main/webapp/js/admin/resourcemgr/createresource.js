/**
 * Created by ligson on 2015/8/28.
 */
var uploadUrl = "";
var href = window.location.href;
var idx = href.indexOf("id=");
var resourceId = undefined;
if (idx > 0) {
    resourceId = href.substring(idx + 3);
}
var flow;
var flowforPoster;
var posterHash = "";
var waitFile = {status: false};
var waitFileforPoster = {status: false};

function startUpload() {
    if (waitFile.file && waitFile.hash) {
        $.post("/bcms/proxy", {
            url: "file/" + waitFile.hash + "/checksum",
            method: "GET"
        }, function (data2) {
        	if(data2.success == false) {
        		flow.upload();
        	} else {
        		var fileId = data2.id;
                if (fileId !== undefined) {
                    waitFile.id = fileId;
                    waitFile.status = true;
                    $("#upload-" + waitFile.fileId).empty().append("秒传!");
                    settingPosterUrl();
                } else {
                    flow.upload();
                }
        	}
        }, "json");
    }
}

function startUploadforPoster() {
    if (waitFileforPoster.file && waitFileforPoster.hash) {
    	posterHash = waitFileforPoster.hash;
        $.post("/bcms/proxy", {
            url: "file/" + waitFileforPoster.hash + "/checksum",
            method: "GET"
        }, function (data2) {
        	if(data2.success == false) {
        		flowforPoster.upload();
        	} else {
        		var fileId = data2.id;
                if (fileId !== undefined) {
                	waitFileforPoster.id = fileId;
                    waitFileforPoster.status = true;
                    $("#upload-" + waitFileforPoster.fileId).empty().append("秒传!");
                } else {
                	flowforPoster.upload();
                }
        	}
        }, "json");
    }
}

function settingPosterUrl() {
	console.log(posterHash);
	if(posterHash != "") {
		$.post("/bcms/proxy", {
	        url: "file/" + posterHash + "/checksum",
	        method: "GET"
	    }, function (data2) {
	    	console.log(data2);
	    	if(data2.success == false) {
	    	} else {
	    		$("#poster_url").val(data2.broadcast_addr);
	    	}
	    }, "json");
	}
	
}

function setData(data) {
    if (data != undefined) {
        for (var i = 0; i < data.length; i++) {
            data[i].text = data[i].name;
            setData(data[i].children);
        }
    }
}

function loadBaseUrl() {
	$.post("/bcms/loadBaseUrl", function (data) {
		uploadUrl = data.base_url;
		initFlow();
    }, "json");
}

function initFlow() {
	$("#fileList").empty();
	$("#fileListforPoster").empty();
	// flow init
	flow = new Flow({
        target: uploadUrl + 'file/upload',
        chunkSize: 1024 * 1024,
        testChunks: false,
        simultaneousUploads: 1,
        method: "POST",
        query: {
            user_id: 1
        }
    });
    var fileList = $("#fileList");
    /*var fileList2 = $("#fileList2");*/
    flow.on("fileAdded", function (file, event) {
        var fileId = file.uniqueIdentifier;
        calFile48Hash(file.file, function (source, hash) {
            waitFile.hash = hash.toUpperCase();
            waitFile.file = source;
            waitFile.fileId = fileId;
            fileList.append("<p class=\"list-group-item\">" + source.name + "(文件大小:" + source.size + "字节,hash:" + hash.toUpperCase() + ",已上传 :<span class=\"label label-info\" id=\"upload-" + fileId + "\">0%</span>)</p>");
            /*fileList2.append("<p class=\"list-group-item\">" + source.name + "(文件大小:" + source.size + "字节,hash:" + hash.toUpperCase() + ",已上传 :<span class=\"label label-info\" id=\"upload-" + fileId + "\">0%</span>)</p>");*/
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
        $("#upload-" + fileId).empty().append("上传完成!");
    });

    flow.on('fileError', function (file, message) {
        //console.log(file, message);
        waitFile.status = false;
        var fileId = file.uniqueIdentifier;
        $("#upload-" + fileId).empty().append("上传失败!");
    });

    $("#fileIpt").filebox({
        onChange: function () {
            //var file = $("#fileIpt").find("input[type='file']");
            if (fileList.find("p").length > 0) {
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
            }
        }
    });
    
	flowforPoster = new Flow({
        target: uploadUrl + 'file/upload',
        chunkSize: 1024 * 1024,
        testChunks: false,
        simultaneousUploads: 1,
        method: "POST",
        query: {
            user_id: 1
        }
    });
    var fileListforPoster = $("#fileListforPoster");
    /*var fileList2 = $("#fileList2");*/
    flowforPoster.on("fileAdded", function (file, event) {
        var fileId = file.uniqueIdentifier;
        calFile48Hash(file.file, function (source, hash) {
            waitFileforPoster.hash = hash.toUpperCase();
            waitFileforPoster.file = source;
            waitFileforPoster.fileId = fileId;
            fileListforPoster.empty().append("<p class=\"list-group-item\">" + source.name + "(文件大小:" + source.size + "字节,hash:" + hash.toUpperCase() + ",已上传 :<span class=\"label label-info\" id=\"upload-" + fileId + "\">0%</span>)</p>");
            /*fileList2.append("<p class=\"list-group-item\">" + source.name + "(文件大小:" + source.size + "字节,hash:" + hash.toUpperCase() + ",已上传 :<span class=\"label label-info\" id=\"upload-" + fileId + "\">0%</span>)</p>");*/
        });
    });
    flowforPoster.on("fileProgress", function (file, chunk) {
        var fileId = file.uniqueIdentifier;
        $("#upload-" + fileId).empty().append(chunk.offset + "%");
    });

    flowforPoster.on('fileSuccess', function (file, message) {
        //console.log(file,message);
        waitFileforPoster.status = true;
        var fileId = file.uniqueIdentifier;
        $("#upload-" + fileId).empty().append("上传完成!");
        // settingPostUrl
		settingPosterUrl();
    });

    flowforPoster.on('fileError', function (file, message) {
        //console.log(file, message);
        waitFileforPoster.status = false;
        var fileId = file.uniqueIdentifier;
        $("#upload-" + fileId).empty().append("上传失败!");
    });

    $("#fileIptforPoster").filebox({
        onChange: function () {
            //var file = $("#fileIptforPoster").find("input[type='file']");
            if (fileListforPoster.find("p").length > 0) {
                return;
            }
            var fileBoxId = $("#fileIptforPoster").next().find("input[type='file']").attr("id");
            var fileIptforPoster = document.getElementById(fileBoxId);
            var files = fileIptforPoster.files;
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                //var fileName = file.name;
                //var fileSize = file.size;
                flowforPoster.addFile(file);
            }
        }
    });
}

$(function () {
	loadBaseUrl();
    $("#resourceTree").combotree({
        loadFilter: function (data) {
            for (var i = 0; i < data.rows.length; i++) {
                data.rows[i].text = data.rows[i].name;
                setData(data.rows[i].children);
            }
            return data.rows;
        }
    });
    $("#tagTree").combotree({
        loadFilter: function (data) {
            for (var i = 0; i < data.rows.length; i++) {
                data.rows[i].text = data.rows[i].name;
                setData(data.rows[i].children);
            }
            return data.rows;
        }
    });
    $("#subMeta10").val(resourceId);
    
    $("#createResourcesDialog").dialog({
    	onOpen:function(){
    		var node = $("#categoryTree").tree("getSelected");
    		if(node) {
    			$("#resourceTree").combotree("setValue",node.id);
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


function formatTagLibTreeGridData(data) {
    var fin = [];
    for (var i = 0; i < data.length; i++) {
        var obj = [];
        obj.text = data[i].name;
        obj.id = data[i].id;
        fin.push(obj);
    }
    console.log(fin);
    return fin;
}
function submitFormforCreateResource() {
    var ff = $("#createResourceForm");
    if (!(waitFile.status && waitFile.hash)) {
        $.messager.alert('提示',"请上传资源文件!",'warning');
        return;
    }

    if (ff.form("validate")) {
        var name = $("#name10").textbox("getValue");
        var kind10 = $("#kind10").combobox("getValue");
        var node = $("#resourceTree").combotree("getValue");
        var committer = $.cookie("bcms_user_id");
        var parent_id = $("#subMeta10").val();
        var tag = $("#tagTree").combobox("getValues");
        var poster_url = $("#poster_url").val();

        var params = {
            method: "POST",
            url: "resource/",
            name: name,
            kind: kind10,
            resourcelibrary_id: parseInt(node),
            tag_ids: "["+tag+"]",
            committer: parseInt(committer),
            poster_url: poster_url
        };
        if (parent_id) {
            params.parent_id = parent_id;
        }
        $.post("/bcms/proxy", params, function (data) {
        	if(data.success == false) {
        		alert(data.msg);
        	} else {
        		if (data.id != undefined) {
                    //alert("ok........");
                    if (waitFile.id != null) {
                        $.post("/bcms/proxy", {
                            url: "file/detail/" + waitFile.id,
                            method: "POST",
                            resource_id: data.id
                        }, function (data3) {
                            if (data3.id != undefined) {
                                submitSuccess(data3, data.id);
                            } else {
                            	$.messager.alert('提示',"资源文件关联失败!",'error');
                            }
                        }, "json");
                    } else {
                        $.post("/bcms/proxy", {
                            url: "file/" + waitFile.hash + "/checksum",
                            method: "GET"
                        }, function (data2) {
                        	if(data2.success == false) {
                        		$.messager.alert('提示',"资源文件关联失败!",'error');
                        	} else {
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
                        	}
                        }, "json");
                    }
                } else {
                    alert("资源创建失败!");
                }
        	}
        }, "json");
    } 
}

function submitSuccess(data3, resourceId) {
    if (data3.id != undefined) {
        alert("资源创建成功 !");
    	$("#rGrid").datagrid('reload');
        $("#createResourcesDialog").dialog("close");
        flow = undefined;
        flowforPoster = undefined;
        $("#fileList").empty();
    	$("#fileListforPoster").empty();
    	waitFile = {status: false};
    	waitFileforPoster = {status: false};
    } else {
        $.messager.alert('提示',"资源创建失败!",'error');
    }
}
function createResource() {
	$("#createResourceForm").form('clear');
	$("#createResourcesDialog").dialog('open');
}
function forwardCldList(){
	window.location.href="/bcms/admin/resourcemgr/childresourcemgr.jsp?id=" + resourceId;
}