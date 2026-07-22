/****************************************************************************/
// 定数（初期表示倍率用）
/****************************************************************************/
var CONNECTOR_LAYOUT_BAIRITU = 1.2;
var GROUND_POINT_BAIRITU = 1.2;
var REASSEMBLING_BAIRITU = 1.2;
var FUSE_JB_BAIRITU = 1.2;
var SYSTEM_DIAGRAM_BAIRITU = 0.7;
var POWER_SUPPLY_BAIRITU = 0.7;
var DETAIL_WINDOW_BAIRITU = 1.2;

/****************************************************************************/
// 変数
/****************************************************************************/
var objConLayoutXml;
var objGroundPointXml;
var objReassemblingXml;
var objPartNameXml;		// 名称xml
var listKey;
var listName;
var diagScale = new Array();
var selPage;
var svgFile = new Array();

/*************************************************/
// サイドメニューのリストクリック時
/*************************************************/
function InitSvg(prmPage, prmListKey, prmListName)
{
	selPage  = prmPage;
	listKey  = prmListKey;
	listName = prmListName;

	if (selPage == CONNECTOR_LAYOUT) InitConnectorLayout();
	else if (selPage == GROUND_POINT) InitGroundPoint();
	else if (selPage == REASSEMBLING_NOTE_FOR_WIRING_HARNESS) InitReassembling();
	else LoadSvg(prmListKey);
}

/*************************************************/
// REASSEMBLING NOTE FOR WIRING HARNESSの時
/*************************************************/
function InitReassembling()
{
	// xmlのロード
	if (!objReassemblingXml)
	{
		objReassemblingXml = GetXmlObject();
		objReassemblingXml.async = false;
		objReassemblingXml.load(strReassemblingXmlPath);
	}

	var strFileName = new Array();
	var leftcontent = "";
	var rightcontent = "";
	var targetNode = objReassemblingXml.getElementsByTagName(listKey);
	var table = new Array();

	if (targetNode.length == 0) return;

	for (var n = 0; n < targetNode.length; n++)
	{
		//SVGのファイル名
		strFileName[n] = targetNode[n].getElementsByTagName("file")[0].firstChild.nodeValue;
		//テーブル情報取得
		var leftNode  = targetNode[n].getElementsByTagName("left");
		var rightNode = targetNode[n].getElementsByTagName("right");

		if ($('divDiagramBottom'))
			table[n] = "<table border='1' id='svgTable' style='font-size:9pt;'><tbody>"
		else
			table[n] = "<table border='1' id='svgTable' style='font-size:9pt;'><tbody>"

		for (i = 0; i < leftNode.length; i++)
		{
			table[n] = table[n] + "<tr><td>";
			table[n] = table[n] + "<table border='0' cellspacing='0' cellpadding='0' style='font-size:9pt;padding:0px;margin:0px;'><tr><td style='{vertical-align:top;}'>";

			if (leftNode[i].getElementsByTagName("file")[0].firstChild.nodeValue != "none")
			{
				table[n] = table[n] + "<span style='{width:60px; text-align:right;}' class='indent' align='right'><img src='../img/" + leftNode[i].getElementsByTagName("file")[0].firstChild.nodeValue + "'>&nbsp;" + leftNode[i].getElementsByTagName("number")[0].firstChild.nodeValue + "</span>";
				table[n] = table[n] + "</td><td style='padding-top:4px;'>";
			}
			else
			{
				table[n] = table[n] + "<span style='{width:60px; text-align:right;}' class='indent'>" + leftNode[i].getElementsByTagName("number")[0].firstChild.nodeValue + "</span>";
				table[n] = table[n] + "</td><td>";
			}
			
			leftcontent = leftNode[i].getElementsByTagName("content");

			for (t = 0; t < leftcontent.length; t++)
			{
				var lefttext = leftcontent[t].firstChild.nodeValue;
				lefttext = lefttext.replace(/\$r\$/g, '<sup>&reg;</sup>');
				lefttext = lefttext.replace(/\$c\$/g, '<sup>&copy;</sup>');
				lefttext = lefttext.replace(/'/g, '&#39;');

				lefttext = "&nbsp;" + lefttext;

				if (t == 0)
				{
					table[n] = table[n] + lefttext;
				}else{
					//table[n] = table[n] + "<BR><span style='{width:60px;}' class='indent'>&nbsp;</span>" + lefttext;
					table[n] = table[n] + "<BR>" + lefttext;					
				}
			}
			table[n] = table[n] + "</td></tr></table>";
			table[n] = table[n] + "</td>";

			if (i < rightNode.length)
			{
				table[n] = table[n] + "<td>";
				table[n] = table[n] + "<table border='0' cellspacing='0' cellpadding='0' style='font-size:9pt;padding:0px;margin:0px;'><tr><td style='{vertical-align:top;}'>";
				
				if (rightNode[i].getElementsByTagName("file")[0].firstChild.nodeValue != "none")
				{
					table[n] = table[n] + "<span style='{width:60px; text-align:right;}' class='indent'><img src='../img/" + rightNode[i].getElementsByTagName("file")[0].firstChild.nodeValue + "'>" + rightNode[i].getElementsByTagName("number")[0].firstChild.nodeValue + "</span>";
					table[n] = table[n] + "</td><td style='padding-top:4px;'>";
				}
				else
				{
					table[n] = table[n] + "<span style='{width:60px; text-align:right;}' class='indent'>&nbsp;" + rightNode[i].getElementsByTagName("number")[0].firstChild.nodeValue + "</span>";
					table[n] = table[n] + "</td><td>";
				}

				rightcontent = rightNode[i].getElementsByTagName("content");

				for (t = 0; t < rightcontent.length; t++)
				{
					var righttext = rightcontent[t].firstChild.nodeValue;
					righttext = righttext.replace(/\$r\$/g, '<sup>&reg;</sup>');
					righttext = righttext.replace(/\$c\$/g, '<sup>&copy;</sup>');
					righttext = righttext.replace(/'/g, '&#39;');

					righttext = "&nbsp;" + righttext;

					if (t == 0)
					{
						table[n] = table[n] + righttext;
					}
					else
					{
						//table[n] = table[n] + "<BR><span  style='{width:60px;}' class='indent'>&nbsp;</span>" + righttext;
						table[n] = table[n] + "<BR>" + righttext
					}
				}
				table[n] = table[n] + "</td></tr></table>";
				table[n] = table[n] + "</td>";
			}
			else
			{
				table[n] = table[n] + "<td>&nbsp;</td>";
			}
			table[n] = table[n] + "</tr>";
		}
		table[n] = table[n] + "</tbody></table>";
	}

	LoadSvg(strFileName, table);
}

/*************************************************/
// ConnectorLayoutDiagramの時
/*************************************************/
function InitConnectorLayout()
{
	// xmlのロード
	if (!objConLayoutXml)
	{
		objConLayoutXml = GetXmlObject();
		objConLayoutXml.async = false;
		objConLayoutXml.load(strConLayoutXmlPath);
	}

	var targetNode = objConLayoutXml.getElementsByTagName(listKey);
	if (targetNode.length == 0) return;

	var strFileName = targetNode[0].getElementsByTagName("part")[0].getElementsByTagName("file")[0].firstChild.nodeValue;

	LoadSvg(strFileName);
}

/*************************************************/
// GroundPointの時
/*************************************************/
function InitGroundPoint()
{
	// xmlのロード
	if (!objGroundPointXml)
	{
		objGroundPointXml = GetXmlObject();
		objGroundPointXml.async = false;
		objGroundPointXml.load(strGroundPointXmlPath);
	}

	var targetNode = objGroundPointXml.getElementsByTagName(listKey);
	if (targetNode.length == 0) return;
	// ファイル名取得
	var strFileName = targetNode[0].getElementsByTagName("file")[0].firstChild.nodeValue;

	// SVGをロード
	LoadSvg(strFileName);
}

/*************************************************/
// SVG表示
/*************************************************/
function LoadSvg(prmSvgPath, prmSvgTable)
{
	$('divDiagramTop').innerHTML = "";
	$('divDiagramTop').scrollTop = $('divDiagramTop').scrollLeft = 0;
	svgSelectId['Top'] = "";

	strEmbed = "";

	if (prmSvgTable)
	{
		for (i = 0; i < prmSvgPath.length; i++)
		{
			if (i == 0)
			{
				strEmbed = strEmbed + "<div align='center'><embed type='image/svg+xml' src='../svg/" + prmSvgPath[0] + "' wmode='transparent' height='0px' width='0px' id='embDiagramTop' name='svgDiagramTop'>" + prmSvgTable[0] + "</div>";
				svgFile['Top'] = prmSvgPath[0];
			}
			else
			{
				strEmbed = strEmbed + "<div align='center'><embed type='image/svg+xml' src='../svg/" + prmSvgPath[i] + "' wmode='transparent' height='0px' width='0px'>" + prmSvgTable[i] + "</div>";
			}
		}
	}
	else
	{
		strEmbed = strEmbed + "<embed type='image/svg+xml' src='../svg/" + prmSvgPath + "' wmode='transparent' height='0px' width='0px' id='embDiagramTop' name='svgDiagramTop'>";
		svgFile['Top'] = prmSvgPath;
	}

	$('divDiagramTop').innerHTML = strEmbed;
}


/*************************************************/
// SVGサイズ変更
/*************************************************/
// 拡縮算出
function SetScale(prmKey, prmVal)
{
	var intIndex;
	var intNowBairitu;
	var intNewBairitu = "";
	intIndex = 4;
	intNowBairitu = diagScale[prmKey];
	var blnSmall = false;
	var blnBig = false;

	//最小倍率以下で縮小ボタンを押した場合、処理をしない。
	if(intNowBairitu <= intBairitu[0] && prmVal == "small"){

	//最大倍率以上で拡大ボタンを押した場合、処理をしない。
	}
	else if (intNowBairitu >= intBairitu[intBairitu.length-1] && prmVal == "big"){

	//倍率指定処理
	}else{
		//配列の値を超えたら処理を終わる
		while(intIndex >= 0 && intIndex <= 9){
			if(intNowBairitu == intBairitu[intIndex]){
				if(prmVal == "small"){
					intNewBairitu = intBairitu[intIndex - 1];
				}else if (prmVal == "big") {
					intNewBairitu = intBairitu[intIndex + 1];
				}
				break;
			}

			if(intNowBairitu < intBairitu[intIndex]){
				if(blnBig){
					if(prmVal == "small"){
						intNewBairitu = intBairitu[intIndex - 1];
					}else if (prmVal == "big") {
						intNewBairitu = intBairitu[intIndex];
					}
					break;
				}else{
					intIndex = intIndex - 1;
					blnSmall = true;
				}
			}

			if(intNowBairitu > intBairitu[intIndex]){
				if(blnSmall){
					if(prmVal == "small"){
						intNewBairitu = intBairitu[intIndex];
					}else if (prmVal == "big") {
						intNewBairitu = intBairitu[intIndex + 1];
					}
					break;
				}else{
					intIndex = intIndex + 1;
					blnBig = true;
				}
			}
		}

		//サイズ変更を行う
		SizeChange(prmKey, intNewBairitu);
	}
}

// SVG原寸サイズ
function FullSize(prmKey) {

	var bairitu = 1;
	SizeChange(prmKey, bairitu);

}

// 画面フィット
function Fit(prmKey)
{
	var bairitu;

	//倍率を算出
	var bairituH = diagramInnerHeight[prmKey] / $('embDiagram' + prmKey).getSVGDocument().getElementById("svgObj").getAttribute("height");
	var bairituW = diagramInnerWidth          / $('embDiagram' + prmKey).getSVGDocument().getElementById("svgObj").getAttribute("width");

	//小さい方の倍率を使う
	bairitu = Math.min(bairituW, bairituH);

	// サイズ変更
	SizeChange(prmKey, bairitu);
}

// 画面縦フィット
function FitHeigth(prmKey)
{
	//倍率を算出
	var bairitu = (diagramInnerHeight[prmKey] - SVG_SCROLL_BAR_SIZE) / $('embDiagram' + prmKey).getSVGDocument().getElementById("svgObj").getAttribute("height");

	// サイズ変更
	SizeChange(prmKey, bairitu);
}

// 画面横フィット
function FitWidth(prmKey)
{
	//倍率を算出
	var bairitu = (diagramInnerWidth - SVG_SCROLL_BAR_SIZE) / $('embDiagram' + prmKey).getSVGDocument().getElementById("svgObj").getAttribute("width");

	// サイズ変更
	SizeChange(prmKey, bairitu);
}

// サイズ変更
function SizeChange(prmKey, prmSize)
{
	if (prmSize < 0.33 || prmSize > 2) return;
//	if (prmSize < 0.33 || prmSize > 4) return;

	diagScale[prmKey] = prmSize;
	if (selPage == REASSEMBLING_NOTE_FOR_WIRING_HARNESS)
	{
		var embeds = document.getElementsByTagName('embed');
		for (var i = 0;i < embeds.length; i++)
		{
			embeds.item(i).width = embeds.item(i).getSVGDocument().getElementById("svgObj").getAttribute("width") * prmSize;
			embeds.item(i).height = embeds.item(i).getSVGDocument().getElementById("svgObj").getAttribute("height") * prmSize;
		}
	}
	else
	{
        if($('embDiagram' + prmKey))
        {
            $('embDiagram' + prmKey).width = $('embDiagram' + prmKey).getSVGDocument().getElementById("svgObj").getAttribute("width") * prmSize;
            $('embDiagram' + prmKey).height = $('embDiagram' + prmKey).getSVGDocument().getElementById("svgObj").getAttribute("height") * prmSize;
        }
	}
}

/*************************************************/
// 下DIVの書換え
/*************************************************/
function ReWriteBottom(prmAreaId, prmId)
{
	var strFileName = "";
	var strEmbed = "";

	$('divDiagramBottom').innerHTML = "";
	$('divDiagramBottom').scrollTop = $('divDiagramBottom').scrollLeft = 0;

	// 選択中部品クリア
	svgSelectId['Bottom'] = "";

	// xmlのロード
	if (!objGroundPointXml)
	{
		objGroundPointXml = GetXmlObject();
		objGroundPointXml.async = false;
		objGroundPointXml.load(xmlPath);
	}
	var targetNode = objGroundPointXml.getElementsByTagName(prmAreaId);
	
	if (targetNode.length == 0)
	{
		OpenConWindow(prmAreaId, selPage, 20);
		return;
	}

	// ファイル名取得
	strFileName = svgFile['Bottom'] = targetNode[0].getElementsByTagName("file")[0].firstChild.nodeValue;

	strEmbed = "<embed src='../svg/" + strFileName + "' wmode='transparent' height='0px' width='0px' id='embDiagramBottom' name='svgDiagramBottom'>";
	$('divDiagramBottom').innerHTML = strEmbed;

	if (prmId != "" && prmId != undefined)
	{
		setTimeout("svgClick('Bottom', '" + prmId + "', undefined, 20)", 500);
	}
}

/*************************************************/
// コネクタ情報ウィンドウ表示
/*************************************************/
function OpenConWindow(prmId, selPage, prmRetryCnt)
{
	try
	{
		var winOpener = selPage != DETAIL_WINDOW ? window : opener.opener;
		var url = "../html/conInfomation.html?selectId=" + prmId +
											 "&name=" + (selPage != DETAIL_WINDOW ? listName : opener.strName) +
											 "&language=" + CUR_LANGUAGE;
		var params = $H({
			left: (top.screenLeft || top.screenX || 0),
			top: (top.screenTop || top.screenY || 0) + (88),
			width:345,
			height:top.document.body.clientHeight - TITLE_BAR_SIZE,
			resizable:'yes',
			scrollbars:'yes'
		});

		if (selPage != DETAIL_WINDOW && subWinConInfo) subWinConInfo.close();

		subWinConInfo = winOpener.open(url, "conInfo", params.toQueryString().gsub(/\&/, ','));
		subWinConInfo.focus();
	}
	catch (e)
	{
		if (prmRetryCnt)
		{
			prmRetryCnt--;
			if (prmRetryCnt > 0) setTimeout("OpenConWindow('" + prmId + "', " + selPage + ", " + prmRetryCnt + ")", 500);
		}
	}
}

// 名称取得
function GetPartName(prmNm) {

	// xmlのロード
	if (!objPartNameXml)
	{
		objPartNameXml = GetXmlObject();
		objPartNameXml.async = false;
		objPartNameXml.load(strPartNameXmlPath);
	}

	var targetNode = objPartNameXml.getElementsByTagName(prmNm);
	if (targetNode.length == 0) return ;

	var langNode = targetNode[0].getElementsByTagName(CUR_LANGUAGE);
	if (langNode.length == 0) return ;

	strName = langNode[0].firstChild.nodeValue;

	return strName;
}

