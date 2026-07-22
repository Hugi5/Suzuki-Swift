/***********************************************************************/
/*  ManList.js  : Manual List Page List Show from XML File             */
/***********************************************************************/
var strArg = document.location.search.substring(1);
var gstrDispL = '';		//Display Language (by parameter)
var gstrDataL = '';		//Manual Language (by parameter)
var gstrInVin ='';		//Input VIN (by parameter)
var gstrModG = '';		//Model Group (by parameter)
var gLFg = 0;
var gMFg = 0;


/*******************************************
Function onLoadWin()
  IE7 or other browser(IE6 or FireFox) Distinction
    IE7 -> InitDispIE7()
    other(IE6 or FireFox) -> InitDisp
********************************************/
function onLoadWin() {
	
	var strAPP = navigator.appVersion;
	gLFg = 0;
	gMFg = 0;

/********
<ManualList.html?EN>
  -> Display Language only (from Top Page)
<ManualList.html?EN,,,E>
  -> Display Language and Manual Language (from ManualList Page)
<ManualList.html?EN,A,,,>
  -> Display Language and Model Group (from ModelSelect Page)
<ManualList.html?EN,A,JSAJTD54V70250000,E>
  -> Display Language and Model Group and Input VIN and Manual Language (from VIN Search result (Model Select))
********/
	//Parameter Data Set
	if( (strArg.length == 0) || (strArg == '')) {
		gstrDispL = 'EN';
		gstrDataL = '';	
		gstrInVin ='';	
		gstrModG = '';	
	}
	else {
		if (strArg.indexOf(",") == -1) {
			gstrDispL = strArg;
			gstrDataL = '';	
			gstrInVin ='';	
			gstrModG = '';	
		}
		else {
			var arArg = strArg.split(",");
			if ((arArg[0] == '') || (arArg[0].length == 0)) {
				gstrDispL = "EN";
			}
			else {
				gstrDispL = arArg[0];
			}
			if ((arArg[1] == '') || (arArg[1].length == 0)) {
				gMFg = 0;
				gstrModG = '';
			}
			else {
				gMFg = 1;
				gstrModG = arArg[1];
			}
			if (arArg.length > 2) {
				if ((arArg[2] == '' ) || (arArg[2].length == 0)) {
					gstrInVin = '';
				}
				else {
					gstrInVin = arArg[2];
				}
			}
			if (arArg.length > 3) {
				if ((arArg[3] == '') || (arArg[3].length == 0)) {
					gLFg = 0;
					gstrDataL = '';
				}
				else {
					gLFg = 1;
					gstrDataL = arArg[3];
				}
			}
		}
	}
	
	//DataDisplay  2009.07.28
	InitDisp();

}


/*******************************************
Function InitDisp
	document body onLoad function
		XML Read(Parse) & Data display
*********************************************/
function InitDisp()
{

	var strDispL = "";			//Selected Display Language (From TopPage)
	var strDataL = "";			//Selected Destination Lanuage(Manual Language)
	var strMoG = "";			//Selected Manual Group
	var strMaG = "";			//Selected Model Group
	var MoFg = 0;				//Model Group Select Flag(1:On , 0:Off)
	var MaFg = 0;				//Manual Group Select Flag(1:On , 0:Off)
	var LaFg = 0;				//Destination Language Select Flag(1:On , 0:Off)
	var strHTML = "";			//Manual List HTML String

	// ManualList Data Array Set
	var arDispList = DispManulArraySet();
	
	// Array Data -> Display String
	strHTML = SetDisplaystring(arDispList)

	//Select Language Data Array
	var arDispLng = DispLangArraySet();
	
	//Array Data -> Display String
	var strLHTML = SeDisplayLangString(arDispLng);

//var dbgStr = dbgarDisp(arDispList);
//var dbgStr = strHTML.replace(/</gi,"&lt;");
//dbgStr = dbgStr.replace(/>/gi,"&gt;");
//document.write(dbgStr);

	ShowValue(arstrML_U[gstrDispL],"cML");
	var strTopString = SetGotoTop(gstrDispL);
	ShowValue(strTopString,"bBk");
	var strCond = SetCondString(gstrDispL);
	ShowValue(strCond,"Cond");
	ShowValue(arstrGTop[gstrDispL],"bPTop")
	ShowValue(strLHTML,"SelLang");
	ShowValue(strHTML,'ManList');					// Manual List Data
	
}


/************************************************/
function SetCondString(strDispL) {
	var strRet = '';
	
	if (gstrInVin == '') {
		if (gstrModG != '') {

		//2008.7.29 Add
			strRet = "";
		
		}
		else {
			strRet = arstrAllMan[strDispL] + " , ";
		}
	}
	else {
		strRet = arstrCondLabl[strDispL];
		strRet += "  = by VIN (" + gstrInVin + ") , ";
	}
	
	if (gstrDataL == '') {
		strRet += arstrSelLng[strDispL] + " = " +  arstrAll[strDispL];
	}
	else {
//Update 2007.11.30
		var mstrLng = new Array();
		
		switch(gstrDispL) {
			case "EN":
				mstrLng = arstrLngLong;
				break;
			case "FR":
				mstrLng = arstrLngLongFR;
				break;
			case "GE":
				mstrLng = arstrLngLongGE;
				break;
			case "SP":
				mstrLng = arstrLngLongSP;
				break;
			case "IT":
				mstrLng = arstrLngLongIT;
				break;
			case "DU":
				mstrLng = arstrLngLongDU;
				break;
			case "HU":
				mstrLng = arstrLngLongHU;
				break;
			case "SL":
				mstrLng = arstrLngLongSL;
				break;
			case "GR":
				mstrLng = arstrLngLongGR;
				break;
			case "CR": //2008.12.12 add ry
				mstrLng = arstrLngLongCR;
				break;
			case "PL": //2008.12.12 add ry
				mstrLng = arstrLngLongPL;
				break;
			case "RU": //2010.12.21 add Sa
				mstrLng = arstrLngLongRU;
				break;
			case "TH": //2010.12.21 add Sa
				mstrLng = arstrLngLongTH;
				break;

		}
		strRet += arstrSelLng[strDispL] + " = " + mstrLng[gstrDataL];
	}
	
	return strRet;
}


/***************/
//function DispLangArraySet(arDisp) {
function DispLangArraySet() {
	var strLink = '';
	
	var arLngShort = new Array("EN","FR","GE","SP","IT","DU","HU","SL","GR","CR","PL","RU","TH");
	var arLng = new Array();
	var arRet = new Array();
	var iCnt = 0;
	var idumCnt = 0;
	var iarCnt = 0;
	var lFg = 0;
	
	
	//Add 2007.11.28
	var mstrLng = new Array();
	
	switch(gstrDispL) {
		case "EN":
			mstrLng = arstrMLng;
			break;
		case "FR":
			mstrLng = arstrMLngFR;
			break;
		case "GE":
			mstrLng = arstrMLngGE;
			break;
		case "SP":
			mstrLng = arstrMLngSP;
			break;
		case "IT":
			mstrLng = arstrMLngIT;
			break;
		case "DU":
			mstrLng = arstrMLngDU;
			break;
		case "HU":
			mstrLng = arstrMLngHU;
			break;
		case "SL":
			mstrLng = arstrMLngSL;
			break;
		case "GR":
			mstrLng = arstrMLngGR;
			break;
		case "CR":
			mstrLng = arstrMLngCR;
			break;
		case "PL":
			mstrLng = arstrMLngPL;
			break;
		case "RU":
			mstrLng = arstrMLngRU;
			break;
		case "TH":
			mstrLng = arstrMLngTH;
			break;

	}
	
	
	for (iCnt = 0 ; iCnt < arLngShort.length ; iCnt++) {
		var lng = arLngShort[iCnt];
		arLng[iCnt] = {
			'para' :  mstrLng[lng].charAt(0) ,
			'disp' : mstrLng[lng],
			'd_l' : lng 
		};
	}

	
	
	var xMax = parent.arMan_no.length;
	
	iCnt = 0;
	var cmpL = '';
	
	for (iCnt = 0 ; iCnt < xMax ; iCnt++) {
		if (gstrModG == '') {
			cmpL = parent.arMan_no[iCnt]['lang'];
			if (iCnt == 0) {
				for (var i = 0 ; i < arLng.length ; i++) {
					if (arLng[i]['para'] == cmpL) {
						arRet[iarCnt] = {
							'para' : cmpL , 
							'd_l' : arLng[i]['d_l'] , 
							'disp' : arLng[i]['disp'].substring(1)
						};
						iarCnt++;
						break;
					}
				}
			}
			else {
				lFg = 0;
				for (idumCnt = 0 ; idumCnt < arRet.length ; idumCnt++) {
					if (arRet[idumCnt]['para'] == cmpL) {
						lFg = 1;
						break;
					}
				}
				if (lFg == 0) {
					for (var i = 0 ; i < arLng.length ; i++) {
						if (arLng[i]['para'] == cmpL) {
							arRet[iarCnt] = {
								'para' : cmpL , 
								'd_l' : arLng[i]['d_l'] , 
								'disp' : arLng[i]['disp'].substring(1)
							};
							iarCnt++;
							break;
						}
					}
				}
			}
		}
		else {
			if (parent.arMan_no[iCnt]['mogrp'] == gstrModG) {
				cmpL = parent.arMan_no[iCnt]['lang'];
				if (iCnt == 0) {
					for (var i = 0 ; i < arLng.length ; i++) {
						if (arLng[i]['para'] == cmpL) {
							arRet[iarCnt] = {
								'para' : cmpL , 
								'd_l' : arLng[i]['d_l'] , 
								'disp' : arLng[i]['disp'].substring(1)
							};
							iarCnt++;
							break;
						}
					}
				}
				else {
					lFg = 0;
					for (idumCnt = 0 ; idumCnt < arRet.length ; idumCnt++) {
						if (arRet[idumCnt]['para'] == cmpL) {
							lFg = 1;
							break;
						}
					}
					if (lFg == 0) {
						for (var i = 0 ; i < arLng.length ; i++) {
							if (arLng[i]['para'] == cmpL) {
								arRet[iarCnt] = {
									'para' : cmpL , 
									'd_l' : arLng[i]['d_l'] , 
									'disp' : arLng[i]['disp'].substring(1)
								};
								iarCnt++;
								break;
							}
						}
					}
				}
			}
		}
	}
	return arRet;

}


/********************************************
********************************************/
function SeDisplayLangString(arDispL) {
	var strRet = '';
	var iCnt = 0;
	var w_all = 0;
	var w_other = 0;
	var iDum = 0;
	var strLinkText = '';
	//2008.12.12 add
	var Cnm = 0;
	var nmRowspan = 0;
	var waru = 0;
	var amaru = 0;
	var thFlg = 0;
	var allh = 0;
	var twidth = 0;
	
//	iDum = Math.floor(800 / (arDispL.length + 1));

//ALL rowspan 2008.12.12 add start ry
	Cnm = arDispL.length;
	waru = Math.floor(Cnm / 8);
	amaru = (Cnm % 8);
	if(amaru == 0){
		nmRowspan = waru;
	}
	else{
		nmRowspan = waru + 1;
	}
	allh = 35 * nmRowspan; //ALL Height
	//テーブルの幅
	if(Cnm >= 8){
		twidth = 900;
	}else{
		twidth = 100 * Cnm;
	}
//ALLのrowspan 2008.12.12 add end ry

	strRet = '';
	strRet += "<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"900\">";
	strRet += "<tr>";
	strRet += "<td align=\"left\">";
	strRet += "<table border=\"0\" width=\"" + twidth + "\" cellpadding=\"0\" cellspacing=\"0\" >";
	strRet += "<tr>";

	if (gstrDataL == '') {
		strRet += "<th width=\"100\" class=\"lang\" rowspan=\"" + nmRowspan + "\">";
		strRet += "<table border=\"1\" cellpadding=\"0\" cellspacing=\"0\" width=\"100\" height=\"" + allh + "\">";
		strRet += "<tr><th width=\"100\" class=\"lang\"  bgcolor=\"#ffc0cb\">";
		strRet += "<b>" + arstrAll[gstrDispL] + "</b></th>\n</tr>";
		strRet += "</table>";
		strRet += "</th>";
	}
	else {
		strLinkText = "<a href=\"ManualList.html?" + gstrDispL + "," + gstrModG + "," + gstrInVin + ",\">\n";
		strRet += "<th width=\"100\" class=\"lang\" rowspan=\"" + nmRowspan + "\">";
		strRet += "<table border=\"1\" cellpadding=\"0\" cellspacing=\"0\" width=\"100\" height=\"" + allh + "\">";
		strRet += "<tr><th width=\"100\" class=\"lang\">";
		strRet += "<b>" + strLinkText + arstrAll[gstrDispL] + "</a></b></th>\n</tr>";
		strRet += "</table>";
		strRet += "</th>";
	}
	for (iCnt = 0 ; iCnt < arDispL.length ; iCnt++)  {
		strLinkText = "<a href=\"ManualList.html?" + gstrDispL + "," + gstrModG + "," + gstrInVin + "," ;
		
		//2008.12.12 add start ry
		thFlg = 0;
		if(iCnt >= 8 && (iCnt % 8) == 0){
			thFlg = 1;
			strRet += "</tr><tr>\n";
		}
		//2008.12.12 add end ry
		
		if (gstrDataL == '') {
			strLinkText += arDispL[iCnt]['para'] + "\">";
			strRet += "<th width=\"100\">\n";
			strRet += "<table border=\"1\" cellpadding=\"0\" cellspacing=\"0\" width=\"100\" height=\"35\"><tr>\n";
			strRet += "<th width=\"100\" class=\"lang\">" + strLinkText + "<b>" + arDispL[iCnt]['para'] + "</b>" +  arDispL[iCnt]['disp'] + "</a></th>\n";
			strRet += "</tr>\n</table>\n";
			strRet += "</th>\n";
		}
		else {
			if (gstrDataL == arDispL[iCnt]['para']) {
				strRet += "<th width=\"100\">\n";
				strRet += "<table border=\"1\" cellpadding=\"0\" cellspacing=\"0\" width=\"100\" height=\"35\"><tr>\n";
				strRet += "<th width=\"100\" bgcolor=\"#ffc0cb\" class=\"lang\"><b>" + arDispL[iCnt]['para'] + "</b>" + arDispL[iCnt]['disp'] + "</b></th>\n";
				strRet += "</tr></table>\n";
				strRet += "</th>\n";

			}
			else  {
				strLinkText += arDispL[iCnt]['para'] + "\">\n";
				strRet += "<th width=\"100\">\n";
				strRet += "<table border=\"1\" cellpadding=\"0\" cellspacing=\"0\" width=\"100\" height=\"35\"><tr>\n";
				strRet += "<th width=\"100\" class=\"lang\">" + strLinkText + "<b>" + arDispL[iCnt]['para'] + "</b>" + arDispL[iCnt]['disp'] + "</b></a></th>\n";
				strRet += "</tr></table>\n";
				strRet += "</th>\n";
			}
		}
		//2008.12.12 add start ry
		if(thFlg == 1){
			if((iCnt - 1) == arDispL.length){
				strRet += "</tr>\n";
				thFlg = 0;
			}
		}

//alert(strLinkText);
	}
	strRet += "</tr>\n";
	strRet += "</table>\n";
	strRet += "</td>\n";
	strRet += "</tr>\n";
	strRet += "</table>\n";

//alert(strRet);


	return strRet;

}

/**************************************************************************
Function DoubleDataCheck
  Array for Display data "DoubleData" check -> P/No and M_ID(Manual ID)
 IN  : arDisp(Array object) : Array for Display
       cmpPNo(String) : Comparison P/No
       cmpMId(String) : Comparison M_ID(Manual ID)
       cmpLang(String): Comparison Language  *2008.7.9 Add
 OUT : iChkFG(int) : 0:No data in Array , 1: Data in Array
***************************************************************************/
//function DoubleDataCheck(arDisp,cmpPno,cmpMId,cmpLang) {
function DoubleDataCheck(arDisp,cmpPno,cmpMId,cmpLang,cmpMrm) {
	var iChkFG = 0 ;
	for (var i = 0 ; i < arDisp.length ; i++) {
		if (arDisp[i]['pno'] == cmpPno ) {
			if (arDisp[i]['fnm'] == cmpMId ) {
				//2008.7.9 if文追加
				if (arDisp[i]['lng'] == cmpLang ){
					if (arDisp[i]['rmk'] == cmpMrm ){
						iChkFG = 1;
						break;
					}
				}
			}
		}
	}
	return iChkFG;
	
}


/* Backup!!
function DoubleDataCheck(arDisp,cmpPno,cmpMId) {
	var iChkFG = 0 ;
//alert("cmpPno : " + cmpPno);
//alert("cmpMId : " + cmpMId);
	for (var i = 0 ; i < arDisp.length ; i++) {
		if (arDisp[i]['pno'] == cmpPno ) {
			if (arDisp[i]['fnm'] == cmpMId ) {
				iChkFG = 1;
				break;
			}
		}
	}
	return iChkFG;
	
}
*/

///
/*******************************************
Function DispManulArraySet
	Distination Select List display string set
 IN  : XMLTree(XML Tree object) : XML Read Data
       arNarrowDown(Array object) : Selected Narrow Data Array
 OUT : arDisp(Array object) : for Display Data Array
*********************************************/
function DispManulArraySet() {
	var iCnt = 0;			// Loop Counter (for XMLTree object access)
	var iarCnt = 0;			// Loop Counter (for Display Array access)
	var arDisp = new Array();		// Display data Array (return value)
	var rArCnt = 0;					// rowspan value set array counter
	var NarFg = '';					// Narrow value devide processing
	var MaxLength = parent.arMan_no.length;	// Read & Keep XML Data length
	var nm_rcnt = 0;
	var tp_rcnt = 0;
	var rm_rcnt = 0;
	var lg_rcnt = 0; //2008.7.9 Add
	var pno_rcnt = 0; //2008.7.9 Add
	var oldMnm = '';
	var oldRmk = '';
	var oldLng = '';
	var oldPno = ''; //2008.7.9 Add

	//Parameter Set Data
	var NaFg = String(gMFg) + String(gLFg);

	for (iCnt = 0 ; iCnt < MaxLength ; iCnt++) {
		switch(NaFg) {
			case '00':
				// First loop (counter =0)
				if (iCnt == 0) {
					// Display Array set value
					arDisp[iarCnt] = {
						'mnm' : parent.arMan_no[iCnt]['m_nm'],
						'nm_rspan' : 0,
						'rmk' : parent.arMan_no[iCnt]['m_rmk'],
						'rm_rspan' : 0,
						'lng' : parent.arMan_no[iCnt]['lang'],
						'lg_rspan' : 0, //2008.7.9 Add
						'pno' : parent.arMan_no[iCnt]['pno'],
						'pno_rspan' : 0, //2008.7.9 Add
						'fnm' : parent.arMan_no[iCnt]['f_nm'],
						'fnm2' : ''
					};

					if (parent.arMan_no[iCnt]['dfg'] == "PDF") {
						arDisp[iarCnt]['fnm2'] = '';
					}
					else {
						arDisp[iarCnt]['fnm2'] = "/index.html";
					}
					
					
					// Previous data set
					oldMnm = parent.arMan_no[iCnt]['m_nm'];
					oldRmk = parent.arMan_no[iCnt]['m_rmk'];
					oldLng = parent.arMan_no[iCnt]['lang'];
					oldPno = parent.arMan_no[iCnt]['pno']; //2008.7.9 Add
					
					nm_rcnt = iarCnt;
					rm_rcnt = iarCnt;
					lg_rcnt = iarCnt; //2008.7.9 Add
					pno_rcnt = iarCnt; //2008.7.9 Add
					// Display array counter Increment
					iarCnt++;
				}
			
				// Second loops after (counter > 0)
				else {
					// remove double data(P/No ,M_ID
//					if (DoubleDataCheck(arDisp,parent.arMan_no[iCnt]['pno'],parent.arMan_no[iCnt]['f_nm'],parent.arMan_no[iCnt]['lang']) == 0 ) {
					if (DoubleDataCheck(arDisp,parent.arMan_no[iCnt]['pno'],parent.arMan_no[iCnt]['f_nm'],parent.arMan_no[iCnt]['lang'],parent.arMan_no[iCnt]['m_rmk']) == 0 ) {
						arDisp[iarCnt] = {
							'mnm' : parent.arMan_no[iCnt]['m_nm'],
							'nm_rspan' : 0,
							'rmk' : parent.arMan_no[iCnt]['m_rmk'],
							'rm_rspan' : 0,
							'lng': parent.arMan_no[iCnt]['lang'],
							'lg_rspan' : 0, //2008.7.9 Add
							'pno' : parent.arMan_no[iCnt]['pno'],
							'pno_rspan' : 0, //2008.7.9 Add
							'fnm' : parent.arMan_no[iCnt]['f_nm'],
							'fnm2' : ''
						};
						if (parent.arMan_no[iCnt]['dfg'] == "PDF") {
							arDisp[iarCnt]['fnm2'] = '';
						}
						else {
							arDisp[iarCnt]['fnm2'] = "/index.html";
						}

						// Part Name
						if (oldMnm == parent.arMan_no[iCnt]['m_nm']) { 
							// rowspan value increment
							arDisp[nm_rcnt]['nm_rspan']++;
							arDisp[iarCnt]['nm_rspan'] = 0;
						}
						else {
							arDisp[iarCnt]['nm_rspan'] = 0;
							oldMnm = parent.arMan_no[iCnt]['m_nm'];
							nm_rcnt = iarCnt;
						}
						
						//Remark
						if (oldRmk == parent.arMan_no[iCnt]['m_rmk']) {
							arDisp[rm_rcnt]['rm_rspan']++;
							arDisp[iarCnt]['rm_rspan'] = 0;
						}
						else {
							arDisp[iarCnt]['rmk'] = parent.arMan_no[iCnt]['m_rmk'];
							arDisp[iarCnt]['rm_rspan'] = 0;
							oldRmk = parent.arMan_no[iCnt]['m_rmk'];
							rm_rcnt = iarCnt;
						}
						
						//Language 2008.7.9 Add start
						if (oldLng == parent.arMan_no[iCnt]['lang']) {
							arDisp[lg_rcnt]['lg_rspan']++;
							arDisp[iarCnt]['lg_rspan'] = 0;
						}
						else {
							arDisp[iarCnt]['lng'] = parent.arMan_no[iCnt]['lang'];
							arDisp[iarCnt]['lg_rspan'] = 0;
							oldLng = parent.arMan_no[iCnt]['lang'];
							lg_rcnt = iarCnt;
						}
						//2008.7.9 Add end
						//Parts Number 2008.7.9 Add start
						if (oldPno == parent.arMan_no[iCnt]['pno']) {
							arDisp[pno_rcnt]['pno_rspan']++;
							arDisp[iarCnt]['pno_rspan'] = 0;
						}
						else {
							arDisp[iarCnt]['pno'] = parent.arMan_no[iCnt]['pno'];
							arDisp[iarCnt]['pno_rspan'] = 0;
							oldPno = parent.arMan_no[iCnt]['pno'];
							pno_rcnt = iarCnt;
						}
						//2008.7.9 Add end
						iarCnt++;
					}
				}
				break;
			case '10':
				//Model Group Only
				if (parent.arMan_no[iCnt]['mogrp'] == gstrModG) {
					// First loop (counter =0)
					if (iCnt == 0) {
						// Display Array set value
						arDisp[iarCnt] = {
							'mnm' : parent.arMan_no[iCnt]['m_nm'],
							'nm_rspan' : 0,
							'rmk' : parent.arMan_no[iCnt]['m_rmk'],
							'rm_rspan' : 0,
							'lng' : parent.arMan_no[iCnt]['lang'],
							'pno' : parent.arMan_no[iCnt]['pno'],
							'pno_rspan' : 0, //2008.7.9 Add
							'fnm' : parent.arMan_no[iCnt]['f_nm'],
							'fnm2' : ''
						};

						if (parent.arMan_no[iCnt]['dfg'] == "PDF") {
							arDisp[iarCnt]['fnm2'] = '';
						}
						else {
							arDisp[iarCnt]['fnm2'] = "/index.html";
						}
						
						
						// Previous data set
						oldMnm = parent.arMan_no[iCnt]['m_nm'];
						oldTyp = parent.arMan_no[iCnt]['m_alt'];
						oldRmk = parent.arMan_no[iCnt]['m_rmk'];
						oldLng = parent.arMan_no[iCnt]['lang'];
						oldPno = parent.arMan_no[iCnt]['pno']; //2008.7.9 Add
						
						nm_rcnt = iarCnt;
						tp_rcnt = iarCnt;
						rm_rcnt = iarCnt;
						lg_rcnt = iarCnt; //2008.7.9 Add
						pno_rcnt = iarCnt; //2008.7.9 Add

						// Display array counter Increment
						iarCnt++;
					}
				
					// Second loops after (counter > 0)
					else {
						// remove double data(P/No ,M_ID
//						if (DoubleDataCheck(arDisp,parent.arMan_no[iCnt]['pno'],parent.arMan_no[iCnt]['f_nm'],parent.arMan_no[iCnt]['lang']) == 0 ) {
						if (DoubleDataCheck(arDisp,parent.arMan_no[iCnt]['pno'],parent.arMan_no[iCnt]['f_nm'],parent.arMan_no[iCnt]['lang'],parent.arMan_no[iCnt]['m_rmk']) == 0 ) {
							arDisp[iarCnt] = {
								'mnm' : parent.arMan_no[iCnt]['m_nm'],
								'nm_rspan' : 0,
								'rmk' : parent.arMan_no[iCnt]['m_rmk'],
								'rm_rspan' : 0,
								'lng': parent.arMan_no[iCnt]['lang'],
								'lg_rspan' : 0, //2008.7.9 Add
								'pno' : parent.arMan_no[iCnt]['pno'],
								'pno_rspan' : 0, //2008.7.9 Add
								'fnm' : parent.arMan_no[iCnt]['f_nm'],
								'fnm2' : ''
							};
							if (parent.arMan_no[iCnt]['dfg'] == "PDF") {
								arDisp[iarCnt]['fnm2'] = '';
							}
							else {
								arDisp[iarCnt]['fnm2'] = "/index.html";
							}

							// Part Name
							if (oldMnm == parent.arMan_no[iCnt]['m_nm']) { 
								// rowspan value increment
								arDisp[nm_rcnt]['nm_rspan']++;
								arDisp[iarCnt]['nm_rspan'] = 0;
							}
							else {
								arDisp[iarCnt]['nm_rspan'] = 0;
								oldMnm = parent.arMan_no[iCnt]['m_nm'];
								nm_rcnt = iarCnt;
							}
							
							//Remark
							if (oldRmk == parent.arMan_no[iCnt]['m_rmk']) {
								arDisp[rm_rcnt]['rm_rspan']++;
								arDisp[iarCnt]['rm_rspan'] = 0;
							}
							else {
								arDisp[iarCnt]['rmk'] = parent.arMan_no[iCnt]['m_rmk'];
								arDisp[iarCnt]['rm_rspan'] = 0;
								oldRmk = parent.arMan_no[iCnt]['m_rmk'];
								rm_rcnt = iarCnt;
							}

							//Language 2008.7.9 Add start
							if (oldLng == parent.arMan_no[iCnt]['lang']) {
								arDisp[lg_rcnt]['lg_rspan']++;
								arDisp[iarCnt]['lg_rspan'] = 0;
							}
							else {
								arDisp[iarCnt]['lng'] = parent.arMan_no[iCnt]['lang'];
								arDisp[iarCnt]['lg_rspan'] = 0;
								oldLng = parent.arMan_no[iCnt]['lang'];
								lg_rcnt = iarCnt;
							}
							//2008.7.9 Add end
							//Parts Number 2008.7.9 Add start
							if (oldPno == parent.arMan_no[iCnt]['pno']) {
								arDisp[pno_rcnt]['pno_rspan']++;
								arDisp[iarCnt]['pno_rspan'] = 0;
							}
							else {
								arDisp[iarCnt]['pno'] = parent.arMan_no[iCnt]['pno'];
								arDisp[iarCnt]['pno_rspan'] = 0;
								oldPno = parent.arMan_no[iCnt]['pno'];
								pno_rcnt = iarCnt;
							}
							//2008.7.9 Add end
							
							iarCnt++;
						}
					}
				}
				break;

			case '01':
				//Manual Language Only
				if (parent.arMan_no[iCnt]['lang'] == gstrDataL) {
					// First loop (counter =0)
					if (iCnt == 0) {
						// Display Array set value
						arDisp[iarCnt] = {
							'mnm' : parent.arMan_no[iCnt]['m_nm'],
							'nm_rspan' : 0,
							'rmk' : parent.arMan_no[iCnt]['m_rmk'],
							'rm_rspan' : 0,
							'lng' : parent.arMan_no[iCnt]['lang'],
							'pno' : parent.arMan_no[iCnt]['pno'],
							'pno_rspan' : 0, //2008.7.9 Add
							'fnm' : parent.arMan_no[iCnt]['f_nm'],
							'fnm2' : ''
						};

						if (parent.arMan_no[iCnt]['dfg'] == "PDF") {
							arDisp[iarCnt]['fnm2'] = '';
						}
						else {
							arDisp[iarCnt]['fnm2'] = "/index.html";
						}
						
						
						// Previous data set
						oldMnm = parent.arMan_no[iCnt]['m_nm'];
						oldTyp = parent.arMan_no[iCnt]['m_alt'];
						oldRmk = parent.arMan_no[iCnt]['m_rmk'];
						oldLng = parent.arMan_no[iCnt]['lang'];
						oldPno = parent.arMan_no[iCnt]['pno']; //2008.7.9 Add
						
						nm_rcnt = iarCnt;
						tp_rcnt = iarCnt;
						rm_rcnt = iarCnt;
						lg_rcnt = iarCnt; //2008.7.9 Add
						pno_rcnt = iarCnt; //2008.7.9 Add
						// Display array counter Increment
						iarCnt++;
					}
				
					// Second loops after (counter > 0)
					else {
						// remove double data(P/No ,M_ID
//						if (DoubleDataCheck(arDisp,parent.arMan_no[iCnt]['pno'],parent.arMan_no[iCnt]['f_nm'],parent.arMan_no[iCnt]['lang']) == 0 ) {
						if (DoubleDataCheck(arDisp,parent.arMan_no[iCnt]['pno'],parent.arMan_no[iCnt]['f_nm'],parent.arMan_no[iCnt]['lang'],parent.arMan_no[iCnt]['m_rmk']) == 0 ) {
							arDisp[iarCnt] = {
								'mnm' : parent.arMan_no[iCnt]['m_nm'],
								'nm_rspan' : 0,
								'rmk' : parent.arMan_no[iCnt]['m_rmk'],
								'rm_rspan' : 0,
								'lng': parent.arMan_no[iCnt]['lang'],
								'lg_rspan' : 0, //2008.7.9 Add
								'pno' : parent.arMan_no[iCnt]['pno'],
								'pno_rspan' : 0, //2008.7.9 Add
								'fnm' : parent.arMan_no[iCnt]['f_nm'],
								'fnm2' : ''
							};
							if (parent.arMan_no[iCnt]['dfg'] == "PDF") {
								arDisp[iarCnt]['fnm2'] = '';
							}
							else {
								arDisp[iarCnt]['fnm2'] = "/index.html";
							}

							// Part Name
							if (oldMnm == parent.arMan_no[iCnt]['m_nm']) { 
								// rowspan value increment
								arDisp[nm_rcnt]['nm_rspan']++;
								arDisp[iarCnt]['nm_rspan'] = 0;
							}
							else {
								arDisp[iarCnt]['nm_rspan'] = 0;
								oldMnm = parent.arMan_no[iCnt]['m_nm'];
								nm_rcnt = iarCnt;
							}
							
							//Remark
							if (oldRmk == parent.arMan_no[iCnt]['m_rmk']) {
								arDisp[rm_rcnt]['rm_rspan']++;
								arDisp[iarCnt]['rm_rspan'] = 0;
							}
							else {
								arDisp[iarCnt]['rmk'] = parent.arMan_no[iCnt]['m_rmk'];
								arDisp[iarCnt]['rm_rspan'] = 0;
								oldRmk = parent.arMan_no[iCnt]['m_rmk'];
								rm_rcnt = iarCnt;
							}
							//Language 2008.7.9 Add start
							if (oldLng == parent.arMan_no[iCnt]['lang']) {
								arDisp[lg_rcnt]['lg_rspan']++;
								arDisp[iarCnt]['lg_rspan'] = 0;
							}
							else {
								arDisp[iarCnt]['lng'] = parent.arMan_no[iCnt]['lang'];
								arDisp[iarCnt]['lg_rspan'] = 0;
								oldLng = parent.arMan_no[iCnt]['lang'];
								lg_rcnt = iarCnt;
							}
							//2008.7.9 Add end
							//Parts Number 2008.7.9 Add start
							if (oldPno == parent.arMan_no[iCnt]['pno']) {
								arDisp[pno_rcnt]['pno_rspan']++;
								arDisp[iarCnt]['pno_rspan'] = 0;
							}
							else {
								arDisp[iarCnt]['pno'] = parent.arMan_no[iCnt]['pno'];
								arDisp[iarCnt]['pno_rspan'] = 0;
								oldPno = parent.arMan_no[iCnt]['pno'];
								pno_rcnt = iarCnt;
							}
						//2008.7.9 Add end
							
							iarCnt++;
						}
					}
				}
				break;
				
			case '11':
				//Model Group and Manual Language
				if ((parent.arMan_no[iCnt]['mogrp'] == gstrModG ) && (parent.arMan_no[iCnt]['lang'] == gstrDataL)) {
					// First loop (counter =0)
					if (iCnt == 0) {
						// Display Array set value
						arDisp[iarCnt] = {
							'mnm' : parent.arMan_no[iCnt]['m_nm'],
							'nm_rspan' : 0,
							'rmk' : parent.arMan_no[iCnt]['m_rmk'],
							'rm_rspan' : 0,
							'lng' : parent.arMan_no[iCnt]['lang'],
							'pno' : parent.arMan_no[iCnt]['pno'],
							'pno_rspan' : 0, //2008.7.9 Add
							'fnm' : parent.arMan_no[iCnt]['f_nm'],
							'fnm2' : ''
						};

						if (parent.arMan_no[iCnt]['dfg'] == "PDF") {
							arDisp[iarCnt]['fnm2'] = '';
						}
						else {
							arDisp[iarCnt]['fnm2'] = "/index.html";
						}
						
						
						// Previous data set
						oldMnm = parent.arMan_no[iCnt]['m_nm'];
						oldTyp = parent.arMan_no[iCnt]['m_alt'];
						oldRmk = parent.arMan_no[iCnt]['m_rmk'];
						oldLng = parent.arMan_no[iCnt]['lang'];
						oldPno = parent.arMan_no[iCnt]['pno']; //2008.7.9 Add
						
						nm_rcnt = iarCnt;
						tp_rcnt = iarCnt;
						rm_rcnt = iarCnt;
						lg_rcnt = iarCnt; //2008.7.9 Add
						pno_rcnt = iarCnt; //2008.7.9 Add
						// Display array counter Increment
						iarCnt++;
					}
				
					// Second loops after (counter > 0)
					else {
						// remove double data(P/No ,M_ID
						
//						if (DoubleDataCheck(arDisp,parent.arMan_no[iCnt]['pno'],parent.arMan_no[iCnt]['f_nm']) == 0 ) {
//						if (DoubleDataCheck(arDisp,parent.arMan_no[iCnt]['pno'],parent.arMan_no[iCnt]['f_nm'],parent.arMan_no[iCnt]['lang']) == 0 ) {
						if (DoubleDataCheck(arDisp,parent.arMan_no[iCnt]['pno'],parent.arMan_no[iCnt]['f_nm'],parent.arMan_no[iCnt]['lang'],parent.arMan_no[iCnt]['m_rmk']) == 0 ) {
							arDisp[iarCnt] = {
								'mnm' : parent.arMan_no[iCnt]['m_nm'],
								'nm_rspan' : 0,
								'rmk' : parent.arMan_no[iCnt]['m_rmk'],
								'rm_rspan' : 0,
								'lng': parent.arMan_no[iCnt]['lang'],
								'lg_rspan' : 0, //2008.7.9 Add
								'pno' : parent.arMan_no[iCnt]['pno'],
								'pno_rspan' : 0, //2008.7.9 Add
								'fnm' : parent.arMan_no[iCnt]['f_nm'],
								'fnm2' : ''
							};
							if (parent.arMan_no[iCnt]['dfg'] == "PDF") {
								arDisp[iarCnt]['fnm2'] = '';
							}
							else {
								arDisp[iarCnt]['fnm2'] = "/index.html";
							}

							// Part Name
							if (oldMnm == parent.arMan_no[iCnt]['m_nm']) { 
								// rowspan value increment
								arDisp[nm_rcnt]['nm_rspan']++;
								arDisp[iarCnt]['nm_rspan'] = 0;
							}
							else {
								arDisp[iarCnt]['nm_rspan'] = 0;
								oldMnm = parent.arMan_no[iCnt]['m_nm'];
								nm_rcnt = iarCnt;
							}
							
							//Remark
							if (oldRmk == parent.arMan_no[iCnt]['m_rmk']) {
								arDisp[rm_rcnt]['rm_rspan']++;
								arDisp[iarCnt]['rm_rspan'] = 0;
							}
							else {
								arDisp[iarCnt]['rmk'] = parent.arMan_no[iCnt]['m_rmk'];
								arDisp[iarCnt]['rm_rspan'] = 0;
								oldRmk = parent.arMan_no[iCnt]['m_rmk'];
								rm_rcnt = iarCnt;
							}
							//Language 2008.7.9 Add start
							if (oldLng == parent.arMan_no[iCnt]['lang']) {
								arDisp[lg_rcnt]['lg_rspan']++;
								arDisp[iarCnt]['lg_rspan'] = 0;
							}
							else {
								arDisp[iarCnt]['lng'] = parent.arMan_no[iCnt]['lang'];
								arDisp[iarCnt]['lg_rspan'] = 0;
								oldLng = parent.arMan_no[iCnt]['lang'];
								lg_rcnt = iarCnt;
							}
							//2008.7.9 Add end
							
							iarCnt++;
						}
					}
				}
				break;
		}
	}

	return arDisp;
}

////


/*******************************************************************************
Function SetDisplayString
  IN  : arDisp(Array object)
  OUT : dispString(String)
********************************************************************************/
function SetDisplaystring(arDisp) {
	var iCnt = 0;
	var mn_row = 0;
	var tp_row = 0;
	var rm_row = 0;
	var pno_row = 0; //2008.7.9
	var strTR_S = "<tr>";
	var strTR_E = "</tr>";
	
	
	var strHTML = "";			//Manual List HTML String

	dispString = '';

	dispString += "<table border=\"1\" cellpadding=\"2\" cellspacing=\"0\" width=\"900\">";
	dispString += "<tr>";

	dispString += "<td width=\"320\" align=\"center\" bgcolor=\"#87ceeb\" class=\"base\"><b>" + arstrMpn[gstrDispL] + "</b></td>";
	dispString += "<td width=\"230\" align=\"center\" bgcolor=\"#87ceeb\" class=\"base\"><b>" + arstrAppModel[gstrDispL] + "</b></td>";
	dispString += "<td width=\"75\" align=\"center\" bgcolor=\"#87ceeb\" class=\"base\"><b>" + arstrLng[gstrDispL] + "</b></td>";
	dispString += "<td width=\"225\" align=\"center\" bgcolor=\"#87ceeb\" class=\"base\"><b>" + arstrPno[gstrDispL] + "</b></td>";

	dispString += "</tr>";

	for (iCnt = 0 ; iCnt < arDisp.length ; iCnt++) {
		if (arDisp[iCnt]['fnm2'] != '') {
			var manLink = "../xml/" + arDisp[iCnt]['fnm'] + arDisp[iCnt]['fnm2'];
		}
		else {
			var manLink = "../xml/" + arDisp[iCnt]['fnm'];
		}
		dispString += strTR_S;
		if (mn_row == 0) {
			dispString += "<td rowspan=\"" + parseInt(arDisp[iCnt]['nm_rspan'] + 1 ) + "\" class=\"mname\">" + arDisp[iCnt]['mnm'] + "</td>";
			mn_row = arDisp[iCnt]['nm_rspan'];
		}
		else {
			mn_row--;
		}
		if (arDisp[iCnt]['rmk'] == '-') {
			dispString += "<td>&nbsp;</td>";
		}
		else {
			dispString += "<td class=\"mname\">" + arDisp[iCnt]['rmk'] + "</td>";
		}
		dispString += "<td align=\"center\" class=\"base\">" + arDisp[iCnt]['lng'] + "</td>";


		//2008.7.9 Add start PartsNumberのセル結合
		if (pno_row == 0) {
			dispString += "<td align=\"center\" class=\"base\" rowspan=\"" + parseInt(arDisp[iCnt]['pno_rspan'] + 1 ) + "\"><a href=\"JavaScript:ManualDisp('" + manLink + "');\">" + arDisp[iCnt]['pno'] + "</a></td>";
			pno_row = arDisp[iCnt]['pno_rspan'];
		}
		else {
			pno_row--;
		}
		//2008.7.9 Add end
		
		dispString += strTR_E;
	}
	
	dispString += "</table>";		// Table footer set
	return dispString


}

