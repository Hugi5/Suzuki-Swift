/****************************************************************************/
// 変数
/****************************************************************************/
var detailKbn;
var detailId;
var subWinConInfo;

/*************************************************/
// 初期処理
/*************************************************/
function LoadDetail()
{
	$("d_zIn").title   = SSTR_zOOM_iN;
	$("d_zOut").title  = SSTR_zOOM_oUT;
	$("d_print").title = SSTR_pRINT;

	subWinConInfo = opener;

	var params = document.location.search.toQueryParams();

	detailKbn = params.kbn;
	detailId  = params.prmId;

	switch (detailKbn)
	{
		case "fuselayout":
			document.title = SSTR_fUSE_lAYOUT;
			break;
		case "detail":
			document.title = SSTR_dETAIL;
			break;
		default:
			break;
	}

	InitSvg(DETAIL_WINDOW, params.svgPath);
}


/*************************************************/
// SVG初期化コールバック関数
/*************************************************/
function svgLoadCallback()
{
	// ウィンドウサイズ変更 //
	if (detailKbn == "fuselayout")
		resizeTo($('embDiagramTop').getSVGDocument().getElementById("svgObj").getAttribute("width") * DETAIL_WINDOW_BAIRITU + 50, 600 + offsetDispHeight);
	else
		resizeTo($('embDiagramTop').getSVGDocument().getElementById("svgObj").getAttribute("width") * DETAIL_WINDOW_BAIRITU + 50, 900 + offsetDispHeight);

	// 部品点滅 //
	var objA = svgDoc['Top'].getElementsByTagName("a");
	for (var i = 0; i < objA.length; i++)
	{
		if (objA.item(i).getAttribute("id") == detailId)
		{
			FlashOn('Top', detailId);
			DetailPartMove('Top', detailId);
		}
	}

//	svgSelectId['Top'] = detailId;
}

/*************************************************/
// 部品が画面中央に表示されるよう移動
/*************************************************/
function DetailPartMove(prmKey, prmId)
{
	var partX;
	var partY;

	var targetNode = svgDoc[prmKey].getElementById(prmId);
	// 取得したノードが"rect"の場合はそのまま値取得
	if (targetNode.nodeName == "rect")
	{
		partX = targetNode.getAttribute("x");
		partY = targetNode.getAttribute("y");
	}
	else if (targetNode.nodeName == "a")
	{
		// 取得したノードが"a"の場合は子ノードから値取得
		if (targetNode.childNodes.length < 1) return;
		// 最初の子ノード取得
		var childNode = targetNode.firstChild;
		partX = childNode.getAttribute("x");
		partY = childNode.getAttribute("y");
		// 子ノード分だけループ
		while(childNode)
		{
			if (partX > childNode.getAttribute("x"))
				partX = childNode.getAttribute("x");
			if (partY > childNode.getAttribute("y"))
				partY = childNode.getAttribute("y");
			// 次のノード取得
			childNode = childNode.nextSibling;
		}
	}

	// スクロールバー位置取得
	var moveY = (partY * diagScale[prmKey]) - ((document.body.clientHeight - 50) / 2);
	var moveX = (partX * diagScale[prmKey]) - ((document.body.clientWidth - 40) / 2);

	// スクロールバー移動
	document.body.scrollTop = moveY;
	document.body.scrollLeft = moveX;
}

/*************************************************/
// 印刷処理
/*************************************************/
function Print()
{
    var para = window.location.search.toQueryParams();
    para.src = para.svgPath;
    para.code = "";
    pdfOpen(para, true);
}
