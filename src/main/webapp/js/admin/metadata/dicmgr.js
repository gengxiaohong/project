/**
 * Created by ligson on 2015/8/18.
 *  "id": "10",
 "name": "字段名",
 "description": "字段描述",
 "datatype": "数据类型",
 "lom_id": "1.1",
 "code": "11121554",
 "innercode": "010101"
 langstring:多语言字符串
 language:语种
 string:字符串
 number:数值
 vocabulary:词汇表
 source:来源
 value:值
 structure:结构类型
 date:时间

 constraints:range,nullable,unique,length
 **********/

function showAddDicItemDlg() {
    $("#addDicItemDlg").dialog("open");
}
function showAddDicTypeDlg() {
    $("#addDicTypeDlg").dialog("open");
}
function deleteDic() {
    var row = $("#metaGrid").datagrid("getSelected");
    if (row) {
        $.post("/bcms/proxy", {url: "vocabulary/" + row.id, method: "DELETE"}, function (data) {
            if (data.id != null) {
                $("#metaGrid").datagrid("reload");
            }
        }, "json");
    }
}

/****
 * "id": "FI-SW-01",
 "zh_name": "Koi",
 "en_name": "Koi",
 "lom_id": "5.2",
 "source": "XXXXX",
 "words"
 */
$(function () {
    $("#metaGrid").datagrid({
        url: "/bcms/proxy?url=vocabulary&method=GET",
        fitColumns: true,
        columns: [[
            {field: "id", title: "id", width: 100, hidden: true},
            {field: "zh_name", title: "中文名称", width: 100},
            {field: "en_name", title: "英文名称", width: 100},
            {field: "lom_id", title: "lom编号", width: 50},
            {field: "source", title: "来源", width: 50},
            {
                field: "words", title: "词汇表", width: 100, formatter: function (value, row, idx) {
                var words1 = "<select class='easyui-combobox' editable=\"false\" style=\"width:200px;\">";
                if (row.words) {
                    for (var i = 0; i < row.words.length; i++) {
                        words1 += "<option value='" + row.words[i].id + "'>" + row.words[i].name + "</option>";
                    }
                }
                words1 += "</select>";
                return words1;
            }
            },
            {
                field: "edit", title: "编辑", width: 50, formatter: function (value, row, index) {
                return "<a onclick='showEditDicItemDlg(\"" + index + "\")'>编辑</a>";
            }
            }
        ]]
    });

});

function searchDicItem() {
	var searchCondition = $('#searchCondition').combobox('getValue');
	var searchContent = $('#searchContent').val();
	var queryParams = $('#metaGrid').datagrid('options').queryParams={};  
	if(searchCondition == 'name') {
		queryParams.zh_name = searchContent;
	} else if(searchCondition == 'code') {
		queryParams.lom_id = searchContent;
	}
    //重新加载datagrid的数据  
    $("#metaGrid").datagrid('reload');
}

function showEditDicItemDlg(index) {
    $('#metaGrid').datagrid('selectRow', index);
    var row = $('#metaGrid').datagrid('getSelected');
    if (row) {
        var dlg = $("#editDicItemDlg");
        $("#editDicItemDlg input[name=id]").val(row.id);
        $("#editDicItemDlg #zh_name1").textbox("setText", row.zh_name);
        $("#editDicItemDlg #en_name1").textbox("setText", row.en_name);
        $("#editDicItemDlg #lom_id1").textbox("setText", row.lom_id);
        $("#editDicItemDlg #source1").textbox("setText", row.source);
        $("#editDicItemDlg #words1").textbox("setText", row.words);
        
        $("#editDicItemDlg input[name=zh_name]").val(row.zh_name);
        $("#editDicItemDlg input[name=en_name]").val(row.en_name);
        $("#editDicItemDlg input[name=lom_id]").val(row.lom_id);
        $("#editDicItemDlg input[name=source]").val(row.source);
        
        var words1 = "";
        if (row.words) {
            for (var i = 0; i < row.words.length; i++) {
                words1 += row.words[i].name + ",";
            }
            words1 = words1.substr(0, words1.length - 1);
        }
        $("#words1").textbox("setText", words1);
        $("#editDicItemDlg input[name=words]").val(words1);
        dlg.dialog("open");
    }
}
function submitDicForm() {
    var form = $("#addDicForm");
    var zh_name = form.find("input[name='zh_name']").val();
    var en_name = form.find("input[name='en_name']").val();
    var lom_id = form.find("input[name='lom_id']").val();
    var source = form.find("input[name='source']").val();
    var words = form.find("input[name='words']").val();
    var wdArr = words.split(",");
    var ht = JSON.stringify(wdArr);
    $.post("/bcms/proxy", {
        method: "post",
        url: "/vocabulary/",
        //arrayEls:["words"],
        zh_name: zh_name,
        en_name: en_name,
        lom_id: lom_id,
        source: source,
        words: ht
    }, function (data) {
        var result = JSON.parse(data);
        if (!result.success) {
            $("#addDicTypeDlg").dialog("close");
            $("#metaGrid").datagrid("reload");
        } else {
            alert("创建失败!");
        }
    });
}

function editDicItemForm() {
    var form = $("#editDicItemDlg");
    var id = form.find("input[name='id']").val();
    var zh_name = form.find("input[name='zh_name']").val();
    var en_name = form.find("input[name='en_name']").val();
    var lom_id = form.find("input[name='lom_id']").val();
    var source = form.find("input[name='source']").val();
    var words = form.find("input[name='words']").val();
    var wdArr = words.split(",");
    var ht = JSON.stringify(wdArr);
    $.post("/bcms/proxy", {
        method: "put",
        url: "/vocabulary/" + id,
        zh_name: zh_name,
        en_name: en_name,
        lom_id: lom_id,
        source: source,
        words: ht
    }, function (data) {
        var result = JSON.parse(data);
        if (!result.success) {
            $("#editDicItemDlg").dialog("close");
            $("#metaGrid").datagrid("reload");
        } else {
            alert("修改失败!");
        }
    });
}