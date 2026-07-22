/***********************************************************************/
/*  ModSelect.js  : Model Select Page List Show from XML File          */
/***********************************************************************/
var gstrArg = document.location.search.substring(1);
var gstrDispL = '';
var gstrinVIN  = '';

/*******************************************
Function onLoadWin()
  IE7 or other browser(IE6 or FireFox) Distinction
    IE7 -> InitDispIE7()
    other(IE6 or FireFox) -> InitDisp
********************************************/
function onLoadWin() {
	
	InitDisp();

}


/*******************************************
Function InitDisp
	document body onLoad function
		XML Read(Parse) & Data display
*********************************************/
function InitDisp() {
//alert("InitDisp");
	var strDispL = "";			//Selected Display Language (From TopPage)
	var strMoG = "";			//Selected Manual Group
	var strMaG = "";			//Selected Model Group
	var MoFg = 0;				//Model Group Select Flag(1:On , 0:Off)
	var MaFg = 0;				//Manual Group Select Flag(1:On , 0:Off)
	var arArg = new Array();
	//Table Row Start String
	var strTR_start = "<tr>";
	
	//Table Row End String
	var strTR_end = "</tr>";
	
	var strTitle = '';


//<a href="./Toppage.html"><font size="2"><b>BACK</b></font></a>
	

	//-------
	//Get Argment & Parameter Parse
	//-------

/****
Argment (Parameter)

  ModelSelect.html?(DispLanguage),(ModelG),(input VIN)
   Ex)
    ModelSelect.html?EN,A
    ModelSelect.html?EN,A,JSAJTD54V70250000
    
****/

	// Argment is One word (Display Language Only)
	if ((gstrArg.length == 0 ) || (gstrArg == '')) {
		gstrDispL = "EN";
		strDispL = gstrDispL;
		// No Paramater is All Data Display
		arNarrowDown['LaFg'] = 0;						// Distination Language Flag is Off(0)
		arNarrowDown['strDataL']= '';					// Distination Language String is nothing ("")
		arNarrowDown['MaFg'] = 0;						// Manual Group Flag is Off(0)
		arNarrowDown['strMaG'] = '';					// Manual Group String is nothing("")
		arNarrowDown['MoFg'] = 0;						// Model Group Flag is Off(0)
		arNarrowDown['strMoG'] = '';					// Model Group String is nothing("")
		strDataL = "";									// Distination Language String(local variable) is nothing
		strInVin = "";
		LaFg = 0;										// Distination Language Flag(local variable) is Off
		strTitle = arstrMS_U[strDispL];
		
	}
	else {
		if (gstrArg.indexOf(",") == -1) {
			gstrDispL = gstrArg;
			strDispL = gstrDispL;
			arNarrowDown['LaFg'] = 0;						// Distination Language Flag is Off(0)
			arNarrowDown['strDataL']= '';					// Distination Language String is nothing ("")
			arNarrowDown['MaFg'] = 0;						// Manual Group Flag is Off(0)
			arNarrowDown['strMaG'] = '';					// Manual Group String is nothing("")
			arNarrowDown['MoFg'] = 0;						// Model Group Flag is Off(0)
			arNarrowDown['strMoG'] = '';					// Model Group String is nothing("")
			strDataL = "";									// Distination Language String(local variable) is nothing
			strInVin = "";
			gstrinVIN = strInVin;
			LaFg = 0;										// Distination Language Flag(local variable) is Off
			strTitle = arstrMS_U[strDispL];
		}
		else {
			arArg = gstrArg.split(",");
			switch(arArg.length) {
				case 2:
					//Display Language & ModelG
					gstrDispL = arArg[0];
					strDispL = gstrDispL;
					arNarrowDown['LaFg'] = 0;						// Distination Language Flag is Off(0)
					arNarrowDown['strDataL']= '';					// Distination Language String is nothing ("")
					arNarrowDown['MaFg'] = 0;						// Manual Group Flag is Off(0)
					arNarrowDown['strMaG'] = ''					// Manual Group String is nothing("")
					arNarrowDown['MoFg'] = 1;						// Model Group Flag is Off(0)
					arNarrowDown['strMoG'] = arArg[1];;					// Model Group String is nothing("")
					strDataL = "";									// Distination Language String(local variable) is nothing
					strInVin = "";
					gstrinVIN = strInVin;
					LaFg = 0;										// Distination Language Flag(local variable) is Off
					strTitle = "";
					break;
				case 3:
					//Display Language & ModelG & VIN
					gstrDispL = arArg[0];
					strDispL = gstrDispL;
					arNarrowDown['LaFg'] = 0;						// Distination Language Flag is Off(0)
					arNarrowDown['strDataL']= '';					// Distination Language String is nothing ("")
					arNarrowDown['MaFg'] = 0;						// Manual Group Flag is Off(0)
					arNarrowDown['strMaG'] = ''					// Manual Group String is nothing("")
					arNarrowDown['MoFg'] = 1;						// Model Group Flag is Off(0)
					arNarrowDown['strMoG'] = arArg[1];;					// Model Group String is nothing("")
					strDataL = "";									// Distination Language String(local variable) is nothing
					LaFg = 0;										// Distination Language Flag(local variable) is Off
					strInVin = arArg[2];
					gstrinVIN = strInVin;
					strTitle = "VIN = " + strInVin;
					break;
					
			}
		}
	}


	// ManualList(ManList.xml) Read
//	var XMLTreeML = XMLTreeObj.parseHTTP(XMLDir + MLXMLFname);

	
	// Manual List XML -> Manual Group : Manual Group Part Name ArraySet
//	var arrManG = ManGPNmSet(XMLTreeML);

	// Model Select (ModSel.xml) Read
//	var XMLTreeMS = XMLTreeObj.parseHTTP(XMLDir + XMLFname);
	
	// for Display Array set


	var arDispList = DispManualArraySet(arNarrowDown);

	strHTML = SetDisplaystring(arDispList);

/**/
	var GTopStr = SetGotoTop(strDispL);
	ShowValue(GTopStr,'bBk');
	ShowValue(arstrGTop[strDispL],'bPTop');
	ShowValue(strTitle,'cMS');

	ShowValue(strHTML,'ModList');
	var VListStr = SetVinList(strDispL,1);
	ShowValue(VListStr,'bVList');
/**/
	

// function End
	
}


/**************************************************************
	Distination Select List display string set
 IN  : XMLTree(XML Tree object) : XML Read Data
       arNar(Array object) : Selected Narrow Data Array
       arrManG(Array object) : Manual Group/Manual Group Name value Array
 OUT : arDisp(Array object) : for Display Data Array
****************************************************************/
function DispManualArraySet(arNar) {
	var iCnt = 0;			// Loop Counter (for XMLTree object access)
	var iarCnt = 0;			// Loop Counter (for Display Array access)
	var arDisp = new Array();		// Display data Array (return value)
	var rArCnt = 0;					// rowspan value set array counter
	var NarFg = '';					// Narrow value devide processing
	var MaxLength = parent.arMod_no.length;	// XML Tree object length
	

	var oldMoNm = '';		//Model Name for keep
	var oldMoCd = '';		//Model Code for keep
	var oldMoEg = '';		//Engine for keep
	var oldMoTp = '';		//Type for keep
	var oldMoYm = '';		//Year.Month for keep
	var oldMoRmk = '';		//Remarks for keep
	var oldMoGp = '';		//Model Group(MODG) for keep
	var moNmCnt = 0;		//Model Name Data Counter(for rowspan)
	var moCdCnt = 0;		//Model Code Data Counter(for rowspan)
	var moEnCnt = 0;		//Engine Data Counter(for rowspan)
	var moTpCnt = 0;		//Type Data Counter (for rowspan)
	var moYmCnt = 0;		//Year.Month Data Counter (for rowspan)
	var moRmCnt = 0;		//Remarks Data Counter (for rowspan)
	var moMgCnt = 0;		//Model Group(MODG) Data Counter(for rowspan)

	var arMoG = new Array();

	// Narrow value devide Set
	NarFg = String(arNar['MaFg']) + String(arNar['MoFg']);
//alert(NarFg);	
	// Loop XML length
	for (iCnt = 0 ; iCnt < MaxLength ; iCnt++) {
//alert(iarCnt);
		switch (NarFg) {
			// Narrow value is nothing
			case '00':
				if (iarCnt == 0) {
					arDisp[iarCnt] = {
						'modg' : parent.arMod_no[iCnt]['mogrp'] , 
						'mod_cnt' : 0,
						'monm' : parent.arMod_no[iCnt]['monam'] ,
						'nam_cnt' : 0,
						'modc' : parent.arMod_no[iCnt]['mocod'] , 
						'mcd_cnt' : 0,
						'eng' : parent.arMod_no[iCnt]['eng'] ,
						'eng_cnt' : 0,
						'typ' : parent.arMod_no[iCnt]['tpm'] ,
						'typ_cnt' : 0,
						'ym' : parent.arMod_no[iCnt]['dt'],
						'ym_cnt' : 0,
						'rmk': parent.arMod_no[iCnt]['mormk'],
						'rm_cnt' : 0
					};
					oldMoGp = parent.arMod_no[iCnt]['mogrp'];		//Model Group(MODG) for keep
					oldMoNm = parent.arMod_no[iCnt]['monam'];		//Model Name for keep
					oldMoCd = parent.arMod_no[iCnt]['mocod'];		//Model Code for keep
					oldMoEg = parent.arMod_no[iCnt]['eng'];		//Engine for keep
					oldMoTp = parent.arMod_no[iCnt]['tpm'];		//Type for keep
					oldMoYm = parent.arMod_no[iCnt]['dt'];		//Year.Month for keep
					oldMoRmk = parent.arMod_no[iCnt]['mormk'];		//Remarks for keep
					moNmCnt = iarCnt;		//Model Name Data Counter(for rowspan)
					moCdCnt = iarCnt;		//Model Code Data Counter(for rowspan)
					moEnCnt = iarCnt;		//Engine Data Counter(for rowspan)
					moTpCnt = iarCnt;		//Type Data Counter (for rowspan)
					moYmCnt = iarCnt;		//Year.Month Data Counter (for rowspan)
					moRmCnt = iarCnt;		//Remarks Data Counter (for rowspan)
					moMgCnt = iarCnt;		//Model Group(MODG) Data Counter(for rowspan)
					iarCnt++;
				}
				else {
					if ((parent.arMod_no[iCnt]['mogrp'] != oldMoGp ) || (parent.arMod_no[iCnt]['monam'] != oldMoNm ) ||
						(parent.arMod_no[iCnt]['mocod'] != oldMoCd ) || (parent.arMod_no[iCnt]['eng'] != oldMoEg ) ||
						(parent.arMod_no[iCnt]['tpm'] != oldMoTp ) || (parent.arMod_no[iCnt]['dt'] != oldMoYm ) ||
						(parent.arMod_no[iCnt]['mormk'] != oldMoRmk ) )
						{
						arDisp[iarCnt] = {
							'modg' : parent.arMod_no[iCnt]['mogrp'] , 'mod_cnt' : 0,
							'monm' : parent.arMod_no[iCnt]['monam'] ,'nam_cnt' : 0,
							'modc' : parent.arMod_no[iCnt]['mocod'] , 'mcd_cnt' : 0,
							'eng' : '' , 'eng_cnt' : 0,
							'typ' : '' , 'typ_cnt' : 0,
							'ym' : '' , 'ym_cnt' : 0,
							'rmk': '' , 'rm_cnt' : 0
						};
					
						//Model Name
						if (oldMoNm == parent.arMod_no[iCnt]['monam']) {
							arDisp[moNmCnt]['nam_cnt']++;
							arDisp[iarCnt]['monm'] = '';
							arDisp[iarCnt]['nam_cnt'] = 0;
						}
						else {
						
							arDisp[iarCnt]['monm'] = parent.arMod_no[iCnt]['monam'];
							arDisp[iarCnt]['nam_cnt'] = 0;
							oldMoNm = parent.arMod_no[iCnt]['monam'];
							moNmCnt = iarCnt;
						}

						//Model Code
						if (oldMoCd == parent.arMod_no[iCnt]['mocod']) {
							arDisp[moCdCnt]['mcd_cnt']++;
							arDisp[iarCnt]['modc'] = '';
							arDisp[iarCnt]['mcd_cnt'] = 0;
						}
						else {
						
							arDisp[iarCnt]['modc'] = parent.arMod_no[iCnt]['mocod'];
							arDisp[iarCnt]['mcd_cnt'] = 0;
							oldMoCd = parent.arMod_no[iCnt]['mocod'];
							moCdCnt = iarCnt;
						}

						//Engine
						if (oldMoEg == parent.arMod_no[iCnt]['eng']) {
							arDisp[moEnCnt]['eng_cnt']++;
							arDisp[iarCnt]['eng'] = '';
							arDisp[iarCnt]['eng_cnt'] = 0;
						}
						else {
						
							arDisp[iarCnt]['eng'] = parent.arMod_no[iCnt]['eng'];
							arDisp[iarCnt]['eng_cnt'] = 0;
							oldMoEg = parent.arMod_no[iCnt]['eng'];
							moEnCnt = iarCnt;
						}

						//Type
						if (oldMoTp == parent.arMod_no[iCnt]['tpm']) {
							arDisp[moTpCnt]['typ_cnt']++;
							arDisp[iarCnt]['typ'] = '';
							arDisp[iarCnt]['typ_cnt'] = 0;
						}
						else {
						
							arDisp[iarCnt]['typ'] = parent.arMod_no[iCnt]['tpm'];
							arDisp[iarCnt]['typ_cnt'] = 0;
							oldMoTp = parent.arMod_no[iCnt]['tpm'];
							moTpCnt = iarCnt;
						}
						
						//Year.Month
	//					if ((oldMoYm == parent.arMod_no[iCnt]['dt']) && (oldMoGp == parent.arMod_no[iCnt]['mogrp'])) {
						if ((oldMoYm == parent.arMod_no[iCnt]['dt'])) {
							arDisp[moYmCnt]['ym_cnt']++;
							arDisp[iarCnt]['ym'] = '';
							arDisp[iarCnt]['ym_cnt'] = 0;
						}
						else {
							arDisp[iarCnt]['ym'] = parent.arMod_no[iCnt]['dt'];
							arDisp[iarCnt]['ym_cnt'] = 0;
							oldMoYm = parent.arMod_no[iCnt]['dt'];
							moYmCnt = iarCnt;
						}
						

						// Remarks
						if ((oldMoRmk == parent.arMod_no[iCnt]['mormk']) && (oldMoGp == parent.arMod_no[iCnt]['mogrp']))  {
							arDisp[moRmCnt]['rm_cnt']++;
							arDisp[iarCnt]['rmk'] = '';
							arDisp[iarCnt]['rm_cnt'] = 0;
						}
						else {
						
							arDisp[iarCnt]['rmk'] = parent.arMod_no[iCnt]['mormk'];
							arDisp[iarCnt]['rm_cnt'] = 0;
							oldMoRmk = parent.arMod_no[iCnt]['mormk'];
							moRmCnt = iarCnt;
						}

						// Model Group(MODG)
						if (oldMoGp == parent.arMod_no[iCnt]['mogrp']) {
							arDisp[moMgCnt]['mod_cnt']++;
							arDisp[iarCnt]['modg'] = '';
							arDisp[iarCnt]['mod_cnt'] = 0;
						}
						else {
							arDisp[iarCnt]['modg'] = parent.arMod_no[iCnt]['mogrp'];
							arDisp[iarCnt]['mod_cnt'] = 0;
							oldMoGp = parent.arMod_no[iCnt]['mogrp'];
							moMgCnt = iarCnt;
						}
						
						iarCnt++;
					}
				}
				break;

			// Model Group
			case '01':
				arMoG = arNarrowDown['strMoG'].split("|");
				
//				if (arNarrowDown['strMoG'] == parent.arMod_no[iCnt]['mogrp']) {
				if (arNarrowDown['strMoG'].indexOf(parent.arMod_no[iCnt]['mogrp']) != -1)  {
					if (iarCnt == 0) {
						arDisp[iarCnt] = {
							'modg' : parent.arMod_no[iCnt]['mogrp'] , 
							'mod_cnt' : 0,
							'monm' : parent.arMod_no[iCnt]['monam'] ,
							'nam_cnt' : 0,
							'modc' : parent.arMod_no[iCnt]['mocod'] , 
							'mcd_cnt' : 0,
							'eng' : parent.arMod_no[iCnt]['eng'] ,
							'eng_cnt' : 0,
							'typ' : parent.arMod_no[iCnt]['tpm'] ,
							'typ_cnt' : 0,
							'ym' : parent.arMod_no[iCnt]['dt'],
							'ym_cnt' : 0,
							'rmk': parent.arMod_no[iCnt]['mormk'],
							'rm_cnt' : 0
						};
						oldMoGp = parent.arMod_no[iCnt]['mogrp'];		//Model Group(MODG) for keep
						oldMoNm = parent.arMod_no[iCnt]['monam'];		//Model Name for keep
						oldMoCd = parent.arMod_no[iCnt]['mocod'];		//Model Code for keep
						oldMoEg = parent.arMod_no[iCnt]['eng'];		//Engine for keep
						oldMoTp = parent.arMod_no[iCnt]['tpm'];		//Type for keep
						oldMoYm = parent.arMod_no[iCnt]['dt'];		//Year.Month for keep
						oldMoRmk = parent.arMod_no[iCnt]['mormk'];		//Remarks for keep
						moNmCnt = iarCnt;		//Model Name Data Counter(for rowspan)
						moCdCnt = iarCnt;		//Model Code Data Counter(for rowspan)
						moEnCnt = iarCnt;		//Engine Data Counter(for rowspan)
						moTpCnt = iarCnt;		//Type Data Counter (for rowspan)
						moYmCnt = iarCnt;		//Year.Month Data Counter (for rowspan)
						moRmCnt = iarCnt;		//Remarks Data Counter (for rowspan)
						moMgCnt = iarCnt;		//Model Group(MODG) Data Counter(for rowspan)
						iarCnt++;
					}
					else {
						if ((parent.arMod_no[iCnt]['mogrp'] != oldMoGp ) || (parent.arMod_no[iCnt]['monam'] != oldMoNm ) ||
							(parent.arMod_no[iCnt]['mocod'] != oldMoCd ) || (parent.arMod_no[iCnt]['eng'] != oldMoEg ) ||
							(parent.arMod_no[iCnt]['tpm'] != oldMoTp ) || (parent.arMod_no[iCnt]['dt'] != oldMoYm ) ||
							(parent.arMod_no[iCnt]['mormk'] != oldMoRmk ) )
							{

							arDisp[iarCnt] = {
								'modg' : parent.arMod_no[iCnt]['mogrp'] , 'mod_cnt' : 0,
								'monm' : parent.arMod_no[iCnt]['monam'] ,'nam_cnt' : 0,
								'modc' : parent.arMod_no[iCnt]['mocod'] , 'mcd_cnt' : 0,
								'eng' : '' , 'eng_cnt' : 0,
								'typ' : '' , 'typ_cnt' : 0,
								'ym' : '' , 'ym_cnt' : 0,
								'rmk': '' , 'rm_cnt' : 0
							};
						
							//Model Name
							if (oldMoNm == parent.arMod_no[iCnt]['monam']) {
								arDisp[moNmCnt]['nam_cnt']++;
								arDisp[iarCnt]['monm'] = '';
								arDisp[iarCnt]['nam_cnt'] = 0;
							}
							else {
							
								arDisp[iarCnt]['monm'] = parent.arMod_no[iCnt]['monam'];
								arDisp[iarCnt]['nam_cnt'] = 0;
								oldMoNm = parent.arMod_no[iCnt]['monam'];
								moNmCnt = iarCnt;
							}

							//Model Code
							if (oldMoCd == parent.arMod_no[iCnt]['mocod']) {
								arDisp[moCdCnt]['mcd_cnt']++;
								arDisp[iarCnt]['modc'] = '';
								arDisp[iarCnt]['mcd_cnt'] = 0;
							}
							else {
							
								arDisp[iarCnt]['modc'] = parent.arMod_no[iCnt]['mocod'];
								arDisp[iarCnt]['mcd_cnt'] = 0;
								oldMoCd = parent.arMod_no['mocod'];
								moCdCnt = iarCnt;
							}

							//Engine
							if (oldMoEg == parent.arMod_no[iCnt]['eng']) {
								arDisp[moEnCnt]['eng_cnt']++;
								arDisp[iarCnt]['eng'] = '';
								arDisp[iarCnt]['eng_cnt'] = 0;
							}
							else {
							
								arDisp[iarCnt]['eng'] = parent.arMod_no[iCnt]['eng'];
								arDisp[iarCnt]['eng_cnt'] = 0;
								oldMoEg = parent.arMod_no[iCnt]['eng'];
								moEnCnt = iarCnt;
							}

							//Type
							if (oldMoTp == parent.arMod_no[iCnt]['tpm']) {
								arDisp[moTpCnt]['typ_cnt']++;
								arDisp[iarCnt]['typ'] = '';
								arDisp[iarCnt]['typ_cnt'] = 0;
							}
							else {
							
								arDisp[iarCnt]['typ'] = parent.arMod_no[iCnt]['tpm'];
								arDisp[iarCnt]['typ_cnt'] = 0;
								oldMoTp = parent.arMod_no[iCnt]['tpm'];
								moTpCnt = iarCnt;
							}
							
							//Year.Month
							if ((oldMoYm == parent.arMod_no[iCnt]['dt']) && (oldMoGp == parent.arMod_no[iCnt]['mogrp'])) {
	//						if ((oldMoYm == parent.arMod_no[iCnt]['dt'])) {
								arDisp[moYmCnt]['ym_cnt']++;
								arDisp[iarCnt]['ym'] = '';
								arDisp[iarCnt]['ym_cnt'] = 0;
							}
							else {
								arDisp[iarCnt]['ym'] = parent.arMod_no[iCnt]['dt'];
								arDisp[iarCnt]['ym_cnt'] = 0;
								oldMoYm = parent.arMod_no[iCnt]['dt'];
								moYmCnt = iarCnt;
							}
							

							// Remarks
							if ((oldMoRmk == parent.arMod_no[iCnt]['mormk']) && (oldMoGp == parent.arMod_no[iCnt]['mogrp']))  {
								arDisp[moRmCnt]['rm_cnt']++;
								arDisp[iarCnt]['rmk'] = '';
								arDisp[iarCnt]['rm_cnt'] = 0;
							}
							else {
							
								arDisp[iarCnt]['rmk'] = parent.arMod_no[iCnt]['mormk'];
								arDisp[iarCnt]['rm_cnt'] = 0;
								oldMoRmk = parent.arMod_no[iCnt]['mormk'];
								moRmCnt = iarCnt;
							}

							// Model Group(MODG)
							if (oldMoGp == parent.arMod_no[iCnt]['mogrp']) {
								arDisp[moMgCnt]['mod_cnt']++;
								arDisp[iarCnt]['modg'] = '';
								arDisp[iarCnt]['mod_cnt'] = 0;
							}
							else {
								arDisp[iarCnt]['modg'] = parent.arMod_no[iCnt]['mogrp'];
								arDisp[iarCnt]['mod_cnt'] = 0;
								oldMoGp = parent.arMod_no[iCnt]['mogrp'];
								moMgCnt = iarCnt;
							}
							
							iarCnt++;
						}
					}
				}
				break;
		}
	}
	
	// return value set array
	return arDisp;

// function End
}



/***********************************************************************
Function GetManuGName
  Manual Group Name Array value get from ManualGroup Array
 IN  : Mag(String) : Manual Group
       arrManG(Array object) : Manual Group / Manual Group Name array
 OUT : strMNm(String) : Manual Group Name
***********************************************************************/
function GetManuGName(Mag ,arrManG) {
	var i = 0;
	var strMNm = "";
	//Loop ManualGroup Array length
	for (i = 0 ; i < arrManG.length ; i++) {
		if (arrManG[i]['ManG'] == Mag) {
			strMNm = arrManG[i]['MPn'];
			break;
		}
	}
	// return Manual Group Name
	return strMNm;

// function End
}



/**********************************************************************
Function DoubleDataCheck
  Array for Display data "DoubleData" check
 IN  : arDisp(Array object) : Array for Display 
       cmpVal(String) : Comparison value
       act(int) : Comparison fieled Flag (1:Model Category Code , 2:Manual Group)
 OUT : iChkFG(int) : 0:No data in Array , 1:Data in Array
***********************************************************************/
function DoubleDataCheck(arDisp,cmpVal,act) {
	var iCnt = 0;
	var iMaxLength = arDisp.length;
	var iChkFG = 0; // 0:No Data in Array , 1:Data in Array

	// Model Category Code
	if (act == 1) {
		
		for (iCnt = 0 ; iCnt < iMaxLength ; iCnt++) {
			if (arDisp[iCnt]['mcCd'] ==  cmpVal) {
				iChkFG = 1;
				break;
			}
		}
	}
	// Manual Group
	else {
		for (iCnt = 0 ; iCnt < iMaxLength ; iCnt++) {
			if (arDisp[iCnt]['maGrp'] ==  cmpVal) {
				iChkFG = 1;
				break;
			}
		}
	}
	// return Data in Array Flag
	return iChkFG;
	
// function End
}

/*******************************************************************************
Function DoubleDataCheck_Moma
  Array for Display data "DoubleData" check -> Model Group and Manual Group
 IN  : arDisp(Array object) : Array for Display
       cmpMod(String) : Comparison Model Group value
       cmpMan(String) : Comparison Manual Group value
 OUT : iChkFG(int) : 0:No data in Array , 1: Data in Array
********************************************************************************/
function DoubleDataCheck_Moma(arDisp,cmpMod,cmpMan) {
	var iCnt = 0;
	var iMaxLength = arDisp.length;
	var iChkFG = 0; // 0:No Data in Array, 1:Data in Array

	// Loop Display Array length
	for (iCnt = 0 ; iCnt < iMaxLength ; iCnt++) {
		if (arDisp[iCnt]['moGrp'] ==  cmpMod) {
			if (arDisp[iCnt]['maGrp'] == cmpMan) {
				iChkFG = 1;
				break;
			}
		}
	}
	// return Data in Array Flag
	return iChkFG;

// function End
}



/*******************************************************************************
Function SetDisplayString
  IN  : arDisp(Array object)
  OUT : dispString(String)
********************************************************************************/
function SetDisplaystring(arDisp) {
	var iCnt = 0;
	var nm_row = 0;
	var mc_row = 0;
	var en_row = 0;
	var tp_row = 0;
	var ym_row = 0;
	var rm_row = 0;
	var mg_row = 0;
	var strTR_S = "<tr>";
	var strTR_E = "</tr>";
	
	
	var strHTML = "";			//Manual List HTML String

	dispString = '';
	

	dispString += "<table border=\"1\" cellpadding=\"2\" cellspacing=\"0\" width=\"800\">";
	dispString += "<tr>";
	dispString += "<td width=\"150\" bgcolor=\"#87ceeb\" align=\"center\" class=\"base\"><b>" + arstrNm[gstrDispL] + "</b></td>";
	dispString += "<td width=\"70\" bgcolor=\"#87ceeb\" align=\"center\" class=\"base\"><b>" + arstrCd[gstrDispL] + "</b></td>";
	dispString += "<td width=\"80\" bgcolor=\"#87ceeb\" align=\"center\" class=\"base\"><b>" + arstrEng[gstrDispL] + "</b></td>";
	dispString += "<td width=\"50\" bgcolor=\"#87ceeb\" align=\"center\" class=\"base\"><b>" + arstrType[gstrDispL] + "</b></td>";
	dispString += "<td width=\"160\" bgcolor=\"#87ceeb\" align=\"center\" class=\"base\"><b>" + arstrSoP[gstrDispL] + "<br>" + arstrYM[gstrDispL] + "</b></td>";
	dispString += "<td width=\"200\" bgcolor=\"#87ceeb\" align=\"center\" class=\"base\"><b>" + arstrRmk[gstrDispL] + "</b></td>";
	dispString += "<td width=\"80\" bgcolor=\"#87ceeb\" align=\"center\" class=\"base\"><b>" + arstrAmg[gstrDispL] + "</b></td>";

	dispString += "</tr>";

//alert(arDisp.length);
	for (iCnt = 0 ; iCnt < arDisp.length ; iCnt++) {

		dispString += "<tr>";
		if (iCnt == 0) {
			dispString += "<td rowspan=\"" + parseInt(arDisp[iCnt]['nam_cnt'] + 1) + "\" class=\"base\">" + arDisp[iCnt]['monm'] + "</td>";
			nm_row = parseInt(arDisp[iCnt]['nam_cnt']);

			dispString += "<td rowspan=\"" + parseInt(arDisp[iCnt]['mcd_cnt'] + 1) + "\" class=\"base\">" + arDisp[iCnt]['modc'] + "</td>";
			mc_row = parseInt(arDisp[iCnt]['mcd_cnt']);
			
			dispString += "<td align=\"center\" rowspan=\"" + parseInt(arDisp[iCnt]['eng_cnt'] + 1) + "\" class=\"base\">" + arDisp[iCnt]['eng'] + "</td>";
			en_row = parseInt(arDisp[iCnt]['eng_cnt']);

			dispString += "<td align=\"center\" rowspan=\"" + parseInt(arDisp[iCnt]['typ_cnt'] + 1) + "\" class=\"base\">" + arDisp[iCnt]['typ'] + "</td>";
			tp_row = parseInt(arDisp[iCnt]['typ_cnt']);
			
			dispString += "<td align=\"center\" rowspan=\"" + parseInt(arDisp[iCnt]['ym_cnt'] + 1) + "\" class=\"base\">" + arDisp[iCnt]['ym'] + "</td>";
			ym_row = parseInt(arDisp[iCnt]['ym_cnt']);
			
			if (arDisp[iCnt]['rmk'] == '-') {
				dispString += "<td class=\"base\">" + "&nbsp;" + "</td>";
			}
			else {
				dispString += "<td class=\"base\">" + arDisp[iCnt]['rmk'] + "</td>";
			}
			rm_row = parseInt(arDisp[iCnt]['rm_cnt']);
			
			if ((gstrinVIN == '') || (gstrinVIN.length == 0)) {
				// Not VIN Search Resault
				dispString += "<td align=\"center\" rowspan=\"1\" class=\"base\"><a href=\"./ManualList.html?" + gstrDispL + "," + arDisp[iCnt]['modg'] + "\"><img src=\"./image/intxreftitleoff.png\" border=\"0\"></a></td>"
			}
			else {
				// VIN Search Resault
				dispString += "<td align=\"center\" rowspan=\"1\" class=\"base\"><a href=\"./ManualList.html?" + gstrDispL + "," + arDisp[iCnt]['modg'] + "," + gstrinVIN + "\"><img src=\"./image/intxreftitleoff.png\" border=\"0\"></a></td>"
			}
			mg_row = parseInt(arDisp[iCnt]['mod_cnt']);
			
			
		}
		else {
			if (nm_row == 0) {
				dispString += "<td rowspan=\"" + parseInt(arDisp[iCnt]['nam_cnt'] + 1) + "\" class=\"base\">" + arDisp[iCnt]['monm'] + "</td>";
				rm_row = parseInt(arDisp[iCnt]['nam_cnt']);
			}
			else {
				nm_row--;
			}

			if (mc_row == 0) {
				dispString += "<td rowspan=\"" + parseInt(arDisp[iCnt]['mcd_cnt'] + 1) + "\" class=\"base\">" + arDisp[iCnt]['modc'] + "</td>";
				mc_row = parseInt(arDisp[iCnt]['mcd_cnt']);
			}
			else {
				mc_row--;
			}

			if (en_row == 0) {
				dispString += "<td align=\"center\" rowspan=\"" + parseInt(arDisp[iCnt]['eng_cnt'] + 1) + "\" class=\"base\">" + arDisp[iCnt]['eng'] + "</td>";
				en_row = parseInt(arDisp[iCnt]['eng_cnt']);
			}
			else {
				en_row--;
			}

			if (tp_row == 0) {
				dispString += "<td align=\"center\" rowspan=\"" + parseInt(arDisp[iCnt]['typ_cnt'] + 1) + "\" class=\"base\">" + arDisp[iCnt]['typ'] + "</td>";
				tp_row = parseInt(arDisp[iCnt]['typ_cnt']);
			}
			else {
				tp_row--;
			}
			
			if (ym_row == 0) {
				dispString += "<td align=\"center\" rowspan=\"" + parseInt(arDisp[iCnt]['ym_cnt'] + 1) + "\" class=\"base\">" + arDisp[iCnt]['ym'] + "</td>";
				ym_row = parseInt(arDisp[iCnt]['ym_cnt']);
			}
			else {
				ym_row --;
			}
			
/**/
			if (arDisp[iCnt]['rmk'] == '-') {
				dispString += "<td class=\"base\">&nbsp;</td>";
			}
			else {
				dispString += "<td class=\"base\">" + arDisp[iCnt]['rmk'] + "</td>";
			}
/**/
			
			if ((gstrinVIN == '') || (gstrinVIN.length == 0)) {
				// Not VIN Search Resault
				dispString += "<td align=\"center\" rowspan=\"1\" class=\"base\"><a href=\"./ManualList.html?" + gstrDispL + "," + arDisp[iCnt]['modg'] + "\"><img src=\"./image/intxreftitleoff.png\" border=\"0\"></a></td>";
			}
			else {
				// VIN Search Resault
				dispString += "<td align=\"center\" rowspan=\"1\" class=\"base\"><a href=\"./ManualList.html?" + gstrDispL + "," + arDisp[iCnt]['modg'] + "," + gstrinVIN + "\"><img src=\"./image/intxreftitleoff.png\" border=\"0\"></a></td>";
			}
		}
		dispString += "</tr>";
	}
	
	
	dispString += "</table>";		// Table footer set

	return dispString


}





/*******
for Debug
*******/
function dbgarDisp(arDisp) {
	var strH = '';
	for (var i = 0 ; i < arDisp.length ; i++) {
strH += i + "::";
/*
strH += arDisp[i]['mocd'] + "  ,  ";
strH += arDisp[i]['mc_rspan'] + "  ,  ";
strH += arDisp[i]['eng'] + "  ,  "
strH += arDisp[i]['e_rspan'] + "  ,  "
*/
//strH += arDisp[i]['tpm'] + "  ,  "
//strH += arDisp[i]['tp_rspan'] + "  ,  "
//strH += arDisp[i]['dt'] + "  ,  "
//strH += arDisp[i]['dt_rspan'] + "  ,  "
//strH += arDisp[i]['g_cd'] + "  ,  "
//strH += arDisp[i]['d_gai'] + "  ,  "
//strH += arDisp[i]['gai_link'] + "  ,  "
//strH += arDisp[i]['gai_rspan'] + "  ,  "
//strH += arDisp[i]['s_cd'] + "  ,  "
//strH += arDisp[i]['d_sei'] + "  ,  "
//strH += arDisp[i]['sei_link'] + "  ,  "
//strH += arDisp[i]['sei_rspan'] + "  ,  "
//strH += arDisp[i]['d_cd'] + "  ,  "
//strH += arDisp[i]['d_den'] + "  ,  "
//strH += arDisp[i]['den_link'] + "  ,  "
//strH += arDisp[i]['den_rspan'] + "  ,  "
strH += arDisp[i]['a_cd'] + "  ,  "
strH += arDisp[i]['d_ats'] + "  ,  "
strH += arDisp[i]['ats_link'] + "  ,  "
strH += arDisp[i]['ats_rspan'] + "  ,  "
strH +=  "<br>";
	}
	
	return strH;
}




