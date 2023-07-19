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
var currentMass = 0;
var turn = 0;
var hold = false;
var holdPiece = 0;
var mouse = new Point(0,0);
var reservePieces = [];
var pieceStatus = [];
var flag = false;
var caught = false;
var piece_seed_list = [];
var piece_list = [];
var previousMass = 0;
var gameStatus = ""
var turn = 0;
var dragging = false;
var dragging_piece = -1
var i = 0;
var j = 0;


var NUM_WIDTHMASS = 9;
var NUM_HEIGHTMASS = 9;
var NUM_ALLMASS = NUM_HEIGHTMASS * NUM_WIDTHMASS;
var BOARD_MARJIN = 5;
var NUM_HU = 2;
var NUM_OSYO = 2;

// 盤面に駒がどこにあるかの配列を返す
function get_piece_position(board ,number_piece){
	var position_list = [];
	for(var j = 0;j < NUM_HEIGHTMASS;j++){
        for(i = 0;i < NUM_WIDTHMASS;i++){
            // 
            if (board[i + (NUM_WIDTHMASS * j)] == number_piece){
                position_list.push(new Size(i,j));
            }
        }
    }
	return position_list;
}

function get_valid_actions(board, number_piece, control_number){
	var actions_list = [];
	if(pieceStatus[number_piece - 1][control_number].reserve){
		return [];
	}
	var x=0;
	var y=0;
	for(var i in piece_seed_list[number_piece].actions){
		x = pieceStatus[number_piece-1][control_number].position.x + piece_seed_list[number_piece].actions.x;
		y = pieceStatus[number_piece-1][control_number].position.y + piece_seed_list[number_piece].actions.y;
		actions_list.push(new Point(x,y));
	}
	return actions_list;
}

function get_num_enemy_piece(board_group){
	var cnt = 0;
	for(i=0;i<NUM_HU;i++){
		if(board_group.children[i+1].player == -1){
			cnt++;
		}
	}
	return cnt;
}

function get_valid_actions(state, n_piece){
	var valid_actions = [];
	var piece = board_group.children[n_piece+1]
	for(var i=0;i<NUM_ALLMASS;i++){
		if(piece.position + piece.actions[i] < 0 && piece.position + piece.actions[i] >= NUM_ALLMASS){
			// 将棋盤の外
			continue;
		}else if(state[board_group.children[piece+1].actions[i]] != board_group.children[piece+1].player){
			// 動こうとするマスにこの駒の味方の駒がいなければ動ける
			valid_actions.push(board_group.children[piece+1].actions[i]);
		}
	}
	return valid_actions;
}

function set_initial_state(state, positions){
	for(var seed=0;seed<positions.length;seed++){
		for(var idx=0;idx<positions[idx].length;idx++){
			state[positions[seed][idx]] = seed
		}
	}
}

phina.define("Hu", {
	//Spriteクラスを継承
	superClass: 'Sprite',
	init: function(mass, actions, player, reserve=false) {
		// 親クラス初期化
		this.superInit('hu');
		this.mass = mass;
		this.previousMass = mass;
		this.actions = action;
		this.player = player;
		this.reserve = false;
		// 駒種　歩
		this.seed = 1;
	},
});

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

	var currentMass = 0;
	var hold = false;
	var holdPiece = 0;
	var flag = false;
	var caught = false;
	var piece_seed_list = [];
	var previousMass = 0;
	var i = 0;
	var j = 0;

	var NUM_WIDTHMASS = 9;
	var NUM_HEIGHTMASS = 9;
	var NUM_ALLMASS = NUM_HEIGHTMASS * NUM_WIDTHMASS;
	var BOARD_MARJIN = 5;
	var NUM_HU = 9;
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
	// var huGroup = DisplayElement().addChildTo(this);

	actions[0][0] = -1 * NUM_WIDTHMASS;
	var hu = new SyogiPiece(size,actions[0]);
	var husStatus = new Array(NUM_HU).fill(new SyogiPieceStatus(0));
	husStatus[1].player = 1;
	console.log(actions[0]);
	pieceStatus.push(husStatus);

	for(i=0;i<NUM_HU;i++){
		// mass,action,player 仮
		piece_list.push(Hu(-1,hu.actions,0));

	//王将 no.2
	// var osyoGroup = DisplayElement().addChildTo(this);

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
	pieceStatus.push(osyosStatus);

	// 駒のリスト
	piece_seed_list[0] = hu;
	piece_seed_list[1] = osyo;

	// 持ち駒初期化
	// reservePieces 2次元配列 0 自分　1 相手
	for(i = 0; i < 2; i++) { reservePieces.push(Array(64).fill(0)); }

	// 盤面初期化
	// board_array　相手の駒はマイナス
	var board_array = new Array(NUM_ALLMASS).fill(0);
	var mass_size = 50;
	console.log("mass_size",mass_size);
	
	board_array[3] = -2;
	board_array[3 + (NUM_WIDTHMASS * 1)] = -1;
	board_array[4 + (NUM_WIDTHMASS * 4)] = 1;
	board_array[3 + (NUM_WIDTHMASS * 5)] = 2;

	  board_array[0 + (NUM_WIDTHMASS * 0)] = 1;
	  board_array[1 + (NUM_WIDTHMASS * 2)] = 1;
	  board_array[2 + (NUM_WIDTHMASS * 3)] = -1;
	  board_array[5 + (NUM_WIDTHMASS * 5)] = 1;
	  board_array[6 + (NUM_WIDTHMASS * 6)] = -1;
	  board_array[7 + (NUM_WIDTHMASS * 7)] = 1;
	  board_array[8 + (NUM_WIDTHMASS * 8)] = 1;

	// Sprite
	  var board_group = DisplayElement().addChildTo(this);
	  board_group.setPosition(this.gridX.center(), this.gridY.center());
	// board 
	Sprite('ban').addChildTo(board_group)
	  console.log(board_array.width, board_array.height);	// 460, 500
	var reverce = 1;
	// 歩
	var hu_positions = [];
	hu_positions = get_piece_position(board_array,1);
	console.log(hu_positions);
	for(i=0;i<NUM_HU;i++){
		// 敵は表示を上下反転
		if(piece_list[i].player == 1){
			reverce = -1;
		}
		piece_list[i].addChildTo(board_group)
			.setPosition(48 * (piece_list[i].position.x - (NUM_WIDTHMASS - 1) / 2) + 0,
				52 * (piece_list[i].position.y - (NUM_HEIGHTMASS - 1) / 2) + 0)
			.setSize(mass_size, mass_size)
			.on('pointstart', function(){
				// 駒を選ぶとき
				dragging = true;
				board_group.children[i+1].previousMass = board_group.children[i+1].mass
				// 将棋盤の当たり判定オブジェクトのタッチイベントを有効にする
				// 駒が動ける場所だけ
				var valid_actions = get_valid_action(board_array,dragging_piece);
				for(j=0;j<NUM_WIDTHMASS*NUM_HEIGHTMASS;j++){
					if(valid_actions.includes(j)){
						board_group.children[j+1+NUM_HU].setInteractive(true);
					}
				}
			});
		board_group.children[i+1].scaleY *= reverce;
	  }
	  console.log(board_group);

	/*
	// 王将
	var osyo_positions = [];
	osyo_positions = get_piece_position(board_array, 2);
	for(i=0;i<NUM_OSYO;i++){
		if(osyosStatus[i].player == 1){
			reverce = -1;
		}else{
			reverce = 1;
		}
		Sprite('osyo').addChildTo(osyoGroup)
			.setPosition(50 * osyo_positions[i].x + 115,
						50 * hu_positions[i].y + 255)
			.setSize(mass_size, mass_size);
		osyoGroup[i].scaleY *= reverce;
	}

	// 金
	var kin_positions = [];
	kin_positions = get_piece_position(board_array, ?);
	for(i=0;i<2;i++){
		Sprite('osyo').addChildTo(osyoGroup)
			.setPosition(50 * osyo_positions[i].x + 115,
						50 * hu_positions[i].y + 255)
			.setSize(mass_size, mass_size);
	}
	*/

	// 将棋盤の当たり判定ます
	  for (j = 0; j < NUM_HEIGHTMASS; j++) {
		  for (i = 0; i < NUM_WIDTHMASS; i++) {
			  // RectangleShape
			  RectangleShape({
				  width: 45,
				  height: 49,
				  fill: 'red',
				  // stroke: 'lime',
				  strokeWidth: 0,
				  cornerRadius: 0
			  }).addChildTo(board_group)
				.setPosition(48 * (i - (NUM_WIDTHMASS - 1) / 2) + 0,
					52 * (j - (NUM_HEIGHTMASS - 1) / 2) + 0)
				.on('pointstart', function(){
					// 駒を置くとき
					// タッチイベントを無効にする 有効にしてたマスだけ　動けたとこだけ
					var valid_actions = get_valid_action(board_array,dragging_piece);
					for(var l=0;l<NUM_WIDTHMASS*NUM_HEIGHTMASS;l++){
						if(valid_actions.includes(l)){
							board_group.children[l+1+NUM_HU].setInteractive(false);
						}
					}
					board_group.children[dragging_piece].mass = (i%NUM_WIDTHMASS,Math.floor(i/NUM_WIDTHMASS));
					board_array[board_group.children[dragging_piece].previousMass] = 0;
					board_array[i] = board_group.children[dragging_piece].syurui * board_group.children[dragging_piece].player;
					dragging = false;
					turn = 1;
				});
			  board_group.children[i + j * NUM_WIDTHMASS + 1 + NUM_HU].alpha = 0.25;		  }
		   }
	   }
	  /*
	  // タッチイベント
	  this.onpointmove = function (e) {
		  // タッチ位置
		  mouse.x = e.pointer.x;
		  mouse.y = e.pointer.y;
	  };
	  */
  },
  // 毎フレーム更新処理
  update: function() {
	// 自分の番
	if(turn == 0){
		if(dragging){
			board_group.children[dragging_piece].setposition(mouse.x,mouse.y);
			// 当たり判定 ちょっと光らせる
			for(i=0;i<NUM_WIDTHMASS*NUM_HEIGHTMASS;i++){
				if(board_group.children[dragging_piece]
					.hitTestElement(board_group.children[i+1+NUM_HU])){
					board_group.children[i+1+NUM_HU].alpha = 0.1;
				}else{
					board_group.children[i+1+NUM_HU].alpha = 0;
				}
			}
		}
	// 相手の番
	}else if(turn == 1){
		var activePiece;
		
		// 動かすコマ
		activePiece = Math.floor(Math.random() * get_num_enemy_piece());
		var cnt = 0;
		for(i=0;i<NUM_HU;i++){
			if(board_group.children[i+1].player == -1){
				if(cnt==activePiece){
				break;
				}
				cnt++;
			}
		}
		board_group.children[activeMass].previousMass = board_group.children[activeMass].mass;
		// どこに動く
		var valid_action = get_valid_action(board_group.children[i]);
		var action = Math.floor(Math.random() * valid_action.length);
		board_group.children[activePiece].mass += board_group.children[activePiece].actions[action];
		board_array[board_group.children[activePiece].previousMass] = 0;
		board_array[i] = board_group.children[activePiece].syurui * board_group.children[activePiece].player
		turn = 0;
		// ターン終了
		// 駒のタッチを有効にする
		for(i=0;i<NUM_HU;i++){
			board_group.children[i+1].setInteractive(true);
		}
	}
  },
});

phina.define("ResultScene", {
  // 継承
  superClass: 'DisplayScene',
  // 初期化
  init: function() {
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
});// JavaScript source code
