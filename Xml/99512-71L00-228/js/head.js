/*************************************************/
// 変数
/*************************************************/
var intPrePageIndex = 0;	// 選択ページ

/*************************************************/
// ヘッダー初期化
/*************************************************/
function headInit(prmPage)
{
	// 選択ページ
	$('cmbPage').value = prmPage;
	headSelectPage('manual');
}

/*************************************************/
// サイドメニュー開閉
/*************************************************/
function headListSwitch()
{
	switch ($F('btnListSwitch'))
	{
		case '<':
			$('btnListSwitch').value = ">";
			$('divList').style.display = "none";
			break;
		case '>':
			$('btnListSwitch').value = "<";
			$('divList').style.display = "block";
			break;
		default:
			break;
	}

	Resize();
}

/*************************************************/
// ページ選択
/*************************************************/
function headSelectPage(prmAction)
{
	if ($F('cmbPage') == FOREWORD)
	{
		JumpNavigate('./' + CUR_LANGUAGE + '/foreword.html');
		$('cmbPage').selectedIndex = intPrePageIndex;	// 記憶済み選択ページに戻す
	}
	else if ($F('cmbPage') == PRECAUTIONS)
	{
		JumpNavigate('./' + CUR_LANGUAGE + '/0000010.html');
		$('cmbPage').selectedIndex = intPrePageIndex;	// 記憶済み選択ページに戻す
	}
	else if ($F('cmbPage') == GENERAL_DESCRIPTION)
	{
		JumpNavigate('./general.html');
		$('cmbPage').selectedIndex = intPrePageIndex;	// 記憶済み選択ページに戻す
	}
	else if ($F('cmbPage') == HOW_TO_READ)
	{
		JumpNavigate('./howto.html');
		$('cmbPage').selectedIndex = intPrePageIndex;	// 記憶済み選択ページに戻す
	}
	else
	{
		// タイマーを削除する //
		clearTimeout(svgTimerId['Top']);
		clearTimeout(svgTimerId['Bottom']);

		// 選択中部品のクリア //
		svgSelectId['Top'] = svgSelectId['Bottom'] = "";

		// フレーム内クリア
		if (prmAction == 'manual')
		{
			//手で操作した時（サブ画面から呼ばれた時は、ここは処理しない）
			$('divDiagramTop').innerHTML = "";
		}

		$('divDiagramBottom').innerHTML = "";

		// 現在のページを記憶
		intPrePageIndex = $('cmbPage').selectedIndex;

		// サイドメニューが閉じている時は開く
		if ($F('btnListSwitch') == '>') headListSwitch();

		// リスト初期化
		listInit();
		

		if (prmAction == 'manual')
		{
			// メニュー手動選択時、先頭項目のSVGを自動表示
			var topItem = GetTopItem();
			if (topItem.labelid.length > 0) side_menu_expand($(topItem.labelid));
			link_click(topItem.key, topItem.id, topItem.name);
		}
	}
}

/*************************************************/
// ツールバー
/*************************************************/
// サイズ変更
function headSize(prmKbn)
{
	if (svgDoc['Top'])
	{
		switch (prmKbn)
		{
			case 'fit':
				Fit('Top');
				if ($('divDiagramBottom') && $('divDiagramBottom').innerHTML != "")
					if ($('divDiagramBottom').style.display != 'none') Fit('Bottom');
				break;
			case 'in':
				SetScale('Top', 'big');
				if ($('divDiagramBottom') && $('divDiagramBottom').innerHTML != "")
					if ($('divDiagramBottom').style.display != 'none') SetScale('Bottom', 'big');
				break;
			case 'out':
				SetScale('Top', 'small');
				if ($('divDiagramBottom') && $('divDiagramBottom').innerHTML != "")
					if ($('divDiagramBottom').style.display != 'none') SetScale('Bottom', 'small');
				break;
			case 'fitheight':
				FitHeigth('Top');
				if ($('divDiagramBottom') && $('divDiagramBottom').innerHTML != "")
					if ($('divDiagramBottom').style.display != 'none') FitHeigth('Bottom');
				break;
			default:
				break;
		}
	}
}

// 印刷プレビュー
function headPreview()
{
	var params = $H({});

	if (!$('embDiagramTop')) return;
	if ($('embDiagramTop').src.length == 0) return;

    /* PDFへリンク */
	if ($F('cmbPage') != REASSEMBLING_NOTE_FOR_WIRING_HARNESS)
	{
		if ($('embDiagramBottom'))
		{
			if ($('embDiagramBottom').src.length > 0)
			{
				params.src = svgFile['Bottom'];
			}
		}
		else
		{
			params.src = svgFile['Top'];
		}
		var url = "./preview.html?language=" + CUR_LANGUAGE + "&" + params.toQueryString();
		window.open(url, "_blank","location=1,menubar=1,status=1,"+params.toQueryString().gsub(/\&/, ','));
	}
	else
	{
		params.src = svgFile['Top'];
		params.code = "reassembling";
		var url = "./preview.html?language=" + CUR_LANGUAGE + "&" + params.toQueryString();
		window.open(url, "_blank","location=1,menubar=1,status=1,"+params.toQueryString().gsub(/\&/, ','));
	}

	// TEST 
	return;
/*
	if ($F('cmbPage') != REASSEMBLING_NOTE_FOR_WIRING_HARNESS)
	{
		// Preview.htmlを表示 //
		params.src = svgFile['Top'];
		if (svgSelectId['Top']) params.code = svgSelectId['Top'];

		var url = "preview.html?"+ params.toQueryString();
		params = $H({
			top: 0,
			left: 0,
			width: 700,
			height: 800,
			resizable:'yes'
		});
		window.open(url, "_blank","location=1,menubar=1,status=1,"+params.toQueryString().gsub(/\&/, ','));

		// 下のフレームにもSVGが存在する場合(GROUND_POINTのみ?) //
		if ($('embDiagramBottom'))
		{
			if ($('embDiagramBottom').src.length > 0)
			{
				params.src = svgFile['Bottom'];
				if (svgSelectId['Bottom']) params.code = svgSelectId['Bottom'];

				var url = "preview.html?"+ params.toQueryString();
				params = $H({
					top: 50,
					left: 50,
					width: 700,
					height: 800,
					resizable:'yes'
				});
				window.open(url, "_blank","location=1,menubar=1,status=1,"+params.toQueryString().gsub(/\&/, ','));
			}
		}
	}
	else
	{
		var url = "reassembling.html?src=" + listKey;
		// HTMLをサブウィンドウで表示 //
		var params = $H({
			top: 0,
			left: 0,
			width: 600,
			height: 700,
			resizable: 'yes',
			scrollbars: 'yes'
		});
		window.open(url, "_blank", params.toQueryString().gsub(/\&/, ','));
	}
*/
}

// 印刷
function headPrint()
{
	if ($('embDiagramTop')) window.print();
}


// Homeボタン
function headHome()
{
	location.href = "./index.html?language=" + CUR_LANGUAGE;
}

