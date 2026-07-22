/***********************************************************************/
/*  cmnstruct.js  : Common Structure Setting JS (not function)         */
/*   XML読み込み保持用構造体（宣言）                                   */
/***********************************************************************/

/*******************************************
*  Structure ManList.xml 
********************************************/
function MANUALLIST (id , n_cd , m_nm , m_alt , m_rmk , lang , pno , f_nm , dfg , mogrp) {
	this.id = id;
	this.n_cd = n_cd;
	this.m_nm = m_nm;
	this.m_alt = m_alt;
	this.m_rmk = m_rmk;
	this.lang = lang;
	this.pno = pno;
	this.f_nm = f_nm;
	this.dfg = dfg;
	this.mogrp = mogrp;

}


/*******************************************
*  Structure for VinSrc.xml 
********************************************/
function VIN (id , modg , vin_init , vin_end1 , vin_end2 , mocod , mormk , vin_len ) {
	this.id = id;
	this.modg = modg;
	this.vin_init = vin_init;
	this.vin_end1 = vin_end1;
	this.vin_end2 = vin_end2;
	this.mocod = mocod;
	this.mormk = mormk;
	this.vin_len = vin_len;

}


/*******************************************
*  Structure for ModSel.xml 
********************************************/
function MODELSELECT(id , mogrp , monam , mocod , eng, tpm , dt, g_cd , s_cd , d_cd , e_cd , a_cd , mormk ) {
	this.id = id;
	this.mogrp = mogrp;
	this.monam = monam;
	this.mocod = mocod;
	this.eng = eng;
	this.tpm = tpm;
	this.dt = dt;
	this.g_cd = g_cd;
	this.s_cd = s_cd;
	this.d_cd = d_cd;
	this.e_cd = e_cd;
	this.a_cd = a_cd;
	this.mormk = mormk;
}

