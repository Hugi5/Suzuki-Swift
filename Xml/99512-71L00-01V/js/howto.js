/*************************************************/
// 定数
/*************************************************/
var CONST_FRAME_HOWTO_NAVIGATE = "howto_navigate";
var CONST_FRAME_HOWTO_CONTETN = "howto_content";
var CONST_ATTRIBUTE_HREF = "href";
var CONST_NAVIGATE_HEADER = "navigate_";

/*************************************************/
// 変数
/*************************************************/
var xmlDocument = null;
var hrefList = null;
var procId = null;
var xmlSerializer = null;
var intCounter = 0;

/*************************************************/
// Navigator ロード時処理
/*************************************************/
function loadNavigator()
{
	top.document.title = SSTR_hOW_tO_rEAD;

	// Set Navigate Strings
	$("navigate_Connector_Layout_Diagram").innerHTML         = HtmlEnc(SSTR_nAVIGATE_cONNECTOR_lAYOUT_dIAGRAM);
	$("navigate_Connector_Codes_and_Terminal_Nos").innerHTML = HtmlEnc(SSTR_nAVIGATE_cONNECTOR_cODES_aND_tERMINAL_nOS);
	$("navigate_Ground_Point").innerHTML                     = HtmlEnc(SSTR_nAVIGATE_gROUND_pOINT);
	$("navigate_Power_Supply_Diagram").innerHTML             = HtmlEnc(SSTR_nAVIGATE_pOWER_sUPPLY_dIAGRAM);
	$("navigate_System_Circuit_Diagram").innerHTML           = HtmlEnc(SSTR_nAVIGATE_sYSTEM_cIRCUIT_dIAGRAM);

	// XMLをロード(howto_content.htmlをXMLとしてロード) //
	xmlDocument = GetXmlObject();
	xmlDocument.async = false;
	xmlDocument.validateOnParse = false;
	var isLoad = xmlDocument.load(strHowToContentXmlPath);
	// ロード成功判定 //
	if (!isLoad)
	{
		alert("File 'howto_content.xml' was not found.");
		xmlDocument = null;
	}

	if (!document.all) xmlSerializer = new XMLSerializer();

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
		
		// 対象のIDを取得
		var targetId = trimNavigateHeader(item.id);

		// Aタグの内容を変更 //
		item.href = targetId;

		// クリックイベントを追加 //
		item.onclick = (function(_item) { return function() { return changeNavigate(_item); }})(item);

		// リンクアドレスリストに追加 //
		hrefList[item.id] = item.href;

		// 初回該当の場合 //
		if (isFirstHit)
		{
			isFirstHit = false;
			// href属性を削除 //
			item.removeAttribute(CONST_ATTRIBUTE_HREF);

			// Content画面更新 //
			setContentLocation(targetId);
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
	if (!nodeChilds) return false;

	// リンクタグ一覧内ループ //
	for (var i = 0; i < nodeChilds.length; i++)
	{
		var item = nodeChilds.item(i);

		// クリック対象のリンクタグかチェック //
		if (clickItem.id == item.id)
		{
			// href属性を削除 //
			clickItem.removeAttribute("href");
			
			// 対象のIDを取得
			var targetId = trimNavigateHeader(item.id);

            intCounter = 0;

			// Content画面更新 //
			setContentLocation(targetId);
		}
		else
		{
			// href属性が存在しない場合 //
			if (!item.getAttribute(CONST_ATTRIBUTE_HREF))
				// リンクアドレスリストからhref属性を復元 //
				item.setAttribute(CONST_ATTRIBUTE_HREF, hrefList[item.id]);
		}
	}

	return false;
}

/*************************************************/
// Navigate リンクタグ取得
/*************************************************/
function getNavigateLinkNodes()
{
	// フレーム取得 //
	var frameNavigate = top.frames[CONST_FRAME_HOWTO_NAVIGATE];
	if (!frameNavigate)
	{
		alert("Frame '" + CONST_FRAME_HOWTO_NAVIGATE + "' was not found.");
		return null;
	}

	// 該当リンクタグ取得 //
	var linkNodes = frameNavigate.document.getElementsByTagName("a");
	if (linkNodes.length == 0)
	{
		alert("Tag 'A' was not found.");
		return null;
	}

	return linkNodes;
}

/*************************************************/
// Imgタグ取得
/*************************************************/
function getImgNodes()
{
	//フレーム取得
	var frameContent = top.frames[CONST_FRAME_HOWTO_CONTETN];
	if (!frameContent)
	{
		alert("Frame '" + CONST_FRAME_HOWTO_CONTETN + "' was not found.");
		return null;
	}

	// Imgタグ取得 //
	var imgNodes = frameContent.document.getElementsByTagName("img");
	if (imgNodes.length == 0)
	{
		alert("Tag 'IMG' was not found.");
		return null;
	}

	return imgNodes;
}

/*************************************************/
// Content 画面更新
/*************************************************/
function setContentLocation(tagId)
{
	if (procId) clearTimeout(procId);

	// xmlが読み込まれていない場合は処理しない //
	if (!xmlDocument) return;

	// フレームの存在チェック //
	try
	{
		// 読込XPathを設定 //
		var loadTagXPath = "//body/div[@id='content']/div[@id='" + tagId + "']";

		// xmlから対象のタグを取得 //
		var targetNode = document.all ? xmlDocument.selectSingleNode(loadTagXPath)
									  : xmlDocument.evaluate(loadTagXPath, xmlDocument, null, 7, null).snapshotItem(0);
		//if (!targetNode) return;

		// コンテンツ表示用のタグを取得 //
		var content = top.frames[CONST_FRAME_HOWTO_CONTETN].document.getElementById("content");
		//if (!content) return;

		// 画面に反映 //
		content.innerHTML = document.all ? targetNode.xml
										 : xmlSerializer.serializeToString(targetNode);
		content.scrollTop = content.scrollLeft = 0;
		
		// 印刷アイコン、拡大アイコン設定
		//IMGタグ取得
		var nodeImgs = getImgNodes();
		if (!nodeImgs)
		{
		}
		else
		{
			for (var iImgIdx = 0; iImgIdx < nodeImgs.length; iImgIdx++)
			{
				var item = nodeImgs.item(iImgIdx);
				if ( item.title == "Print")
				{
					printIconSetting4XML(item);
				}
				else if(item.title == "Expand image")
				{
					expandIconSetting4XML(item);
				}
			}
		}
	}
	catch(e)
	{
        intCounter++;
        if(intCounter > 20)
        {
            intCounter = 0;
            return;
        }
		// タイマを使用して再帰 //
		procId = setTimeout("setContentLocation('" + tagId + "')", 300);
	}
}


/*************************************************/
// ヘッダ文字削除
/*************************************************/
function trimNavigateHeader(id)
{
	var startIndex = CONST_NAVIGATE_HEADER.length;
	var idLength = id.length - CONST_NAVIGATE_HEADER.length;

	// ヘッダ文字以降を返却 //
	return id.substr(startIndex, idLength);
}
