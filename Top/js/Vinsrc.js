/*********************************************************************************/
/*  VinSrc.js  : VIN Search from XML File and VIN List Jump to Model Select Page */
/*********************************************************************************/
var strArg = document.location.search.substring(1);
var garVDat = new Array();				// Vin Data set array object ("#" nothing data)
var garVDat_S = new Array();				// Vin Data set array object ("#" include data)
/*******************************************
Function GoSearch()
  IE7 or other browser(IE6 or FireFox) Distinction
    IE7 -> SearchVINIE7()
    other(IE6 or FireFox) -> SearchVIN
 IN : strV(String) : Input VIN
********************************************/
function GoSearch(strV) {

	var strAPP = navigator.appVersion;
	SearchVIN(strV);

}



/***************************************************************************
Function SearchVIN (for IE6 and FireFox)
  Search Model Group from VIN List (Input VIN ) and 
  Jump to "Model Select" Page 
 IN  : strV(String) : Input VIN
 OUT : Normal : Jump to ModelSelect Page 
       Error : Show Alert Message 
****************************************************************************/
function SearchVIN(strV) {
	var strVIN = "";
	var arVinInput = new Array();
	var iCnt = 0;
	var strMoG = '';
	var MaxLength = 0;
	var iDataFg = 0;			//Data Ari Nashi Flag (1:Data Ari , 0:No Data)
	
	// Parametar Value (Display Language) Get
	var strDispL = strArg;
	
	
	// Input VIN keep
	strVIN = strV;

	// Input VIN Data Check
	//  Input VIN is empty
	if ((strVIN == "") || (strVIN.length == 0) ) {
		// No message (Hold nothing )
		return false;
	}
	else {
		// Input VIN Data Check (Digit check etc)
		arVinInput = InputVINCheck(strVIN);
		
		// Error
		if (arVinInput['V_init'] == "Error") {
			// Show alert message 
			alert (arErrdataMsg[strDispL]);
			return false;
		}
		// No Error
		else {
			
			// VIN List XML Read and Array Object Set
			GetVinxml();
			
			var srcVin = arVinInput['V_init'];
			
/*
var garVDat;				// Vin Data set array object ("#" nothing data)
var garVDat_S;				// Vin Data set array object ("#" include data)
*/
/*
alert("srcVin : " + srcVin);
alert("garVDat.length : " + garVDat.length);
alert("garVDat_S.length : " + garVDat_S.length);
*/
			iDataFg = 0;
			strMoG = '';
			// search VIN From Array Object (No "#" Array)
			for (iCnt = 0 ; iCnt < garVDat.length ; iCnt++) {
				if (garVDat[iCnt]['v_ini'] == srcVin) {
					var v_s = parseInt(garVDat[iCnt]['v_s']);
					var v_e = parseInt(garVDat[iCnt]['v_e']);
					if ((v_s <= arVinInput['V_End']) && (arVinInput['V_End'] <= v_e)) {
						iDataFg = 1;
						if ((strMoG != '') || (strMoG.length > 0) )	{
							strMoG += "|";
						}
						strMoG += garVDat[iCnt]['mog'];
					}

				}
			}
			
			// search VIN From Array Object ("#" include Array)
			if ((iDataFg == 0) && (strMoG == '')) {
				for (iCnt = 0 ; iCnt < garVDat_S.length ; iCnt++) {
					var inVbs = srcVin.substring(0,parseInt(garVDat_S[iCnt]['v_scnt']));
					var inVas = srcVin.substr(parseInt(garVDat_S[iCnt]['v_scnt'])+1);
					if ((garVDat_S[iCnt]['v_bs'] == inVbs) && (garVDat_S[iCnt]['v_as'] == inVas)) {
						var v_s = parseInt(garVDat_S[iCnt]['v_s']);
						var v_e = parseInt(garVDat_S[iCnt]['v_e']);
						if ((v_s <= arVinInput['V_End']) && (arVinInput['V_End'] <= v_e)) {
							iData = 1;
							if ((strMoG != '') || (strMoG.length > 0)) {
								strMoG += "|";
							}
							strMoG += garVDat_S[iCnt]['mog'];
						}
					}
				}
			}

			// No Such data 
			if ((strMoG == "") || (strMoG.length == 0 )) {
				// Show alert message
				alert(arNodataMsg[strDispL]);
				return false;
			}
			// Such data
			else {
				// Jump to ModelSelect page
				location.href = "./ModelSelect.html?" + strDispL + "," +  strMoG + "," + arVinInput['V_Input'];
				return true
			}
		}
	
	}

// Function End

}

/***************************************************************
Function InputVINICheck
  Input VIN Data check (digit etc)
  Jump to "Model Select" Page 
 IN  : strV(String) : Input VIN
 OUT : arV(Array object) : Input Data split
       Nomal return
         arV['V_init'] -> 0-11 digit (VIN length = 17)
                          0-6 digit  (VIN length = 12)
         arV['V_End']  -> 12-17 digit (VIN length = 17)
                          7-12 digit  (VIN length = 12)
       Error  return 
         arV['V_init'] -> 'Error' (Static string)
         arV['V_End'] -> 0 (Static Number)
****************************************************************/
function InputVINCheck(strVIN) {
	// array object for return value
	var arV = new Array();
	var strInVIN = '';
	
	
	strInVIN = Zen2Han(strVIN);
	
	if (strInVIN == 'Error') {
		arV = {
			'V_init' : 'Error',
			'V_End' : 0,
			'V_Input' : '' };
		return arV;
	}
	
	strInVIN = strInVIN.toUpperCase();
	
	// Input VIN length != 17 and 12 is error
	if ((strInVIN.length != 17) && (strInVIN.length != 12)) {
		// Error!
		arV = {
			'V_init' : 'Error',
			'V_End' : 0,
			'V_Input' : '' };

	}
	// 17 digit or 12 digit
	// set array value
	else {
		if (strInVIN.length == 17) {
			arV = {
				'V_init' : strInVIN.substring(0,11),
				'V_End' : parseInt(strInVIN.substring(11)) ,
				'V_Input' : strInVIN
			};
		}
		else {
			arV = {
				'V_init' : strInVIN.substring(0,5),
				'V_End' : parseInt(strInVIN.substring(6)) ,
				'V_Input' : strInVIN
			 };
			
		}
	}
	// return array object

	return arV;

//End Function
}

/******************************************************************************
Function JumpModeSelect
  VIN List jump to Mode Select page with paramater(selected Model Group)
 IN  : strMod (String) : Selcted Model Group
 OUT : Jump to ModelSelect Page (with paramater)
********************************************************************************/
function JampModelSelect(strMod) {
	// display language get from form
	var Lang = document.VList.Lng.value;
	// jump to ModelSelect page
	location.href = "./ModelSelect.html?" + Lang + "," + strMod ;
	return true;

//End function
}



/********************************************************************************
Function Zen2Han
  ZenKaku to Hankaku (Japanese Only)
 IN  : strVal (String) : string (2byte)
 OUT : strRetVal(String) : string(1byte)
          'Error' ->  [0-9a-zA-Z] Not
********************************************************************************/
function Zen2Han(strVal) {
	var strCmpZ = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-';
	var strCmpH = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-';
	var strRetVal = '';
	var strC = '';
	var iNum = 0;
	
	
	for (var i = 0 ; i < strVal.length ; i++) {
		strC = strVal.charAt(i);
//alert(strC);
		iNum = strCmpZ.indexOf(strC,0);
		if (iNum >= 0 ) {
			strRetVal += strCmpH.charAt(iNum);
		}
		else {
			if(!(strC.match(/[a-zA-Z0-9-]/i))) {
				strRetVal = 'Error';
				break;
			}
			else {
				strRetVal += strC;
			}
		}
	}

//alert(strRetVal);

	return strRetVal;

}


/********************************************************************************
Function GetVinxml
  Set Arrayobject from VIN.xml
 IN  : (none)
 OUT : (none)
********************************************************************************/
function GetVinxml() {
	var lCnt;
	var lArCnt;
	var lArCntS;
	var MaxLength;
/*
var garVDat;				// Vin Data set array object ("#" nothing data)
var garVDat_S;				// Vin Data set array object ("#" include data)
*/
	// VIN List XML Read
//	var XMLTree = XMLTreeObj.parseHTTP(XMLDir + XMLFname);
	// XML length keep
	MaxLength = parent.arV_no.length;
	
	lArCnt = 0;
	lArCntS = 0;
	
	for (lCnt = 0 ; lCnt < MaxLength ; lCnt++) {
		var SharpCnt = parent.arV_no[lCnt]['vin_init'].indexOf("#");
		if (SharpCnt == -1) {
			garVDat[lArCnt] = {
				'v_ini' : parent.arV_no[lCnt]['vin_init'],
				'v_s' : parent.arV_no[lCnt]['vin_end1'], 
				'v_e' : parent.arV_no[lCnt]['vin_end2'], 
				'mog' : parent.arV_no[lCnt]['modg'] 
			};
			lArCnt++;
		}
		else {
			var strVbs = parent.arV_no[lCnt]['vin_init'].substring(0,SharpCnt);
			var strVas = parent.arV_no[lCnt]['vin_init'].substr(SharpCnt + 1)
			garVDat_S[lArCntS] = {
				'v_ini' : parent.arV_no[lCnt]['vin_init'], 
				'v_scnt' : SharpCnt, 
				'v_bs' : strVbs , 
				'v_as' : strVas ,
				'v_s' : parent.arV_no[lCnt]['vin_end1'], 
				'v_e' : parent.arV_no[lCnt]['vin_end2'], 
				'mog' : parent.arV_no[lCnt]['modg'] 
			};
			lArCntS++;
		}
	}
}


/***************************************************
 function InitWindow()
   Vin List Page onLoad 
  IN  : (none)
  OUT : (none)
*****************************************************/
function InitWindow() {
	var arArg = new Array();
	var DispL = '';
	var fPg = 0;
	
	//Parameter Value Set
	if (strArg.indexOf(",") == -1) {
		// From VIN Search Page
		DispL = strArg;
		fPg = 0;
	}
	else {
		arArg = strArg.split(",");
		DispL = arArg[0];
		fPg = 1;
	}
	
	ShowValue(arstrVL_U[DispL],"cVL"); // VIN LIST

	var BackString = "<a href=\"JavaScript:JmpBack(" + fPg + ",'" + DispL + "');\"><b>" + arstrBk[DispL] + "</b></a>";

	ShowValue(BackString,"bBk" );	//BACK


	ShowValue(arstrNm[DispL],"thMn" );	// Model Name
	ShowValue(arstrCd[DispL],"thMc" );	// Model Coded
	ShowValue(arstrEng[DispL],"thEng" );	// Engine
	ShowValue(arstrType[DispL],"thTyp" );	// Type
	ShowValue(arstrSoP[DispL] + "<br>" + arstrYM[DispL],"thYM"  );	// SoP (YM)
	ShowValue(arstrRmk[DispL],"thRmk" );	// Remarks
	ShowValue(arstrVIN[DispL],"thVin"  );	// VIN
	ShowValue(arstrGTop[DispL],"bPTop" );	// To top of this page

}


