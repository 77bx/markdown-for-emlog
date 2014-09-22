function getChecked(node) {
	var re = false;
	$('input.'+node).each(function(i){
		if (this.checked) {
			re = true;
		}
	});
	return re;
}
function timestamp(){
	return new Date().getTime();
}
function em_confirm (id, property, token) {
	switch (property){
		case 'tw':
			var urlreturn="twitter.php?action=del&id="+id;
			var msg = "你确定要删除该条微语吗？";break;
		case 'comment':
			var urlreturn="comment.php?action=del&id="+id;
			var msg = "你确定要删除该评论吗？";break;
        case 'commentbyip':
			var urlreturn="comment.php?action=delbyip&ip="+id;
			var msg = "你确定要删除来自该IP的所有评论吗？";break;
		case 'link':
			var urlreturn="link.php?action=dellink&linkid="+id;
			var msg = "你确定要删除该链接吗？";break;
		case 'navi':
			var urlreturn="navbar.php?action=del&id="+id;
			var msg = "你确定要删除该导航吗？";break;
		case 'backup':
			var urlreturn="data.php?action=renewdata&sqlfile="+id;
			var msg = "你确定要导入该备份文件吗？";break;
		case 'attachment':
			var urlreturn="attachment.php?action=del_attach&aid="+id;
			var msg = "你确定要删除该附件吗？";break;
		case 'avatar':
			var urlreturn="blogger.php?action=delicon";
			var msg = "你确定要删除头像吗？";break;
		case 'sort':
			var urlreturn="sort.php?action=del&sid="+id;
			var msg = "你确定要删除该分类吗？";break;
		case 'page':
			var urlreturn="page.php?action=del&gid="+id;
			var msg = "你确定要删除该页面吗？";break;
		case 'user':
			var urlreturn="user.php?action=del&uid="+id;
			var msg = "你确定要删除该用户吗？";break;
		case 'tpl':
			var urlreturn="template.php?action=del&tpl="+id;
			var msg = "你确定要删除该模板吗？";break;
		case 'reset_widget':
			var urlreturn="widgets.php?action=reset";
			var msg = "你确定要恢复组件设置到初始状态吗？这样会丢失你自定义的组件。";break;
		case 'plu':
			var urlreturn="plugin.php?action=del&plugin="+id;
			var msg = "你确定要删除该插件吗？";break;
	}
	if(confirm(msg)){window.location = urlreturn + "&token="+token;}else {return;}
}
function focusEle(id){try{document.getElementById(id).focus();}catch(e){}}
function hideActived(){
	$(".actived").hide();
	//$(".error").hide();
}
function displayToggle(id, keep){
	$("#"+id).toggle();
	if (keep == 1){$.cookie('em_'+id,$("#"+id).css('display'),{expires:365});}
	if (keep == 2){$.cookie('em_'+id,$("#"+id).css('display'));}
}
function isalias(a){
	var reg1=/^[\u4e00-\u9fa5\w-]*$/;
	var reg2=/^[\d]+$/;
	var reg3=/^post(-\d+)?$/;
	if(!reg1.test(a)) {
		return 1;
	}else if(reg2.test(a)){
		return 2;
	}else if(reg3.test(a)){
		return 3;
	}else if(a=='t' || a=='m' || a=='admin'){
		return 4;
	} else {
		return 0;
	}
}
function checkform(){
	var a = $.trim($("#alias").val());
	var t = $.trim($("#title").val());
	if (t==""){
		alert("标题不能为空");
		$("#title").focus();
		return false;
	}else if(0 == isalias(a)){
		return true;
	}else {
		alert("链接别名错误");
		$("#alias").focus();
		return false
	};
}
function checkalias(){
	var a = $.trim($("#alias").val());
	if (1 == isalias(a)){
		$("#alias_msg_hook").html('<span id="input_error">别名错误，应由字母、数字、下划线、短横线组成</span>');
	}else if (2 == isalias(a)){
		$("#alias_msg_hook").html('<span id="input_error">别名错误，不能为纯数字</span>');
	}else if (3 == isalias(a)){
		$("#alias_msg_hook").html('<span id="input_error">别名错误，不能为\'post\'或\'post-数字\'</span>');
	}else if (4 == isalias(a)){
		$("#alias_msg_hook").html('<span id="input_error">别名错误，与系统链接冲突</span>');
	}else {
		$("#alias_msg_hook").html('');
		$("#msg").html('');
	}
}
function insertTag (tag, boxId){
	var targetinput = $("#"+boxId).val();
	if(targetinput == ''){
		targetinput += tag;
	}else{
		var n = ',' + tag;
		targetinput += n;
	}
	$("#"+boxId).val(targetinput);
	if (boxId == "tag")
		$("#tag_label").hide();
}
