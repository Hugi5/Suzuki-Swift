/*************************************************/
// 変数
/*************************************************/
var objSVG;
var svgWidth;
var svgHeight;
var gBairitu;
var dispWidth;
var dispHeight;

/*************************************************/
// SVGロードイベント
/*************************************************/
// サイズ変更
function svg_load(){

	//SVGオブジェクト取得
	objSVG = document.svgDiagram.getSVGDocument();

	//SVGの原寸を取得
	svgWidth = objSVG.getElementById("svgObj").getAttribute("width");
	svgHeight = objSVG.getElementById("svgObj").getAttribute("height");

	//表示領域の取得
	dispWidth = document.body.clientWidth - 20;
	dispHeight = document.body.clientHeight - 50;

	document.svgDiagram.width = svgWidth;
	document.svgDiagram.height = svgHeight;

	gBairitu = 1;

}

/*************************************************/
// ウィンドウリサイズ時
/*************************************************/
function fncResize() {

	//表示領域の取得
	dispWidth = document.body.clientWidth - 20;
	dispHeight = document.body.clientHeight - 50;

}

/*************************************************/
// ツールバー
/*************************************************/
// サイズ変更
function size(prmKbn) {

	// 図が表示されていない時は処理をしない
	if (objSVG == null) return;

	switch (prmKbn) {
		case 'fit':
			fit();
			break;
		case 'in':
			zoomInOut('in');
			break;
		case 'out':
			zoomInOut('out');
			break;
		case 'fitheight':
			fit_Heigth();
			break;
		default:
			break;
	}

}

// 拡大・縮小
function zoomInOut(prm) {

	var bairitu = 0;

	switch (prm) {
		case 'in':
			parsent("big");
			break;
		case 'out':
			parsent("small");
			break;
		default:
			break;
	}
}

// 拡縮算出
function parsent(prm){

	var intIndex;
	var intNowBairitu;
	var intNewBairitu = "";
	intIndex = 4;
	intNowBairitu = gBairitu;
	var blnSmall = false;
	var blnBig = false;

	//最小倍率以下で縮小ボタンを押した場合、処理をしない。
	if(intNowBairitu <= intBairitu[0] && prm == "small"){

	//最大倍率以上で拡大ボタンを押した場合、処理をしない。
	}else if(intNowBairitu >= intBairitu[intBairitu.length-1] && prm == "big"){

	//倍率指定処理
	}else{
		//配列の値を超えたら処理を終わる
		while(intIndex >= 0 && intIndex <= 9){
			if(intNowBairitu == intBairitu[intIndex]){
				if(prm == "small"){
					intNewBairitu = intBairitu[intIndex - 1];
				}else if (prm == "big") {
					intNewBairitu = intBairitu[intIndex + 1];
				}
				break;
			}

			if(intNowBairitu < intBairitu[intIndex]){
				if(blnBig){
					if(prm == "small"){
						intNewBairitu = intBairitu[intIndex - 1];
					}else if (prm == "big") {
						intNewBairitu = intBairitu[intIndex];
					}
					break;
				}else{
					intIndex = intIndex - 1;
					blnSmall = true;
				}
			}

			if(intNowBairitu > intBairitu[intIndex]){
				if(blnSmall){
					if(prm == "small"){
						intNewBairitu = intBairitu[intIndex];
					}else if (prm == "big") {
						intNewBairitu = intBairitu[intIndex + 1];
					}
					break;
				}else{
					intIndex = intIndex + 1;
					blnBig = true;
				}
			}
		}

		//サイズ変更を行う
		size_change(intNewBairitu);
	}
}

// 画面フィット
function fit() {

	var bairitu;

	//倍率を算出
	var bairituH = dispHeight / svgHeight;
	var bairituW = dispWidth / svgWidth;

	//小さい方の倍率を使う
	bairitu = Math.min(bairituW,bairituH)

	// サイズ変更
	size_change(bairitu);

}

// 画面縦フィット
function fit_Heigth() {

	//倍率を算出
	var bairitu = dispHeight / svgHeight;

	// サイズ変更
	size_change(bairitu);

}

// サイズ変更
function size_change(prmSize){

	if (prmSize < 0.33 || prmSize > 4) {
		return;
	}
	gBairitu = prmSize;

	document.svgDiagram.width = svgWidth * prmSize;
	document.svgDiagram.height = svgHeight * prmSize;

}


// 印刷プレビュー
function preview() {

	// 図が表示されていない時は処理をしない

	var params = $H({});

	if(! objSVG) return;
	params.src = document.svgDiagram.src;
	if(document.svgDiagram.selected_code){
		params.code = document.svgDiagram.selected_code;
	}

	var url = "preview.html?language=" + CUR_LANGUAGE + "&" + params.toQueryString();
	params = $H({
		width: 700,
		height: 800,
		resizable:'yes'
	});
	window.open(url, "_blank","location=1,menubar=1,status=1,"+params.toQueryString().gsub(/\&/, ','));

}

