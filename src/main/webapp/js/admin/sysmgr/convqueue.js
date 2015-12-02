$(function () {
    $("#metaGrid").datagrid({
        url: "http://42.62.50.13:8080/?url=ApiService/services/rest/encodequeue&method=POST",
        fitColumns: true,
        columns: [[
            {field: "id", title: "id", width: 100, hidden: true},
            {field: "file_hash", title: "文件HASH", width: 100},
            {field: "file_name", title: "文件名", width: 100},
            {field: "media_type", title: "媒体类型", width: 50},
            {field: "sourceResolution", title: "视频高度", width: 50},
            {field: "targetResolution", title: "视频宽度", width: 50},
            {field: "transcoding_processStatus", title: "进度", width: 50},
            {
                field: "oper", title: "操作", width: 50, formatter: function (value, row, index) {
	                return "<a onclick='removeCurrentQueue(\"" + index + "\")'>移除</a>";
	            }
            }
        ]]
    });

});


function removeCurrentQueue(itemid) {
	alert(itemid);
}