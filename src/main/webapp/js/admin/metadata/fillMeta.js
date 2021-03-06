/**
 * Created by Administrator on 2015/8/26.
 */
var datas = [];
function dealData(children, pId) {
    for (var i = 0; i < children.length; i++) {
        children[i].node_id = children[i].id;
        children[i].id = pId + "-" + children[i].id;
        if (children[i].children) {
            dealData(children[i].children, children[i].id);
        }
    }
}

function displayStructure(node, boxId) {
    if (node.children && node.children.length > 0) {

        for (var i = 0; i < node.children.length; i++) {
        	displayStructure(node.children[i], boxId + "-" + node.children[i].id);
        }
    } else {
        if (node.kind == 2 && node.vocabulary_type_id != undefined) {
            $.post("/bcms/proxy", {method: "GET", url: "vocabulary/" + node.vocabulary_type_id}, function (data) {
                if (data.id != undefined) {
                    $(boxId).combobox("loadData", data.words);
                }
            }, "json");
        }
    }
}

function displayVoc(node, boxId) {
	$.post("/bcms/proxy", {method: "GET", url: "vocabulary/" + node.vocabulary_type_id}, function (data) {
        if (data.id != undefined) {
            $(boxId).combobox("loadData", data.words);
        }
    }, "json");
}
var href = window.location.href;
var idx = href.indexOf("id=");
var resourceId = href.substring(idx + 3);

$(function () {
    $("thead").dblclick(function () {
        $(this).next().toggle();
    });
    $("#metaGrid").treegrid({
    	url: "/bcms/resouceMetaQuery?id=" + resourceId,
        idField: "id",
        treeField: "zh_name",
        fitColumns: true,
        columns: [
            [
                {
                    field: "id", title: "id", width: 50
                },
                {
                    field: "zh_name", title: "项", width: 50
                },
                {
                    field: "value", title: "值", width: 200, formatter: function (value, row, idx) {
                    if (row.kind == 0) {
                        return "<input type='text' class='easyui-textbox etextbox' id='fill-" + row.id + "'>";
                    } else if (row.kind == 1) {
                        return "<input type='text' class='easyui-textbox etextbox' validType='number' id='fill-" + row.id + "'>";
                    } else if (row.kind == 2) {
                        return "<select editable='false' style='width:200px;' class='easyui-combobox ecombobox' id='fill-" + row.id + "'></select>";
                    } else if (row.kind == 3) {
                        return "";
                    } else if (row.kind == 4) {
                        return "<input type='text' class='easyui-datebox edatebox' id='fill-" + row.id + "'>";
                    }
                }
                },
                {
                    field: "example", title: "举例", width: 50
                },
                {
                    field: "val_num", title: "取值数", width: 50
                }

            ]
        ],
        onLoadSuccess: function (data) {
            $(".easyui-textbox").textbox();
            $(".easyui-datebox").datebox();
            $(".easyui-combobox").combobox({
                textField: "name",
                valueField: "id"
            });
            $(".easyui-linkbutton").linkbutton();

            var dt = $('#metaGrid').treegrid("getData");
            for (var i = 0; i < dt.length; i++) {
                var kind = dt[i].kind;
                var rowId = dt[i].id;
                var node = dt[i];
                if (kind == 2) {
                    var boxId = "#fill-" + rowId;
                    if(node.vocabulary_type_id != undefined) {
                    	displayVoc(node, boxId);
                    }
                } else if (kind == 3) {
                    //var sId = dt[i].structure_type_id;
                    var stid = dt[i].structure_type_id;
                    var boxId = "#fill";
                    displayStructure(node, boxId);
                }
            }

            $.post("/bcms/proxy", {method: "GET", url: "resource/" + resourceId + "/meta"}, function (data2) {
                    for (var i = 0; i < dt.length; i++) {
                        var kind = dt[i].kind;
                        var rowId = dt[i].id;
                        var node = dt[i];
                        var vBox = $("#fill-" + rowId);
                        if(kind==0||kind==4 || kind==1)
                            vBox.textbox("setValue", data2.data[rowId]);
                        if(kind==2)
                            vBox.combobox("setValue", data2.data[rowId]);
                        if(kind==3)
                            dataSet(node,"#fill",data2.data[rowId]);
                    }
             }, "json");
            //var data = $('#metaGrid').treegrid("getData");
            //$('#metaGrid').treegrid("loading");
            //loadDatas(data);
            //$('#metaGrid').treegrid("loaded");
        },
        loadFilter: function (data, parentId) {
            for (var i = 0; i < data.rows.length; i++) {
                data.rows[i].node_id = data.rows[i].id;
                if (data.rows[i].children) {
                    dealData(data.rows[i].children, data.rows[i].id);
                }
            }
            return data;
        }
    });
});

function dataSet(node, boxId,data){
    if (boxId == "#fill") {
        boxId += "-" + node.id;

    }
    if (node.children && node.children.length > 0) {

        for (var i = 0; i < node.children.length; i++) {
            dataSet(node.children[i], boxId + "-" + node.children[i].node_id,data[node.children[i].node_id]);
        }
    } else {

            if(node.kind==0||node.kind==4 || node.kind==1)
                $(boxId).textbox("setValue", data);
            if(node.kind==2)
                $(boxId).combobox("setValue", data);
    }
}

function loadDatas(data) {
    for (var i = 0; i < data.length; i++) {
        var isExist = false;
        for (var j = 0; j < datas.length; j++) {
            if (datas[j].id == data[i].id) {
                isExist = true;
                break;
            }
        }
        if (!isExist) {
            datas.push(data[i]);
        }
        if (data.children) {
            loadDatas(data.children);
        }
    }

}

/****
 *  "id": "1",
 "zh_name": "多语言字符串类型",
 "en_name": "多语言字符串类型",
 "description": "字段描述",
 "kind": 0,
 "lom_id": "9.2",
 "domain": "xxxx",
 "example": "xxxx",
 "collection": 0,
 "val_num": 10
 * @param jsonString
 */
var idIndex = 1;
function dealChildren(nodeId, children) {
    if (children) {
        for (var i = 0; i < children.length; i++) {
            children[i].id = nodeId + "-" + idIndex++;
            //col.push(children[i]);
            dealChildren(children[i].id, children[i].children);
        }
    }
}

function removeMetaRow(id, zh_name, en_name, kind, val_num, collection, example) {
    var count = 0;
    for (var i = 0; i < datas.length; i++) {
        var data = datas[i];
        if ((data.zh_name == zh_name) && (data.en_name == en_name) && (data.kind == kind) && (data.val_num == val_num) && (data.collection == collection) && (data.example == example)) {
            count = count + 1;
        }
    }
    if (count > 1) {
        var index = -1;
        for (var i = 0; i < datas.length; i++) {
            var data = datas[i];
            if (data.id == id) {
                index = i;
            }
        }
        if (index >= 0) {
            datas.splice(index, 1);
        }
        $('#metaGrid').treegrid("remove", id);
    } else {
        alert(zh_name + "项的取值数最少1个");
    }

}
function appendMetaRow(id, zh_name, en_name, kind, val_num, collection, example) {
    var count = 0;
    for (var i = 0; i < datas.length; i++) {
        var data = datas[i];
        if ((data.zh_name == zh_name) && (data.en_name == en_name) && (data.kind == kind) && (data.val_num == val_num) && (data.collection == collection) && (data.example == example)) {
            count = count + 1;
        }
    }
    if (count >= val_num) {
        alert(zh_name + "项的取值数最多" + val_num + "个");
        return;
    }

    var data1 = $('#metaGrid').treegrid("find", id);

    //if (data) {
    //data.id = id + "-" + idIndex;
    idIndex++;

    var nodeId = id + "-" + idIndex;
    var clone1 = data1.children;
    dealChildren(nodeId, clone1);
    var d = {
        id: nodeId,
        zh_name: zh_name,
        en_name: en_name,
        kind: kind,
        val_num: val_num,
        collection: collection,
        example: example,
        children: clone1
    };

    $('#metaGrid').treegrid('insert', {
        after: id,
        data: d
    });
    //}

}

function onContextMenu(e, row) {
    e.preventDefault();
    $(this).treegrid('select', row.id);
    $('#mm').menu('show', {
        left: e.pageX,
        top: e.pageY
    });
}

var idIndex = 100;
function append() {
    idIndex++;
    var d1 = new Date();
    var d2 = new Date();
    d2.setMonth(d2.getMonth() + 1);
    var node = $('#metaGrid').treegrid('getSelected');
    $('#metaGrid').treegrid('append', {
        parent: node.id,
        data: [{
            id: idIndex,
            name: 'New Task' + idIndex,
            persons: parseInt(Math.random() * 10),
            begin: $.fn.datebox.defaults.formatter(d1),
            end: $.fn.datebox.defaults.formatter(d2),
            progress: parseInt(Math.random() * 100)
        }]
    })
}
var buffer = "";
function dealRow(row, boxId) {
    if (row.kind != 3 && boxId == "#fill") {
        boxId += "-" + row.id;
    }
    if (row.kind == 0) {
        var value0 = $("#fill-" + row.id).textbox("getValue");
        if (value0 && value0 != "") {
            buffer += "\""+row.node_id + "\":\"" + value0 + "\",";
        }
    } else if (row.kind == 1) {
        var value1 = $("#fill-" + row.id).textbox("getValue");
        if (value1 && value1 != "") {
            buffer += "\""+row.node_id + "\": " + parseInt(value1) + ",";
        }
    } else if (row.kind == 2) {
        var value2 = $("#fill-" + row.id).combobox("getValue");
        if (value2 && value2 != "") {
            buffer += "\""+row.node_id + "\":\"" + value2 + "\",";
        }
    } else if (row.kind == 3) {
        buffer += "\""+row.node_id + "\":{";
        for (var i = 0; i < row.children.length; i++) {
            dealRow(row.children[i], boxId + "-" + row.children[i].node_id);
        }
        buffer += "},";
        /*if(buffer.substring(buffer.length-3,buffer.length)=="{},"){
            buffer = buffer.substring(0,buffer.length-3);
        }*/
    } else if (row.kind == 4) {
        var value4 = $("#fill-" + row.id).datebox("getValue");
        if (value4 && value4 != null) {
            buffer += "\""+row.node_id + "\":\"" + value4 + "\",";
        }
    }
}
function submitMetaForm() {
    buffer = "";
    var rows = $('#metaGrid').treegrid("getData");
    if (rows.length > 0) {
        buffer += "{";
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            dealRow(row, "#fill");
        }
        buffer += "}";
    }
    updateMeta(resourceId, buffer.replaceAll(",}","}"));
}

function updateMeta(id, value) {
    var params = {
        method: "POST",
        id:id,
        value:value
    };
    $.post("/bcms/editMetaValue", params, function (data2) {
        if (data2.success!=false) {
            alert("更新成功");
            window.location.href = "/bcms/admin/resourcemgr/rmgr.jsp";
        } else {
            alert("更新失败");
        }
    }, "json");
}