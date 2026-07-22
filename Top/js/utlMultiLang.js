

/*******************************************
Function DispLangset
	Display String(Table Caption)
	 Set Selected Language 
 IN  : strLang(String) : Selected Display Language
 OUT : strTHString(String) : Display String
*********************************************/
function DispLangSet(strLang) {

/*
	var strTHString = "<tr><th bgcolor=\"#87ceeb\" width=\"100\"><font color=\"#000000\">" + arDispDmg[strLang] + "</font></th>";
	strTHString += "<th bgcolor=\"#87ceeb\" width=\"340\"><font color=\"#000000\">" + arDispDmpn[strLang] + "</font></th>";
	strTHString += "<th bgcolor=\"#87ceeb\" width=\"80\"><font color=\"#000000\">" + arDispDlng[strLang] + "</font></th>";
	strTHString += "<th bgcolor=\"#87ceeb\" width=\"160\"><font color=\"#000000\">" + arDispPno [strLang] + "</font></th></tr>";
*/
	var strTHString = "<tr><th bgcolor=\"#87ceeb\" width=\"100\"><font color=\"#000000\">" + arstrMag[strLang] + "</font></th>";
	strTHString += "<th bgcolor=\"#87ceeb\" width=\"340\"><font color=\"#000000\">" + arstrMpn[strLang] + "</font></th>";
	strTHString += "<th bgcolor=\"#87ceeb\" width=\"80\"><font color=\"#000000\">" + arstrLng[strLang] + "</font></th>";
	strTHString += "<th bgcolor=\"#87ceeb\" width=\"160\"><font color=\"#000000\">" + arstrPno [strLang] + "</font></th></tr>";
	return strTHString;
}


/*******************************************
Function LangSelectLinkset
	Distination Select List display string set
 IN  : strL(String) : Display Language
       Lng(String) : Selected Distination Language
       Mag(String) : Selected Manual Group
       Mog(String) : Selected Model Group
 OUT : strSelHTML(String) : Display String
*********************************************/
function LangSelectLinkSet(strL,Lng,Mag,Mog) {

	var strTDHTML = "<td align=\"center\">";
	var strTDHTML_Sel = "<td align=\"center\"  bgcolor=\"#ffc0cb\">";
	var strHrefHTML = "<a href=\"./manualList.html?";
	var strSelHTML = "";
	strSelHTML += "<table border=\"1\" cellpadding=\"2\" cellspacing=\"0\" width=\"720\">";
	strSelHTML += "<tr>";
	var strMaMo = "";

	// Manual Group is Selected 
	if (Mag != "") {
		strMaMo = "," + Mag ;
	}
	
	else {
		// Model Group is Selected
		if (Mog != "") {
			strMaMo = "," + Mog;
		}
		else {
			strMaMo = "";
		}
	}

	// Distination Language is nothing (=ALL)  ->  No link string
	if (Lng == "") {
		strSelHTML += strTDHTML_Sel + "<b>ALL</b></td>";
	}
	// Other Language is Selected ->  Link String Show (<a href=")
	else {
		// Manual Group or Model Group is not selected
		 // -> parameter is (Language),ALL only
		if (strMaMo == "" ) {
			strSelHTML += strTDHTML + strHrefHTML + strL + "\"><b>ALL</b></a></td>";
		}
		// -> "ALL,"
		else {
			strSelHTML += strTDHTML + strHrefHTML + strL + "," + strMaMo + "\"><b>ALL</b></a></td>";
		}
	}
	
	// Distination language is English -> no link string 
	if (Lng == "E") {
		strSelHTML += strTDHTML_Sel + "<b>E(English)</b></td>";
	}
	// Other Language is Selected ->  Link String Show (<a href=")
	else {
		strSelHTML += strTDHTML + strHrefHTML + strL  + ",E" + strMaMo + "\"><b>E(English)</b></a></td>";
	}
	
	// Distination language is Italian -> no link string 
	if (Lng == "B") {
		strSelHTML += strTDHTML_Sel + "<b>B(Italian)</b></td>";
	}
	// Other Language is Selected ->  Link String Show (<a href=")
	else {
		strSelHTML += strTDHTML + strHrefHTML + strL + ",B" + strMaMo + "\"><b>B(Italian)</b></a></td>";
	}

	// Distination language is Dutch -> no link string 
	if (Lng == "D") {
		strSelHTML += strTDHTML_Sel + "<b>D(Dutch)</b></td>";
	}
	// Other Language is Selected ->  Link String Show (<a href=")
	else {
		strSelHTML += strTDHTML + strHrefHTML + strL + ",D" + strMaMo + "\"><b>D(Dutch)</b></a></td>";
	}

	// Distination language is French -> no link string 
	if (Lng == "F") {
		strSelHTML += strTDHTML_Sel + "<b>F(French)</b></td>";
	}
	// Other Language is Selected ->  Link String Show (<a href=")
	else {
		strSelHTML += strTDHTML + strHrefHTML + strL + ",F"  + strMaMo + "\"><b>F(French)</b></a></td>";
	}

	// Distination language is German -> no link string 
	if (Lng == "G") {
		strSelHTML += strTDHTML_Sel + "<b>G(German)</b></td>";
	}
	// Other Language is Selected ->  Link String Show (<a href=")
	else {
		strSelHTML += strTDHTML + strHrefHTML + strL+ ",G" + strMaMo  + "\"><b>G(German)</b></a></td>";
	}

	// Distination language is Hungarian -> no link string 
	if (Lng == "H") {
		strSelHTML += strTDHTML_Sel + "<b>H(Hungarian)</b></td>";
	}
	// Other Language is Selected ->  Link String Show (<a href=")
	else {
		strSelHTML += strTDHTML + strHrefHTML + strL + ",H" + strMaMo + "\"><b>H(Hungarian)</b></a></td>";
	}

	// Distination language is Spanish -> no link string 
	if (Lng == "S") {
		strSelHTML += strTDHTML_Sel + "<b>S(Spanish)</b></td>";
	}
	// Other Language is Selected ->  Link String Show (<a href=")
	else {
		strSelHTML += strTDHTML + strHrefHTML + strL + ",S"  + strMaMo + "\"><b>S(Spanish)</b></a></td>";
	}

	// Distination language is Slovak -> no link string 
	if (Lng == "V") {
		strSelHTML += strTDHTML_Sel + "<b>V(Slovak)</b></a></td>";
	}
	// Other Language is Selected ->  Link String Show (<a href=")
	else {
		strSelHTML += strTDHTML + strHrefHTML + strL + ",V" + strMaMo + "\"><b>V(Slovak)</b></a></td>";
	}
	// Distination language is Croatian -> no link string 2008.12.22 add
	if (Lng == "Q") {
		strSelHTML += strTDHTML_Sel + "<b>Q(Croatian)</b></a></td>";
	}
	// Other Language is Selected ->  Link String Show (<a href=")
	else {
		strSelHTML += strTDHTML + strHrefHTML + strL + ",Q" + strMaMo + "\"><b>Q(Croatian)</b></a></td>";
	}

	strSelHTML += "</tr>";
	strSelHTML += "</table>";
	
	// return set string
	return strSelHTML;

}





/*******************************************
Function SetCondMsg
	for Condition string set
 IN  : Lng(String) : Display Language
       DLng(String) : Selected Distination Language
       Mag(String) : Selected Manual Group
       Mog(String) : Selected Model Group
 OUT : strCondHTML(String) : Display string data
*********************************************/
function SetCondMsg(Lng,DLng,Mag,Mog) {
	var strCondHTML = "";		// for return value
	
	// Display Language is nothing -> 'EN'(English)
	if (Lng == "") {
		Lng = "EN";
	}
	
	// Display string data set
	strCondHTML = arstrCond[Lng] + " =  " ;
	
	// selected Model Group
	if (Mog != "") {
		strCondHTML += arstrMog[Lng] + ": " + Mog + " ";
	}
	else {
		// selected Manual Group
		
		if (Mag != "") {
			strCondHTML += arstrMag[Lng] + ": " + Mag + " ";
		}
		else {
			strCondHTML += arstrMag[Lng] + ": ALL " ;
		}
	}
	
	// Distination Language set
	if (DLng != "") {
		strCondHTML += "/ " + arstrLng[Lng] + ": " + arstrLngLong[DLng] + " ";
	}
	else {
		strCondHTML += "/ " + arstrLng[Lng] + ": ALL " ;
	}
	
	// return HTML String
	return strCondHTML;
	
}

