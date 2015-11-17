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
                field: 'resourceNum',
                title: '描述',
                width: 100,
                sortable: true
            }, {
                field: 'index',
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
    var name = $("#add_user_dlg input[name=name]").val();
    var description = $('#add_user_dlg input[name=descr]').val();
    var resource_ids = $('#add_user_dlg input[name=email]').val();
    var is_published = $('#add_user_dlg input[name=phone]').val();
    var is_published=$("#add_user_dlg .gender_combobox").combobox("getValue");
    var disk_size=$('#add_user_dlg input[name=disk_size]').val();
    var description=$('#add_user_dlg input[name=description]').val();
    var identity=$('#add_user_dlg .identity_combobox').combobox("getValue");
    var number=$('#add_user_dlg input[name=number]').val();
    var department_id=$('#add_user_dlg .department_tree').combotree("getValue");
    $.post("/bcms/proxy", {method:"post",url: "user/",number:number,identity:identity,department_id:department_id, username: username,cn_name:cn_name, password:password,email:email,phone:phone,group_ids:JSON.stringify(groups),gender:gender,disk_size:disk_size,description:description}, function (result) {
        var obj= $.parseJSON(result);
        $('#add_user_dlg').dialog('close');
        if (obj.success==false) {
            alert(obj.msg);
        } else {
            $("#user_table").datagrid('reload');
        }
    });
}