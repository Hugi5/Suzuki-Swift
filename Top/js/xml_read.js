/***********************************************************************/
/*  xml_read.js  : XML Data Read & Keep Function                       */
/*   XMLファイル読み込みと保持処理                                     */
/***********************************************************************/

//--------------------------------------------------
// XML Data Keep
//--------------------------------------------------
function xmlDataKeepList(act) {
	//IE
	if (parent.BFlg == "1") {
		//manuallist | modelselect | vin
		for (var i=0; i<g_objXml.documentElement.childNodes.length; i++) {
			//man_no | mod_no | v_no
			var objXml_ID = g_objXml.documentElement.childNodes.item(i);
			var arData = new Array();
			//n_cd ～ mogrp | mogrp ～ mormk | modg ～ mormk
			for (var j=0; j < objXml_ID.childNodes.length; j++) {
				var objXml = objXml_ID.childNodes.item(j);
				arData[j] = objXml.firstChild.data;
			}
			switch (act) {
				case 1:
					//Manual List
					ManListKeep(i,arData);
					break;
				case 2:
					//Model Selct
					ModelListKeep(i,arData);
					break;
				case 3:
					//VIN Search
					VINSrcListKeep(i,arData);
					break;
			}
		}
	}
	//FF
	else {
		//manuallist | modelselect | vin
		switch (act) {
			case 1:
				//man_no
				var Dobj = g_objXml.getElementsByTagName('man_no');
				var Cobj1 = g_objXml.getElementsByTagName('n_cd');
				var Cobj2 = g_objXml.getElementsByTagName('m_nm');
				var Cobj3 = g_objXml.getElementsByTagName('m_alt');
				var Cobj4 = g_objXml.getElementsByTagName('m_rmk');
				var Cobj5 = g_objXml.getElementsByTagName('lang');
				var Cobj6 = g_objXml.getElementsByTagName('pno');
				var Cobj7 = g_objXml.getElementsByTagName('f_nm');
				var Cobj8 = g_objXml.getElementsByTagName('dfg');
				var Cobj9 = g_objXml.getElementsByTagName('mogrp');
				var dCnt = 10;
				break;
			case 2:
				//mod_no
				var Dobj = g_objXml.getElementsByTagName('mod_no');
				var Cobj1 = g_objXml.getElementsByTagName('mogrp');
				var Cobj2 = g_objXml.getElementsByTagName('monam');
				var Cobj3 = g_objXml.getElementsByTagName('mocod');
				var Cobj4 = g_objXml.getElementsByTagName('eng');
				var Cobj5 = g_objXml.getElementsByTagName('tpm');
				var Cobj6 = g_objXml.getElementsByTagName('dt');
				var Cobj7 = g_objXml.getElementsByTagName('g_cd');
				var Cobj8 = g_objXml.getElementsByTagName('s_cd');
				var Cobj9 = g_objXml.getElementsByTagName('d_cd');
				var Cobj10 = g_objXml.getElementsByTagName('e_cd');
				var Cobj11 = g_objXml.getElementsByTagName('a_cd');
				var Cobj12 = g_objXml.getElementsByTagName('mormk');
				var dCnt = 13;
				break;
			case 3:
				//v_no
				var Dobj = g_objXml.getElementsByTagName('v_no');
				var Cobj1 = g_objXml.getElementsByTagName('modg');
				var Cobj2 = g_objXml.getElementsByTagName('vin_init');
				var Cobj3 = g_objXml.getElementsByTagName('vin_end1');
				var Cobj4 = g_objXml.getElementsByTagName('vin_end2');
				var Cobj5 = g_objXml.getElementsByTagName('mocod');
				var Cobj6 = g_objXml.getElementsByTagName('mormk');
				var Cobj7 = g_objXml.getElementsByTagName('vin_len');
				var dCnt = 8;
				break;
		}
		
		for (var i = 0 ; i < Dobj.length ; i++) {
			var arData = new Array();
			arData[0] =  Cobj1[i].textContent;
			arData[1] =  Cobj2[i].textContent;
			arData[2] =  Cobj3[i].textContent;
			arData[3] =  Cobj4[i].textContent;
			arData[4] =  Cobj5[i].textContent;
			arData[5] =  Cobj6[i].textContent;
			arData[6] =  Cobj7[i].textContent;
			if (act != 3) {
				arData[7] =  Cobj8[i].textContent;
				arData[8] =  Cobj9[i].textContent;
				if (act != 1) {
					arData[9] = Cobj10[i].textContent;
					arData[10] = Cobj11[i].textContent;
					arData[11] = Cobj12[i].textContent;
				}
			}
			switch (act) {
				case 1:
					//Manual List
					ManListKeep(i,arData);
					break;
				case 2:
					//Model Selct
					ModelListKeep(i,arData);
					break;
				case 3:
					//VIN Search
					VINSrcListKeep(i,arData);
					break;
			}
			
		}
	}
}


/*******************************************
*  Structure Save for ManList.xml 
********************************************/
function ManListKeep (idx, arD) {
	var id = idx + 1;
	var n_cd  = arD[0];
	var m_nm  = arD[1];
	var m_alt  = arD[2];
	var m_rmk  = arD[3];
	var lang  = arD[4];
	var pno  = arD[5];
	var f_nm  = arD[6];
	var dfg  = arD[7];
	var mogrp = arD[8];

	parent.arMan_no[idx] = new MANUALLIST(id , n_cd , m_nm , m_alt , m_rmk , lang , pno , f_nm , dfg , mogrp);

}

/*******************************************
*  Structure Save for ModSel.xml 
********************************************/
function ModelListKeep(idx, arD) {

	var id     = idx + 1;
	var mogrp  = arD[0];
	var monam  = arD[1];
	var mocod  = arD[2];
	var eng    = arD[3];
	var tpm    = arD[4];
	var dt     = arD[5];
	var g_cd   = arD[6];
	var s_cd   = arD[7];
	var d_cd   = arD[8];
	var e_cd   = arD[9];
	var a_cd   = arD[10];
	var mormk  = arD[11];
	
	parent.arMod_no[idx] = new MODELSELECT(id , mogrp , monam , mocod , eng, tpm , dt, g_cd , s_cd , d_cd , e_cd , a_cd , mormk );
}

/*******************************************
*  Structure Save for VinSrc.xml 
********************************************/
function VINSrcListKeep(idx, arD) {

	var id       = idx + 1;
	var modg     = arD[0];
	var vin_init = arD[1];
	var vin_end1 = arD[2];
	var vin_end2 = arD[3];
	var mocod    = arD[4];
	var mormk    = arD[5];
	var vin_len  = arD[6];

	parent.arV_no[idx] = new VIN (id , modg , vin_init , vin_end1 , vin_end2 , mocod , mormk , vin_len );

}


