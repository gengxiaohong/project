$(function () {
	
	// 用于combox及treegrid的数据源,从服务器端获取
    /*$.post("/bcms/proxy", {method: "get", url: "tag/"}, function (result) {
        var obj = jQuery.parseJSON(result);
        if (obj.success==false) {
            $.messager.alert(obj.msg);
        } else {
        	var ds = new Array();
            for(var i = 0;i<obj.rows.length;i++){
            	var cfilter = new Object();
            	cfilter.id =obj.rows[i].id;
            	cfilter.text ='"'+ obj.rows[i].name+'"';
            	ds.push(jQstringify(cfilter));
            }
            CreateFile(ds);
        }
    });
    // jquery stringif function
    function jQstringify( obj ) {
    	var arr = [];
    	$.each( obj, function( key, val ) {
    	var next = '"'+key+'"' + ": ";
    	next += $.isPlainObject( val ) ? printObj( val ) : val;
    	arr.push( next );
    	});
    	return "{ " + arr.join( ", " ) + " }";
    	};*/

    	/*$('#search_tag').combobox({
            prompt: '输入关键字自动探索...',
            url: '../../js/admin/social/tag_test_combobox.json',
            method: 'get',
            valueField: 'id',
            textField: 'text',
            mode:'local',
        	filter: function(q, row){
        		var opts = $(this).combobox('options');
        		return row[opts.textField].indexOf(q) == 0;
        	},
            onSelect: function (tag) {
                var id = $('#search_tag').combobox('getValue');
                console.log($("#tag_tree_grid").tree("find", id).target);
                $("#tag_tree_grid").tree("expand", $("#tag_tree_grid").tree("find", id).target);
                $('#tag_tree_grid').tree('select', $("#tag_tree_grid").tree("find", id).target);
            }
        });*/
	
    $("#tag_tree_grid").treegrid({
        idField: 'id',
        treeField: 'name',
        rownumbers: false,
        pagination: true,
        toolbar:"#tb",
        url: "/bcms/proxy?url=tag&method=GET",
        columns: [[
            {field: 'name', width: '75%', title: '名称'},
            {
                field: '_operate', width: '20%', align: 'center', title: '操作',
                formatter: function (value, row, index) {
                    return '<a class="tablelink" href="javascript:void(0)" onclick="clickModifyTag(' + row.id + ')">修改</a>&nbsp;&nbsp;<a class="tablelink" href="javascript:void(0)" onclick="delTag(' + row.id + ')">删除</a>';
                }
            }
        ]]
    });
});
/*//js写文件
function CreateFile(data)
{
   var fso, tf;
   fso = new ActiveXObject("Scripting.FileSystemObject");//获取对象
   tf = fso.CreateTextFile("tag_combobox.json", true);//创建一个文件夹
   // 写一行，并且带有新行字符。
   tf.WriteLine("Testing 1, 2, 3.") ;
   // 向文件写三个新行字符。  
   tf.WriteBlankLines(3) ;
   // 写一行。
   tf.Write ("["+data+"]");
   tf.Close();//关闭
}
*/
function reloadTag(){
	$("#tag_tree_grid").treegrid('load',{
		name:$('#search_tag').val()
	});
}
//点击编辑标签
function clickModifyTag(id){
    $('#tag_tree_grid').treegrid('select', id);
    var row = $('#tag_tree_grid').treegrid('getSelected');
    if(row) {
        $('#modify_tag_dlg input[name=name]').val(row.name);
        $('#modify_tag_dlg input[name=id]').val(id);
        $('#modify_tag_dlg input[name=parent_id]').val(row.parent_id);
        $('#modify_tag_dlg').dialog('open').window('resize',{
        	left:($(window).width()-400)/2,
        	top:($(window).height()-120)/2
        });;
    }else{
        $.messager.alert("提示", "请选择要编辑的行！", "info");
        return;
    }
}

function modifyTag(){
    var id=$("#modify_tag_dlg input[name=id]").val();
    var name=$("#modify_tag_dlg input[name=name]").val();
    var parent_id=$("#modify_tag_dlg input[name=parent_id]").val();
    $.post("/bcms/proxy", {method:"put",url: "tag/"+id,name:name,parent_id:parent_id}, function (result) {
        var obj= $.parseJSON(result);
        if (!obj.id) {
        	 $.messager.alert('提示',obj.msg);
        } else {
            $('#modify_tag_dlg').dialog('close');
            $("#tag_tree_grid").treegrid("reload");
        }
    });
}

function delTag(id){
    $('#tag_tree_grid').treegrid('select', id);
    var row = $('#tag_tree_grid').treegrid('getSelected');
    if(row) {
        $.messager.confirm('确认', '确认删除?', function (data) {
            if(data) {
                $.post("/bcms/proxy", {method: "delete", url: "tag/" + id }, function (result) {
                    var obj= $.parseJSON(result);
                    if (obj.success==false) {
                        alert("删除失败!");
                    } else {
                        $("#tag_tree_grid").treegrid("reload");
                    }
                });
            }
        })
    }else{
        $.messager.alert("提示", "请选择要删除的标签！", "info");
        return;
    }
}

function clickAddTag() {
    var row = $('#tag_tree_grid').treegrid('getSelected');
    if(row) {
        $('#add_tag_dlg input[name=parent_id]').val(row.id);
    }else{
        $('#add_tag_dlg input[name=parent_id]').val(0);
    }
    $('#add_tag_dlg').dialog('open').dialog("setTitle", "添加标签");
}

function saveTag(){
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
            $("#tag_tree_grid").treegrid("reload");
        }
    });
}




