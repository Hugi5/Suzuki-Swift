var UI_lang = parent.CTL.document.ctl.lang.value;

function initSearch() { 
	if (parent.CTL.document.ctl.lastsearchstring.value!="") {
		document.search.main.value=parent.CTL.document.ctl.lastsearchstring.value;
		runSearch(parent.CTL.document.ctl.lastsearchstring.value,parent.CTL.document.ctl.lastsearchstart.value);
		loadFound(parent.CTL.document.ctl.hitdisplay.value);
	}
	document.search.main.focus();

}

function initSearch2() { 
	if (parent.CTL.document.ctl.mode.value=="search_sym") {
		if (parent.CTL.document.ctl.lastsearchstring_sym.value!="") {
			document.searchsym.main.value=parent.CTL.document.ctl.lastsearchstring_sym.value;
			runSearch2(parent.CTL.document.ctl.lastsearchstring_sym.value,parent.CTL.document.ctl.lastsearchstart_sym.value);
			loadFound(parent.CTL.document.ctl.hitdisplay_sym.value);
			}
			document.searchsym.main.focus();
	} 
	else if (parent.CTL.document.ctl.mode.value=="search_dtc") {
		if (parent.CTL.document.ctl.lastsearchstring_dtc.value!="") {
			document.searchdtc.main.value=parent.CTL.document.ctl.lastsearchstring_dtc.value;
			runSearch2(parent.CTL.document.ctl.lastsearchstring_dtc.value,parent.CTL.document.ctl.lastsearchstart_dtc.value);
			loadFound(parent.CTL.document.ctl.hitdisplay_dtc.value);
			}
			document.searchdtc.main.focus();
	}

}

function runSearch(query,start)
{
	if (document.search.main.value == "") {
		document.search.main.focus();
	} else {

		var strOutput = "";
		var intHits = 0;
		var strFind = (query) ? query : document.search.main.value;
		var offset = 30;
		var first = (start) ? eval(start) : 1;
		
		// Set vars for when returning to search screen
		parent.CTL.document.ctl.lastsearchstring.value = strFind;
		parent.CTL.document.ctl.lastsearchstart.value = first;
		
		// alert ("Query is: " + strFind);
		
		strFind = normstring(strFind);
		var re = new RegExp();
		re.compile(strFind, "i");
		// count total matches
		for (var i = 0; i < arrSieTitles.length; i++) {
			normTitle = normstring(arrSieTitles[i]);
			if (normTitle.search(re) != -1) {
				intHits++;
			}
		}
		
		if (intHits==0) {
			strOutput += getUI_strNoMatch(UI_lang);
		} else {
			prevnext = "<table class=\"hits\" align=\"center\"><tr>";
			prevnext += "<td align=\"center\">";
			if (first != 1) {
				prevnext += "<a class=\"prevlink\" href=\"javascript: runSearch('" + strFind + "'," + eval(first - offset) + ")\">&nbsp;" + getUI_btnPrev(UI_lang) + "&nbsp;</a>";
			prevnext += "</td><td align=\"center\">";
			}
			var last = (eval(first + offset) > intHits) ? intHits : eval(first + offset - 1);
			prevnext += getUI_strShowCurrentHits(UI_lang,first,last,intHits);
			if (eval(intHits - first + 1) > offset) {
				prevnext += "</td><td align=\"center\">";
				prevnext += "<a class=\"prevlink\" href=\"javascript: runSearch('" + strFind + "'," + eval(first + offset) + ")\">&nbsp;" + getUI_btnNext(UI_lang) + "&nbsp;</a>";
			}
			prevnext += "</td>\n";
			prevnext += "</tr></table>\n";
				
			strOutput = strOutput + prevnext;

			var intHits2 = 0;
			// check for matches in titles
			for (var i = 0; i < arrSieTitles.length; i++) {
				normTitle = normstring(arrSieTitles[i]);
				if (normTitle.search(re) != -1) {
				// count hits
					intHits2++
				// if in visible range add link to output string
					if (intHits2 >= first && intHits2 < first + offset) {
					
						strOutput += "<a href=\"javascript: loadFound('" + arrSieList[i] + "')\" title=\"" + arrSieTitles[i] + getHier(arrSieList[i]) + "\">";
						strOutput += "<div class=\"sie\" id=\"sie" + arrSieList[i] + "\" onmouseover=\"overDiv(this)\" onmouseout=\"outDiv(this)\">";
						strOutput += "<img class=\"mark\" src=\"../../icon/doc.gif\" width=\"11px\" border=\"0\">";
						strOutput += arrSieTitles[i];
						strOutput += "</div></a>";

					}
				

				}
			}
		}
		
		
		var tgtResults = document.getElementById("tgtResults");
		tgtResults.innerHTML = strOutput;

	}

}


function runSearch2(query,start) {
var type = parent.CTL.document.ctl.mode.value;

	if (type == "search_dtc" && document.searchdtc.main.value == "") {
		document.searchdtc.main.focus();
	} 
	else if (type == "search_sym" && document.searchsym.main.value == "") {
		document.searchsym.main.focus();
	}  else {

		var strOutput = "";
		var intHits = 0;
		var offset = 30;
		var first = (start) ? eval(start) : 1;
		if (query) {
			var strFind = query;
		} 
		else if (type == "search_dtc") {
			var strFind = document.searchdtc.main.value;
		}
		else if (type == "search_sym") {
			var strFind = document.searchsym.main.value;
		}

		// Set vars for when returning to search screen
		if (type == "search_dtc") {
			parent.CTL.document.ctl.lastsearchstring_dtc.value = strFind;
			parent.CTL.document.ctl.lastsearchstart_dtc.value = first;
		}
		else if (type == "search_sym") {
			parent.CTL.document.ctl.lastsearchstring_sym.value = strFind;
			parent.CTL.document.ctl.lastsearchstart_sym.value = first;
		}

				
		// alert ("Query is: " + strFind);

		strFind = normstring(strFind);
		var re = new RegExp();
		re.compile(strFind, "i");
		// count total matches
		
		if (type == "search_dtc") {
			for (var i = 0; i < arrDtcs.length; i++) {
				normDtc = normstring(arrDtcs[i]);
				if (normDtc.search(re) != -1) {
					intHits++;
				}
			}
		}
		else if (type == "search_sym") {
			for (var i = 0; i < arrSyms.length; i++) {
				normSym = normstring(arrSyms[i]);
				if (normSym.search(re) != -1) {
					intHits++;
				}
			}
		}
	
		if (intHits==0) {
			strOutput += getUI_strNoMatch(UI_lang);
		} else {
			prevnext = "<table class=\"hits\" align=\"center\"><tr>";
			prevnext += "<td align=\"center\">";
			if (first != 1) {
				prevnext += "<a class=\"prevlink\" href=\"javascript: runSearch2('" + strFind + "'," + eval(first - offset) + ")\">&nbsp;" + getUI_btnPrev(UI_lang) + "&nbsp;</a>";
				prevnext += "</td><td align=\"center\">";
			}
			var last = (eval(first + offset) > intHits) ? intHits : eval(first + offset - 1);
			prevnext += getUI_strShowCurrentHits(UI_lang,first,last,intHits);
			if (eval(intHits - first + 1) > offset) {
				prevnext += "</td><td align=\"center\">";
				prevnext += "<a class=\"prevlink\" href=\"javascript: runSearch2('" + strFind + "'," + eval(first + offset) + ")\">&nbsp;" + getUI_btnNext(UI_lang) + "&nbsp;</a>";
			}
			prevnext += "</td>\n";
			prevnext += "</tr></table>\n";
				
			strOutput = strOutput + prevnext;

			var intHits2 = 0;
			// check for matches in dtc/syms
			
			if (type == "search_dtc") {
				for (var i = 0; i < arrDtcs.length; i++) {
					normDtc = normstring(arrDtcs[i]);
					if (normDtc.search(re) != -1) {
					// count hits
						intHits2++
					// if in visible range add link to output string
						if (intHits2 >= first && intHits2 < first + offset) {
						
							strOutput += "<a href=\"javascript: loadFound('" + arrSieList_Dtc[i] + "')\" title=\"" + arrSieTitles_Dtc[i] + getHier(arrSieList_Dtc[i]) + "\">";
							strOutput += "<div class=\"sie\" id=\"sie" + arrSieList_Dtc[i] + "\" onmouseover=\"overDiv(this)\" onmouseout=\"outDiv(this)\">";
							strOutput += "<img class=\"mark\" src=\"../../icon/doc.gif\" width=\"11px\" border=\"0\">";
							strOutput += arrSieTitles_Dtc[i];
							strOutput += "</div></a>";

						}
					

					}
				}
			}
			else if (type == "search_sym") {
				for (var i = 0; i < arrSyms.length; i++) {
					normSym = normstring(arrSyms[i]);
					if (normSym.search(re) != -1) {
					// count hits
						intHits2++
					// if in visible range add link to output string
						if (intHits2 >= first && intHits2 < first + offset) {
						
							strOutput += "<a href=\"javascript: loadFound('" + arrSieList_Sym[i] + "')\" title=\"" + arrSieTitles_Sym[i] + getHier(arrSieList_Sym[i]) + "\">";
							strOutput += "<div class=\"sie\" id=\"sie" + arrSieList_Sym[i] + "\" onmouseover=\"overDiv(this)\" onmouseout=\"outDiv(this)\">";
							strOutput += "<img class=\"mark\" src=\"../../icon/doc.gif\" width=\"11px\" border=\"0\">";
							strOutput += arrSieTitles_Sym[i];
							strOutput += "</div></a>";

						}
					

					}
				}
			}
		
		}
		var tgtResults = document.getElementById("tgtResults");
		tgtResults.innerHTML = strOutput;

	}
}


function normstring(mystring) {
// Convert uppercase to lowercase
	var re = new RegExp();
//	var arrAlphas="Aa,Bb,Cc,Dd,Ee,Ff,Gg,Hh,Ii,Jj,Kk,Ll,Mm,Nn,Oo,Pp,Qq,Rr,Ss,Tt,Uu,Vv,Ww,Xx,Yy,Zz,Àà,Áá,Ââ,Ää,Çç,Èè,Ëë,Éé,Ìì,Îî,Ïï,Íí,Ññ,Òò,Óó,Ôô,Öö,Œœ,Šš,Ýý,Ùù,Úú,Üü,Ûû,Žž".split(",");
//	for (var i = 0; i < arrAlphas.length; i++) {
//		mystring = mystring.replace(arrAlphas[i].substr(0,1),arrAlphas[i].substr(1,1));
//	}
// Convert 2-byte numerics to 1-byte numerics
	var arrNums="１1,２2,３3,４4,５5,６6,７7,８8,９9,０0".split(",");
	for (var i = 0; i < arrNums.length; i++) {
		re.compile(arrNums[i].substr(0,1), "g");
		mystring = mystring.replace(re,arrNums[i].substr(1,1));
	}
// Convert 2-byte uppercase to 1-byte lowercase
	var arrZenAlphas="Ａa,Ｂb,Ｃc,Ｄd,Ｅe,Ｆf,Ｇg,Ｈh,Ｉi,Ｊj,Ｋk,Ｌl,Ｍm,Ｎn,Ｏo,Ｐp,Ｑq,Ｒr,Ｓs,Ｔt,Ｕu,Ｖv,Ｗw,Ｘx,Ｙy,Ｚz".split(",");
	for (var i = 0; i < arrZenAlphas.length; i++) {
		re.compile(arrZenAlphas[i].substr(0,1), "g");
		mystring = mystring.replace(re,arrZenAlphas[i].substr(1,1));
	}
	return mystring;
}


function trimstring(mystring) {
	while (mystring.charAt(mystring.length-1) == " ")
	{
		mystring = mystring.substring(0,mystring.length-1);
	} 
	while(mystring.substring(0,1) ==" ")
	{
		mystring = mystring.substring(1,mystring.length);
	}	
	return mystring;
}


function getHier(id) {
	var strCharas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	strHier = "\n";
	
	if (id.substr(8,2)=="00") {
		sctid = "z";
	} else if (id.substr(8,2)=="99") {
		sctid = "y";
	} else {
		sctid = id.substr(8,1);
	}
// Take out section title 070418
//	for (var i = 0; i < arrSctTitles.length; i++) {
//		if (arrSctTitles[i].indexOf(sctid+"|") != -1) {
//			strHier += getUI_strSection(UI_lang);
//			strHier += " ";
//			strHier += arrSctTitles[i].substr(arrSctTitles[i].indexOf("|")+1);
//		}
//	}
	for (var i = 0; i < arrScTitles.length; i++) {
		if (arrScTitles[i].indexOf(id.substr(8,2)+"|") != -1) {
			strHier += getUI_strSection(UI_lang);
			strHier += " ";
			strHier += id.substr(8,1) + strCharas.charAt(id.substr(9,1)-1) + " - ";
			strHier += arrScTitles[i].substr(arrScTitles[i].indexOf("|")+1);
		}
	}
	if (id.substr(10,1)!="0") {
		for (var i = 0; i < arrConfigTitles.length; i++) {
			if (arrConfigTitles[i].indexOf(id.substr(8,3)+"|") != -1) {
				strHier += "\n- ";
				strHier += arrConfigTitles[i].substr(arrConfigTitles[i].indexOf("|")+1);
			}
		}
	}
	for (var i = 0; i < arrSitTitles.length; i++) {
		if (arrSitTitles[i].indexOf(id.substr(8,4)+"|") != -1) {
			strHier += "\n- ";
			strHier += arrSitTitles[i].substr(arrSitTitles[i].indexOf("|")+1);
		}
	}

	return strHier;
}


function loadFound(id) { 
	parent.CTL.document.ctl.current.value = id;
	if (parent.CTL.document.ctl.mode.value=="search_sym") {
		parent.CTL.document.ctl.hitdisplay_sym.value = id;
	} else if (parent.CTL.document.ctl.mode.value=="search_dtc") {
		parent.CTL.document.ctl.hitdisplay_dtc.value = id;
	} else if (parent.CTL.document.ctl.mode.value=="search") {
		parent.CTL.document.ctl.hitdisplay.value = id;
	}

	if (id != "0") {
		markTarget(id);
		var strSource = "../" + id + ".xml";
		if (id.length==10) {
			strSource = "../" + id + "/" + id + ".htm";
		}
		if (id.length==10) {
			parent.MAIN.document.location.href = strSource;
		}
		else if (window.ActiveXObject) {
			srcMain = parent.TOP.xmlLoad(strSource);
			parent.TOP.styleMain.selectSingleNode("//xsl:param[@name='UI_lang']").setAttribute("select","'" + UI_lang + "'");
			htmlMain = srcMain.transformNode(parent.TOP.styleMain);
			parent.MAIN.document.write(htmlMain);
			parent.MAIN.document.close();
		}
		else if (window.XSLTProcessor) {
			if (!xsltProcessor_main)	{
				var xsltProcessor_main = new XSLTProcessor();
				var serializer_main = new XMLSerializer();
				
				var xDoc_main = parent.TOP.xmlLoad_xhr("../../config8/suzuki_all.xsl");
				xsltProcessor_main.importStylesheet(xDoc_main);
				xsltProcessor_main.setParameter("", "UI_lang", UI_lang)
			}
			var srcMain = parent.TOP.xmlLoad_xhr(strSource);
			xslMainDoc = xsltProcessor_main.transformToDocument(srcMain);
			htmlMain = serializer_main.serializeToString(xslMainDoc);	
			parent.MAIN.document.write(htmlMain);
			parent.MAIN.document.close();
		}
	}
// show required Tools/Materials
// 081022: Disabled (again) pending further instructions
//		showPreReqs(srcMain);
}


function markTarget(id) {
	divs=parent.NAVI.document.getElementsByTagName("div");
	for (var i = 0; i < divs.length; i++) {
		if (divs[i].id.substr(0,3)=="sie") {
			if (divs[i].id!="sie"+id) {
				divs[i].style.backgroundColor="#ffffff";
			} else {
				divs[i].style.background="url(../../icon/search_bg.gif) repeat-y";
				divs[i].style.backgroundColor="#ffcc00";
			}
		}
	}
}

