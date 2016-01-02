/**
 * Created by Ruby on 2015/8/26.
 */
$(function () {
    $('#information_table').datagrid({
        rownumbers: true,
        singleSelect: false,
        pagination: true,
        toolbar:"#tb",
        url: "/bcms/proxy?url=information&method=GET",
        columns: [[
            {field: 'id', width: '1%', checkbox: true, title: 'ID'},
            {field: 'name', width: '30%', align: 'center', title: '资讯名称'},
            {
                field: 'published_at',
                width: '15%',
                align: 'center',
                title: '展示开始时间',
                formatter: function (value, row, index) {
                    return new Date(value).format("yyyy-MM-dd HH:mm:ss");
                }
            },
            {
                field: 'end_at', width: '15%', align: 'center', title: '展示结束时间',
                formatter: function (value, row, index) {
                    return new Date(value).format("yyyy-MM-dd HH:mm:ss");
                }
            },
            {field: 'user_id', width: '8%', align: 'center', title: '发送人'},
            {
                field: 'created_at', width: '15%', align: 'center', title: '创建时间',
                formatter: function (value, row, index) {
                    return new Date(value).format("yyyy-MM-dd HH:mm:ss");
                }
            },
            {
                field: '_operate', width: '12%', align: 'center', title: '操作',
                formatter: function (value, row, index) {
                    return '<a class="easyui-linkbutton" iconCls="icon-edit" plain="true" href="javascript:void(0)" onclick="editInformation(' + index + ')">修改</a>&nbsp;&nbsp;<a class="easyui-linkbutton" iconCls="icon-remove" href="javascript:void(0)" plain="true" onclick="delInformation(' + index + ')">删除</a>';
                }
            }
        ]],
        onLoadSuccess: function (data) {
            $(".easyui-linkbutton").linkbutton();

        }
    });
    $("#newInformationDialog").scroll(function(){
    	$('.easyui-combotree').combotree('hide');
    });
});
// 批量删除资讯
function deleteInfos(){
	var selRows = $("#information_table").datagrid("getSelections");
	if(selRows.length == 0){
		$.messager.alert('提示','请至少选择一行数据...');
		return false;
	}
	var ids = [];
	for(var i =0;i<selRows.length;i++){
		ids.push(selRows[i].information_id);
	}
	$.messager.confirm('确认', '确认删除?', function (data) {
        if(data) {
            $.post("/bcms/proxy", {method: "delete", url: "information/" + ids.toString() }, function (result) {
                var obj= $.parseJSON(result);
                if (obj.success==false) {
                    $.messager.alert('提示',"删除失败!",'error');
                } else {
                    $("#information_table").datagrid("reload");
                }
            });
        }
    })
	
};
function getQueryParams(queryParams){
    var name=$("#name").val();
    queryParams.name=name;
    return queryParams;
}

function reloadgrid() {
    var queryParams = $('#information_table').datagrid('options').queryParams;
    getQueryParams(queryParams);
    $('#information_table').datagrid('options').queryParams = queryParams;
    $("#information_table").datagrid('reload');
}

function closeTab(title) {
    $('#information_tabs').tabs('close', title);
}

function newInformation() {
	$("#add_information_form").form('clear');
	$("#newInformationDialog").window('open').window('resize',{
		left:$(window).width()-800,
		top:$(window).height()-430
	});
        initAddDepartmentTree();
        initAddRoleTree();
    }

  function saveInformation(){

      if ($("#newInformationDialog").find("form").form("validate")) {
      	  var name=$("#name1").val();
          var content=CKEDITOR.instances.content1.getData();
          var published_at =$('#published_at1').datebox('getValue');
          var end_at=$("#end_at1").datebox('getValue');
          var departments=$(".add_department_tree").combotree("getValues");
          var roles=$(".add_role_tree").combotree("getValues");
          var user_id=$.cookie("bcms_user_id");
          var create_date=new Date().format("yyyy-MM-dd HH:mm:ss");
          if(content==null||content==''){
        	  $.messager.alert('提示','请输入资讯内容.','error');
        	  return false;
          }
          var params = {
                  method: "post",
                  url: "/information/",
                  user_id:user_id,
                  name: name,
                  content: content,
                  created_at: create_date,
                  published_at: published_at,
                  end_at: end_at,
                  department_id:departments.toString(),
                  role_id:roles.toString()
              };
          $.post("/bcms/proxy", params, function (data) {
             /* var result = JSON.parse(data);*/
              if (data.id) {
                  $("#information_table").datagrid("reload");
                  $('#newInformationDialog').dialog('close');
              } else {
              	$.messager.alert("提示", data.msg);
              }
          }, "json");
      }
    
	  
	  
	  /*
    var name=$("#name1").val();
    var content=CKEDITOR.instances.content1.getData();
    var published_at =$('#published_at1').datebox('getValue');
    var end_at=$("#end_at1").datebox('getValue');
    var departments=$(".add_department_tree").combotree("getValues");
    var roles=$(".add_role_tree").combotree("getValues");
    var user_id=$.cookie("bcms_user_id");
    var create_date=new Date().format("yyyy-MM-dd HH:mm:ss");
    $.post("/bcms/proxy", {
        method: "post",
        url: "/information/",
        user_id:user_id,
        name: name,
        content: content,
        created_at: create_date,
        published_at: published_at,
        end_at: end_at,
        department_id:departments.toString(),
        role_id:roles.toString()
    }, function (data) {
        var result = JSON.parse(data);
        if (result.id) {
            $("#information_table").datagrid("reload");
            $('#newInformationDialog').dialog('close');
        } else {
        	$.messager.alert("提示", result.msg);
        }
    });
*/}
//调用带form验证的dialog
/*$("#newInformationDialog").dialog({
    buttons: [
        {
            text: "提交",
            handler: function () {
                if ($("#newInformationDialog").find("form").form("validate")) {
                	var name=$("#name1").val();
                    var content=CKEDITOR.instances.content1.getData();
                    var published_at =$('#published_at1').datebox('getValue');
                    var end_at=$("#end_at1").datebox('getValue');
                    var departments=$(".add_department_tree").combotree("getValues");
                    var roles=$(".add_role_tree").combotree("getValues");
                    var user_id=$.cookie("bcms_user_id");
                    var create_date=new Date().format("yyyy-MM-dd HH:mm:ss");
                    var params = {
                            method: "post",
                            url: "/information/",
                            user_id:user_id,
                            name: name,
                            content: content,
                            created_at: create_date,
                            published_at: published_at,
                            end_at: end_at,
                            department_id:departments.toString(),
                            role_id:roles.toString()
                        };
                    $.post("/bcms/proxy", params, function (data) {
                        var result = JSON.parse(data);
                        if (result.id) {
                            $("#information_table").datagrid("reload");
                            $('#newInformationDialog').dialog('close');
                        } else {
                        	$.messager.alert("提示", result.msg);
                        }
                    }, "json");
                }
            }
        },
        {
            text: "取消",
            handler: function () {
                $("#newInformationDialog").dialog("close");
            }
        }
    ]
});*/
function editInformation(index) {
    $('#information_table').datagrid('selectRow', index);
    var row = $('#information_table').datagrid('getSelected');
    if (row) {
    	$("#id").val(row.information_id);
    	$("#name2").val(row.name);
        CKEDITOR.instances.content2.setData(row.content);
        $("#published_at2").datebox("setValue", row.published_at);
        $("#end_at2").datebox("setValue", row.end_at);
        initModifyDepartmentTree(row.department_id);
        initModifyRoleTree(row.role_id);
        $("#editInformationDialog").window('open').window('resize',{
        	left:$(window).width()-800,
    		top:$(window).height()-430
        });
    } else {
        $.messager.alert("提示", "请选择要编辑的行！", "info");
        return;
    }
}

function modifyInformation(){
	if($("#editInformationDialog").find("form").form("validate")){
	    var id = $("#id").val();
	    var name=$("#name2").val();
	    var content=CKEDITOR.instances.content2.getData();
	    var published_at =$('#published_at2').datebox('getValue');
	    var end_at=$("#end_at2").datebox('getValue');
	    var departments=$(".modify_department_tree").combotree("getValues");
	    var roles=$(".modify_role_tree").combotree("getValues");
	    //var user_id=$.cookie("bcms_user_id");
	    var create_date=new Date().format("yyyy-MM-dd HH:mm:ss");
	    if(content==null||content==''){
	    	$.messager.alert('提示','资讯内容不能为空.','error');
	    	return false;
	    }
	    $.post("/bcms/proxy", {
	        method: "put",
	        url: "/information/"+id,
	        name: name,
	        content: content,
	        created_at: create_date,
	        published_at: published_at,
	        end_at: end_at,
	        department_id:departments.toString(),
	        role_id:roles.toString()
	    }, function (data) {
	        var result = JSON.parse(data);
	        if (result.id) {
	            $("#information_table").datagrid("reload");
	            $('#editInformationDialog').window('close');
	        } else {
	        	$.messager.alert("提示", result.msg);
	        }
	    });

	}
}


function delInformation(index){
    $('#information_table').datagrid('selectRow',index);
    var row = $('#information_table').datagrid('getSelected');
    if(row) {
        $.messager.confirm('确认', '确认删除?', function (data) {
            if(data) {
                $.post("/bcms/proxy", {method: "delete", url: "information/" + row.information_id }, function (result) {
                    var obj= $.parseJSON(result);
                    if (obj.success==false) {
                        alert("删除失败!");
                    } else {
                        $("#information_table").datagrid("reload");
                    }
                });
            }
        })
    }else{
        $.messager.alert("提示", "请选择要删除的行！", "info");
        return;
    }
}



function initAddRoleTree(){
    $.post("/bcms/proxy", {method: "get", url: "role/"}, function (result) {
        var obj = jQuery.parseJSON(result);
        if (obj.success==false) {
            alert(obj.msg);
        } else {
            $(".add_role_tree").combotree({multiple:true,data: formatTreeData(obj.rows)});
        }
    });
}

function initAddDepartmentTree(){
    $.post("/bcms/proxy", {method: "get", url: "department/"}, function (result) {
        var obj = jQuery.parseJSON(result);
        if (obj.success==false) {
            alert(obj.msg);
        } else {
            $(".add_department_tree").combotree({multiple:true,data: formatTreeData(obj)});
        }
    });
}

function initModifyRoleTree(values){
    $.post("/bcms/proxy", {method: "get", url: "role/"}, function (result) {
        var obj = jQuery.parseJSON(result);
        if (obj.success==false) {
            alert(obj.msg);
        } else {
            $(".modify_role_tree").combotree({multiple:true,data: formatTreeData(obj.rows)});
            $(".modify_role_tree").combotree("setValues",values);
        }
    });
}

function initModifyDepartmentTree(values){
    $.post("/bcms/proxy", {method: "get", url: "department/"}, function (result) {
        var obj = jQuery.parseJSON(result);
        if (obj.success==false) {
            alert(obj.msg);
        } else {
            $(".modify_department_tree").combotree({multiple:true,data: formatTreeData(obj)});
            $(".modify_department_tree").combotree("setValues",values);
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