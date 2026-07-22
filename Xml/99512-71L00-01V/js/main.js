var diagramInnerWidth;
var diagramInnerHeight = new Array();

var subWinConInfo;
var subWinGlossary;
var subWinSearch;
//var subWinReassembling;

/*************************************************/
// ロード時
/*************************************************/
function Load()
{
	document.title = CUR_MODEL_NAME + ' ' + SSTR_wIRING_dIAGRAM_mANUAL;
	$("fit").title      = SSTR_fIT_iMAGE_tO_wINDOW;
	$("d_zIn").title    = SSTR_zOOM_iN;
	$("d_zOut").title   = SSTR_zOOM_oUT;
	$("d_fit").title    = SSTR_sHOW_wHOLE_iMAGE;
	$("hand").title     = SSTR_sCREEN_sWITCHING;
	$("print").title    = SSTR_pRINT;
	$("search").title   = SSTR_kEYWORD_sEARCH;
	$("glossary").title = SSTR_gLOSSARY;
	$("help").title     = SSTR_hOW_tO_oPERATE_tHIS_mANUAL;
	$("top").title      = SSTR_tOP;

	var cmbPage = $("cmbPage");
	cmbPage.options[ 0] = new Option(SSTR_fOREWORD,                             10);
	cmbPage.options[ 1] = new Option(SSTR_pRECAUTIONS,                           1);
	cmbPage.options[ 2] = new Option(SSTR_gENERAL_dESCRIPTION,                   2);
	cmbPage.options[ 3] = new Option(SSTR_hOW_tO_rEAD,                          11);
	cmbPage.options[ 4] = new Option(SSTR_cONNECTOR_lAYOUT_dIAGRAM,              3);
	cmbPage.options[ 5] = new Option(SSTR_gROUND_pOINT,                          4);
	cmbPage.options[ 6] = new Option(SSTR_pOWER_sUPPLY_dIAGRAM,                  5);
	cmbPage.options[ 7] = new Option(SSTR_fUSE_jUNCTION_bLOCK,                   6);
	cmbPage.options[ 8] = new Option(SSTR_sYSTEM_cIRCUIT_dIAGRAM,                7);
	cmbPage.options[ 9] = new Option(SSTR_cONNECTOR,                             8);
	cmbPage.options[10] = new Option(SSTR_rEASSEMBLING_nOTE_fOR_wIRING_hARNESS,  9);

	// DIV領域初期化
	Resize();

	// ドラッグ処理初期化
	InitDrag();

	// パラメータ取得
	var strParams = location.search.toQueryParams();

	headInit(strParams.page);
}


/************************************************************/
// ウィンドウCloseイベント(子画面が開いている場合は閉じる)
/************************************************************/
function Close()
{
	if (subWinConInfo)
		if (!subWinConInfo.closed) subWinConInfo.close();

//	if (subWinReassembling)
//		if (!subWinReassembling.closed) subWinReassembling.close();

	if (subWinGlossary)
		if (!subWinGlossary.closed) subWinGlossary.close();

	if (subWinSearch)
		if (!subWinSearch.closed) subWinSearch.close();
}


/************************************************************/
// ウィンドウUnloadイベント(子画面が開いている場合は閉じる)
/************************************************************/
function Unload()
{
	if (subWinConInfo)
		if (!subWinConInfo.closed) subWinConInfo.close();

//	if (subWinReassembling)
//		if (!subWinReassembling.closed) subWinReassembling.close();

	if (subWinGlossary)
		if (!subWinGlossary.closed) subWinGlossary.close();

	if (subWinSearch)
		if (!subWinSearch.closed) subWinSearch.close();
}


/*************************************************/
// クライアント領域取得
/*************************************************/
function Resize()
{
	var listWidth = document.all ? 350 : 340;
	var listPadding  = document.all ? 0 : 10;
	var diagPaddingW = document.all ? 0 : 20;
	var diagPaddingH = document.all ? 0 : 20;
	var headHeight = 40;
	var wh = GetClientSize();

	if ($('divList').style.display == 'none')
	{
		$('divDiagramTop').style.left = $('divDiagramBottom').style.left = "0px";
		$('divDiagramTop').style.width = $('divDiagramBottom').style.width = nonminus(wh.width - diagPaddingW) + "px";
		diagramInnerWidth = wh.width - 20;
	}
	else
	{
		$('divList').style.width = nonminus(listWidth);
		$('divDiagramTop').style.left = $('divDiagramBottom').style.left = 350 + "px";
		$('divDiagramTop').style.width = $('divDiagramBottom').style.width = nonminus(wh.width - 350 - diagPaddingW) + "px";
		diagramInnerWidth = wh.width - 350 - 20;
	}

	if (document.all)
		// IE
		$('divList').style.height = nonminus(wh.height - headHeight) + "px";
	else
		$('divList').style.height = nonminus(wh.height - headHeight - listPadding) + "px";

	if ($('divDiagramBottom').style.display == 'block')
	{
		var h = wh.height - headHeight;
		var hb = Math.floor(h / 2);
		var ht = h - hb;
		$('divDiagramTop').style.height = nonminus(ht - diagPaddingH) + "px";
		diagramInnerHeight['Top'] = ht - 20;

		$('divDiagramBottom').style.height = nonminus(hb - diagPaddingH) + "px";
		diagramInnerHeight['Bottom'] = hb - 20;
		$('divDiagramBottom').style.top = headHeight + ht + "px";
	}
	else
	{
		$('divDiagramTop').style.height = nonminus(wh.height - headHeight - diagPaddingH) + "px";
		diagramInnerHeight['Top'] = wh.height - headHeight - 20;
		diagramInnerHeight['Bottom'] = 0;
	}
}


/*************************************************/
// Glossary表示
/*************************************************/
function OpenGlossary()
{
	subWinGlossary = window.open('./' + CUR_LANGUAGE + '/glossary.html?language=' + CUR_LANGUAGE, 'glossary', 'resizable=yes, width=700, height=516');
	subWinGlossary.focus();
}

/*************************************************/
// KeywordSearch表示
/*************************************************/
function OpenSearch()
{
	subWinSearch = window.open('./search.html?language=' + CUR_LANGUAGE, 'search', 'resizable=yes, width=810, height=516');
	subWinSearch.focus();
}

/*************************************************/
// SVG初期化コールバック関数
/*************************************************/
function svgLoadCallback()
{
}

