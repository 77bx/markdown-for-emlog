function addattach_img(fileurl,imgsrc,aid, width, height, alt){
	if (imgsrc != "") {
		$('#wmd-image-buttoncontent').click();
		var checkDialog = setInterval(function () {
           if ($('.wmd-prompt-dialog').length > 0) {
             $('.wmd-prompt-dialog input[type="text"]').val(imgsrc).select();
             clearInterval(checkDialog);
              checkDialog = null;
           }
        }, 10);
	}
}
function addattach_file(fileurl,filename,aid){
	$('#wmd-link-buttoncontent').click();
	var checkDialog = setInterval(function () {
		if ($('.wmd-prompt-dialog').length > 0) {
			$('.wmd-prompt-dialog input[type="text"]').val(fileurl).select();
			clearInterval(checkDialog);
			checkDialog = null;
		}
	}, 10);
}
//act:0 auto save,1 click attupload,2 click savedf button, 3 save page, 4 click page attupload
function autosave(act){
	var nodeid = "as_logid";
	if (act == 3 || act == 4){
		var url = "page.php?action=autosave";
		var title = $.trim($("#title").val());
		var alias = $.trim($("#alias").val());
		var template = $.trim($("#template").val());
		var logid = $("#as_logid").val();
		var content = "<!--markdown-->"+$('#content').val();
		var pageurl = $.trim($("#url").val());
		var allow_remark = $("#page_options #allow_remark").attr("checked") == 'checked' ? 'y' : 'n';
		var is_blank = $("#page_options #is_blank").attr("checked") == 'checked' ? 'y' : 'n';
		var token = $.trim($("#token").val());
        var ishide = $.trim($("#ishide").val());
		var ishide = ishide == "" ? "y" : ishide;
		var querystr = "content="+encodeURIComponent(content)
					+"&title="+encodeURIComponent(title)
					+"&alias="+encodeURIComponent(alias)
					+"&template="+encodeURIComponent(template)
					+"&allow_remark="+allow_remark
					+"&is_blank="+is_blank
					+"&url="+pageurl
                    +"&token="+token
					+"&ishide="+ishide
					+"&as_logid="+logid;
	}else{
		var url = "save_log.php?action=autosave";
		var title = $.trim($("#title").val());
		var alias = $.trim($("#alias").val());
		var sort = $.trim($("#sort").val());
		var postdate = $.trim($("#postdate").val());
		var date = $.trim($("#date").val());
		var logid = $("#as_logid").val();
		var author = $("#author").val();
		var content = "<!--markdown-->"+$('#content').val();
		var excerpt = $('#excerpt').val();
		var tag = $.trim($("#tag").val());
		var top = $("#post_options #top").attr("checked") == 'checked' ? 'y' : 'n';
		var sortop = $("#post_options #sortop").attr("checked") == 'checked' ? 'y' : 'n';
		var allow_remark = $("#post_options #allow_remark").attr("checked") == 'checked' ? 'y' : 'n';
		var allow_tb = $("#post_options #allow_tb").attr("checked") == 'checked' ? 'y' : 'n';
		var password = $.trim($("#password").val());
		var ishide = $.trim($("#ishide").val());
        var token = $.trim($("#token").val());
		var ishide = ishide == "" ? "y" : ishide;
		var querystr = "content="+encodeURIComponent(content)
					+"&excerpt="+encodeURIComponent(excerpt)
					+"&title="+encodeURIComponent(title)
					+"&alias="+encodeURIComponent(alias)
					+"&author="+author
					+"&sort="+sort
					+"&postdate="+postdate
					+"&date="+date
					+"&tag="+encodeURIComponent(tag)
					+"&top="+top
					+"&sortop="+sortop
					+"&allow_remark="+allow_remark
					+"&allow_tb="+allow_tb
					+"&password="+password
                    +"&token="+token
					+"&ishide="+ishide
					+"&as_logid="+logid;
	}
	//check alias
	if(alias != '') {
		if (0 != isalias(alias)){
			$("#msg").html("<span class=\"msg_autosave_error\">链接别名错误，自动保存失败</span>");
			if(act == 0){setTimeout("autosave(0)",60000);}
			return;
		}
	}
	if(act == 0){
		if(ishide == 'n'){return;}
		if (content == ""){
			setTimeout("autosave(0)",60000);
			return;
		}
	}
	if(act == 1 || act == 4){
		var gid = $("#"+nodeid).val();
		if (gid != -1){return;}
	}
	$("#msg").html("<span class=\"msg_autosave_do\">正在保存...</span>");
	var btname = $("#savedf").val();
	$("#savedf").val("正在保存");
	$("#savedf").attr("disabled", "disabled");
	$.post(url, querystr, function(data){
		data = $.trim(data);
		var isrespone=/autosave\_gid\:\d+\_df\:\d*\_/;
		if(isrespone.test(data)){
			var getvar = data.match(/\_gid\:([\d]+)\_df\:([\d]*)\_/);
			var logid = getvar[1];
			if (act != 3){
				var dfnum = getvar[2];
				if(dfnum > 0){$("#dfnum").html("("+dfnum+")")};
			}
    		$("#"+nodeid).val(logid);
    		var digital = new Date();
    		var hours = digital.getHours();
    		var mins = digital.getMinutes();
    		var secs = digital.getSeconds();
    		$("#msg_2").html("<span class=\"ajax_remind_1\">成功保存于 "+hours+":"+mins+":"+secs+" </span>");
    		$("#savedf").attr("disabled", false);
    		$("#savedf").val(btname);
    		$("#msg").html("");
		}else{
		    $("#savedf").attr("disabled", false);
		    $("#savedf").val(btname);
		    $("#msg").html("<span class=\"msg_autosave_error\">网络或系统出现异常...保存可能失败</span>");
	    }
	});
	if(act == 0){
		setTimeout("autosave(0)",60000);
	}
}