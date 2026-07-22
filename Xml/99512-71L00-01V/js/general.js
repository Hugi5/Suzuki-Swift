/*************************************************/
// 定数
/*************************************************/
var CONST_FRAME_GENERAL_NAVIGATE = "general_navigate";
var CONST_FRAME_GENERAL_CONTETN = "general_content";
var CONST_ATTRIBUTE_HREF = "href";
var CONST_XPATH_TITILE = "/suzuki/manual/section/servcat/configtype/servinfotype/servinfo/title";

/*************************************************/
// 変数
/*************************************************/
var hrefList = null;
var procId = null;

/*************************************************/
// Navigator ロード時処理
/*************************************************/
function loadNavigator()
{
	top.document.title = SSTR_gENERAL_dESCRIPTION;

	// Set Navigate Strings
	$("9101001").innerHTML = HtmlEnc(SSTR_nAVIGATE_aBBREVIATIONS_wIRE);
	$("0101003").innerHTML = HtmlEnc(SSTR_nAVIGATE_wIRE_cONNECTOR_cOLOR_sYMBOLS);
	$("9101003").innerHTML = HtmlEnc(SSTR_nAVIGATE_sYMBOLS_AND_mARKS);
	
	// Set href address
	$("9101001").href = "./" + CUR_LANGUAGE + "/9101001" + ".html?language=" + CUR_LANGUAGE;
	$("0101003").href = "./" + CUR_LANGUAGE + "/0101003" + ".html?language=" + CUR_LANGUAGE;
	$("9101003").href = "./" + CUR_LANGUAGE + "/9101003" + ".html?language=" + CUR_LANGUAGE;

	// リンクタグ取得 //
	var nodeChilds = getNavigateLinkNodes();
	if (!nodeChilds) return;

	// リンクアドレスリスト初期化 //
	hrefList = new Array();
	
	// 初回該当フラグ //
	var isFirstHit = true;

	// リンクタグ一覧内ループ //
	for (var i = 0; i < nodeChilds.length; i++)
	{
		var item = nodeChilds.item(i);

		// idが存在するかチェック //
		if (!item.id)
		{
			// href属性を削除 //
			item.removeAttribute(CONST_ATTRIBUTE_HREF);
			continue;
		}

		// リンクアドレスリストに追加 //
		hrefList[item.id] = item.href;
		
		// 初回該当の場合 //
		if (isFirstHit)
		{
			isFirstHit = false;
			// href属性を削除 //
			item.removeAttribute(CONST_ATTRIBUTE_HREF);

			// Content画面更新 //
			setContentLocation(hrefList[item.id]);
		}
	}
}

/*************************************************/
// Navigate リンククリック時
/*************************************************/
function changeNavigate(clickItem)
{
	// href属性が存在するかチェック //
	if (!clickItem.getAttribute(CONST_ATTRIBUTE_HREF)) return false;

	// リンクタグ取得 //
	var nodeChilds = getNavigateLinkNodes();
	if (!nodeChilds) return;

	// リンクタグ一覧内ループ //
	for (var i = 0; i < nodeChilds.length; i++)
	{
		var item = nodeChilds.item(i);

		// クリック対象のリンクタグかチェック //
		if (clickItem.id == item.id)
		{
			// href属性を取得 //
			var path = clickItem.getAttribute(CONST_ATTRIBUTE_HREF);

			// href属性を削除 //
			clickItem.removeAttribute("href");

			// Content画面更新 //
			setContentLocation(path);
		}
		else
		{
			// href属性が存在しない場合 //
			if (!item.getAttribute(CONST_ATTRIBUTE_HREF))
				// リンクアドレスリストからhref属性を復元 //
				item.setAttribute(CONST_ATTRIBUTE_HREF, hrefList[item.id]);
		}
	}
}

/*************************************************/
// Navigate リンクタグ取得
/*************************************************/
function getNavigateLinkNodes()
{
	// フレーム取得 //
	var frameGeneralNavigate = top.frames[CONST_FRAME_GENERAL_NAVIGATE];
	if (!frameGeneralNavigate)
	{
		alert("Frame '" + CONST_FRAME_GENERAL_NAVIGATE + "' was not found.");
		return null;
	}

	// 該当リンクタグ取得 //
	var linkNodes = frameGeneralNavigate.document.getElementsByTagName("a");
	if (linkNodes.length == 0)
	{
		alert("Tag 'A' was not found.");
		return null;
	}

	return linkNodes;
}

/*************************************************/
// Content 画面更新
/*************************************************/
function setContentLocation(locationPath)
{
	if (procId) clearTimeout(procId);

	// フレームの存在チェック //
	if (top.frames[CONST_FRAME_GENERAL_CONTETN])
		top.frames[CONST_FRAME_GENERAL_CONTETN].location.href = locationPath;
	else
		// タイマを使用して再帰 //
		procId = setTimeout("setContentLocation('" + locationPath + "')", 300);
}

/*************************************************/
// 文字列 トリム(改行含む)
/*************************************************/
function trim(value)
{
	var returnValue = value;

	returnValue = returnValue.replace(/^[ 　]*/m, "");		// 先頭の空白(全角/半角)を置換 //
	returnValue = returnValue.replace(/^[\r\n]*/m, "");		// 先頭の改行(\r\n)を置換 //
	returnValue = returnValue.replace(/^[\n]*/m, "");		// 先頭の改行(\n)を置換 //

	returnValue = returnValue.replace(/[ 　]*$/m, "");		// 末尾の空白(全角/半角)を置換 //
	returnValue = returnValue.replace(/[\r\n]*$/m, "");		// 末尾の改行(\r\n)を置換 //
	returnValue = returnValue.replace(/[\n]*$/m, "");		// 末尾の改行(\n)を置換 //

	return returnValue;
}
