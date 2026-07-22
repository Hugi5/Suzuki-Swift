/*************************************************/
// 定数
/*************************************************/
var strTableHeader = "<table border='1' id='detail_table'>";
var strTableFooter = "</table>";

/*************************************************/
// 変数
/*************************************************/
var objConXml;
var strCon;
var conNode;
var strName;
var parentWin;
var subWinDetail;
var subWinLocation;

/*************************************************/
// ロード時
/*************************************************/
function InitConInfo()
{
	document.title = SSTR_rELATED_iNFORMATION;

	var params = document.location.search.toQueryParams();
	strCon = params.selectId;
	strName = params.name;
	parentWin = opener;

	// xmlのロード
	if (!objConXml)
	{
		objConXml = GetXmlObject();
		objConXml.async = false;
		objConXml.load(strConXmlPath);
	}

	// 表の組立て
	makeSubWin();
}

/*************************************************/
// 表の組立て
/*************************************************/
function makeSubWin()
{
	var strTable = "";
	var strType = "";
	conNode = objConXml.getElementsByTagName(strCon);

	// コネクタが見つからない場合は処理を抜ける
	if (conNode.length == 0) return;

	strType = getValue(conNode[0], "type");

	if (strType != "")
	{
		// コネクタ情報取得
		switch (strType)
		{
			case 'connector':
				strTable = strTable + getConInfo();
				break;
			case 'earth':
				strTable = strTable + getEarthInfo();
				break;
			case 'fuse':
				strTable = strTable + getFuse();
				break;
			default:
				break;
		}
	}

	// システム図取得
	strTable = strTable + getSystemLink();

	// コネクターレイアウト取得
	strTable = strTable + getConnectorLink();

	// PowerSupply情報取得
	strTable = strTable + getPowerSupply();

	// FuseJunctionBlock情報取得
	strTable = strTable + getFuseJunction();

	// GroundCircuitDiagram情報取得
	strTable = strTable + getGroundCircuit();

	$('divConInfo').innerHTML = strTableHeader + strTable + strTableFooter;
}

/*************************************************/
// コネクタ情報取得
/*************************************************/
function getConInfo()
{
	var strConNo = "";
	var strColor = "";
	var strConnective = "";
	var strRemarks = "";
	var strWireHarness = "";
	var strSvgName = "";
	var strConInfo = "";
	var strWtoW = "";
	var strDetail = "";
	var strFuseLayout = "";

	//コネクタNo.取得
	strConNo = getValue(conNode[0], "no");
	strCon = strConNo;

	//色取得
	strColor = getValue(conNode[0], "color");
	//Remarks取得
	strRemarks = getValue(conNode[0], "Remarks");
	if (strRemarks == "") {
		strRemarks = "&nbsp;";
	} else {
		strRemarks = strRemarks.replace(/\\n/g, "<br>");
	}
	//Connective position取得
	strConnective = getValue(conNode[0], "Connective");
	if (strConnective == "") {
		strConnective = "&nbsp;";
	} else {
		strConnective = strConnective.replace(/\\n/g, "<br>");
	}
	//Wire/Harness名称取得
	strWireHarness = getValue(conNode[0], "wireharness");
	if (strWireHarness == "") {
		strWireHarness = "&nbsp;";
	} else {
		strWireHarness = strWireHarness.replace(/\\n/g, "<br>");
	}
	//svgファイル名取得
	strSvgName = getValue(conNode[0], "svg");
	//ロケーション取得
	var objLocation = conNode[0].getElementsByTagName("location");
	var strJpg = getValue(objLocation[0], "jpg");
	var strNote = getValue(objLocation[0], "note");
	//Detail取得
	strDetail = getValue(conNode[0], "detail");
	//FuseLayout取得
	strFuseLayout = getValue(conNode[0], "FuseLayout");

	strConInfo = strConInfo + "<tr>";
	strConInfo = strConInfo + "<td>";
	
	// print button
	strConInfo = strConInfo + "<a href='javascript:void(0);' onClick='javascript:printwindow();'><image id='printbutton' title='" + SSTR_pRINT + "' style='margin:0px;padding:0px;' align='right' src='../img/icon-print.gif' border=0></a>";
	
	strConInfo = strConInfo + "<table border='1' id='header'><tr>";
	strConInfo = strConInfo + "<td><nobr>" + HtmlEnc(SSTR_cONNECTOR_nO) + "</nobr></td>";
	strWtoW = fncGetWtoWNewLine(strConNo);
	strConInfo = strConInfo + "<td>" + strWtoW + "</td>";
	strConInfo = strConInfo + "</tr><tr>";
	strConInfo = strConInfo + "<td><nobr>" + HtmlEnc(SSTR_cONNECTOR_cOLOR) + "</nobr></td>";
	strConInfo = strConInfo + "<td>" + strColor + "</td>";
	strConInfo = strConInfo + "</tr><tr>";
	strConInfo = strConInfo + "<td><nobr>" + HtmlEnc(SSTR_cONNECTIVE_pOSITION) + "</nobr></td>";
	strConInfo = strConInfo + "<td>" + strConnective + "</td>";
	strConInfo = strConInfo + "</tr><tr>";
	strConInfo = strConInfo + "<td><nobr>" + HtmlEnc(SSTR_rEMARKS) + "</nobr></td>";
	strConInfo = strConInfo + "<td>" + strRemarks + "</td>";
	strConInfo = strConInfo + "</tr><tr>";
	strConInfo = strConInfo + "<td><nobr>" + HtmlEnc(SSTR_wIRE_hARNESS) + "</nobr></td>";
	strConInfo = strConInfo + "<td>" + strWireHarness + "</td>";
	strConInfo = strConInfo + "</tr></table>";
	strConInfo = strConInfo + "<div id='divDiagramTop' width='100%' style='padding:3px'><embed src='../svg/" + strSvgName + "' align='center' name='svgSub' wmode='transparent' height='250px' width='95%' ></div><div id='divToolTip'></div>";
	if (strJpg != "") {
		strConInfo = strConInfo + "<span id='location'><a href='javascript:void(0)' onclick='show_location(\"" + strJpg + "\",\"" + strNote + "\"); return false;'>" + HtmlEnc(SSTR_lOCATION_pHOTO) + "</a></span><br>";
	} else {
		strConInfo = strConInfo + "<span id='location'>" + HtmlEnc(SSTR_nO_lOCATION_pHOTO) + "</span><br>";
	}

	if (strDetail != "") {
		strConInfo = strConInfo + "<a href='javascript:void(0)' id='location' onclick='show_detail(\"" + strDetail + "\",\"detail\"); return false;'>" + HtmlEnc(SSTR_jUNCTION_bLOCK_iNNER_cIRCUIT_dETAIL) + "</a>";
	}
	if (strFuseLayout != "") {
		if (strDetail != "") {
			strConInfo = strConInfo + "<br>";
		}
		strConInfo = strConInfo + "<a href='javascript:void(0)' id='location' onclick='show_detail(\"" + strFuseLayout + "\",\"fuselayout\"); return false;'>" + HtmlEnc(SSTR_jUNCTION_bLOCK_cONNECTOR_fUSE_lAYOUY) + "</a>";
	}


	strConInfo = strConInfo + "</td>";
	strConInfo = strConInfo + "</tr>";

	return strConInfo;

}

/*************************************************/
// アース情報取得
/*************************************************/
function getEarthInfo() {

	var strEarthInfo = "";

	var strEarthNo = "";
	var strGroundPoint = "";
	var strGroundCircuitDiagram = "";
	var strPage = "";
	var strSelect = "";
	var strAreaId = "";
	
	//アースNo.取得
	strEarthNo = getValue(conNode[0], "no");
	//Remarks取得
	strRemarks = getValue(conNode[0], "Remarks");
	if (strRemarks == "") {
		strRemarks = "&nbsp;";
	} else {
		strRemarks = strRemarks.replace(/\\n/g, "<br>");
	}
	
	//GroundPointのリンク取得
	var targetNode = conNode[0].getElementsByTagName("GroundPoint");
	if (targetNode.length != 0 ) {
		for (var i=0; i<targetNode.length; i++) {
			strPage = getValue(targetNode[i], "page");
			strSelect = getValue(targetNode[i], "select");
			strAreaId = getValue(targetNode[i], "areaid");
		}
	}
	
	//ロケーション取得
	var objLocation = conNode[0].getElementsByTagName("location");
	var strJpg = getValue(objLocation[0], "jpg");
	var strNote = getValue(objLocation[0], "note");

	strEarthInfo = strEarthInfo + "<tr>";
	strEarthInfo = strEarthInfo + "<td>";
	
	// print button
	strEarthInfo = strEarthInfo + "<a href='javascript:void(0);' onClick='javascript:printwindow();'><image id='printbutton' title='" + SSTR_pRINT + "' style='margin:0px;padding:0px;' align='right' src='../img/icon-print.gif' border=0></a>";
	
	strEarthInfo = strEarthInfo + "<span id='location'><a href='javascript:void(0)' onclick='show_con_layout(\"" + strPage + "\",\"" + strSelect + "\",\"" + strAreaId + "\"); return false;'>" + HtmlEnc(SSTR_gROUND_pOINT) + "</a></span>";
	strEarthInfo = strEarthInfo + "<table border='1' id='header'><tr>";
	strEarthInfo = strEarthInfo + "<td><nobr>" + HtmlEnc(SSTR_gROUND_nO) + "</nobr></td>";
	strEarthInfo = strEarthInfo + "<td>" + strEarthNo + "</td>";
	strEarthInfo = strEarthInfo + "</tr><tr>";
	strEarthInfo = strEarthInfo + "<td><nobr>" + HtmlEnc(SSTR_rEMARKS) + "</nobr></td>";
	strEarthInfo = strEarthInfo + "<td>" + strRemarks + "</td>";
	strEarthInfo = strEarthInfo + "</tr></table>";
	if (strJpg != "") {
		strEarthInfo = strEarthInfo + "<span id='location'><a href='javascript:void(0)' onclick='show_location(\"" + strJpg + "\",\"" + strNote + "\"); return false;'>" + HtmlEnc(SSTR_lOCATION_pHOTO) + "</a></span>";
	} else {
		strEarthInfo = strEarthInfo + "<span id='location'>" + HtmlEnc(SSTR_nO_lOCATION_pHOTO) + "</span>";
	}

	strEarthInfo = strEarthInfo + "</td>";
	strEarthInfo = strEarthInfo + "</tr>";

	return strEarthInfo;

}

/*************************************************/
// ヒューズ情報取得
/*************************************************/
function getFuse() {

	var strFuseInfo = "";
	var strFuseNo = "";

	var strFuse = "";
	var strDescription = "";
	var strProtected = "";

	var strRemarks = "";
	var strPage = "";
	var strSelect = "";
	var strLabel ="";

	//ヒューズNo.取得
	strFuseNo = getValue(conNode[0], "no");

	//Fuse取得
	strFuse = getValue(conNode[0], "Fuse");
	if (strFuse == "") {
		strFuse = "&nbsp;";
	}
	//Description on the cover取得
	strDescription = getValue(conNode[0], "Description");
	if (strDescription == "") {
		strDescription = "&nbsp;";
	}
	//Protected circuit取得
	strProtected = getValue(conNode[0], "Protected");

	if (strProtected == "") {
		strProtected = "&nbsp;";
	} else {
		strProtected = strProtected.replace(/\\n/g, "<br>");
	}

	//Remarks取得
	strRemarks = getValue(conNode[0], "Remarks");
	if (strRemarks == "") {
		strRemarks = "&nbsp;";
	} else {
		strRemarks = strRemarks.replace(/\\n/g, "<br>");
	}
	
	//svgファイル名取得
	strSvgName = getValue(conNode[0], "svg");

	strFuseInfo = strFuseInfo + "<tr>";
	strFuseInfo = strFuseInfo + "<td>";
	
	// print button
	strFuseInfo = strFuseInfo + "<a href='javascript:void(0);' onClick='javascript:printwindow();'><image id='printbutton' title='" + SSTR_pRINT + "' style='margin:0px;padding:0px;' align='right' src='../img/icon-print.gif' border=0></a>";
	
	strFuseInfo = strFuseInfo + "<table border='1' id='header'><tr>";
	strFuseInfo = strFuseInfo + "<td>" + HtmlEnc(SSTR_fUSE_nO) + "</td>";
	strFuseInfo = strFuseInfo + "<td>" + strFuseNo + "</td>";
	strFuseInfo = strFuseInfo + "</tr><tr>";
	strFuseInfo = strFuseInfo + "<td><nobr>" + HtmlEnc(SSTR_rEMARKS) + "</nobr></td>";
	strFuseInfo = strFuseInfo + "<td>" + strRemarks + "</td>";
	strFuseInfo = strFuseInfo + "</tr><tr>";
	strFuseInfo = strFuseInfo + "<td><nobr>" + HtmlEnc(SSTR_fUSE) + "</nobr></td>";
	strFuseInfo = strFuseInfo + "<td>" + strFuse + "</td>";
	strFuseInfo = strFuseInfo + "</tr><tr>";
	strFuseInfo = strFuseInfo + "<td><nobr>" + HtmlEnc(SSTR_dESCRIPTION_oN_tHE_cOVER) + "</nobr></td>";
	strFuseInfo = strFuseInfo + "<td>" + strDescription + "</td>";
	strFuseInfo = strFuseInfo + "</tr><tr>";
	strFuseInfo = strFuseInfo + "<td><nobr>" + HtmlEnc(SSTR_pROTECTED_cIRCUIT) + "</nobr></td>";
	strFuseInfo = strFuseInfo + "<td>" + strProtected + "</td>";
	strFuseInfo = strFuseInfo + "</tr></table>";
	strFuseInfo = strFuseInfo + "<br><div id='divDiagramTop' width='100%'><embed src='../svg/" + strSvgName + "' align='center' name='svgSub' wmode='transparent' width='100%' ></div><div id='divToolTip'></div>";

	//子ノード取得
	var childNode = conNode[0].childNodes;
	for (var i=0; i<childNode.length; i++) {
        if(document.all)
        {
            switch (childNode[i].nodeName) {
                case 'detail':
                    if (childNode[i].text != "") {
                        strFuseInfo = strFuseInfo + "<a href='javascript:void(0)' id='location' onclick='show_detail(\"" + childNode[i].text + "\",\"detail\")'; return false;>" + HtmlEnc(SSTR_jUNCTION_bLOCK_iNNER_cIRCUIT_dETAIL) + "</a>";
                    }
                    break;
                case 'FuseLayout':
                    if (childNode[i].text != "") {
                        if (childNode[i-1].text != "") {
                            strFuseInfo = strFuseInfo + "<br>";
                        }
                        strFuseInfo = strFuseInfo + "<a href='javascript:void(0)' id='location' onclick='show_detail(\"" + childNode[i].text + "\",\"fuselayout\")'; return false;>" + HtmlEnc(SSTR_jUNCTION_bLOCK_cONNECTOR_fUSE_lAYOUY) + "</a>";
                    }
                    break;
                default:
                    break;
            }
        }else{
            switch (childNode[i].nodeName) {
                case 'detail':
                    if (childNode[i].textContent != "") {
                        strFuseInfo = strFuseInfo + "<a href='javascript:void(0)' id='location' onclick='show_detail(\"" + childNode[i].textContent + "\",\"detail\")'; return false;>" + HtmlEnc(SSTR_jUNCTION_bLOCK_iNNER_cIRCUIT_dETAIL) + "</a>";
                    }
                    break;
                case 'FuseLayout':
                    if (childNode[i].textContent != "") {
                        if (childNode[i-1].textContent != "") {
                            strFuseInfo = strFuseInfo + "<br>";
                        }
                        strFuseInfo = strFuseInfo + "<a href='javascript:void(0)' id='location' onclick='show_detail(\"" + childNode[i].textContent + "\",\"fuselayout\")'; return false;>" + HtmlEnc(SSTR_jUNCTION_bLOCK_cONNECTOR_fUSE_lAYOUY) + "</a>";
                    }
                    break;
                default:
                    break;
            }
        }
	}

	strFuseInfo = strFuseInfo + "</td>";
	strFuseInfo = strFuseInfo + "</tr>";

	return strFuseInfo;

}

/*************************************************/
// システムリンク情報取得
/*************************************************/
function getSystemLink()
{
	var strSystem = "";
	var strUlStyle = document.all ? "" : " style='margin-left:-20px;'";

	// 情報取得
	var targetNode = conNode[0].getElementsByTagName("RelatedSystemDiagram");

	if (targetNode.length == 0) return strSystem;

	strSystem = strSystem + "<tr><td>";
	strSystem = strSystem + "<h4>" + HtmlEnc(SSTR_sYSTEM_cIRCUIT_dIAGRAM) + "</h4>";

	var linkNode = targetNode[0].getElementsByTagName("links");
	strSystem = strSystem + "<div class='links'>"
	for (var i=0; i<linkNode.length; i++) {
		var strLabel = getValue(linkNode[i], "label");
		var strPage = getValue(linkNode[i], "page");
		var strSelect = getValue(linkNode[i], "select");
		strSystem = strSystem + "<ul" + strUlStyle + ">" ;

		if (strName == strLabel) {
			strSystem = strSystem + "<li class='selected'>" + strLabel + "</li>";
		} else {
			strSystem = strSystem + "<li>" + "<a href='javascript:void(0)' onclick='show_con_layout(\"" + strPage + "\",\"" + strSelect + "\"); return false;'>" + strLabel + "</a></li>";
		}
		strSystem = strSystem + "</ul>";
	}
	strSystem = strSystem + "</div>"
	strSystem = strSystem + "</td></tr>";

	return strSystem;

}

/*************************************************/
// Power supply情報取得
/*************************************************/
function getPowerSupply() {

	var strPower = "";
	var strUlStyle = document.all ? "" : " style='margin-left:-20px;'";

	// 情報取得
	var targetNode = conNode[0].getElementsByTagName("PowerSupplyDiagram");

	if (targetNode.length == 0) return strPower;

	strPower = strPower + "<tr><td>";
	strPower = strPower + "<h4>" + HtmlEnc(SSTR_pOWER_sUPPLY_dIAGRAM) + "</h4>";

	var linkNode = targetNode[0].getElementsByTagName("links");
	strPower = strPower + "<div class='links'>"
	for (var i=0; i<linkNode.length; i++) {
		var strLabel = getValue(linkNode[i], "label");
		var strPage = getValue(linkNode[i], "page");
		var strSelect = getValue(linkNode[i], "select");
		strPower = strPower + "<ul " + strUlStyle + ">";
		if (strName == strLabel) {
			strPower = strPower + "<li class='selected'>" + strLabel + "</li>";
		} else {
			strPower = strPower + "<li>" + "<a href='javascript:void(0)' onclick='show_con_layout(\"" + strPage + "\",\"" + strSelect + "\"); return false;'>" + strLabel + "</a></li>";
		}
		strPower = strPower + "</ul>";
	}
	strPower = strPower + "</div>"
	strPower = strPower + "</td></tr>";

	return strPower;

}

/*************************************************/
// Ground Circuit 情報取得
/*************************************************/
function getGroundCircuit() {

	var strGround = "";
	var strUlStyle = document.all ? "" : " style='margin-left:-20px;'";


	// 情報取得
	var targetNode = conNode[0].getElementsByTagName("GroundCircuitDiagram");

	if (targetNode.length == 0) return strGround;

	strGround = strGround + "<tr><td>";
	strGround = strGround + "<h4>" + HtmlEnc(SSTR_gROUND_cIRCUIT_dIAGRAM) + "</h4>";

	var linkNode = targetNode[0].getElementsByTagName("links");
	strGround = strGround + "<div class='links'>"
	for (var i=0; i<linkNode.length; i++) {
		var strLabel = getValue(linkNode[i], "label");
		var strPage = getValue(linkNode[i], "page");
		var strSelect = getValue(linkNode[i], "select");
		strGround = strGround + "<ul " + strUlStyle + ">";
		if (strName == strLabel) {
			strGround = strGround + "<li class='selected'>" + strLabel + "</li>";
		} else {
			strGround = strGround + "<li>" + "<a href='javascript:void(0)' onclick='show_con_layout(\"" + strPage + "\",\"" + strSelect + "\"); return false;'>" + strLabel + "</a></li>";
		}
		strGround = strGround + "</ul>";
	}
	strGround = strGround + "</div>"
	strGround = strGround + "</td></tr>";

	return strGround;

}

/*************************************************/
// Fuse Junction Block 情報取得
/*************************************************/
function getFuseJunction() {

	var strFuse = "";
	var strUlStyle = document.all ? "" : " style='margin-left:-20px;'";

	// 情報取得
	var targetNode = conNode[0].getElementsByTagName("FuseJunctionBlock");

	if (targetNode.length == 0) return strFuse;

	strFuse = strFuse + "<tr><td>";
	strFuse = strFuse + "<h4>" + HtmlEnc(SSTR_fUSE_jUNCTION_bLOCK) + "</h4>";

	var linkNode = targetNode[0].getElementsByTagName("links");
	strFuse = strFuse + "<div class='links'>"
	for (var i=0; i<linkNode.length; i++) {
		var strLabel = getValue(linkNode[i], "label");
		var strPage = getValue(linkNode[i], "page");
		var strSelect = getValue(linkNode[i], "select");
		strFuse = strFuse + "<ul " + strUlStyle + ">";
		if (strName == strLabel) {
			strFuse = strFuse + "<li class='selected'>" + strLabel + "</li>";
		} else {
			strFuse = strFuse + "<li>" + "<a href='javascript:void(0)' onclick='show_con_layout(\"" + strPage + "\",\"" + strSelect + "\"); return false;'>" + strLabel + "</a></li>";
			}
		strFuse = strFuse + "</ul>";
	}
	strFuse = strFuse + "</div>"
	strFuse = strFuse + "</td></tr>";

	return strFuse;

}

/*************************************************/
// コネクターレイアウトリンク情報取得
/*************************************************/
function getConnectorLink() {

	var strConLayout = "";
	var strPlace = "";
	var strUlStyle = document.all ? "" : " style='margin-left:-20px;'";

	// 情報取得
	var targetNode = conNode[0].getElementsByTagName("ConnectorLayout");

	if (targetNode.length == 0) return strConLayout;

	strConLayout = strConLayout + "<tr><td>";
	strConLayout = strConLayout + "<h4>" + HtmlEnc(SSTR_cONNECTOR_lAYOUT_dIAGRAM) + "</h4>";

	var placeNode = targetNode[0].getElementsByTagName("place");
	strConLayout = strConLayout + "<div class='links'>"
	for (var i=0; i<placeNode.length; i++) {
		var strPlace = placeNode[i].getAttribute("name");
		strConLayout = strConLayout + "<span id='place'>" + strPlace + "</span>" + "<br>";
		//リンク取得
		var linkNode = placeNode[i].getElementsByTagName("links");
		for (var k=0; k<linkNode.length; k++) {
			var strLabel = getValue(linkNode[k], "label");
			var strPage = getValue(linkNode[k], "page");
			var strSelect = getValue(linkNode[k], "select");
			strConLayout = strConLayout + "<ul " + strUlStyle + ">";
			if (strName == strLabel) {
				strConLayout = strConLayout + "<li class='selected'>" + strLabel + "</li>";
			} else {
				strConLayout = strConLayout + "<li>" + "<a href='javascript:void(0)' onclick='show_con_layout(\"" + strPage + "\",\"" + strSelect + "\"); return false;'>" + strLabel + "</a></li>";
			}
			strConLayout = strConLayout + "</ul>";
		}
	}

	strConLayout = strConLayout + "</div>"
	strConLayout = strConLayout + "</td></tr>";

	return strConLayout;

}

/*************************************************/
// 値取得
/*************************************************/
function getValue(prmXmlNode, prmTagName) {

	var strValue = "";

	var targetNode = prmXmlNode.getElementsByTagName(prmTagName);

	if (targetNode.length == 0) return "";

	if (targetNode[0].childNodes.length == 1 && targetNode[0].childNodes[0].nodeType == 3) {
		strValue = targetNode[0].childNodes[0].nodeValue;
	} else { 
		strValue = "";
	}
	return strValue;

}

/*************************************************/
// Location押下時
/*************************************************/
function show_location(prmImg, prmNote) {

	prmNote = prmNote.replace(/\n/g, "<br>");

	var url = "location.html?imgPath=" + prmImg + "&strNote=" + prmNote + "&language=" + CUR_LANGUAGE;
	var params = $H({
		left: 0,
		top: 0,
		width:500,
		height:440,
		resizable:'yes',
		scrollbars:'yes'
	});
	subWinLocation = window.open(url,"location", params.toQueryString().gsub(/\&/, ','));
	subWinLocation.focus();
}

/*************************************************/
// コネクターレイアウトクリック
/*************************************************/
function show_con_layout(prmPage, prmSelect, prmArea) {

	// 親の関数を呼ぶ
//	opener.focus();
	opener.side_menu_change(prmPage, prmSelect, prmArea, strCon);
	close();

}

/*************************************************/
// Detailクリック
/*************************************************/
function show_detail(prmFileNm, prmKbn) {

	var url = "./detail.html?svgPath=" + prmFileNm + "&kbn=" + prmKbn + "&prmId=" + strCon + "&language=" + CUR_LANGUAGE;

	var intHeight = 0;
	if (prmKbn == "fuselayout") {
		intHeight = 600;
	} else {
		intHeight = 900;
	}
	var params = $H({
		left: 0,
		top: 0,
		width: 800,
		height: intHeight,
		resizable:'yes',
		scrollbars:'yes'
	});
	subWinDetail = window.open(url,"detail", params.toQueryString().gsub(/\&/, ','));
	subWinDetail.focus();

}

/*************************************************/
// WtoWの記号を改行させる
/*************************************************/
function fncGetWtoWNewLine(prmKigo) {

	var str;
	var str1;
	var str2;
	var int;

	for (var i=1; i<prmKigo.length; i++) {
		if (isNaN(prmKigo.substring(i,1))) {
			int = i;
			break;
		}
	}

	if (i == prmKigo.length) return prmKigo;

	str1 = prmKigo.substring(0,i-1);
	str2 = prmKigo.substring(i-1);
	str = str1 + "<br>" + str2;

	return str;

}

/************************************************************/
// ウィンドウUnloadイベント(子画面が開いている場合は閉じる)
/************************************************************/
function Unload()
{
//	if (subWinLocation) if (!subWinLocation.closed) subWinLocation.close();
	if (subWinDetail) if (!subWinDetail.closed) subWinDetail.close();
}

var svgDoc = new Array();			//SVGオブジェクト

function svgLoad(prmKey, prmSvgDoc)
{
	// SVGオブジェクト取得
	svgDoc[prmKey] = prmSvgDoc;
}

/*************************************************/
// 名称用ツールチップ
/*************************************************/
// マウスオーバー //
function svgMouseOverName(prmKey, prmName, evt)
{
	//選択中の言語を取得
	var strData = opener.GetPartName(prmName, strLanguage);
	if (strData == "none") return;
	strData = "<nobr>" + strData + "</nobr>";

	var mouseX = evt.clientX;
	var mouseY = evt.clientY;

	var lt = GetLeftTop($('divDiagram' + prmKey));
	var baseX  = lt.x;
	var baseY  = lt.y;

	$('divToolTip').style.left    = baseX + mouseX + 20;
	$('divToolTip').style.top     = baseY + mouseY + 20;
	$('divToolTip').style.display = "block";
	$('divToolTip').innerHTML     = "&nbsp;" + strData + "&nbsp;";

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

	var maxWH = GetClientSize();
	maxWH.width  += document.body.scrollLeft;
	maxWH.height += document.body.scrollTop;

	if (window.scrollMaxX)
		if (window.scrollMaxX > 0) maxWH.height -= SVG_SCROLL_BAR_SIZE;
	if (window.scrollMaxY)
		if (window.scrollMaxY > 0) maxWH.width  -= SVG_SCROLL_BAR_SIZE;

	toolTipElement.style.left = tooltipLeft + document.body.scrollLeft;
	toolTipElement.style.top  = tooltipTop  + document.body.scrollTop;

	// ------------------ //
	// 座標更新           //
	// ------------------ //
	// 上限チェック(横)
	if (tooltipMaxX > maxWH.width) toolTipElement.style.left = (maxWH.width - tooltipWidth) + "px";
	else                           toolTipElement.style.left = tooltipLeft + "px";

	// 上限チェック(縦)
	if (tooltipMaxY > maxWH.height) toolTipElement.style.top = (maxWH.height - tooltipHeight) + "px";
	else                            toolTipElement.style.top = tooltipTop + "px";
}

function svgMouseOver(prmKey, prmId, evt)
{
}

function svgMouseOut(prmKey, prmId)
{
}

function svgClick(prmKey, prmId, prmSubId, prmRetryCnt)
{
}

function svgOpenHtml(prmKey, prmId)
{
}
