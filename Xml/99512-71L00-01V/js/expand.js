/// テスト
function expandImage(path,gtype) {
	var feats="menubar=yes,toolbar=no,locationbar=no,statusbar=no,scrollbars=no,width=600,height=600,resizable=yes";
	var imgWin=window.open("","ImageWindow",feats);
	imgWin.moveTo(0, 0);
	imgWin.resizeTo(screen.availWidth, screen.availHeight);

src = '<html>';
src += '<head><title>' + HtmlEnc(SSTR_eXPANDED_iMAGE_wINDOW) + '</title><meta http-equiv="Content-Type" content="text/html; charset=utf-8"/></head>';
src += '<body>';
	if (gtype=="swf") {
src += '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" height="100%" width="100%"><param name="movie" value="' + path + '">';
src += '<param name="quality" value="high">'
src += '<embed src="' + path + '" quality="high" type="application/x-shockwave-flash" height="100%" width="100%"></embed></object>';
		
	} else {
		src += '<img src="' + path + '" width="100%">';
	}
src += '</body>';
src += '</html>';


	imgWin.document.write(src);
	imgWin.document.close();
	imgWin.focus();
}
//expand
function expandIconDrawEx(filename,filetype)
{
	var strWrite = '<A href="javascript: expandImage(\'' + filename + '\',\'' + filetype + '\')"><IMG border="0" width="30px" class="expandicon" src="' + strCurHtmlPrePath + '../img/zoom.gif" title="' + SSTR_eXPAND_iMAGE + '"/></A>'
	document.write(strWrite);
}
function expandIconSetting4XML(node)
{
    node.title = SSTR_eXPAND_iMAGE;
	node.height = 30;
	node.width = 30;
	node.onclick=function(){expandImage(node.name,'swf');}
	node.src = "../img/zoom.gif";
}

//print
function printIconDraw()
{
    document.write("<a href='javascript:void(0);' onClick='javascript:printwindow();'><image title='" + SSTR_pRINT + "' style='margin:0px;padding:0px;' align='right' src='" + strCurHtmlPrePath + "../img/icon-print.gif' border=0></a>");
}
function printIconDrawEx(filename)
{
    document.write("<a href='javascript:void(0);' onClick='javascript:printpdf(\"" + filename + "\");'><image title='" + SSTR_pRINT + "' style='margin:0px;padding:0px;' align='right' src='" + strCurHtmlPrePath + "../img/icon-print.gif' border=0></a>");
}
function printIconSetting4XML(node)
{
    node.title = SSTR_pRINT;
	node.onclick=function(){printpdf(node.name);}
	node.style.margin="0px;";
	node.style.padding="0px;";
	node.align="right";
	node.src = "../img/icon-print.gif";
	node.border="0";
}

function PrintPreview()
{
    if(window.ActiveXObject == null || document.body.insertAdjacentHTML == null) return;
    var sWebBrowserCode = '<object width="0" height="0" classid="CLSID:8856F961-340A-11D0-A96B-00C04FD705A2"></object>'; 
    document.body.insertAdjacentHTML('beforeEnd', sWebBrowserCode); 
    var objWebBrowser = document.body.lastChild;
    if(objWebBrowser == null) return;
    objWebBrowser.ExecWB(7, 1);
    document.body.removeChild(objWebBrowser);
}
function printwindow()
{
    window.print();
}
function printpdf(filename)
{
    window.open(strCurHtmlPrePath + "../pdf/" + CUR_LANGUAGE + "/" + filename,"","toolbar=yes,menubar=yes,location=yes,scrollbars=yes,resizable=yes,status=yes");
}