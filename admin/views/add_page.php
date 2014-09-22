<?php if(!defined('EMLOG_ROOT')) {exit('error!');}?>
<link rel="stylesheet" type="text/css" href="./views/css/markdown.css?v=1.0.1" />
<script charset="utf-8" src="./views/js/common.markdown.js?v=1.0.1"></script>
<script charset="utf-8" src="./views/js/Markdown.Converter.js?v=1.0.1"></script>
<script charset="utf-8" src="./views/js/Markdown.Editor.js?v=1.0.1"></script>
<script charset="utf-8" src="./views/js/Markdown.Sanitizer.js?v=1.0.1"></script>
<div class=containertitle><b>新建页面</b><span id="msg_2"></span></div>
<div id="msg"></div>
<form action="page.php?action=add" method="post" enctype="multipart/form-data" id="addlog" name="addlog">
<div id="post">
<div>
    <label for="title" id="title_label">输入页面标题</label>
    <input type="text" maxlength="200" name="title" id="title"/>
    <input name="date" id="date" type="hidden" value="" >
</div>
<div id="post_bar">
	<div>
	    <span onclick="displayToggle('FrameUpload', 0);autosave(4);" class="show_advset">上传插入</span>
	    <?php doAction('adm_writelog_head'); ?>
	    <span id="asmsg"></span>
	    <input type="hidden" name="as_logid" id="as_logid" value="-1">
    </div>
    <div id="FrameUpload" style="display: none;">
        <iframe width="860" height="330" frameborder="0" src="attachment.php?action=selectFile"></iframe>
    </div>
</div>
<div><div id="content-bar"></div><textarea id="content" name="content" style="width:845px; height:460px;"></textarea></div>
<div style="margin-top: 5px;">
    <span id="alias_msg_hook"></span>
    链接别名：(用于自定义该页面的链接地址。需要<a href="./seo.php" target="_blank">启用链接别名</a>)<br />
    <input name="alias" id="alias" class="input" />
</div>
<div style="margin-top:3px;">
    页面模板：<input maxlength="200" class="input" name="template" id="template" value="page" /> （用于自定义页面模板，对应模板目录下.php文件）
    <span id="page_options">
        <label for="allow_remark">页面接受评论</label>
        <input type="checkbox" value="y" name="allow_remark" id="allow_remark" />
    </span>
</div>
<div id="post_button">
    <input name="token" id="token" value="<?php echo LoginAuth::genToken(); ?>" type="hidden" />
    <input type="hidden" name="ishide" id="ishide" value="">
	<input type="hidden" name="editorinfo" id="editorinfo" value="markdown">
    <input type="submit" value="发布页面" onclick="return checkform();" class="button" />
    <input type="button" name="savedf" id="savedf" value="保存" onclick="autosave(3);" class="button" />
</div>
</div>
</form>
<div class=line></div>
<script>
(function () {
	var Converter = new Markdown.Converter();
	var content = new Markdown.Editor(Converter, "content");
	content.run();
})();
$("#menu_page").addClass('sidebarsubmenu1');
$("#alias").keyup(function(){checkalias();});
$("#title").focus(function(){$("#title_label").hide();});
$("#title").blur(function(){if($("#title").val() == '') {$("#title_label").show();}});
</script>