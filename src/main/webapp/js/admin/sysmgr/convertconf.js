function submitForm() {
	var sname = $("#sname").textbox("getValue");
	alert(sname);
    if ((sname && (!sname.isEmpty()))) {
        $.post("http://42.62.50.13:8080/", {url: "ApiService/services/rest/serverinfo", method: "POST", sname: sname}, function (data) {
            if (data != null && data.success) {
                $("#ipAddr").value = data.host;
                $("#ipPort").value = data.port;
            } else {
                alert("转码服务配置失败！");
            }
        }, "json");
    } else {
    	alert("请输入转码服务注册名称");
    }
}

function clearForm() {
	$("#sname").value="";
	$("#ipAddr").value = "";
    $("#ipPort").value = "";
}