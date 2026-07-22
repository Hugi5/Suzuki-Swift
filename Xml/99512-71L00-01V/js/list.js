/*************************************************/
// 変数
/*************************************************/
var objSideMenuXml;
var listSelect = "";

// サイドメニュー完了時取得用に追加 2009/03/26 by Gowsoft
var blnSideMenuLoaded = false;

/*************************************************/
// ロード時
/*************************************************/
function listInit()
{
	//XMLオブジェクトの作成 
	if (!objSideMenuXml)
	{
		objSideMenuXml = GetXmlObject();
		objSideMenuXml.async = false;
		objSideMenuXml.load(strSideMenuXmlPath);
	}

	// サイドメニュー表示
	InitSideMenu();

	listSelect = "";

	// サイドメニュー完了時取得用に追加 2009/03/26 by Gowsoft
	blnSideMenuLoaded = true;
}

/*************************************************/
// サイドメニュー初期表示
/*************************************************/
function InitSideMenu()
{
	var strData = "";
	var strUlMarginLeft;	// <ul>マーカー幅補正用
	$('divList').scrollTop = 0;

	if (document.all) strUlMarginLeft = "10";	// for IE
	else              strUlMarginLeft = "-29";	// for Firefox

	var pageNode = objSideMenuXml.getElementsByTagName("page");
	for (var i = 0; i < pageNode.length; i++)
	{
		if (pageNode[i].getAttribute("value") == $F('cmbPage'))
		{
			var childNode = pageNode[i].childNodes;
			for (var k=0; k<childNode.length; k++)
			{
				if (childNode[k].nodeName == "label")
				{
					var strId = childNode[k].getAttribute("id");
					var strName = childNode[k].getAttribute("name");
					strName = strName.replace(/'/g, "&#39;")
					strData = strData + "<ul id='ul_" + strId + "' style='margin-left:" + strUlMarginLeft + "px;'>";
					strData = strData + "<li id='li_" + strId + "' style='margin-left:10;list-style-image: url(../img/plus.gif);'>";
					strData = strData + "<a href='javascript:void(0)' name='" + strId + "' id='" + strId + "' class='noselect' onclick='side_menu_expand(this); return false;'>" + strName + "</a>";
					strData = strData + "</li>"
					strData = strData + "</ul>"
				}
				else if (childNode[k].nodeName == "link")
				{
					var strId = childNode[k].getAttribute("id");
					var strName = childNode[k].getAttribute("name");
					strName = strName.replace(/'/g, "&#39;")
					var strKey = childNode[k].getAttribute("key");
					strData = strData + "<ul id='ul_" + strId + "' style='margin-left:" + strUlMarginLeft + "px;'>";
					strData = strData + "<li id='li_" + strId + "' style='margin-left:10;list-style-image: url(../img/minus.gif);'>";
					strData = strData + "<a href='javascript:void(0)' name='" + strId + "' id='" + strId + "' class='noselect' onclick='link_click(\"" + strKey + "\",\"" + strId + "\",\"" + strName + "\"); return false;'>" + strName + "</a>";
					strData = strData + "</li>"
					strData = strData + "</ul>"
				}
			}
			break;
		}
	}

	$('divList').innerHTML = strData;
}

/*************************************************/
// サイドメニュー展開
//  [#001] Firefox対応 AM@Gowsoft 2010/06/15
/*************************************************/
function side_menu_expand(prmObj, prmFlg)
{
	var strId = prmObj.getAttribute("id");

	// アイコンの変更
	if (prmFlg == "open")
	{
		prmObj.parentNode.style.listStyleImage = "url(../img/minus.gif)";
		var target = $('ul_' + strId).getElementsByTagName("ul");
		if (target.length != 0)
		{
			for (var i = 0; i < target.length; i++)
			{
				target[i].style.display = "block";
			}
			return;
		}
	}
	else
	{
        //[#001]
        var imageNameTest = replaceAll(prmObj.parentNode.style.listStyleImage, '\"', '');
		switch (imageNameTest)
		{
			case 'url(../img/plus.gif)':
                prmObj.parentNode.style.listStyleImage = "url(../img/minus.gif)";
                var target = $('ul_' + strId).getElementsByTagName("ul");
				if (target.length != 0)
				{
					for (var i = 0; i < target.length; i++)
					{
						target[i].style.display = "block";
					}
					return;
				}
				break;
			case 'url(../img/minus.gif)':
				prmObj.parentNode.style.listStyleImage = "url(../img/plus.gif)";
				var target = $('ul_' + strId).getElementsByTagName("ul");
				for (var i = 0; i < target.length; i++)
				{
					target[i].style.display = "none";
				}
				return;
				break;
			default:
				break;
		}
	}

	//ツリーメニューの作成
	var pageNode = objSideMenuXml.getElementsByTagName("page");
	for (var i = 0; i < pageNode.length; i++)
	{
		if (pageNode[i].getAttribute("value") == $F('cmbPage'))
		{
			var labelNode = pageNode[i].getElementsByTagName("label");
			for (var i = 0; i < labelNode.length; i++)
			{
				if (labelNode[i].getAttribute("id") == strId)
				{
					MakeSubSideMenu(prmObj, labelNode[i]);
				}
			}
			break;
		}
	}
}

/*************************************************/
// 文字列置換（全数置換）
//  [追加] AM@Gowsoft 2010/06/15
/*************************************************/
function replaceAll(str, findstr, newstr)
{
    var rec = str;
    while(str.search(findstr) != -1)
        str = str.replace(findstr, newstr);
    return str;
}

/*************************************************/
// ツリーの階層取得
/*************************************************/
function MakeSubSideMenu(prmObj, prmXmlObj)
{
	var strData = "";
	var strUlMarginLeft;	// <ul>マーカー幅補正用

	if (document.all) strUlMarginLeft = "10";	// IE
	else              strUlMarginLeft = "-29";	// Firefox

	var childNode = prmXmlObj.childNodes;
	for (var i = 0; i < childNode.length; i++)
	{
		if (childNode[i].nodeName == "label")
		{
			var strId = childNode[i].getAttribute("id");
			var strName = childNode[i].getAttribute("name");
			strName = strName.replace(/'/g, "&#39;")
			strData = strData + "<ul id='ul_" + strId + "' style='margin-left:" + strUlMarginLeft + "px;'>";
			strData = strData + "<li id='li" + strId + "' style='margin-left:10;list-style-image: url(../img/plus.gif);'>";
			strData = strData + "<a href='javascript:void(0)' name='" + strId + "' id='" + strId + "' class='noselect' onclick='side_menu_expand(this); return false;'>" + strName + "</a>";
			strData = strData + "</li>"
			strData = strData + "</ul>"
		}
		else if (childNode[i].nodeName == "link")
		{
			var strId = childNode[i].getAttribute("id");
			var strName = childNode[i].getAttribute("name");
			strName = strName.replace(/'/g, "&#39;")
			var strKey = childNode[i].getAttribute("key");
			strData = strData + "<ul style='margin-left:" + strUlMarginLeft + "px;'>";
			strData = strData + "<li style='margin-left:10;list-style-image: url(../img/minus.gif);'>";
			strData = strData + "<a href='javascript:void(0)' name='" + strId + "' id='" + strId + "' class='noselect' onclick='link_click(\"" + strKey + "\",\"" + strId + "\",\"" + strName + "\"); return false;'>" + strName + "</a>";
			strData = strData + "</li>"
			strData = strData + "</ul>"
		}
	}

	var strId = prmObj.getAttribute("id");
	var strHtml = $('ul_' + strId).innerHTML;
	$('ul_' + strId).innerHTML = strHtml + strData;

}

/*************************************************/
// リンククリック時
/*************************************************/
function link_click(prmKey, prmId, prmName)
{
	if (listSelect != "") $(listSelect).className = "noselect";
	$(prmId).className = "select";
	listSelect = prmId;

	// タイマーを削除する //
	clearTimeout(svgTimerId['Top']);
	clearTimeout(svgTimerId['Bottom']);

	// 選択中部品のクリア //
	svgSelectId['Top'] = svgSelectId['Bottom'] = "";

	$('divDiagramTop').innerHTML = $('divDiagramBottom').innerHTML = "";
	$('divDiagramTop').scrollTop = $('divDiagramTop').scrollLeft = $('divDiagramBottom').scrollTop = $('divDiagramBottom').scrollLeft = 0;
	svgDoc['Top'] = svgDoc['Bottom'] = undefined;
	svgLoaded['Top'] = svgLoaded['Bottom'] = false;

	if ($F('cmbPage') == CONNECTOR)
	{
		//---------------------
		// Connectorメニュー
		//---------------------
		var url = "conInfomation.html?selectId=" + prmKey + "&language=" + CUR_LANGUAGE;
		var params = $H({
			left: (top.screenLeft || top.screenX || 0) + GetLeftTop($('divDiagramTop')).x,
			top: (top.screenTop || top.screenY || 0),
			width:720,
			height:top.document.body.clientHeight - TITLE_BAR_SIZE,
			resizable:'yes',
			scrollbars:'yes'
		});

		if (subWinConInfo) subWinConInfo.close();
		subWinConInfo = window.open(url, "conInfo", params.toQueryString().gsub(/\&/, ','));
		subWinConInfo.focus();
	}
	else
	{
		//---------------------
		// 上記以外のメニュー
		//---------------------
		var flg = GetFlg($F('cmbPage'), prmKey);
		if ($F('cmbPage') == GROUND_POINT && flg == "true")
		{
			// GroundPoint
			$('divDiagramBottom').style.display = "block";
		}
		else
		{
			$('divDiagramBottom').style.display = "none";
		}

		Resize();

		InitSvg($F('cmbPage'), prmKey, prmName);
		

	}
}

/******************************************************/
// サブウィンドウから呼ばれた時
//  コンボ選択
//  メニュー展開
//  SVGハイライト点灯
/******************************************************/
function side_menu_change(prmPage, prmSelect, prmArea, prmId)
{
	if ($F('cmbPage') != prmPage)
	{
		$('cmbPage').value = prmPage;
		headSelectPage('auto');
	}

	var strSelect = prmSelect.split(",");

	for (var i = 0; i < strSelect.length; i++)
	{
		if (i == strSelect.length - 1)
		{
			var strKey = GetKey(prmPage, strSelect[i]);
			var strLabel = GetLabel(prmPage, strSelect[i]);
			// リンクの位置づけ
//			location.hash = strSelect[i];
			$('divList').scrollTop = Position.positionedOffset($(strSelect[i]))[1];
			link_click(strKey, strSelect[i], strLabel);

			if (prmPage == GROUND_POINT)
			{
				if (prmArea == undefined || prmArea.length == 0)
					setTimeout("HighLight('Top', '" + prmId + "', 20)", 500);
				else
					setTimeout("svgClick('Top', '" + prmArea + "', '" + prmId + "', 20)", 500);
			}
			else
			{
				if (prmPage == CONNECTOR_LAYOUT || prmPage == SYSTEM_DIAGRAM || prmPage == POWER_SUPPLY)
					setTimeout("HighLight('Top', '" + prmId + "', 20)", 500);
				else if (prmPage != REASSEMBLING_NOTE_FOR_WIRING_HARNESS)
					setTimeout("svgClick('Top', '" + prmId + "clearBeforId', undefined, 20)", 500);
			}
		}
		else
		{
			HierarchicalOpen(strSelect[i]);
		}
	}
}

/******************************************************/
// サイドメニュー展開(サブウィンドウから呼ばれた時)
/******************************************************/
function HierarchicalOpen(prmId)
{
	side_menu_expand($(prmId), "open");
}

/*************************************************/
// 渡されたidよりKeyを取得
/*************************************************/
function GetKey(prmPage, prmSelect)
{
	var pageNode = objSideMenuXml.getElementsByTagName("page");
	for (var i=0; i<pageNode.length; i++)
	{
		if (pageNode[i].getAttribute("value") == prmPage)
		{
			var linkNode = pageNode[i].getElementsByTagName("link");
			for (var k=0; k<linkNode.length; k++)
			{
				if (linkNode[k].getAttribute("id") == prmSelect)
				{
					return linkNode[k].getAttribute("key");
				}
			}
		}
	}
}

/*************************************************/
// 渡されたidよりlabelを取得
/*************************************************/
function GetLabel(prmPage, prmSelect)
{
	var pageNode = objSideMenuXml.getElementsByTagName("page");
	for (var i=0; i<pageNode.length; i++)
	{
		if (pageNode[i].getAttribute("value") == prmPage)
		{
			var linkNode = pageNode[i].getElementsByTagName("link");
			for (var k=0; k<linkNode.length; k++)
			{
				if (linkNode[k].getAttribute("id") == prmSelect)
				{
					return linkNode[k].getAttribute("name");
				}
			}
		}
	}
}


/*************************************************/
// 渡されたkeyよりflgを取得
/*************************************************/
function GetFlg(prmPage, prmKey)
{
	var pageNode = objSideMenuXml.getElementsByTagName("page");
	for (var i=0; i<pageNode.length; i++)
	{
		if (pageNode[i].getAttribute("value") == prmPage)
		{
			var linkNode = pageNode[i].getElementsByTagName("link");
			for (var k=0; k<linkNode.length; k++)
			{
				if (linkNode[k].getAttribute("key") == prmKey)
				{
					return linkNode[k].getAttribute("flg");
				}
			}
		}
	}
}


/*************************************************/
// 表示メニューの先頭項目を取得
/*************************************************/
function GetTopItem()
{
	var pageNode = objSideMenuXml.getElementsByTagName("page");
	for (var i = 0; i < pageNode.length; i++)
	{
		if (pageNode[i].getAttribute("value") == $F('cmbPage'))
		{
			var labelId = "";
			var labelNode = pageNode[i].getElementsByTagName("label");

			if (labelNode.length > 0) labelId = labelNode[0].getAttribute("id");

			var linkNode = pageNode[i].getElementsByTagName("link");
			if (linkNode.length > 0)
			{
				return { "labelid":labelId, "id":linkNode[0].getAttribute("id"), "name":linkNode[0].getAttribute("name"), "key":linkNode[0].getAttribute("key") };
			}
			break;
		}
	}

	return { "labelid":undefined, "id":undefined, "name":undefined, "key":undefined };
}

