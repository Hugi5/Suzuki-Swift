/*************************************************/
// 初期処理
/*************************************************/
function LoadReassembling()
{
	document.title = SSTR_rEASSEMBLING_nOTE_fOR_wIRING_hARNESS;
	$("d_zIn").title  = SSTR_zOOM_iN;
	$("d_zOut").title = SSTR_zOOM_oUT;
	$("print").title  = SSTR_pRINT;
	$("close").value  = SSTR_cLOSE;

	InitSvg(REASSEMBLING_NOTE_FOR_WIRING_HARNESS, window.location.search.toQueryParams().src);
}


/*************************************************/
// SVG初期化コールバック関数
/*************************************************/
function svgLoadCallback()
{
	var maxSvgWidth = 0;
	var embeds = document.getElementsByTagName('embed');
	for (var i = 0;i < embeds.length; i++)
	{
		if (maxSvgWidth < embeds.item(i).getSVGDocument().getElementById("svgObj").getAttribute("width"))
			 maxSvgWidth = embeds.item(i).getSVGDocument().getElementById("svgObj").getAttribute("width");
	}

	// ウィンドウサイズを変更
	resizeTo(maxSvgWidth * REASSEMBLING_BAIRITU + 50, 700 + offsetDispHeight);
}

/*************************************************/
// 印刷処理
/*************************************************/
function Print()
{
    var params = $H({});
    params.src = svgFile['Top'];
    params.code = "reassembling";
    pdfOpen(params, true);
}

/*************************************************/
// ウィンドウリサイズ時
/*************************************************/
function Resize() {

	//表示領域の取得
	dispWidth = document.body.clientWidth - 20;
	dispHeight = document.body.clientHeight - 50;

}

