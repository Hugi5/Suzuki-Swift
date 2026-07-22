/***********************************************************************/
/*  common.js  : Public Use Function                                  */
/***********************************************************************/
var gstrArg = "";
var gstrDiLng = "";
var gstrDtLng = "";
var gstrManG = "";
var gstrModG = "";
var gLaFg = 0;
var gMoFg = 0;
var gMaFg = 0;
var manWin;
//2010.12.03 add /*マニュアルを別ウインドウで立ち上げる*/
var arMwin = new Array();
var arSwin = new Array();

/**********************************
Function Getparam
******************************/
function Getparam() {
	var strArg = document.location.search.substring(1);
	
//alert(strArg);
	if (strArg.indexOf(',') == -1) {
		if ( (strArg == "")  ||(strArg.length == 0) ) {
			strArg = 'EN';
		}
//alert(strArg);

		gstrDiLng = strArg;
		gLaFg = 0;
	}
	else {
		var arArg = strArg.split(',');

		// Display Language

		gstrDiLng = arArg[0];
		switch (arArg.length) {
			
			case 2 :		// Display Language and Distination Language
				
				gstrDtLng = arArg[1];
				gLaFg = 1;
				break;
				
			
			case 3:			// Manual Group or Model Group
				
				if ( (arArg[1] == "") || (arArg[1].length == 0) ) {
					gLaFg = 0;
					gstrDtLng = "";
				}
				else {

					// Ditination Language keep

					gstrDtLng = arArg[1];
					gLaFg = 1;

				}
					// Selected Model Group

					if (isNaN(arArg[2])) {
						gstrModG = arArg[2];
						gMoFg = 1;
					}
					
					// Selected Manual Group
					else {
						gstrManG = arArg[2];
						gMaFg = 1;
					}
				break;
		}
	}
	
}




/****************************************
Function InitDisp_Lang
 IN : Page ID
      'TOPP' : TopPage
      'MANL' : Manual List
      'MODS' : Model Select
      'VINS' : VIN Search
      'VINL' : VIN List
*****************************************/
function InitDisp_Lang(P_ID) {
/*******
<a href="./ManualList.html"><b>Manual List</b></a>
<a href="./ModelSelect.html"><b>Model Select</b></a>
<a href="./HowtoFind.html"><b>How to find</b></a>
<a href="./VinSearch.html"><b>VIN Search</b></a>


<td align="center" width="100%" height="20" bgcolor="#ffc0cb">
<td align="center"  width="100%" height="20">
*****/

	
	var aCnt = 0;				// Argment Count
	var ActCnt = 0;
	
	var act = 0;
	
	Getparam();
	strDispL = gstrDiLng;
	var strBkHTML = "";
	var strHrefMlist = "";
	var strHrefModes = "";
	var strHrefVinsr = "";
	var strOkHTML = "";
	var strCancelHTML = "";
	var strVListHTML = "";
	var strPlgHTML = "";
	var strHowtoHTML = "";


	
	
	switch (P_ID) {
		case 'TOPP':

			strHrefMlist = '<a href=\"./ManualList.html?' + strDispL + '\"><b>';
			strHrefModes = '<a href=\"./ModelSelect.html?' + strDispL + '\"><b>';
			strHrefVinsr = '<a href=\"./VinSearch.html?' + strDispL + '\"><b>';
			strPlgHTML = '<a href=\"./' + aruPln[strDispL] + '\"><b>';
//			strHowtoHTML = '<a href=\"./' + aruHtf[strDispL] + '\"><b>';
			strHowtoHTML = '<a href=\"./' + aruHtf[strDispL] + '\" target=\"_blank\"><b>';

			LangDisp(strDispL);
			document.getElementById("bMods").innerHTML = strHrefModes + arbModsec[strDispL]  + '</b></a>';
			document.getElementById("bVsrc").innerHTML = strHrefVinsr + arbVSrc[strDispL] + '</b></a>';
			document.getElementById("bHtof").innerHTML = strHowtoHTML + arbHtf[strDispL]  + '</b></a>';
			document.getElementById("bPlgL").innerHTML = strPlgHTML + arbPiL[strDispL] + '</b></a>';
			document.getElementById("bMList").innerHTML = strHrefMlist +  arbMLst[strDispL] + '</b></a>';
			
			//Add 2007.11.28 My B.D
			document.getElementById("DipsLangString").innerHTML = arDspLStr[strDispL];
			
			break;

		case 'VINS':
//2008.9.10 Back->Top
//			strBkHTML = "<a href=\"./TopPage.html?" + strDispL + "\"><font size=\"2\"><b>" + arstrBk[strDispL] + "</b></font></a>";
			strBkHTML = "<a href=\"./TopPage.html?" + strDispL + "\"><font size=\"2\"><b>" + arstrTop[strDispL] + "</b></font></a>";
			strOkHTML = "<a href=\"Javascript:SrcVin();\"><font size=\"2\"><b>" + arstrOK[strDispL] + "</b></font></a>";
//			strCancelHTML = "<a href=\"Javascript:document.VINForm.reset();\"><font size=\"2\"><b>" + arstrCancel[strDispL] + "</b></font></a>";
			strVListHTML = "<a href=\"./VinList.html?" + strDispL + "\"><font size=\"2\"><b>" + arstrVList[strDispL] + "</b></font></a>";
			
			document.getElementById("cVS").innerHTML = arstrVS_U[strDispL];
			document.getElementById("lbInVin").innerHTML =arstrInVin[strDispL];
			document.getElementById("lbDig").innerHTML = arstr1712[strDispL];
			document.getElementById("lbEx").innerHTML = arstrEx[strDispL];
			document.getElementById("lbEx17").innerHTML = arstrEx_17[strDispL];
//Add Start 2008.06.18
			document.getElementById("lbEx17_2").innerHTML = arstrEx_17_2[strDispL];
//Add End 2008.06.18
			document.getElementById("lbEx12").innerHTML = arstrEx_12[strDispL];
			document.getElementById("bVList").innerHTML = strVListHTML;
			document.getElementById("bOK").innerHTML = strOkHTML;
//			document.getElementById("bCancel").innerHTML = strCancelHTML;
			document.getElementById("bBk").innerHTML = strBkHTML;
			document.getElementById("lblVSrc").innerHTML = arbVSrc[strDispL];
			document.getElementById("bRset").innerHTML = arstrReset[strDispL];
			
			break;

		case 'VINL':
			strBkHTML = "<a href=\"./VINSearch.html?" + strDispL + "\"><b>";
			document.getElementById("cVL").innerHTML = arstrVL_U[strDispL];
			document.getElementById("thMog").innerHTML = arstrMog[strDispL];
			document.getElementById("thVIN").innerHTML = arstrVIN[strDispL];
			document.getElementById("bBk").innerHTML = strBkHTML + arstrBk[strDispL] + "</a></b>";
			document.VList.Lng.value = strDispL;
			break;
	}
	
	
}


/*************************************************************************
Function JumpPage
 IN : PageP : PageID
       'TOP'  :: Top Page
       'MANL' :: Manual List
       'MODS' :: Model Select
       'VINS' :: VIN Search
       'VINL' :: VIN List
      Lng  : Display Language
       'EN' :: English
       'IT' :: Italian
       'DU' :: Dutch
       'FR' :: French
       'GE' :: German
       'HU' :: Hungarian
       'SP' :: Spanish
       'SL' :: Slovak
*************************************************************************/
function JumpPage(PageP,Lng) {
//alert (PageP);
//alert(Lng);
	var Cnt = 0;
	var P_ID = "";
	var arPageFile = ['TopPage.html','ManualList.html','ModelSelect.html','VinSearch.html','VinList.html'];
//	var arPageFile = ['index.html','ManualList.html','ModelSelect.html','VinSearch.html','VinList.html'];

//	var arPageFile = ['TopPageTemp.html','ManualList.html','ModelSelect.html','VinSearch.html','VinList.html'];
	var JPage = "";
	
	switch(PageP) {

		case 'TOPP':
			Cnt = 0;
			break;
		case 'MANL':
			Cnt = 1;
			break;
		case 'MODS':
			Cnt = 2;
			break;
		case 'VINS':
			Cnt = 3;
			break;
		case 'VINL':
			Cnt = 4;
			break;
	}
	
	JPage = arPageFile[Cnt] + '?' + Lng;

	document.location = JPage;
}





/**********************************************

************************************************/
function LangDisp(Lng) {

//	var arTopTD = new Array()
	var arTopTD =new Array();
	
	
	for (iCnt = 0 ; iCnt < garBLng.length ; iCnt++) {
		arTopTD[iCnt] = {
			'lng' : garBLng[iCnt],
			'1' : 'td' + garBLng[iCnt] + '_1' ,
			'2' : 'td' + garBLng[iCnt] + '_2'
		};
	}

//alert(arTopTD.length);
	var iLoopCnt = 0;
	
	for (iLoopCnt = 0 ; iLoopCnt < arTopTD.length ; iLoopCnt) {
		if (arTopTD[iLoopCnt]['lng'] == Lng) {
//alert(arTopTD[iLoopCnt]['1']);
//alert(arTopTD[iLoopCnt]['2']);
			document.getElementById(String(arTopTD[iLoopCnt]['1'])).style.display = "block";
			document.getElementById(String(arTopTD[iLoopCnt]['2'])).style.display = "none";
			iLoopCnt++;
		}
		else {
			document.getElementById(String(arTopTD[iLoopCnt]['2'])).style.display = "block";
			document.getElementById(String(arTopTD[iLoopCnt]['1'])).style.display = "none";
			iLoopCnt++;
		}
		
		
	}
	
}


/*******************************************
Function SetGotoTop
	[Go To Top] button (or caption) value set
 IN  : Lng(String) : Display Langugage
 OUT : strGtopHTML(HTML) : Display String data
*********************************************/
function SetGotoTop(Lng) {
	
	var strGTopHTML = "";	//for return value
	
//2008.9.10 Back->Top
//	strGTopHTML += "<a href=\"./TopPage.html?" + Lng +  "\"><b>" + arstrBk[Lng] + "</b></a>";
	strGTopHTML += "<a href=\"./TopPage.html?" + Lng +  "\"><b>" + arstrTop[Lng] + "</b></a>";
//	strGTopHTML += "<a href=\"./TopPage.html?" + Lng +  "\"><font size=\"2\"><b>" + arstrBk[Lng] + "</b></font></a>";
//	strGTopHTML += "<a href=\"./index.html?" + Lng +  "\"><b>" + arstrGTop[Lng] + "</b></a>";
	return strGTopHTML;
}

/*******************************************
Function SetVinList
	[VIN List] button (or caption) value set
 IN  : Lng(String) : Display Langugage
      fPg(String)  : From Page Flag (0:VIN Search , 1:Model Select)
 OUT : strVinListHTML(HTML) : Display String data
*********************************************/
function SetVinList(Lng,fPg) {
	
	var strVinListHTML = "";	//for return value
	
	strVinListHTML += "<a href=\"./VinList.html?" + Lng + "," + parseInt(fPg + 1) + "\"><b>" + arstrVList[Lng] + "</b></a>";
//	strVinListHTML += "<a href=\"./VinList.html?" + Lng + "," + parseInt(fPg + 1) + "\"><font size=\"2\"><b>" + arstrVList[Lng] + "</b></font></a>";
//	strGTopHTML += "<a href=\"./index.html?" + Lng +  "\"><b>" + arstrGTop[Lng] + "</b></a>";
	return strVinListHTML;
}


/*************************************
Function ShowValue
	div Element value Display
  IN : textvalue(string) -> display text
       elementName(string) -> display Element Name
       (ex <div name="elementName"> )
                      ~~~~~~~~~~~
***************************************/
function ShowValue(textValue,elementName)
{
	var element = $(elementName);
	element.innerHTML = textValue;
}

/*************************************
Function ShowValue
	div Element value Display
  IN : textvalue(string) -> display text
       elementName(string) -> display Element Name
       (ex <div name="elementName"> )
                      ~~~~~~~~~~~
***************************************/
function ShowTHCaption(textValue,elementName)
{
	document.getElementById(elementName).innerHTML = textValue;
}





/*******************************************************************************
Function ManualDisp
  IN  : DispURL
  OUT : 
********************************************************************************/
/* 2010.12.03 del start 国内にあわせる
function ManualDisp(DispURL) {
	if (manWin != null) {
		manWin.close();
	}
	manWin = window.open(DispURL , "MyWin");
//	return true;
}

//2010.12.03 del end
*/

function ManualDisp(DispURL) {
//var arMwin = new Array();
//var arSwin = new Array();
	var opFg = 0 ;
	var Ocnt = 0;

//alert("arMwin.length:" + arMwin.length);
//alert("DispURL:" + DispURL);

	var lURL = DispURL.toUpperCase();
	if (arMwin.length == 0) {
		arMwin[0] = {
			'url' : DispURL ,
			'id' : 0 ,
			'nm' : 'MyWin0',
			'cnt' : 1 };
		opFg = 0;
		arSwin[0] = window.open(DispURL , "MyWin0");
		var manWin = arSwin[0];
		if (lURL.indexOf("PDF") < 0) {
			manWin.focus();
		}
	}
	else {
		for(var i = 0 ; i < arMwin.length ; i++) {
			if (arMwin[i]['url'] == DispURL) {
				opFg = 1;
				oCnt = i;
				break;
			}
		}
		if (opFg == 1) {
			var manWin = arSwin[oCnt];
			var wnm = arMwin[oCnt]['nm'];
			if (manWin.closed == true) {
				var manWin2 = window.open(DispURL , "MyWin" + oCnt);
				arSwin[oCnt] = manWin2;
				if (lURL.indexOf("PDF") < 0 ) {
					manWin2.focus();
				}
			}
			else {
				manWin.focus();
			}
		}
		else {
			var iMax = arMwin.length;
			arMwin[iMax] = {
				'url': DispURL,
				'id' : arMwin.length,
				'nm' : "MyWin" + iMax };
				
			arSwin[iMax] = window.open(DispURL , "MyWin" + iMax);
			var manWin = arSwin[iMax];
			if (lURL.indexOf("PDF") < 0) {
				manWin.focus();
			}
			
		}
		
	}
	

}
