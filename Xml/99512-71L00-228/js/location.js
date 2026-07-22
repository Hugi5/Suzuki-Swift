/*************************************************/
// ロード時
/*************************************************/
function init()
{
	document.title = SSTR_lOCATION;
	$("close").value = SSTR_cLOSE;
	$("print").title = SSTR_pRINT;

	var params = document.location.search.toQueryParams();
	var strImgPath = params.imgPath;
	var strNote = params.strNote;
	strNote = strNote.replace(/'/g, "&#39;");

	// imgファイル表示
	var strData = "";
	strData = "<img src='../jpg/" + CUR_LANGUAGE + "/" + strImgPath + "' width='480' height='360'>";

	$('location').innerHTML = strData;

	if (strNote != "") {
		$('note').innerHTML = strNote;
	}

}
