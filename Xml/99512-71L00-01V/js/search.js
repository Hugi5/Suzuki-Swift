var objKeywordXml;
var objTableScroll;

function Init()
{
	document.title = SSTR_kEYWORD_sEARCH;
	$('keyword_search').innerHTML = HtmlEnc(SSTR_kEYWORD_sEARCH);
	$('btnSearch').value = SSTR_sEARCH;

	Resize();

	$('txtKeyword').focus();
}

function Resize()
{
	var elmBody = document.getElementsByTagName('body')[0];
	$('divKeywordList').style.height = nonminus(elmBody.clientHeight - 40 - 20) + "px";
//	if (objTableScroll)
//		objTableScroll.Resize($('divKeywordList').clientHeight, $('divKeywordList').clientWidth);
}

/*************************************************/
// 検索
/*************************************************/
function KeywordSearch()
{
	//XMLオブジェクトの作成 
	if (!objKeywordXml)
	{
		objKeywordXml = GetXmlObject();
		objKeywordXml.async = false;
		objKeywordXml.load(strKeywordXmlPath);
	}

	$('divKeywordList').innerHTML = "";
	// 検索文字列
	var aryWord = $F('txtKeyword').split(String.fromCharCode(8203)).join("").replace(/ {2,}/g, ' ').replace(/^[ ]+|[ ]+$/g, '').split(' ');
	var strRes = "";		// 検索結果テーブル
	var strPreWord = "";	// 前処理キーワード
	var strGrp = "";		// キーワード単位テーブル
	var intRowCnt = 0;		// キーワード単位行数
	var pageNode = objKeywordXml.getElementsByTagName("label");
	var intHitCnt = 0;

	for (var i = 0; i < pageNode.length; i++)
	{
		var blnFlag = false;	// 表示対象キーワード

		if (aryWord.length == 1 && aryWord[0].length == 0)
		{
			// 検索対象文字列なし
			blnFlag = true;
		}
		else
		{
            intHitCnt = 0;
			for (var j = 0; j < aryWord.length; j++)
			{
				if (pageNode[i].getAttribute('keyword').toLowerCase().indexOf(aryWord[j].toLowerCase()) >= 0)
				{
					// 検索対象文字列存在
					//blnFlag = true;
					//break;
					intHitCnt++;
				}
			}
			if(intHitCnt == aryWord.length)
                blnFlag = true;
		}

		if (strPreWord.length > 0 && strPreWord != pageNode[i].getAttribute('keyword'))
		{
			// 前処理キーワードと異なる
			strRes += '<tr>' +
					  '<td rowspan="' + intRowCnt + '">' + HtmlEnc(WordWrapBreakAll(strPreWord)) + '</td>' +
					  strGrp;

			strPreWord = "";
			strGrp = "";
			intRowCnt = 0;
		}

		if (blnFlag)
		{
			if (strPreWord.length > 0) strGrp += '<tr>';

			var strPageName = HtmlEnc(WordWrapBreakAll(pageNode[i].getAttribute("pagename")));
			var strMenuName = HtmlEnc(WordWrapBreakAll(pageNode[i].getAttribute("menuname")));
			strGrp += '<td>' + (strPageName.length > 0 ? strPageName : '&nbsp;') + '</td>' +
					  '<td>' + (strMenuName.length > 0 ? strMenuName : '&nbsp;') + '</td>' +
					  '<td><a href="javascript:void(0)" onclick="LinkClick(\'' + pageNode[i].getAttribute("pageid") + '\', \'' + pageNode[i].getAttribute("menuid") + '\', \'' + pageNode[i].getAttribute("areaid") + '\'); return false;">' + HtmlEnc(WordWrapBreakAll(pageNode[i].getAttribute("link"))) + '</a></td>' +
					  '</tr>';
			strPreWord = pageNode[i].getAttribute('keyword');
			intRowCnt++;
		}
	}

	if (strPreWord.length > 0 && strGrp.length > 0)
	{
		// 前処理キーワードと異なる
		strRes += '<tr>' +
				  '<td rowspan="' + intRowCnt + '">' + HtmlEnc(WordWrapBreakAll(strPreWord)) + '</td>' +
				  strGrp;
	}

	if (strRes.length > 0)
	{
		strRes = '<table cellspacing="0px" id="tblKeywordList">' +
				 '<thead>' +
				 '<tr>' +
				 '<th>' + arrayLanguage[CUR_LANGUAGE] + '</th>' +
				 '<th>' + HtmlEnc(SSTR_iNFORMATION_tYPE) + '</th>' +
				 '<th>' + HtmlEnc(SSTR_cATEGORY) + '</th>' +
				 '<th>' + HtmlEnc(SSTR_cONTENTS) + '</th>' +
				 '</tr>' +
				 '</thead>' +
				 '<tbody>' +
				 strRes +
				 '</tbody>' +
				 '</table>';
		$('divKeywordList').innerHTML = strRes;

		$('divKeywordList').style.borderLeft = $('divKeywordList').style.borderTop = "1px solid #030303";

//		objTableScroll = new TableScroll($('tblKeywordList'), $('divKeywordList').clientHeight, $('divKeywordList').clientWidth);
	}
	else
	{
		$('divKeywordList').innerHTML = '<br/>' + HtmlEnc(SSTR_nO_rESULT);
		$('divKeywordList').style.borderLeft = $('divKeywordList').style.borderTop = "0px";

//		objTableScroll = undefined;
	}
}


/*************************************************/
// リンククリック
/*************************************************/
function LinkClick(prmPage, prmMenuId, prmAreaId, prmId)
{
	if (!opener) return;
	if (opener.closed) return;

	if (opener.strTopMenu || opener.CUR_LANGUAGE != CUR_LANGUAGE)
	{
		opener.location.href = './main.html?page=' + prmPage + '&language=' + CUR_LANGUAGE;
	}
	else if (opener.$F('cmbPage') != prmPage)
	{
		opener.blnSideMenuLoaded = false;
		opener.headInit(prmPage);
	}

//	opener.focus();

	// １秒後にサイドメニュー変更を試みる（0.5sec * 20回 = 最大10秒後まで再試行）
	setTimeout("SideMenuWait('" + prmPage + "', '" + prmMenuId + "', '" + prmAreaId + "', '" + prmId + "', 20);", 500);
}

// サイメニュー初期化待機用
function SideMenuWait(prmPage, prmMenuId, prmAreaId, prmId, prmWaitCnt)
{
	prmWaitCnt--;

	try
	{
		if (prmWaitCnt >= 0)
		{
			// 制限時間内
			if (opener.blnSideMenuLoaded)
			{
				// サイドメニュー初期化済み
				if (opener.subWinSearch != window) opener.subWinSearch = window;
				opener.side_menu_change(prmPage, prmMenuId, prmAreaId, '');
			}
			else
			{
				// 0.5秒後にサイドメニュー変更を試みる
				setTimeout("SideMenuWait('" + prmPage + "', '" + prmMenuId + "', '" + prmAreaId + "', '" + prmId + "', " + prmWaitCnt + ");", 500);
			}
		}
		else
		{
			// タイムアウト
		}
	}
	catch (e)
	{
		// 0.5秒後にサイドメニュー変更を試みる
		setTimeout("SideMenuWait('" + prmPage + "', '" + prmMenuId + "', '" + prmAreaId + "', '" + prmId + "', " + prmWaitCnt + ");", 500);
	}
}

// Firefox用擬似word-wrap:break-all
function WordWrapBreakAll(strText)
{
//	if (document.all && document.getElementById && !window.opera)
//		// IEの場合cssにおまかせ
//		return strText;
//
//	return strText.split("").join(String.fromCharCode(8203));
	return strText;
}
