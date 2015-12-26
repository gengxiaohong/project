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
                    var href = "/bcms/admin/resourcemgr/editresource.jsp?id=" + row.id;
                    return "<a class='easyui-linkbutton' href='" + href + "'>编辑</a>";
                }
                },
                {
                    field: "editMeta", title: "元数据",align:'center', width: 100, formatter: function (value, row, index) {
                    var href = "/bcms/admin/resourcemgr/editmeta.jsp?id=" + row.id;
                    return "<a class='easyui-linkbutton' href='" + href + "'>编辑</a>";
                }
                }
            ]
        ]
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