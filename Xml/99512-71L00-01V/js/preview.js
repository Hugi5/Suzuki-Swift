/*************************************************/
// 変数
/*************************************************/
var DEBUG = false;


/*************************************************/
// ロード
/*************************************************/
function pdfLoad()
{
	var para = window.location.search.toQueryParams();
	
	pdfOpen(para, false);
}

function pdfOpen(params, op) {
	var pdfdir = "";
	var pdffile = "";
	
	pdfdir = getPdfDir();
	pdffile = getPdfFilename(params.src);

	if(params.code == "reassembling")
	{
		pdffile = pdffile.replace(/_[0-9]/i,"");
	}
	
	if(DEBUG)
	{
		document.write("params.src=" + params.src + "<br/>");
		if(params.code)
		{
			document.write("params.code=" + params.code + "<br/>");
		}
		document.write("path=" + pdfdir + pdffile);
	}
	else
	{
		if(op)
		{
			window.open(pdfdir + pdffile,'','toolbar=yes,menubar=yes,location=yes,scrollbars=yes,resizable=yes,status=yes');
		}
		else
		{
			window.location.href = pdfdir + pdffile;
		}
	}
}

function getPdfFilename(src)
{
	return src.replace(/\.[a-z][a-z][a-z]$/i,".pdf");
}

function getPdfDir()
{
	return "../pdf/" + CUR_LANGUAGE + "/";
}

