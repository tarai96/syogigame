// JavaScript source code
// グローバルに展開
phina.globalize();
// アセット
var ASSETS = {
	// 画像
	image: {
	 'hu': "image/syougi14_fuhyou.png",
	 'ban': "image/syougi_ban.png",
	},
};
var capturedPiece = [];
var currentMass = 0;
var turn = 0;
var hold = false;
var holdPiece = 0;
var flag = false;
var caught = false;
var pieceList = [];
var previousMass = 0;
var i = 0;
var j = 0;
/*
 * メインシーン
 */
phina.define("MainScene", {
  // 継承
  superClass: 'DisplayScene',
  // 初期化
  init: function() {
	// 親クラス初期化
	this.superInit();
	// 背景色
	this.backgroundColor = 'skyblue';

	var capturedPiece = [];
	var currentMass = 0;
	var turn = 0;
	var hold = false;
	var holdPiece = 0;
	var flag = false;
	var caught = false;
	var pieceList = [];
	var previousMass = 0;
	var i = 0;
	var j = 0;

	var NUM_WIDTHMASS = 9;
	var NUM_HEIGHTMASS = 9;
	var NUM_ALLMASS = NUM_HEIGHTMASS * NUM_WIDTHMASS;
	var BOARD_MARJIN = 5;
	var NUM_HU = 2;
	var NUM_OSYO = 2;
	// 駒初期化
	// メモ actions １次元相対座標そのコマの座標を0として
	//              x+y*(横のマス数)
	var actions = [];

	for (i = 0; i < 2; i++) {
		actions[i] = [];
	}

	var size = new Size(50,50);

	//歩 no.1
	actions[0][0] = -1 * NUM_WIDTHMASS;
	var hu = new SyogiPiece(size,actions[0]);
	var husStatus = new Array(NUM_HU).fill(new SyogiPieceStatus(0));
	husStatus[1].player = 1;
	console.log(actions[0]);

	//王将 no.2
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
	var A = actions[1];
	console.log(A);
	var osyo = new SyogiPiece(size,actions[1]);
	var osyosStatus = new Array(NUM_OSYO).fill(new SyogiPieceStatus(0));
	osyosStatus[1].player = 1;

	// 駒のリスト
	pieceList[0] = hu;
	pieceList[1] = osyo;

	// 持ち駒初期化
	// capturedPiece 2次元配列 0 自分　1 相手
	for(i = 0; i < 2; i++) { capturedPiece.push(Array(64).fill(0)); }

	// 盤面初期化
	// board　相手の駒はマイナス
	var board = new Array(NUM_ALLMASS).fill(0);
	var mass_positionx = 320;
	var mass_positiony = 480;
	var mass_size = (500 - 2*BOARD_MARJIN) / NUM_WIDTHMASS;
	
	board[3] = 2;
	board[3 + (NUM_WIDTHMASS * 1)] = 1;
	board[3 + (NUM_WIDTHMASS * 4)] = 1;
	board[3 + (NUM_WIDTHMASS * 5)] = 2;

	// Sprite
	var board = Sprite('ban').addChildTo(this)
				.setPosition(mass_positionx, mass_positiony);
	var hu_0 = Sprite('hu').addChildTo(this)
				.setPosition(320, 480).setSize(mass_size, mass_size);
	var hu_1 = Sprite('hu').addChildTo(this)
				.setPosition(320, 480).setSize(mass_size, mass_size);

  },
  // 毎フレーム更新処理
  update: function() {
	// 以下にコードを書いていく  
  },
});
/*
 * メイン処理
 */
phina.main(function() {
  // アプリケーションを生成
  var app = GameApp({
	// MainScene から開始
	startLabel: 'main',
	// アセット読み込み
	assets: ASSETS,
  });
  // fps表示
  app.enableStats();
  // 実行
  app.run();
});