// JavaScript source code

/*
/// excelファイル読み込むならここで初期化しない変数 ////////////
var NUM_WIDTHMASS = 9;
var NUM_HEIGHTMASS = 9;
var NUM_ALLMASS = NUM_HEIGHTMASS * NUM_WIDTHMASS;
var NUM_HU = 2;
var NUM_OSYO = 2;


var NUM_PIECE = [NUM_HU,NUM_OSYO];
////////////////////////////////////////////////////////////////////

var actions = [];

for (i = 0; i < 2; i++) {
	actions[i] = [];
}
// 歩
actions[0][0] = -1 * NUM_WIDTHMASS;
//王将
cnt = 0;
for(j = -(NUM_WIDTHMASS + 1); j <= NUM_WIDTHMASS; j++){
	if (-1 * (NUM_WIDTHMASS + 1) <= j && j <= -1 * (NUM_WIDTHMASS - 1)) {
		actions[1][cnt] = j;
		cnt++;
	}else if(j == -1 || j == 1){
		actions[1][cnt] = j;
		cnt++;
	}else if(NUM_WIDTHMASS - 1 <= j && j <= NUM_WIDTHMASS + 1){
		actions[1][cnt] = j;
		cnt++;
	}
}
*/

function seed_to_index(seed){
	return seed - 1;
}

function syogi_init(board_array,NUM_WIDTHMASS,NUM_HEIGHTMASS){
	// 配列を読み込んで、piece_status,piece_seed_list,NUM_PIECEを返す(未実装)
	console.log("board_array");
	console.log(board_array);
	// 多次元配列 0:歩 1:王玉将
	/*
	for (var i = 0; i < 2; i++) {
		piece_status[i] = [];
	}
	*/
	// メモ配列初期化 var board_array = new Array(NUM_ALLMASS).fill(0);
	var piece_status = [[],[],[],[],[],[],[],[],[],[],[]];
	var player = 0;
	var seed = 0;
	var NUM_PIECE = [0,0,0,0,0,0,0,0,0,0,0,0,0];
	for(var i=0;i<NUM_WIDTHMASS*NUM_HEIGHTMASS;i++){ 
	  if(board_array[i] != 0){
	    if(board_array[i] < 0){
		  seed = -board_array[i];
		  player = 1;
		}else{
		  seed = board_array[i];
		  player = 0;
		}
	    piece_status[seed_to_index(seed)].push(new SyogiPieceStatus(player,mass = i));
	    NUM_PIECE[seed_to_index(seed)] += 1;
	  }

	}
	// 駒種クラスの初期化
	// 各駒種のアクション
	// メモ actions １次元相対座標そのコマの座標を0として
	//              x+y*(横のマス数)
	/*
	for (var i = 0; i < 2; i++) {
		actions[i] = [];
	}
	*/
	var actions = [[],[],[],[],[],[],[],[],[],[],[],[]];
	var cnt = 0;
	actions[0][0] = -1 * NUM_WIDTHMASS;
	cnt = 0;
	for(j = -(NUM_WIDTHMASS + 1); j <= NUM_WIDTHMASS+1; j++){
		if (-1 * (NUM_WIDTHMASS + 1) <= j && j <= -1 * (NUM_WIDTHMASS - 1)) {
			actions[1][cnt] = j;
			cnt++;
		}else if(j == -1 || j == 1){
			actions[1][cnt] = j;
			cnt++;
		}else if(NUM_WIDTHMASS - 1 <= j && j <= NUM_WIDTHMASS + 1){
			actions[1][cnt] = j;
			cnt++;
		}
	}
	// 仮のアクション
	for(var i=2;i<12;i++){
		actions[i][0] = -1 * NUM_WIDTHMASS - 1
	}
	
	var piece_seed_list = [];
	var HU = new SyogiPiece(actions[0]);
	var OSYO = new SyogiPiece(actions[1]);

	for(var i =0;i<12;i++){
		piece_seed_list.push(new SyogiPiece(actions[i]));
	}

	// TODO ほかの初期化追加

	console.log("piece_status,piece_seed_list,NUM_PIECE");
	console.log(piece_status,piece_seed_list,NUM_PIECE);
	return {piece_status ,piece_seed_list ,NUM_PIECE};
}

