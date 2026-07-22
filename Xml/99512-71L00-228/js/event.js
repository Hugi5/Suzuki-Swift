/*************************************************/
// 定数
/*************************************************/
var GROUND_POINT_KEY = "GroundPoint01.svg";

var AREA_OFFSET = 3;	// 表示域オフセット

/*************************************************/
// 変数
/*************************************************/
var svgDoc = new Array();			//SVGオブジェクト
var svgSelectId = new Array();	//前のId
var svgTimerId = new Array();
var svgLoaded = new Array();

/*************************************************/
// SVGロード
/*************************************************/
function svgLoad(prmKey, prmSvgDoc)
{
	// ロード時に前回選択したIDを初期化する //
	svgSelectId[prmKey] = "";

	// SVGオブジェクト取得
	svgDoc[prmKey] = prmSvgDoc;

	//表示領域の取得
	if (prmKey == "Bottom")
	{
		SizeChange(prmKey, diagScale['Top'] ? diagScale['Top'] : GROUND_POINT_BAIRITU);
	}
	else
	{
		switch (parseInt(selPage))
		{
			case CONNECTOR_LAYOUT:
				SizeChange(prmKey, CONNECTOR_LAYOUT_BAIRITU);
				break;
			case GROUND_POINT:
				SizeChange(prmKey, GROUND_POINT_BAIRITU);
				break;
			case POWER_SUPPLY:
				SizeChange(prmKey, POWER_SUPPLY_BAIRITU);
				break;
			case FUSE_JUNCTION_BLOCK:
				SizeChange(prmKey, FUSE_JB_BAIRITU);
				break;
			case SYSTEM_DIAGRAM:
				SizeChange(prmKey, SYSTEM_DIAGRAM_BAIRITU);
				break;
			case REASSEMBLING_NOTE_FOR_WIRING_HARNESS:
				SizeChange(prmKey, REASSEMBLING_BAIRITU);
				break;
			case DETAIL_WINDOW:
				SizeChange(prmKey, DETAIL_WINDOW_BAIRITU);
				break;
			default:
				break;
		}

		svgLoadCallback();
	}

	svgLoaded[prmKey] = true;
}

/*************************************************/
// マウスオーバー
/*************************************************/
function svgMouseOver(prmKey, prmId, evt)
{
	if (svgSelectId[prmKey] != prmId)
		svgDoc[prmKey].getElementById(prmId).setAttribute("opacity",  OPACITY_CURSOR);
}

/*************************************************/
// マウスアウト
/*************************************************/
function svgMouseOut(prmKey, prmId)
{
	if (svgSelectId[prmKey] != prmId)
		svgDoc[prmKey].getElementById(prmId).setAttribute("opacity", OPACITY_OFF);
}

/*************************************************/
// クリック
/*************************************************/
function svgClick(prmKey, prmId, prmSubId, prmRetryCnt)
{
	try
	{
		if (prmRetryCnt && !svgLoaded[prmKey])
		{
			prmRetryCnt--;
			if (prmRetryCnt > 0) setTimeout("svgClick('" + prmKey + "', '" + prmId + "'" + (prmSubId ? ", '" + prmSubId + "'" : ", undefined") + ", " + prmRetryCnt + ")", 500);
			return;
		}
		else if (prmKey == "Top")
		{
			if (prmId.indexOf("clearBeforId") != -1 )
			{
				svgSelectId[prmKey] = "";
				prmId = prmId.substr(0, prmId.length - 12);
			}

			// 前回選択した部品の点滅を止める //
			if (svgSelectId[prmKey] != "")
			{
				FlashStop(prmKey, svgSelectId[prmKey]);
			}

			// 今回選択した部品を点滅させる //
			FlashOn(prmKey, prmId);

			//選択した部品を画面中央に移動
			if (selPage != GROUND_POINT)
			{
				PartMove(prmKey, prmId);
			}
			else
			{
				// GroundCircuitDiagram
				if ($("divDiagramBottom").innerHTML == "")
				{
					if (listKey != GROUND_POINT_KEY)
					{
						PartMove(prmKey, prmId);
					}
				}
			}

			// GroundPointは下フレームに図を表示
			if (selPage == GROUND_POINT)
			{
				ReWriteBottom(prmId, prmSubId);
			}
			else
			{
				// コネクターのサブウィンドウを開く
				OpenConWindow(prmId, selPage, 20);
			}

			svgSelectId[prmKey] = prmId;
		}
		else if (prmKey == "Bottom")
		{
			// 前回選択した部品の点滅を止める //
			if (svgSelectId[prmKey] != "")
			{
				FlashStop(prmKey, svgSelectId[prmKey]);
			}

			// 今回選択した部品を点滅させる //
			FlashOn(prmKey, prmId);

			// コネクターのサブウィンドウを開く
			OpenConWindow(prmId, selPage, 20);

			svgSelectId[prmKey] = prmId;
		}
	}
	catch (e)
	{
		if (prmRetryCnt)
		{
			prmRetryCnt--;
			if (prmRetryCnt > 0) setTimeout("svgClick('" + prmKey + "', '" + prmId + "'" + (prmSubId ? ", '" + prmSubId + "'" : ", undefined") + ", " + prmRetryCnt + ")", 500);
			}
	}
}

// ConnectorLayoutDiagramのエリア図
function svgOpenHtml(prmKey, prmId)
{
	if (prmId.indexOf("clearBeforId") != -1 )
	{
		svgSelectId[prmKey] = "";
		prmId = prmId.substr(0, prmId.length - 12);
	}

	// 前回選択した部品の点滅を止める //
	if (svgSelectId[prmKey] != "")
	{
		FlashStop(prmKey, svgSelectId[prmKey]);
	}

	// 今回選択した部品を点滅させる //
	FlashOn(prmKey, prmId);

	var url = "../html/reassembling.html?src=" + prmId +
										"&language=" + CUR_LANGUAGE;
	// HTMLをサブウィンドウで表示
	var params = $H({
		left: 0,
		top: 0,
		width:600,
		height:700,
		resizable:'yes',
		scrollbars:'yes'
	});
	subWinReassembling = window.open(url, "reassembling", params.toQueryString().gsub(/\&/, ',')).focus();
//	subWinReassembling = window.open(url, "reassembling", params.toQueryString().gsub(/\&/, ','));
//	subWinReassembling.focus();
	svgSelectId[prmKey] = prmId;
}


/*************************************************/
// 名称用ツールチップ
/*************************************************/
// マウスオーバー //
function svgMouseOverName(prmKey, prmName, evt)
{
	//選択中の言語を取得
	var strData = GetPartName(prmName);
	if (strData == "none") return;
	strData = "<nobr>" + strData + "</nobr>";

	var mouseX = evt.clientX - $('divDiagram' + prmKey).scrollLeft;
	var mouseY = evt.clientY - $('divDiagram' + prmKey).scrollTop;

	$('divToolTip').style.left = mouseX + 20;
	$('divToolTip').style.top = mouseY + 30;
	$('divToolTip').style.display = "block";

	$('divToolTip').innerHTML = "&nbsp;" + strData + "&nbsp;";

	// 表示位置を調整 //
	FixPosition(prmKey, $('divToolTip'));

	svgDoc[prmKey].getElementById(prmName).setAttribute("opacity", OPACITY_CURSOR);
}

// マウスアウト
function svgMouseOutName(prmKey, prmName)
{
	$('divToolTip').innerHTML = "";
	$('divToolTip').style.display = "none";

	svgDoc[prmKey].getElementById(prmName).setAttribute("opacity", OPACITY_OFF);
}

/*************************************************/
// 点滅制御
/*************************************************/

// 部品を点灯する //
function FlashOn(prmKey, prmId)
{
	try
	{
		svgDoc[prmKey].getElementById(prmId).setAttribute("opacity", OPACITY_ON);
		// flashOffへ //
		svgTimerId[prmKey] = setTimeout("FlashOff('" + prmKey + "','" + prmId + "')", 700);
	}
	catch (e)
	{
	}
}

// 部品を消灯する //
function FlashOff(prmKey, prmId)
{
	try
	{
		svgDoc[prmKey].getElementById(prmId).setAttribute("opacity", OPACITY_OFF);
		// flashOnへ //
		svgTimerId[prmKey] = setTimeout("FlashOn('" + prmKey + "','" + prmId + "')", 700);
	}
	catch (e)
	{
	}
}

// 部品の点滅を止める //
function FlashStop(prmKey, prmId)
{
	try
	{
		// 部品の点滅を止める //
		svgDoc[prmKey].getElementById(prmId).setAttribute("opacity", OPACITY_OFF);
		// タイマーを削除する //
		clearTimeout(svgTimerId[prmKey]);
	}
	catch (e)
	{
	}
}

/*************************************************/
// ツールチップ表示位置制御
/*************************************************/
function FixPosition(prmKey, toolTipElement)
{
	// 引数チェック //
	if (!toolTipElement) return;
	if (!toolTipElement.style) return;

	// ------------------------------------------- //
	// ツールチップの末端座標取得                  //
	// ------------------------------------------- //
	// ツールチップの位置を取得 //
	var tooltipLeft = parseInt(toolTipElement.style.left.replace("px", ""));
	var tooltipTop  = parseInt(toolTipElement.style.top.replace("px", ""));

	// ツールチップのサイズを取得 //
	var tooltipWidth  = toolTipElement.clientWidth + 2;
	var tooltipHeight = toolTipElement.clientHeight + 2;

	// ツールチップの右下の座標を取得 //
	var tooltipMaxX = tooltipLeft + tooltipWidth;
	var tooltipMaxY = tooltipTop + tooltipHeight;

	// ------------------ //
	// divの末端座標取得  //
	// ------------------ //
	var maxX = $('divDiagram' + prmKey).clientWidth;
	var maxY = $('divDiagram' + prmKey).clientHeight;

	// ------------------ //
	// 座標更新           //
	// ------------------ //
	var lt = GetLeftTop($('divDiagram' + prmKey));

	// 上限チェック(横)
	if (tooltipMaxX > maxX) toolTipElement.style.left = lt.x + maxX - tooltipWidth + "px";
	else                    toolTipElement.style.left = lt.x + tooltipLeft + "px";

	// 上限チェック(縦)
	if (tooltipMaxY > maxY) toolTipElement.style.top = lt.y + maxY - tooltipHeight;
	else                    toolTipElement.style.top = lt.y + tooltipTop;
}


/*************************************************/
// 部品が画面中央に表示されるよう移動
/*************************************************/
function PartMove(prmKey, prmId)
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
	var moveY = (partY * diagScale[prmKey]) - ($('divDiagram' + prmKey).clientHeight / 2);
	var moveX = (partX * diagScale[prmKey]) - ($('divDiagram' + prmKey).clientWidth / 2);

	// スクロールバー移動
	$('divDiagram' + prmKey).scrollTop = moveY;
	$('divDiagram' + prmKey).scrollLeft = moveX;
}


/*************************************************/
// 取得した部品をハイライトにする
/*************************************************/
function HighLight(prmKey, prmId, prmRetryCnt)
{
	try
	{
		if (prmRetryCnt && !svgLoaded[prmKey])
		{
			prmRetryCnt--;
			if (prmRetryCnt > 0) setTimeout("HighLight('" + prmKey + "', '" + prmId + "', " + prmRetryCnt + ")", 500);
			return;
		}

		var objA = svgDoc[prmKey].getElementsByTagName("a");
		for (var i = 0; i < objA.length; i++)
		{
			if (objA.item(i).getAttribute("id") == prmId)
			{
				svgClick("Top", prmId);
				return;
			}
		}

		var strWtoW = "";
		strWtoW = GetWtoW(prmId);
		for (var i = 0; i < objA.length; i++)
		{
			if (objA.item(i).getAttribute("id") == strWtoW)
			{
				svgClick("Top", strWtoW);
				return;
			}
		}
	}
	catch (e)
	{
		if (prmRetryCnt)
		{
			prmRetryCnt--;
			if (prmRetryCnt > 0) setTimeout("HighLight('" + prmKey + "', '" + prmId + "', " + prmRetryCnt + ")", 500);
		}
	}
}

/*************************************************/
// WtoWの記号を逆にする
/*************************************************/
function GetWtoW(prmKigo)
{
	var str;
	var str1;
	var str2;
	var int;

	for (var i = 1; i < prmKigo.length; i++)
	{
		if (isNaN(prmKigo.substring(i, 1)))
		{
			int = i;
			break;
		}
	}

	if (i == prmKigo.length) return prmKigo;

	str1 = prmKigo.substring(0, i - 1);
	str2 = prmKigo.substring(i - 1);
	str = str2 + str1;

	return str;
}


