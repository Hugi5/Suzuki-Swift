function setUI(lang) {
	if (lang=="du") {
		strUI_btnCont = "Bladwijzers";
		strUI_btnDtc = "DTC";
		strUI_btnSym = "Symptoom";
		strUI_btnContIndex = "Indexlijst";
		strUI_btnContSearch = "Zoeken";
		strUI_btnDtcIndex = "Indexlijst";
		strUI_btnDtcSearch = "Zoeken";
		strUI_btnSymIndex = "Indexlijst";
		strUI_btnSymSearch = "Zoeken";
		strUI_iconUndo = "Terug naar de laatste bladzijde";
		strUI_iconPrev = "Terug";
		strUI_iconNext = "Volgende";
		strUI_iconPrint = "afdrukken";
		strUI_iconReturn = "voorpagina";
		strUI_iconHelp = "help";
		parent.CTL.document.ctl.err1.value = 'Ga terug naar "Bladwijzers" voor gebruik van deze functie.';

		parent.TOP.document.getElementById('btnContIndex').style.width = "50px";
		parent.TOP.document.getElementById('btnDtcIndex').style.width = "50px";
		parent.TOP.document.getElementById('btnSymIndex').style.width = "50px";
		parent.TOP.document.getElementById('btnContSearch').style.width = "50px";
		parent.TOP.document.getElementById('btnDtcSearch').style.width = "50px";
		parent.TOP.document.getElementById('btnSymSearch').style.width = "50px";
	}
	else if (lang=="fr") {
		strUI_btnCont = "SOMMAIRE";
		strUI_btnDtc = "DTC";
		strUI_btnSym = "Symptôme";
		strUI_btnContIndex = "Index";
		strUI_btnContSearch = "Recherche";
		strUI_btnDtcIndex = "Index";
		strUI_btnDtcSearch = "Recherche";
		strUI_btnSymIndex = "Index";
		strUI_btnSymSearch = "Recherche";
		strUI_iconUndo = "Retour à la dernière page";
		strUI_iconPrev = "Précédent";
		strUI_iconNext = "Suivant";
		strUI_iconPrint = "imprimer";
		strUI_iconReturn = "page avant";
		strUI_iconHelp = "aide";
		parent.CTL.document.ctl.err1.value = 'Revenir à "SOMMAIRE" pour utiliser cette fonction.';
		
		parent.TOP.document.getElementById('btnContIndex').style.width = "60px";
		parent.TOP.document.getElementById('btnDtcIndex').style.width = "60px";
		parent.TOP.document.getElementById('btnSymIndex').style.width = "60px";
	}
	else if (lang=="ge") {
		strUI_btnCont = "INHALT";
		strUI_btnDtc = "DTC";
		strUI_btnSym = "Symptom";
		strUI_btnContIndex = "Index-Liste";
		strUI_btnContSearch = "Suche";
		strUI_btnDtcIndex = "Index-Liste";
		strUI_btnDtcSearch = "Suche";
		strUI_btnSymIndex = "Index-Liste";
		strUI_btnSymSearch = "Suche";
		strUI_iconUndo = "Zurück zur letzten Seite";
		strUI_iconPrev = "Zurück";
		strUI_iconNext = "Weiter";
		strUI_iconPrint = "drucken";
		strUI_iconReturn = "Erste Seite";
		strUI_iconHelp = "Hilfe";
		parent.CTL.document.ctl.err1.value = 'Zurück zu "Lesezeichen" um diese Funktion zu benutzen.';

		parent.TOP.document.getElementById('btnContIndex').style.width = "60px";
		parent.TOP.document.getElementById('btnDtcIndex').style.width = "60px";
		parent.TOP.document.getElementById('btnSymIndex').style.width = "60px";
	}
	else if (lang=="gk") {
		strUI_btnCont = "Σελιδοδείκτες";
		strUI_btnDtc = "DTC (ΚΩΔΙΚΟΙ ΒΛΑΒΩΝ)";
		strUI_btnSym = "Σύμπτωμα";
		strUI_btnContIndex = "Ευρετήριο";
		strUI_btnContSearch = "Αναζήτηση";
		strUI_btnDtcIndex = "Ευρετήριο";
		strUI_btnDtcSearch = "Αναζήτηση";
		strUI_btnSymIndex = "Ευρετήριο";
		strUI_btnSymSearch = "Αναζήτηση";
		strUI_iconUndo = "Πίσω στην τελευταία σελίδα";
		strUI_iconPrev = "Пροηγούμενο";
		strUI_iconNext = "Еπόμενο";
		strUI_iconPrint = "εκτύπωση";
		strUI_iconReturn = "εμπρός σελίδα";
		strUI_iconHelp = "βοήθεια";
		parent.CTL.document.ctl.err1.value = "Επιστρέψτε στη Λίστα Ευρετηρίου για να χρησιμοποιήσετε αυτή τη λειτουργία.";

		parent.TOP.document.getElementById('btnContIndex').style.width = "66px";
		parent.TOP.document.getElementById('btnDtcIndex').style.width = "66px";
		parent.TOP.document.getElementById('btnSymIndex').style.width = "66px";
	}
	else if (lang=="hr") {
		strUI_btnCont = "Sadržaj";
		strUI_btnDtc = "DTC";
		strUI_btnSym = "Simptom";
		strUI_btnContIndex = "Kazalo pojmova";
		strUI_btnContSearch = "Pretraživanje";
		strUI_btnDtcIndex = "Kazalo pojmova";
		strUI_btnDtcSearch = "Pretraživanje";
		strUI_btnSymIndex = "Kazalo pojmova";
		strUI_btnSymSearch = "Pretraživanje";
		strUI_iconUndo = "Natrag na zadnju stranicu";
		strUI_iconPrev = "Prethodno";
		strUI_iconNext = "Sljedeće";
		strUI_iconPrint = "ispiši";
		strUI_iconReturn = "prva stranica";
		strUI_iconHelp = "pomoć";
		parent.CTL.document.ctl.err1.value = 'Vratite se na kazalo pojmova za korištenje ove funkcije.';

		parent.TOP.document.getElementById('btnContIndex').style.width = "90px";
		parent.TOP.document.getElementById('btnDtcIndex').style.width = "90px";
		parent.TOP.document.getElementById('btnSymIndex').style.width = "90px";
	}
	else if (lang=="hu") {
		strUI_btnCont = "Könyvjelzők";
		strUI_btnDtc = "DTC";
		strUI_btnSym = "Hibajelenség";
		strUI_btnContIndex = "Index lista";
		strUI_btnContSearch = "Keresés";
		strUI_btnDtcIndex = "Index lista";
		strUI_btnDtcSearch = "Keresés";
		strUI_btnSymIndex = "Index lista";
		strUI_btnSymSearch = "Keresés";
		strUI_iconUndo = "Vissza az előző oldalra";
		strUI_iconPrev = "Előző ";
		strUI_iconNext = "Következő";
		strUI_iconPrint = "Nyomtatás";
		strUI_iconReturn = "Főoldal";
		strUI_iconHelp = "Súgó";
		parent.CTL.document.ctl.err1.value = 'Térjen vissza a "Könyvjelzők"-höz, hogy használni tudja ezt a funkciót.';

		parent.TOP.document.getElementById('btnContIndex').style.width = "60px";
		parent.TOP.document.getElementById('btnDtcIndex').style.width = "60px";
		parent.TOP.document.getElementById('btnSymIndex').style.width = "60px";
	}
	else if (lang=="id") {
		strUI_btnCont = "Penanda halaman";
		strUI_btnDtc = "DTC";
		strUI_btnSym = "Gejala";
		strUI_btnContIndex = "Daftar Index";
		strUI_btnContSearch = "Pencarian";
		strUI_btnDtcIndex = "Daftar Index";
		strUI_btnDtcSearch = "Pencarian";
		strUI_btnSymIndex = "Daftar Index";
		strUI_btnSymSearch = "Pencarian";
		strUI_iconUndo = "Kembali ke halaman terakhir";
		strUI_iconPrev = "Kembali";
		strUI_iconNext = "Maju";
		strUI_iconPrint = "Cetak";
		strUI_iconReturn = "Halaman depan";
		strUI_iconHelp = "Bantuan";
		parent.CTL.document.ctl.err1.value = "Kembali ke daftar index untuk menggunakan fungsi ini.";

		parent.TOP.document.getElementById('btnContIndex').style.width = "72px";
		parent.TOP.document.getElementById('btnDtcIndex').style.width = "72px";
		parent.TOP.document.getElementById('btnSymIndex').style.width = "72px";
	}
	else if (lang=="it") {
		strUI_btnCont = "INDICE";
		strUI_btnDtc = "DTC";
		strUI_btnSym = "Sintomi";
		strUI_btnContIndex = "Lista degli indici";
		strUI_btnContSearch = "Ricerca";
		strUI_btnDtcIndex = "Lista degli indici";
		strUI_btnDtcSearch = "Ricerca";
		strUI_btnSymIndex = "Lista degli indici";
		strUI_btnSymSearch = "Ricerca";
		strUI_iconUndo = "Torna alla pagina precedente";
		strUI_iconPrev = "Precedente";
		strUI_iconNext = "Successivo";
		strUI_iconPrint = "stampa";
		strUI_iconReturn = "prima pagina";
		strUI_iconHelp = "guida";
		parent.CTL.document.ctl.err1.value = 'Per fare uso di questa funzione, usare i "INDICE".';

		parent.TOP.document.getElementById('btnContIndex').style.width = "90px";
		parent.TOP.document.getElementById('btnDtcIndex').style.width = "90px";
		parent.TOP.document.getElementById('btnSymIndex').style.width = "90px";
	}
	else if (lang=="jp") {
		strUI_btnCont = "目次";
		strUI_btnDtc = "DTC";
		strUI_btnSym = "症状別故障診断";
		strUI_btnContIndex = "一覧";
		strUI_btnContSearch = "検索";
		strUI_btnDtcIndex = "一覧";
		strUI_btnDtcSearch = "検索";
		strUI_btnSymIndex = "一覧";
		strUI_btnSymSearch = "検索";
		strUI_iconUndo = "元に戻る";
		strUI_iconPrev = "一つ戻る";
		strUI_iconNext = "一つ進む";
		strUI_iconPrint = "印刷";
		strUI_iconReturn = "Topへ";
		strUI_iconHelp = "ヘルプ";
		parent.CTL.document.ctl.err1.value = "目次に戻ってから行ってください。";

		parent.TOP.document.getElementById('btnContIndex').style.width = "50px";
		parent.TOP.document.getElementById('btnDtcIndex').style.width = "50px";
		parent.TOP.document.getElementById('btnSymIndex').style.width = "50px";
		parent.TOP.document.getElementById('btnContSearch').style.width = "50px";
		parent.TOP.document.getElementById('btnDtcSearch').style.width = "50px";
		parent.TOP.document.getElementById('btnSymSearch').style.width = "50px";
	}
	else if (lang=="pl") {
		strUI_btnCont = "Zakładki";
		strUI_btnDtc = "Kody DTC";
		strUI_btnSym = "Objawy";
		strUI_btnContIndex = "Lista";
		strUI_btnContSearch = "Szukaj";
		strUI_btnDtcIndex = "Lista";
		strUI_btnDtcSearch = "Szukaj";
		strUI_btnSymIndex = "Lista";
		strUI_btnSymSearch = "Szukaj";
		strUI_iconUndo = "Do poprzednio wybranej strony";
		strUI_iconPrev = "Poprzednia";
		strUI_iconNext = "Następna";
		strUI_iconPrint = "drukuj";
		strUI_iconReturn = "pierwsza strona";
		strUI_iconHelp = "pomoc";
		parent.CTL.document.ctl.err1.value = "Funkcja wymaga powrotu do listy indeksowanej.";

		parent.TOP.document.getElementById('btnContIndex').style.width = "40px";
		parent.TOP.document.getElementById('btnDtcIndex').style.width = "40px";
		parent.TOP.document.getElementById('btnSymIndex').style.width = "40px";
	}
	else if (lang=="ru") {
		strUI_btnCont = "Закладки";
		strUI_btnDtc = "Диагностические коды неисправностей";
		strUI_btnSym = "Признак";
		strUI_btnContIndex = "Перечень";
		strUI_btnContSearch = "Поиск";
		strUI_btnDtcIndex = "Перечень";
		strUI_btnDtcSearch = "Поиск";
		strUI_btnSymIndex = "Перечень";
		strUI_btnSymSearch = "Поиск";
		strUI_iconUndo = "Назад на предыдущую страницу";
		strUI_iconPrev = "Назад";
		strUI_iconNext = "Далее";
		strUI_iconPrint = "печать";
		strUI_iconReturn = "начальная страница";
		strUI_iconHelp = "справка";
		parent.CTL.document.ctl.err1.value = "Для использования этой функции вернитесь к перечню.";
	
		parent.TOP.document.getElementById('btnDtc').style.width = "240px";
		parent.TOP.document.getElementById('btnDtc1').style.width = "136px";
		parent.TOP.document.getElementById('btnDtc2').style.width = "90px";
	}
	else if (lang=="sl") {
		strUI_btnCont = "Záložky";
		strUI_btnDtc = "DTC";
		strUI_btnSym = "Symptóm";
		strUI_btnContIndex = "Obsah";
		strUI_btnContSearch = "Vyhľadať";
		strUI_btnDtcIndex = "Obsah";
		strUI_btnDtcSearch = "Vyhľadať";
		strUI_btnSymIndex = "Obsah";
		strUI_btnSymSearch = "Vyhľadať";
		strUI_iconUndo = "Späť na predchádzajúcu stranu";
		strUI_iconPrev = "Späť";
		strUI_iconNext = "Dopredu";
		strUI_iconPrint = "tlač";
		strUI_iconReturn = "titulná strana";
		strUI_iconHelp = "nápoveda";
		parent.CTL.document.ctl.err1.value = 'Ak chcete použiť túto funkciu, vráťte sa na "Záložky" (Záložky).';

		parent.TOP.document.getElementById('btnContIndex').style.width = "50px";
		parent.TOP.document.getElementById('btnDtcIndex').style.width = "50px";
		parent.TOP.document.getElementById('btnSymIndex').style.width = "50px";
	}
	else if (lang=="sp") {
		strUI_btnCont = "CONTENIDO";
		strUI_btnDtc = "DTC";
		strUI_btnSym = "Síntoma";
		strUI_btnContIndex = "Índice";
		strUI_btnContSearch = "Búsqueda";
		strUI_btnDtcIndex = "Índice";
		strUI_btnDtcSearch = "Búsqueda";
		strUI_btnSymIndex = "Índice";
		strUI_btnSymSearch = "Búsqueda";
		strUI_iconUndo = "Volver a la página anterior";
		strUI_iconPrev = "Anterior";
		strUI_iconNext = "Siguiente";
		strUI_iconPrint = "imprimir";
		strUI_iconReturn = "página inicial";
		strUI_iconHelp = "ayuda";
		parent.CTL.document.ctl.err1.value = 'Vuelva a "CONTENIDO" para utilizar esta función.';
	}
	else if (lang=="th") {
		strUI_btnCont = "คั่นหน้าหนังสือ";
		strUI_btnDtc = "รหัส DTC";
		strUI_btnSym = "อาการปัญหา";
		strUI_btnContIndex = "รายการดัชนี";
		strUI_btnContSearch = "การค้นหา";
		strUI_btnDtcIndex = "รายการดัชนี";
		strUI_btnDtcSearch = "การค้นหา";
		strUI_btnSymIndex = "รายการดัชนี";
		strUI_btnSymSearch = "การค้นหา";
		strUI_iconUndo = "กลับไปที่หน้าสุดท้าย";
		strUI_iconPrev = "ก่อนหน้า";
		strUI_iconNext = "ต่อไป";
		strUI_iconPrint = "พิมพ์";
		strUI_iconReturn = "หน้าแรก";
		strUI_iconHelp = "ช่วยเหลือ";
		parent.CTL.document.ctl.err1.value = "กลับไปที่รายการดัชนีเพื่อใช้ฟังก์นี้";

		parent.TOP.document.getElementById('btnContIndex').style.width = "66px";
		parent.TOP.document.getElementById('btnContSearch').style.width = "52px";
		parent.TOP.document.getElementById('btnDtcIndex').style.width = "66px";
		parent.TOP.document.getElementById('btnDtcSearch').style.width = "52px";
		parent.TOP.document.getElementById('btnSymIndex').style.width = "66px";
		parent.TOP.document.getElementById('btnSymSearch').style.width = "52px";
	}
	else {
		strUI_btnCont = "Bookmarks";
		strUI_btnDtc = "DTC";
		strUI_btnSym = "Symptom";
		strUI_btnContIndex = "Index List";
		strUI_btnContSearch = "Search";
		strUI_btnDtcIndex = "Index List";
		strUI_btnDtcSearch = "Search";
		strUI_btnSymIndex = "Index List";
		strUI_btnSymSearch = "Search";
		strUI_iconUndo = "Back to last page";
		strUI_iconPrev = "Previous";
		strUI_iconNext = "Next";
		strUI_iconPrint = "print";
		strUI_iconReturn = "front page";
		strUI_iconHelp = "help";
		parent.CTL.document.ctl.err1.value = "Return to Index List to use this function.";
	}

	parent.TOP.document.getElementById('btnContents').innerHTML = strUI_btnCont;
	parent.TOP.document.getElementById('btnDtc').innerHTML = strUI_btnDtc;
	parent.TOP.document.getElementById('btnSym').innerHTML = strUI_btnSym;
	parent.TOP.document.getElementById('btnContIndex').innerHTML = strUI_btnContIndex;
	parent.TOP.document.getElementById('btnContSearch').innerHTML = strUI_btnContSearch;
	parent.TOP.document.getElementById('btnDtcIndex').innerHTML = strUI_btnDtcIndex;
	parent.TOP.document.getElementById('btnDtcSearch').innerHTML = strUI_btnDtcSearch;
	parent.TOP.document.getElementById('btnSymIndex').innerHTML = strUI_btnSymIndex;
	parent.TOP.document.getElementById('btnSymSearch').innerHTML = strUI_btnSymSearch;
	parent.TOP.document.getElementById('iconUndo').title = strUI_iconUndo;
	parent.TOP.document.getElementById('iconPrev').title = strUI_iconPrev;
	parent.TOP.document.getElementById('iconNext').title = strUI_iconNext;
	parent.TOP.document.getElementById('iconPrint').title = strUI_iconPrint;
	parent.TOP.document.getElementById('iconReturn').title = strUI_iconReturn;
	parent.TOP.document.getElementById('iconHelp').title = strUI_iconHelp;
}

function setUI_xref() {
lang=parent.opener.parent.CTL.document.ctl.lang.value;
	if (lang=="du") {
		strUI_iconUndo = "Terug naar de laatste bladzijde";
		strUI_iconPrint = "afdrukken";
		strUI_iconClose = "sluiten";
		strUI_iconHelp = "help";
	}
	else if (lang=="fr") {
		strUI_iconUndo = "Retour à la dernière page";
		strUI_iconPrint = "imprimer";
		strUI_iconClose = "fermer";
		strUI_iconHelp = "aide";
	}
	else if (lang=="ge") {
		strUI_iconUndo = "Zurück zur letzten Seite";
		strUI_iconPrint = "drucken";
		strUI_iconClose = "schließen";
		strUI_iconHelp = "Hilfe";
	}
	else if (lang=="gk") {
		strUI_iconUndo = "Πίσω στην τελευταία σελίδα";
		strUI_iconPrint = "εκτύπωση";
		strUI_iconClose = "κλείσιμο";
		strUI_iconHelp = "βοήθεια";
	}
	else if (lang=="hr") {
		strUI_iconUndo = "Natrag na zadnju stranicu";
		strUI_iconPrint = "ispiši";
		strUI_iconClose = "zatvori";
		strUI_iconHelp = "pomoć";
	}
	else if (lang=="hu") {
		strUI_iconUndo = "Vissza az előző oldalra";
		strUI_iconPrint = "Nyomtatás";
		strUI_iconClose = "Bezárás";
		strUI_iconHelp = "Súgó";
	}
	else if (lang=="id") {
		strUI_iconUndo = "Kembali ke halaman terakhir";
		strUI_iconPrint = "Cetak";
		strUI_iconClose = "Tutup";
		strUI_iconHelp = "Bantuan";
	}
	else if (lang=="it") {
		strUI_iconUndo = "Torna alla pagina precedente";
		strUI_iconPrint = "stampa";
		strUI_iconClose = "chiudi";
		strUI_iconHelp = "guida";
	}
	else if (lang=="jp") {
		strUI_iconUndo = "元に戻る";
		strUI_iconPrint = "印刷";
		strUI_iconClose = "閉じる";
		strUI_iconHelp = "ヘルプ";
	}
	else if (lang=="pl") {
		strUI_iconUndo = "Do poprzednio wybranej strony";
		strUI_iconPrint = "drukuj";
		strUI_iconClose = "zamknij";
		strUI_iconHelp = "pomoc";
	}
	else if (lang=="ru") {
		strUI_iconUndo = "Назад на предыдущую страницу";
		strUI_iconPrint = "печать";
		strUI_iconClose = "закрыть";
		strUI_iconHelp = "справка";
	}
	else if (lang=="sl") {
		strUI_iconUndo = "Späť na predchádzajúcu stranu";
		strUI_iconPrint = "tlač";
		strUI_iconClose = "zavrieť";
		strUI_iconHelp = "nápoveda";
	}
	else if (lang=="sp") {
		strUI_iconUndo = "Volver a la página anterior";
		strUI_iconPrint = "imprimir";
		strUI_iconClose = "cerrar";
		strUI_iconHelp = "ayuda";
	}
	else if (lang=="th") {
		strUI_iconUndo = "กลับไปที่หน้าสุดท้าย";
		strUI_iconPrint = "พิมพ์";
		strUI_iconClose = "ปิด";
		strUI_iconHelp = "ช่วยเหลือ";
	}
	else {
		strUI_iconUndo = "Back to last page";
		strUI_iconPrint = "print";
		strUI_iconClose = "close";
		strUI_iconHelp = "help";
	}
		parent.XREFTOP.document.getElementById('iconUndo').title = strUI_iconUndo;
		parent.XREFTOP.document.getElementById('iconPrint').title = strUI_iconPrint;
		parent.XREFTOP.document.getElementById('iconClose').title = strUI_iconClose;
		parent.XREFTOP.document.getElementById('iconHelp').title = strUI_iconHelp;
}

function setUI_prereqs() {
lang=parent.opener.parent.CTL.document.ctl.lang.value;
	if (lang=="du") {
		strUI_iconClose = "sluiten";
	}
	else if (lang=="fr") {
		strUI_iconClose = "fermer";
	}
	else if (lang=="ge") {
		strUI_iconClose = "schließen";
	}
	else if (lang=="gk") {
		strUI_iconClose = "κλείσιμο";
	}
	else if (lang=="hr") {
		strUI_iconClose = "zatvori";
	}
	else if (lang=="hu") {
		strUI_iconClose = "Bezárás";
	}
	else if (lang=="id") {
		strUI_iconClose = "Tutup";
	}
	else if (lang=="it") {
		strUI_iconClose = "chiudi";
	}
	else if (lang=="jp") {
		strUI_iconClose = "閉じる";
	}
	else if (lang=="pl") {
		strUI_iconClose = "zamknij";
	}
	else if (lang=="ru") {
		strUI_iconClose = "закрыть";
	}
	else if (lang=="sl") {
		strUI_iconClose = "zavrieť";
	}
	else if (lang=="sp") {
		strUI_iconClose = "cerrar";
	}
	else if (lang=="th") {
		strUI_iconClose = "ปิด";
	}
	else {
		strUI_iconClose = "close";
	}
		parent.PRETOP.document.getElementById('iconClose').title = strUI_iconClose;
}

function getUI_strNoMatch(lang) {
	if (lang=="du") {
		strOut = "Geen overeenkomsten gevonden.";
	}
	else if (lang=="fr") {
		strOut = "Aucun résultat trouvé.";
	}
	else if (lang=="ge") {
		strOut = "Keine Übereinstimmungen gefunden.";
	}
	else if (lang=="gk") {
		strOut = "Δε βρέθηκαν αποτελέσματα.";
	}
	else if (lang=="hr") {
		strOut = "Nema rezultata pretraživanja.";
	}
	else if (lang=="hu") {
		strOut = "Nincs találat.";
	}
	else if (lang=="id") {
		strOut = "Tidak cocok.";
	}
	else if (lang=="it") {
		strOut = "Nessun risultato trovato";
	}
	else if (lang=="jp") {
		strOut = "見つかりませんでした。";
	}
	else if (lang=="pl") {
		strOut = "Nie znaleziono żadnej pozycji.";
	}
	else if (lang=="ru") {
		strOut = "Совпадений не найдено.";
	}
	else if (lang=="sl") {
		strOut = "Nenájdená žiadna zhoda.";
	}
	else if (lang=="sp") {
		strOut = "No se han encontrado resultados.";
	}
	else if (lang=="th") {
		strOut = "ไม่พบที่ตรงกัน";
	}
	else {
		strOut = "No matches found.";
	}
	return strOut;
}

function getUI_btnPrev(lang) {
	if (lang=="du") {
		strOut = "Vorige...";
	}
	else if (lang=="fr") {
		strOut = "Préc...";
	}
	else if (lang=="ge") {
		strOut = "Zurück...";
	}
	else if (lang=="gk") {
		strOut = "Προηγ...";
	}
	else if (lang=="hr") {
		strOut = "Preth...";
	}
	else if (lang=="hu") {
		strOut = "Előző...";
	}
	else if (lang=="id") {
		strOut = "Sebelumnya...";
	}
	else if (lang=="it") {
		strOut = "Prec...";
	}
	else if (lang=="jp") {
		strOut = "前へ";
	}
	else if (lang=="pl") {
		strOut = "Poprz...";
	}
	else if (lang=="ru") {
		strOut = "Назад...";
	}
	else if (lang=="sl") {
		strOut = "Predchádzajúce...";
	}
	else if (lang=="sp") {
		strOut = "Anterior";
	}
	else if (lang=="th") {
		strOut = "ก่อนหน้า...";
	}
	else {
		strOut = "Prev...";
	}
	return strOut;
}

function getUI_btnNext(lang) {
	if (lang=="du") {
		strOut = "Volgende...";
	}
	else if (lang=="fr") {
		strOut = "Suiv...";
	}
	else if (lang=="ge") {
		strOut = "Weiter...";
	}
	else if (lang=="gk") {
		strOut = "Επόμενο...";
	}
	else if (lang=="hr") {
		strOut = "Sljed...";
	}
	else if (lang=="hu") {
		strOut = "Következő...";
	}
	else if (lang=="id") {
		strOut = "Selanjutnya...";
	}
	else if (lang=="it") {
		strOut = "Succ...";
	}
	else if (lang=="jp") {
		strOut = "次へ";
	}
	else if (lang=="pl") {
		strOut = "Nast...";
	}
	else if (lang=="ru") {
		strOut = "Далее...";
	}
	else if (lang=="sl") {
		strOut = "Nasledujúce...";
	}
	else if (lang=="sp") {
		strOut = "Siguiente";
	}
	else if (lang=="th") {
		strOut = "ต่อไป...";
	}
	else {
		strOut = "Next...";
	}
	return strOut;
}

function getUI_strShowCurrentHits(lang,first,last,intHits) {
	if (lang=="du") {
		strOut = " (" + first + " - " + last + " van " + intHits + " treffers weergegeven) ";
	}
	else if (lang=="fr") {
		strOut = " (" + "affiche " + first + " - " + last + " de " + intHits + " résultats) ";
	}
	else if (lang=="ge") {
		strOut = " (" + "Zeigt " + first + " - " + last + " von " + intHits + " Treffern an) ";
	}
	else if (lang=="gk") {
		strOut = " (" + "Εμφάνιση " + first + " - " + last + " από τα " + intHits + " αποτελέσματα) ";
	}
	else if (lang=="hr") {
		strOut = " (" + "Pokazuje " + first + " - " + last + " od " + intHits + " rezultata) ";
	}
	else if (lang=="hu") {
		strOut = " (" + intHits + " találatból " + first + " - " + last + " megjelenítése) ";
	}
	else if (lang=="id") {
		strOut = " (" + "Menampilkan " + first + " - " + last + " dari " + intHits + ") ";
	}
	else if (lang=="it") {
		strOut = " (" + "Mostrare " + first + " - " + last + " dei " + intHits + " risultati) ";
	}
	else if (lang=="jp") {
		strOut = " (" + intHits + "件中 " + first + " - " + last + "件目) ";
	}
	else if (lang=="pl") {
		strOut = " (" + "Pokazane " + first + " - " + last + " spośród " + intHits + " znalezionych) ";
	}
	else if (lang=="ru") {
		strOut = " (" + "Отображение " + first + " - " + last + " " + intHits + " совпадений) ";
	}
	else if (lang=="sl") {
		strOut = " (" + "Zobrazenie " + first + " - " + last + " z " + intHits + " nájdených) ";
	}
	else if (lang=="sp") {
		strOut = " (" + "Muestra " + first + " - " + last + " de los resultados " + intHits + ") ";
	}
	else if (lang=="th") {
		strOut = " (" + "แสดง " + first + " - " + last + " ของ " + intHits + " กระทบ) ";
	}
	else {
		strOut = " (" + "Showing " + first + " - " + last + " of " + intHits + " hits) ";
	}
	return strOut;
}

function getUI_strSection(lang) {
	if (lang=="du") {
		strOut = "Hoofdstuk";
	}
	else if (lang=="fr") {
		strOut = "Section";
	}
	else if (lang=="ge") {
		strOut = "Abschnitt";
	}
	else if (lang=="gk") {
		strOut = "Κεφάλαιο";
	}
	else if (lang=="hr") {
		strOut = "Poglavlje";
	}
	else if (lang=="hu") {
		strOut = "Fejezet";
	}
	else if (lang=="id") {
		strOut = "Bab";
	}
	else if (lang=="it") {
		strOut = "Sezione";
	}
	else if (lang=="jp") {
		strOut = "セクション";
	}
	else if (lang=="pl") {
		strOut = "Sekcja";
	}
	else if (lang=="ru") {
		strOut = "Раздел";
	}
	else if (lang=="sl") {
		strOut = "Časť";
	}
	else if (lang=="sp") {
		strOut = "Sección";
	}
	else if (lang=="th") {
		strOut = "หมวด";
	}
	else {
		strOut = "Section";
	}
	return strOut;
}

