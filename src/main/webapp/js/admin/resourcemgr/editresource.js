/**
 * Created by ligson on 2015/8/28.
 */
function setData(data) {
    if (data != undefined) {
        for (var i = 0; i < data.length; i++) {
            data[i].text = data[i].name;
            setData(data[i].children);
        }
    }
}
$(function () {
    $.post("/bcms/proxy",{method:"GET",url:"resource/"+resourceId},function(data){
        $("#name10").textbox("setValue",data.name);
        $("#kind10").combobox("setValue",data.kind);
        $("#resourceTree").combotree("setValue",data.resourcelibrary_id);
        if(data.tag_ids!=undefined)
        $("#tagTree").combotree("setValues", data.tag_ids);
        $("#status10").val(data.status);
        if(data.parent_id!=undefined)
        $("#parent_id10").val(data.parent_id);
        $("#recommend_number10").val(data.recommend_number);
        $("#click_number10").val(data.click_number);
        $("#id10").val(data.id);
    },"json");
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
});
function submitForm2() {
    var ff = $("#editResourceForm");

    if (ff.form("validate")) {
        var name = $("#name10").textbox("getValue");
        var kind10 = $("#kind10").combobox("getValue");
        var node = $("#resourceTree").combotree("getValue");
        var tag = $("#tagTree").combobox("getValues");
        var committer = $.cookie("bcms_user_id");
        var status = $("#status10").val();
        var parent_id = $("#parent_id10").val();
        var recommend_number = $("#recommend_number10").val();
        var click_number = $("#click_number10").val();
        var id = $("#id10").val();
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
               $("#editResourcesDialog").dialog("close");
            } else {
                $.messager.alert('提示',"资源更新失败!",'error');
            }
        }, "json");
    } else {
        alert("表单参数不完整!");
    }
}

