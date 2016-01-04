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
    $("#rGrid").datagrid({
        url: "/bcms/proxy?url=resource&method=GET",
        fitColumns: true,
        rownumbers: false,
        singleSelect:false,
        pagination: true,
        toolbar:"#rGridTbr",
        columns: [
            [
                {field: '',checkbox:true, width: 100},
                {field: 'id', title: 'ID',align:'center', width: 100},
                {field: 'name', title: '名称',align:'center',width: 100, sortable: true},
                {field: 'resourcelibrary_id', title: '库ID',align:'center', width: 100, sortable: true,
		             formatter: function (value, row, index) {
                        var data = $('#categoryTree').tree("find", value);
                        return data==null?"null(id:"+value+")":data.name+"(id:"+value+")";
                    }},
                {
                    field: 'created_at',
                    title: '创建日期',
                    align:'center',
                    width: 100,
                    sortable: true,
                    formatter: function (value, row, index) {
                        var date = Date.parseFromText(row.created_at, "yyyy-MM-ddTHH:mm:ssZ");
                        return date.format("yyyy-MM-dd HH:mm:ss");
                    }
                },
                {
                    field: 'committer',
                    title: '上传者',
                    align:'center',
                    width: 100,
                    sortable: true
                },
                {field: 'kind', title: '类型',align:'center', width: 100, sortable: true,
                	formatter: function (value, row, idx) {
                    // 0 # 普通 1 # 课程 2 # 课时 3 # 素材
                    if (row.kind == 0) {
                        return "普通";
                    } else if (row.kind == 1) {
                        return "课程";
                    } else if (row.kind == 2) {
                        return "课时";
                    } else if (row.kind == 3) {
                        return "素材";
                    } else {
                        return row.kind;
                    }
                		}},
                {field: 'status', title: '状态',align:'center', width: 100, sortable: true,
                	formatter: function (value, row, idx) {
                    //默认是0 STATUS_EDIT = 0 STATUS_AUDIT = 1 STATUS_PASSED = 2 STATUS_REJECT = 3
                    if (row.status == 0) {
                        return "编辑";
                    } else if (row.status == 1) {
                        return "待审";
                    } else if (row.status == 2) {
                        return "通过";
                    } else if (row.status == 3) {
                        return "拒绝";
                    } else {
                        return row.status;
                    }
                        }},
                /*{
                    field: 'delOpt', title: '删除', width: 100, formatter: function (value, row, index) {
                    return "<a class='easyui-linkbutton' onclick='delResource(" + row.id + ")'>删除</a>";
                }
                },*/
                {
                    field: 'editOpt', title: '类库信息',align:'center', width: 100, formatter: function (value, row, index) {
                    	if(row.status == 0){
                            return "<a class='easyui-linkbutton' iconCls='icon-edit' plain='true' href='javascript:void(0)' onclick='editResourceById("+row.id+")'>编辑</a>";
                    	}else{
                    		return	"<a class='easyui-linkbutton' iconCls='icon-edit' plain='true' disable  href='javascript:void(0)'><span style='color:#999;'>编辑</span></a>";
                    	}
                    
                }
                },
                {
                    field: "editMeta", title: "元数据",align:'center', width: 100, formatter: function (value, row, index) {
                    	if(row.status == 0){
                    		var href = "/bcms/admin/resourcemgr/editmeta.jsp?id=" + row.id;
                            return "<a class='easyui-linkbutton' iconCls='icon-edit' plain='true' href='" + href + "'>编辑</a>";
                    	}else{
                    		return	"<a class='easyui-linkbutton' iconCls='icon-edit' plain='true' href='javascript:void(0)'><span style='color:gray;'>编辑</span></a>";
                    	}
                }
                },
                {
                    field: "subMeta", title: "子资源",align:'center', width: 100, formatter: function (value, row, index) {
                    var href1 = "/bcms/admin/resourcemgr/childresourcemgr.jsp?id=" + row.id;
                    var href = "/bcms/admin/resourcemgr/createresource.jsp?id=" + row.id;
                    return "<a class='easyui-linkbutton' iconCls='icon-add' plain='true' href='" + href + "'>添加</a>"
                    +"<a class='easyui-linkbutton' iconCls='icon-edit' plain='true' href='" + href1 + "'>管理</a>";
                }
                }
            ]
        ],
        onLoadSuccess: function (data) {
            $(".easyui-linkbutton").linkbutton();

        }
    });
    
    $("#resourceTree2").combotree({
        loadFilter: function (data) {
            for (var i = 0; i < data.rows.length; i++) {
                data.rows[i].text = data.rows[i].name;
                setData(data.rows[i].children);
            }
            return data.rows;
        }
    });
    $("#tagTree2").combotree({
        loadFilter: function (data) {
            for (var i = 0; i < data.rows.length; i++) {
                data.rows[i].text = data.rows[i].name;
                setData(data.rows[i].children);
            }
            return data.rows;
        }

    });
});


function delResource(metaId) {
        $.messager.confirm('确认', '确认删除?', function (data) {
            if (data) {
                for (var i = 0; i < rows.length; i++) {
                    $.post("/bcms/proxy", {method: "delete", url: "resource/" + rows[i].id + "/"}, function (result) {
                        var obj = $.parseJSON(result);
                        if (obj.success == false) {
                        	 $.messager.alert("提示", "删除失败！", "info");
                        } else {
                            $("#rGrid").datagrid('reload');
                        }
                    });
                }
            }
        })
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

function addMetaItems() {
    $(".items-container").append("<div class='items'>" + $(".items").html() + "</div>");
}

function addField() {
    $("#fieldHref").before("<br/><input type=\"text\" class=\"easyui-textbox\">");
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

function publishResource() {
	var sutflag = true;
	var rows = $('#rGrid').datagrid('getSelections');
	if(rows.length==0){
		$.messager.alert('提示','请选择要发布的资源!','warning');
		sutflag = false;
	}
	if(rows.length>1){
		$.messager.alert('提示','暂不支持批量发布,请仅选择一行!','warning');
		sutflag = false;
	}
	if(rows.length == 1){
		if(rows[0].status==1){
			$.messager.alert('提示','已发布的资源不能重复发布!','warning');
			sutflag = false;
		}else if(rows[0].status==2){
			$.messager.alert('提示','审核通过的资源不能重新发布!','warning');
			sutflag = false;
		}
		
	}
	if (sutflag) {
   	 $.post("/bcms/proxy", {
            method: "PUT",
            url: "resource/"+rows[0].id,
            name: rows[0].name,
            kind: rows[0].kind,
            resourcelibrary_id: rows[0].resourcelibrary_id,
            tag_ids: "["+rows[0].tag_ids+"]",
            status:1, //1 发布
            parents:rows[0].parents,
            recommend_number:rows[0].recommend_number,
            click_number:rows[0].click_number
//            committer: parseInt(committer)
        }, function (data) {
            if (data.id != undefined) {
                //alert("ok........");
                $.messager.alert('提示',"发布资源成功!",'success');
                reloadgrid();
            } else {
                $.messager.alert('提示',"发布资源失败!",'error');
            }
        }, "json");
   } 
}


function passResource() {
	var sutflag = true;
	var rows = $('#rGrid').datagrid('getSelections');
	if(rows.length==0){
		$.messager.alert('提示','请选择要审核的资源!','warning');
		sutflag = false;
	}
	if(rows.length>1){
		$.messager.alert('提示','暂不支持批量审核,请仅选择一行!','warning');
		sutflag = false;
	}
	if(rows.length == 1){
		if(rows[0].status==0){
			$.messager.alert('提示','编辑状态的资源,请先发布再审核!','warning');
			sutflag = false;
		}else if(rows[0].status==2){
			$.messager.alert('提示','已经审核通过的资源不能重复审核!','warning');
			sutflag = false;
		}
	}
    if (sutflag) {
    	 $.post("/bcms/proxy", {
             method: "PUT",
             url: "resource/"+rows[0].id,
             name: rows[0].name,
             kind: rows[0].kind,
             resourcelibrary_id: rows[0].resourcelibrary_id,
             tag_ids: "["+rows[0].tag_ids+"]",
             status:2, //2 审核
             parents:rows[0].parents,
             recommend_number:rows[0].recommend_number,
             click_number:rows[0].click_number
//             committer: parseInt(committer)
         }, function (data) {
             if (data.id != undefined) {
                 //alert("ok........");
                 $.messager.alert('提示',"审批资源成功!",'success');
                 reloadgrid();
             } else {
                 $.messager.alert('提示',"审批资源失败!",'error');
             }
         }, "json");
    } 
}
function editResourceById(resourceId){
	$.post("/bcms/proxy",{method:"GET",url:"resource/"+resourceId},function(data){
        $("#name11").textbox("setValue",data.name);
        $("#kind11").combobox("setValue",data.kind);
        $("#resourceTree2").combotree("setValue",data.resourcelibrary_id);
        if(data.tag_ids!=undefined)
        $("#tagTree2").combotree("setValues", data.tag_ids);
        $("#status11").val(data.status);
        if(data.parent_id!=undefined)
        $("#parent_id11").val(data.parent_id);
        $("#recommend_number11").val(data.recommend_number);
        $("#click_number11").val(data.click_number);
        $("#id11").val(data.id);
    },"json");
    
    $("#editResourcesDialog").dialog("open");
}
function submitForm2() {
    var ff = $("#editResourceForm");

    if (ff.form("validate")) {
        var name = $("#name11").textbox("getValue");
        var kind10 = $("#kind11").combobox("getValue");
        var node = $("#resourceTree2").combotree("getValue");
        var tag = $("#tagTree2").combobox("getValues");
        var committer = $.cookie("bcms_user_id");
        var status = $("#status11").val();
        var parent_id = $("#parent_id11").val();
        var recommend_number = $("#recommend_number11").val();
        var click_number = $("#click_number11").val();
        var id = $("#id11").val();
        $.post("/bcms/proxy", {
            method: "PUT",
            url: "resource/"+id,
            name: name,
            kind: kind10,
            resourcelibrary_id: parseInt(node),
            tag_ids: "["+tag+"]",
            status:status,
            parent_id:parent_id,
            recommend_number:recommend_number,
            click_number:click_number,
            committer: parseInt(committer)
        }, function (data) {
            if (data.id != undefined) {
            	$("#rGrid").datagrid('reload');
               $("#editResourcesDialog").dialog("close");
              
            } else {
                $.messager.alert('提示',"资源更新失败!",'error');
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