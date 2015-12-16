/**
 * Created by ligson on 2015/8/28.
 */
$(function () {
	//alert(window.location.search);
	var urlparam = window.location.search;
	var resourceId = urlparam.substring(urlparam.lastIndexOf('=')+1, urlparam.length);
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
    /*$("#resourceTree").combotree({
        loadFilter: function (data) {
            for (var i = 0; i < data.rows.length; i++) {
                data.rows[i].text = data.rows[i].name;
            }
            return data.rows;
        }
    });*/
    $.post("/bcms/proxy", {method: "get", url: "resourcelibrary/"}, function (result) {
        var obj = jQuery.parseJSON(result);
        if (obj.success==false) {
            alert(obj.msg);
        } else {
            $("#resourceTree").combotree({data: formatTreeData(obj.rows)});
        }
    });
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
function submitForm() {
    var ff = $("#createResourceForm");

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
            parents:parent_id,
            recommend_number:recommend_number,
            click_number:click_number
//            committer: parseInt(committer)
        }, function (data) {
            if (data.id != undefined) {
                //alert("ok........");
                alert("资源更新成功!");
                window.location.href = "/bcms/admin/resourcemgr/rmgr.jsp";
            } else {
                alert("资源更新失败!");
            }
        }, "json");
    } else {
        alert("表单参数不完整!");
    }
}

function submitSuccess(data3, resourceId) {
    if (data3.id != undefined) {
        //alert("资源创建成功!");
        window.location.href = "/bcms/admin/resourcemgr/editmeta.jsp?id=" + resourceId;
    } else {
        alert("资源创建失败!");
    }
}