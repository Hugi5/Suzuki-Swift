/*************************************************/
// 定数
/*************************************************/
var FOREWORD                             = 10;
var PRECAUTIONS                          = 1;
var GENERAL_DESCRIPTION                  = 2;
var HOW_TO_READ                          = 11;
var CONNECTOR_LAYOUT                     = 3;
var GROUND_POINT                         = 4;
var POWER_SUPPLY                         = 5;
var FUSE_JUNCTION_BLOCK                  = 6;
var SYSTEM_DIAGRAM                       = 7;
var CONNECTOR                            = 8;
var REASSEMBLING_NOTE_FOR_WIRING_HARNESS = 9;
var DETAIL_WINDOW                        = 9999;

var intBairitu = new Array(0.33,0.5,0.66,0.75,1,1.25,1.5,2,3,4);
var TITLE_BAR_SIZE = 120;
var SVG_SCROLL_BAR_SIZE = 17;

var OPACITY_ON     = "0.6";
var OPACITY_OFF    = "0";
var OPACITY_CURSOR = "0.3";

var objConLayoutXml;

// ディスプレイ表示(高さ)補正値 //
var offsetDispHeight = 38;

var strLanguage = "";		// 選択言語
var strCurHtmlPrePath = "";	// 言語フォルダに格納されている場合１階層（../）必要

strLanguage = GetLanguage();

if (strLanguage.length > 0)
{
	var strNoneParamURL = "";
	if (document.URL.indexOf("?") >= 0) strNoneParamURL = document.URL.substring(0, document.URL.indexOf("?"));
	else strNoneParamURL = document.URL;

	if (strNoneParamURL.indexOf(strLanguage) >= 0) strCurHtmlPrePath = "../";
	else
	{
		if (parent.document.URL.indexOf("?") >= 0) strNoneParamURL = parent.document.URL.substring(0, parent.document.URL.indexOf("?"));
		else strNoneParamURL = parent.document.URL;

		if (strNoneParamURL.indexOf(strLanguage) >= 0) strCurHtmlPrePath = "../";
	}
}

if (strLanguage.length > 0)
{
	// 言語別jsファイル読み込み
	AttachJS(strCurHtmlPrePath + '../js/' + strLanguage + '/language.js');
	AttachJS(strCurHtmlPrePath + '../js/' + strLanguage + '/staticStrings.js');
}

/*************************************************/
// xmlファイルパス
/*************************************************/
var strConLayoutXmlPath    = strCurHtmlPrePath + "../xml/ConnectorLayoutDiagram.xml";
var strGroundPointXmlPath  = strCurHtmlPrePath + "../xml/GroundPoint.xml";
var strPartNameXmlPath     = strCurHtmlPrePath + "../xml/PartsName.xml"

var strSideMenuXmlPath     = strCurHtmlPrePath + "../xml/" + strLanguage + "/SideMenu.xml";
var strConXmlPath          = strCurHtmlPrePath + "../xml/" + strLanguage + "/Connector.xml";
var strReassemblingXmlPath = strCurHtmlPrePath + "../xml/" + strLanguage + "/ReassemblingNoteforWiringHarness.xml"
var strHowToContentXmlPath = strCurHtmlPrePath + "../xml/" + strLanguage + "/howto_content.xml";
var strKeywordXmlPath      = strCurHtmlPrePath + "../xml/" + strLanguage + "/Keyword.xml";


/*************************************************/
// クエリーパラメータLanguage値取得
/*************************************************/
function GetLanguage()
{
	if (document.location.search.length > 0)
	{
		if (document.location.search.toQueryParams().language)
			return document.location.search.toQueryParams().language;
	}
	else if (parent.document.location.search.length > 0)
	{
		if (parent.document.location.search.toQueryParams().language)
			return parent.document.location.search.toQueryParams().language;
	}

	return "";
}


/*************************************************/
// 別ウィンドウで開く
/*************************************************/
function JumpNavigate(url)
{
	// URLが未指定の場合は処理しない //
	if (!url) return false;

	window.open(url + "?language=" + CUR_LANGUAGE,"","toolbar=yes,menubar=yes,location=yes,scrollbars=yes,resizable=yes,status=yes");
}

/*************************************************/
// XMLSMパスを作成する
/*************************************************/
function CreateXMLSMPath(id, movePath)
{
	// XMLパスを返却 //
	return movePath + "XMLSM/" + CUR_XMLSM_LANGUAGE + "/" + CUR_XMLSM_LANGUAGE + id + ".xml";
}


/*************************************************/
// XMLオブジェクト作成
/*************************************************/
function GetXmlObject()
{
	if (document.all) return new ActiveXObject("MSXML2.DOMDocument");
	else              return document.implementation.createDocument("", "", null);
}


/*************************************************/
// オブジェクトの左上絶対座標取得
/*************************************************/
function GetLeftTop(prmElem)
{
	var x = 0;
	var y = 0;
	while (prmElem)
	{
		x += prmElem.offsetLeft;
		y += prmElem.offsetTop;
		prmElem = prmElem.offsetParent;
	}

	return {"x":x, "y":y};
}


/*************************************************/
// クライアント領域取得
/*************************************************/
function GetClientSize()
{
	if (window.self && self.innerWidth)
		return {"width":self.innerWidth, "height":self.innerHeight};
	else if (document.documentElement && document.documentElement.clientHeight)
		return {"width":document.documentElement.clientWidth, "height":document.documentElement.clientHeight};
	else
		return {"width":document.body.clientWidth, "height":document.body.clientHeight};
}


/*************************************************/
// htmlエンコード
/*************************************************/
function HtmlEnc(strText)
{
	return strText.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

/*************************************************/
// 指定jsファイル読み込み
/*************************************************/
function AttachJS(strJsPath)
{
/*
	var obj = document.createElement("script");
	obj.setAttribute("type", "text/javascript");
	obj.setAttribute("src", strJsPath);
	document.getElementsByTagName("head")[0].appendChild(obj);
*/
	document.write('<script type="text/javascript" src="' + strJsPath + '"></script>');
}

/*************************************************/
// 0以下なら0を返す
/*************************************************/
function nonminus(val)
{
	if(val > 0)
	{
		return val;
	}
	else
	{
		return 0;
	}
}
