var subWin;
var strTopMenu = true;

/*************************************************/
// ロード処理
/*************************************************/
function Init()
{
	document.title = CUR_MODEL_NAME;

	$("imgLogo").src = "../img/" + CUR_LANGUAGE + "/logo.png";

	$("language_title").innerHTML = HtmlEnc(SSTR_lANGUAGE) + ":";

	$("keyword_search").innerHTML = HtmlEnc(SSTR_kEYWORD_sEARCH);
	
	$("foreword").innerHTML = HtmlEnc(SSTR_fOREWORD);
	$("precautions").innerHTML = HtmlEnc(SSTR_pRECAUTIONS);
	$("general_description").innerHTML = HtmlEnc(SSTR_gENERAL_dESCRIPTION);
	$("how_to_read").innerHTML = HtmlEnc(SSTR_hOW_tO_rEAD);

	$("connector_layout_diagram").innerHTML = HtmlEnc(SSTR_cONNECTOR_lAYOUT_dIAGRAM);
	$("ground_point").innerHTML = HtmlEnc(SSTR_gROUND_pOINT);
	$("power_supply_diagram").innerHTML = HtmlEnc(SSTR_pOWER_sUPPLY_dIAGRAM);

	$("fuse_junction_block").innerHTML = HtmlEnc(SSTR_fUSE_jUNCTION_bLOCK);
	$("system_circuit_diagram").innerHTML = HtmlEnc(SSTR_sYSTEM_cIRCUIT_dIAGRAM);
	$("connector").innerHTML = HtmlEnc(SSTR_cONNECTOR);

	$("reassembling_note_for_wiring_harness").innerHTML = HtmlEnc(SSTR_rEASSEMBLING_nOTE_fOR_wIRING_hARNESS);

	$("svgviewer_installer").innerHTML = HtmlEnc(SSTR_sVGvIEWER_iNSTALLER_eNGLISH_vERSION);
	$("svgviewer_installer").href = "../svgviewer/" + CUR_LANGUAGE + "/SVGView.exe";
	$("how_to_operate_this_manual").innerHTML = HtmlEnc(SSTR_hOW_tO_oPERATE_tHIS_mANUAL);

	
	// 言語リストボックスの作成 //
	CreateLanguageListBox();

	if (document.all)
	{
		try
		{
			var axSVG = new ActiveXObject("Adobe.SVGCtl.3");
			if(axSVG)
			{
				//$("svgviewer_installer").style.visibility = "hidden";
				return;
			}
			else
			{
				alert("SVG Viewer is not Installed !");
				return;
			}

/*			if(IsIe9() == true)
			{
				var axSVG = new ActiveXObject("Adobe.SVGCtl.3");
				if(axSVG)
				{
			        $("svgviewer_installer").style.visibility = "hidden";
					return;
				}
				else
				{
					alert("SVG Viewer is not Installed !");
					return;
				}
			}
			else (objSvg[0].getSVGDocument() == null)
			{
				alert("SVG Viewer is not Installed !");
				return;
			}
*/
		}
		catch(e)
		{
			alert("SVG Viewer is not Installed !");
			return;
		}
	}
	else
	{
		//$("svgviewer_installer").style.visibility = "hidden";
		return;
	}
}

/*************************************************/
// メイン画面を開く
/*************************************************/
function Navigate(page)
{
	location.href = './main.html?page=' + page + '&language=' + CUR_LANGUAGE;
}

/*************************************************/
// 言語リストボックスの作成
/*************************************************/
function CreateLanguageListBox()
{
	// オブジェクトチェック //
	var languageList = $("language");
	if (!languageList) return;

	// 選択言語インデックス //
	var selectIndex = null;

	// Languageリストボックス作成 //
	for (keys in arrayLanguage)
	{
		// オブジェクトを追加 //
		var len = languageList.length;
		languageList.options[len] = new Option(arrayLanguage[keys], keys);

		// 選択言語
		if (CUR_LANGUAGE == keys) selectIndex = len;
	}

	// 選択言語を表示させる //
	if (selectIndex) languageList.selectedIndex = selectIndex;

	// changeイベントを追加 //
	languageList.onchange = (
							function(_listBox) {
								return function() {
									return ChangeLanguage(_listBox);
								}
							}
							)(languageList);
}

/*************************************************/
// 言語リストボックス変更処理
/*************************************************/
function ChangeLanguage(listBox)
{
	// 引数チェック //
	if (!listBox) return false;
	
	// 選択された言語を取得 //
	var selectedValue = listBox[listBox.selectedIndex].value;
	if (!selectedValue) return false;

	if (subWin) subWin.close();

	// 選択された言語のインデックスページに遷移 //
	document.location.href = "./index.html?language=" + selectedValue;
}

function OpenKeywordSearch()
{
	subWin = window.open('./search.html?language=' + CUR_LANGUAGE, 'search', 'resizable=yes,width=810,height=516');
	subWin.focus();
}


