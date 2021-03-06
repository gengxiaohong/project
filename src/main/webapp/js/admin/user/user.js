var department_tree;
$(function () {
	$.post("/bcms/departmentTree", function (result) {
        var obj = $.parseJSON(result);
        if (obj.success==false) {
            alert(obj.msg);
        } else {
           var dep_tree = [];
           dep_tree.push({text:""});
           department_tree= formatDepartmentTreeData(obj);
           dep_tree=dep_tree.concat(department_tree);
//            $('#department_id').combotree ({
//                data:dep_tree,
//                lines: true
//            });
            $("#department_id").combotree({
    			data : dep_tree,
    			valueField : 'id',
    			textField : 'text',
    			editable : true,
    			mode: 'local',
    			delay: '500',
    			lines: true,
    			keyHandler : {enter: function() {
    					//var opts = $(this).combobox('options');
    					//return row[opts.textField].indexOf(q) == 0;
    				    var curr_text = $('#department_id').combobox('getText')
    				    queryComboTree(curr_text, "department_id");
    				}
    			}
    			});  
        }
    });
	
	  
    $('#user_table').datagrid({
        rownumbers: true,
        singleSelect: false,
        toolbar: "#tb",
        url: "/bcms/proxy?url=user&method=GET",
        pagination: true,
        columns: [[
            {field: 'id', width: '1%', checkbox: true, title: 'ID'},
            {field: 'username', width: '10%', align: 'center', title: '用户名'},
            {field: 'cn_name', width: '10%', align: 'center', title: '中文名'},
            {field: 'number', width: '10%', align: 'center', title: '编号'},
            {
                field: 'gender', width: '5%', align: 'center', title: '性别',
                formatter: function (value, row, index) {
                    return value == "2" ? '女' : '男';
                }
            },
            {field: 'email', width: '10%', align: 'center', title: '邮箱'},
            {
                field: 'department_id', width: '10%', align: 'center', title: '部门'
            },
            {field: 'phone', width: '10%', align: 'center', title: '电话'},
            {field: 'groups', width: '20%', align: 'center', formatter: formatGroup, title: '用户组'},
            {
                field: '_operate', width: '10%', align: 'center', title: '操作',
                formatter: function (value, row, index) {
                    return '<a class="tablelink" href="#" onclick="editUser(' + index + ')">修改</a>&nbsp;&nbsp;<a class="tablelink" href="#" onclick="delUser(' + index + ')">删除</a>';
                }
            }
        ]]
    });

});


function getQueryParams(queryParams){
    var username=$("#username").val();
    var number=$("#number").val();
    var department_id=$("#department_id").combotree('getValue');
    var identity=$("#identity").combobox('getValue');
    queryParams.username=username;
    queryParams.number=number;
    queryParams.department_id=department_id;
    queryParams.identity=identity;
    return queryParams;
}

function reloadgrid() {
    var queryParams = $('#user_table').datagrid('options').queryParams;
    getQueryParams(queryParams);
    $('#user_table').datagrid('options').queryParams = queryParams;
    $("#user_table").datagrid('reload');
}

function newUser(){
    initAddGroupCombotree();
    initAddDepartmentCombotree();
    $("#add_user_dlg").dialog("open").dialog('setTitle', '添加新用户');
    $("#add_user_form").form("clear");
}

function saveUser(){
    var username = $("#add_user_dlg input[name=name]").val();
    var password = $('#add_user_dlg input[name=password]').val();
    var email = $('#add_user_dlg input[name=email]').val();
    var phone = $('#add_user_dlg input[name=phone]').val();
    var cn_name=$("#add_user_dlg input[name=cn_name]").val();
    var groups = $('#add_user_dlg .group_tree').combotree('getValues');
    var gender=$("#add_user_dlg .gender_combobox").combobox("getValue");
    var disk_size=$('#add_user_dlg input[name=disk_size]').val();
    var description=$('#add_user_dlg input[name=description]').val();
    var identity=$('#add_user_dlg .identity_combobox').combobox("getValue");
    var number=$('#add_user_dlg input[name=number]').val();
    var department_id=$('#add_user_dlg .department_tree').combotree("getValue");
    var result = validateForm(username,password,email,phone,number,gender);
     if (result) {
    	 $.post("/bcms/proxy", {method:"post",url: "user/",number:number,identity:identity,department_id:department_id, username: username,cn_name:cn_name, password:password,email:email,phone:phone,group_ids:JSON.stringify(groups),gender:gender,disk_size:disk_size,description:description}, function (result) {
    	        var obj= $.parseJSON(result);
    	        if (obj.success==false) {
    	            alert(obj.msg);
    	        } else {
    	        	$('#add_user_dlg').dialog('close');
    	            $("#user_table").datagrid('reload');
    	        }
    	    });
     }
    
} 


function validateForm(username,password,email,phone,number,gender){
	if (username == "" || username == null){
		alert("用户名不能为空");
		$('#add_user_dlg input[name=name]').focus(); 
		return false;
	}
	if (password == "" || password == null){
		alert("密码不能为空");
		$('#add_user_dlg input[name=password]').focus(); 
		return false;
	}
	if (number == "" || number == null){
		alert("编号不能为空");
		return false;
	}
	if (gender == "" || gender == null){
		alert("性别不能为空");
		return false;
	}
	var reg = new RegExp('^[a-zA-Z0-9]+@[a-zA-Z0-9]+.[a-z][a-z.]{2,8}$');
	if (!reg.test(email)) {
		alert("邮箱格式不正确，请重新输入");
		return false;
	}
	// 匹配13，14，15，18开头的手机号码！
	var reg = /^0?1[3|4|5|8][0-9]\d{8}$/;
	if (!reg.test(phone)) {
		alert("电话号码格式不正确！");
		return false;
	}
	return true;
}

function editUser(index){
    $('#user_table').datagrid('selectRow', index);
    var row = $('#user_table').datagrid('getSelected');
    if (row) {
        initModify(row);
        $('#modify_user_dlg').dialog('open').dialog('setTitle', '编辑用户');;
    } else {
        $.messager.alert("提示", "请选择要编辑的行！", "info");
        return;
    }
}

function initModify(row) {
    $("#modify_user_form").form("clear");
    $("#modify_user_dlg input[name=id]").val(row.id);
    $("#modify_user_dlg input[name=name]").val(row.username);
    $("#modify_user_dlg input[name=cn_name]").val(row.cn_name);
    $('#modify_user_dlg input[name=email]').val(row.email);
    $('#modify_user_dlg input[name=phone]').val(row.phone);
    $('#modify_user_dlg input[name=number]').val(row.number);
    $("#modify_user_dlg .identity_combobox").combobox('loadData', [{"id": 1, "text": "学生"}, {"id": 2, "text": "老师"}]);
    $("#modify_user_dlg .identity_combobox").combobox('setValues', [row.identity]);
    $("#modify_user_dlg .gender_combobox").combobox('loadData', [{"id": 1, "text": "男"}, {"id": 2, "text": "女"}]);
    $("#modify_user_dlg .gender_combobox").combobox('setValues', [row.gender]);
    $('#modify_user_dlg input[name=id_card]').val(row.id_card);
    $('#modify_user_dlg input[name=disk_size]').val(row.disk_size);
    $('#modify_user_dlg input[name=description]').val(row.description);
    $.post("/bcms/proxy", {method: "get", url: "group/"}, function (result) {
        var obj = $.parseJSON(result);
        if (obj.success == false) {
            alert(obj.msg);
        } else {
            $("#modify_user_dlg .group_tree").combotree('loadData', formatGroupListData(obj));
            var t = [];
            for (var i = 0; i < row.groups.length; i++) {
                t[i] = row.groups[i].id;
            }
            $("#modify_user_dlg .group_tree").combotree('setValues', t);
        }
    });

    $("#modify_user_dlg .department_tree").combotree('loadData', department_tree);
    $("#modify_user_dlg .department_tree").combotree('setValue', row.department_id);


}

function modifyUser(){
    var id=$('#modify_user_dlg input[name=id]').val();
    var cn_name = $('#modify_user_dlg input[name=cn_name]').val();
    var email = $('#modify_user_dlg input[name=email]').val();
    var phone = $('#modify_user_dlg input[name=phone]').val();
    var groups = $('#modify_user_dlg .group_tree').combotree('getValues');
    var gender=$("#modify_user_dlg .gender_combobox").combobox("getValue");
    var disk_size=$('#modify_user_dlg input[name=disk_size]').val();
    var description=$('#modify_user_dlg input[name=description]').val();
    var identity=$('#modify_user_dlg .identity_combobox').combobox("getValue");
    var number=$('#modify_user_dlg input[name=number]').val();
    var department_id=$('#modify_user_dlg .department_tree').combotree("getValue");
    var result = validateForm(username,password,email,phone,number,gender);
    if (result) { 
        $.post("/bcms/proxy", {method:"put",url: "user/"+id,cn_name:cn_name,identity:identity,department_id:department_id, email:email,phone:phone,group_ids:JSON.stringify(groups),number:number,gender:gender,disk_size:disk_size,description:description}, function (result) {
            var obj= $.parseJSON(result);
            if (obj.success==false) {
                $('#modify_user_dlg').dialog('close');
                alert(obj.msg);
            } else {
                $('#modify_user_dlg').dialog('close');
                $("#user_table").datagrid('reload');
            }
        });
    }
}

function initAddGroupCombotree() {
    $("#add_user_dlg .identity_combobox").combobox('loadData', [{"id": 1, "text": "学生"}, {"id": 2, "text": "老师"}]);
    $("#add_user_dlg .gender_combobox").combobox('loadData', [{"id": 1, "text": "男"}, {"id": 2, "text": "女"}]);
    $.post("/bcms/proxy", {method: "get", url: "group/"}, function (result) {
        var obj = $.parseJSON(result);
        if (obj.success==false) {
            alert(obj.msg);
        } else {
            $("#add_user_dlg .group_tree").combotree('loadData', formatGroupListData(obj));
        }
    });
}

function initAddDepartmentCombotree() {
    /*var url = "/bcms/departmentTree";
	$.getJSON(url, function(json) {
	department_tree= formatDepartmentTreeData(json)
	$("#add_user_dlg .department_tree").combotree('loadData', formatDepartmentTreeData(json));
	});*/
//	$("#add_user_dlg .department_tree").combotree('loadData', department_tree);
	//渲染easyui 控件
	$("#add_user_dlg .department_tree").combotree({
			data : department_tree,
			valueField : 'id',
			textField : 'text',
			editable : true,
			mode: 'local',
			delay: '500',
			keyHandler : {enter: function() {
					//var opts = $(this).combobox('options');
					//return row[opts.textField].indexOf(q) == 0;
				    var curr_text = $('#add_user_dlg .department_tree').combobox('getText')
				    queryComboTree(curr_text, "add_user_dlg .department_tree");
				}
			}
			});  

}

//组织机构combotree 过滤查询
function queryComboTree(q, comboid) {
	var datalist = [];//用平面的combobox来展示过滤的结果
	var childrenlist = [];
	var combotreeid = "#" + comboid;
	var roots = $(combotreeid).combotree('tree').tree('getRoots');//得到根节点数组
	var children;
	var entertext = $(combotreeid).combotree('getText');
	$(combotreeid).combotree('setText', q);
	if (entertext == null || entertext == "") {//如果文本框的值为空，或者将文本框的值删除了，重新reload数据
	    $(combotreeid).combotree('reload');
	    $(combotreeid).combotree('clear');
	    $(combotreeid).combotree('setText', q);
	    return;
	}
	//循环数组，找到与输入值相似的，加到前面定义的数组中，
	for (i = 0; i < roots.length; i++) {
	    if (q == roots[i].text) {
		$(combotreeid).combotree('tree')
			.tree('select', roots[i].target);
		    return;
	    } else {
		if (roots[i].text.indexOf(q) >= 0 && roots[i].text != "") {
		    var org = {
		        "id" : roots[i].id,
			"text" : roots[i].text
			    };
		    datalist.push(org);
		}
	    }
             //找子节点（递归）
	    childrensTree(combotreeid, roots[i].target, datalist, q);
        }
		//如果找到相似的结果，则加载过滤的结果
		if (datalist.length > 0) {
			$(combotreeid).combotree('loadData', datalist);
			$(combotreeid).combotree('setText', q);
			datalist = [];//这里重新赋值是避免再次过滤时，会有重复的记录
			return;
		} else {
			$(combotreeid).combotree('reload');
			$(combotreeid).combotree('clear');
			$(combotreeid).combotree('setText', q);
			return;
		}
	}

	function childrensTree(combotreeid, rootstarget, datalist, q) {
		children = $(combotreeid).combotree('tree').tree('getChildren', rootstarget);
		console.log(children);
		for (j = 0; j < children.length; j++) {
			if (q == children[j].text) {
				$(combotreeid).combotree('tree').tree('select',
						children[j].target);
				return;
			} else {
				if (children[j].text.indexOf(q) >= 0 && children[j].text != "") {
					var org = {
						"id" : children[j].id,
						"text" : children[j].text
					};
					datalist.push(org);
				}
			}
			//childrensTree(combotreeid,children[j].target,datalist,q);
		}
	}

function delUsers() {
    var rows = $('#user_table').datagrid("getSelections");
    if (rows.length > 0) {
        $.messager.confirm('确认', '确认删除?', function (data) {
            if (data) {
                for (var i = 0; i < rows.length; i++) {
                    $.post("/bcms/proxy", {method: "delete", url: "user/" + rows[i].id + "/"}, function (result) {
                        var obj = $.parseJSON(result);
                        if (obj.success == false) {
                            alert("删除失败!");
                        } else {
                            $("#user_table").datagrid('reload');
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

function delUser(index){
    $('#user_table').datagrid('selectRow',index);// 关键在这里
    var row = $('#user_table').datagrid('getSelected');
    if(row) {
        $.messager.confirm('确认', '确认删除?', function (data) {
            if(data) {
                $.post("/bcms/proxy", {method: "delete", url: "user/" + row.id }, function (result) {
                    var obj= $.parseJSON(result);
                    if (obj.success==false) {
                        alert("删除失败!");
                    } else {
                        $("#user_table").datagrid('reload');
                    }
                });
            }
        })
    }else{
        $.messager.alert("提示", "请选择要删除的行！", "info");
        return;
    }
}

function formatGroup(val, row) {
    var result="";
    for(var i=0;i<val.length;i++){
        result+="<span>"+val[i].name+"<span>";
    }
    return result;
}


function formatGroupListData(data){
    var fin = [];
    for (var i = 0; i < data.length; i++) {
        var obj = data[i];
        obj.text = obj.name;
        obj.children=[];
        fin.push(obj);
    }
    return fin;
}

function formatDepartmentTreeData(data){
    var fin = [];
    for (var i = 0; i < data.length; i++) {
        var obj = data[i];
        obj.text = obj.name;
        if (obj.children && obj.children.length > 0) {
            obj.state="closed";
            obj.children = formatDepartmentTreeData(obj.children);
        }
        fin.push(obj);
    }
    return fin;
}
