// JavaScript source code
// グローバルに展開
phina.globalize();
// アセット
var ASSETS = {
	// 画像
	image: {
	'hu': "image/syougi14_fuhyou.png",
	'osyo': "image/syougi01_ousyou.png",
	'hisya' : "image/syougi03_hisya.png",
	'kaku' : "image/syougi05_gakugyou.png",
	'kin' : "image/syougi07_kinsyou.png",
	'gin' : "image/syougi08_ginsyou.png",
	'keima' : "image/syougi10_keima.png",
	'ban': "image/syougi_ban.png",
	},
};
var currentMass = 0;
var turn = 0;
var hold = false;
var holdPiece = 0;
var mouse = new Point(0,0);
var reservePieces = [];
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

// 盤面に駒がどこにあるかの配列を返す
function get_piece_mass(board,number_piece){
	var mass_list = [];
	for(var j = 0;j < NUM_HEIGHTMASS;j++){
		for(i = 0;i < NUM_WIDTHMASS;i++){
			// 
			if (board[i + (NUM_WIDTHMASS * j)] == number_piece){
				mass_list.push(new position(i,j));
			}
		}
	}
	return mass_list;
}
// 一つの駒を指定し動けるマスを座標で返す
function get_valid_actions(board, piece_seed_list, piece_status, number_piece, control_number){
	var actions_list = [];
	if(piece_status[number_piece - 1][control_number].reserve){
		return [];
	}
	var x=0;
	var y=0;
	// 駒種のアクションを実際の座標に直す
	for(var i in piece_seed_list[number_piece].actions){
		x = piece_status[number_piece-1][control_number].mass.x + piece_seed_list[number_piece].actions.x;
		y = piece_status[number_piece-1][control_number].mass.y + piece_seed_list[number_piece].actions.y;
		actions_list.push(new Point(x,y));
	}
	// Todo: 下のget_valid_actionsを参考にget_valid_actionを作る
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
/*
// なんか二つ作ってたので一つは封印
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
*/

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
		this.actions = actions;
		this.player = player;
		this.reserve = reserve;
		// 駒種　歩
		this.seed = 1;
	},
});

phina.define("Osyo", {
	//Spriteクラスを継承
	superClass: 'Sprite',
	init: function(mass, actions, player, reserve=false) {
		// 親クラス初期化
		this.superInit('osyo');
		this.mass = mass;
		this.previousMass = mass;
		this.actions = actions;
		this.player = player;
		this.reserve = reserve;
		// 駒種　王将
		this.seed = 2;
	},
});
//TODO seedをつける
phina.define("Hisya", {
	//Spriteクラスを継承
	superClass: 'Sprite',
	init: function(mass, actions, player, reserve=false) {
		// 親クラス初期化
		this.superInit('hisya');
		this.mass = mass;
		this.previousMass = mass;
		this.actions = actions;
		this.player = player;
		this.reserve = reserve;
		// 駒種　王将
		this.seed = 0;
	},
});

phina.define("Kaku", {
	//Spriteクラスを継承
	superClass: 'Sprite',
	init: function(mass, actions, player, reserve=false) {
		// 親クラス初期化
		this.superInit('kaku');
		this.mass = mass;
		this.previousMass = mass;
		this.actions = actions;
		this.player = player;
		this.reserve = reserve;
		// 駒種　王将
		this.seed = 0;
	},
});

phina.define("Kin", {
	//Spriteクラスを継承
	superClass: 'Sprite',
	init: function(mass, actions, player, reserve=false) {
		// 親クラス初期化
		this.superInit('kin');
		this.mass = mass;
		this.previousMass = mass;
		this.actions = actions;
		this.player = player;
		this.reserve = reserve;
		// 駒種　王将
		this.seed = 0;
	},
});

phina.define("Gin", {
	//Spriteクラスを継承
	superClass: 'Sprite',
	init: function(mass, actions, player, reserve=false) {
		// 親クラス初期化
		this.superInit('gin');
		this.mass = mass;
		this.previousMass = mass;
		this.actions = actions;
		this.player = player;
		this.reserve = reserve;
		// 駒種　王将
		this.seed = 0;
	},
});

phina.define("Keima", {
	//Spriteクラスを継承
	superClass: 'Sprite',
	init: function(mass, actions, player, reserve=false) {
		// 親クラス初期化
		this.superInit('keima');
		this.mass = mass;
		this.previousMass = mass;
		this.actions = actions;
		this.player = player;
		this.reserve = reserve;
		// 駒種　王将
		this.seed = 0;
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
	var piece_status = []
	var previousMass = 0;
	var i = 0;
	var j = 0;

	var NUM_WIDTHMASS = 9;
	var NUM_HEIGHTMASS = 9;
	var NUM_ALLMASS = NUM_HEIGHTMASS * NUM_WIDTHMASS;
	var BOARD_MARJIN = 5;

	// 盤面初期化
	// board_array　相手の駒はマイナス
	var board_array = [0, 0, 0, 0, 0, 0, 0, 0, 0,
						0, 0, 0, 0, 0, 0, 0, 0, 0,
						-1,-1,-1,-1,-1,-1,-1,-1,-1,
						0, 0, 0, 0, 0, 0, 0, 0, 0,
						0, 0, 0, 0, 0, 0, 0, 0, 0,
						0, 0, 0, 0, 0, 0, 0, 0, 0,
						1, 1, 1, 1, 1, 1, 1, 1, 1,
						0, 0, 0, 0, 0, 0, 0, 0, 0,
						0, 0, 0, 0, 0, 0, 0, 0, 0,
						]

    let num_piece = [];
	[piece_status,piece_seed_list,num_piece] = syogi_init(board_array,NUM_WIDTHMASS,NUM_HEIGHTMASS);
    const NUM_PIECE = num_piece;
    const SUM_PIECE = sum_2darray(NUM_PIECE);
    console.log("piece_status,piece_seed_list,NUM_PIECE");
	console.log(piece_status,piece_seed_list,NUM_PIECE);
	// 駒初期化

	// メモ　game本体 piece_status[駒種-1][通し番号]
	//       Sprite piece_list[番号] 番号の求め方（仮）(駒種ごとの駒の数のそれまでの合計)+(上の通し番号)

	//歩 no.1
	for(let i=0;i<NUM_PIECE[0];i++){
		// mass,action,player 
		piece_list.push(Hu(piece_status[0][i].mass,piece_seed_list[0].actions,piece_status[0][i].player));
	}
	//王将 no.2
	for(let i=0;i<NUM_PIECE[1];i++){
		// mass,action,player 
		piece_list.push(Osyo(piece_status[1][i].mass,piece_seed_list[1].actions,piece_status[1][i].player));
	}

	// 持ち駒初期化
	// reservePieces 2次元配列 0 自分　1 相手
	for(let i = 0; i < 2; i++) { reservePieces.push(Array(64).fill(0)); }

	var mass_size = 50;
	console.log("mass_size",mass_size);
	
	// Sprite
	var board_group = DisplayElement().addChildTo(this);
	board_group.setPosition(this.gridX.center(), this.gridY.center());
	// board 
	Sprite('ban').addChildTo(board_group)
	var reverce = 1;
	// 歩
	/*
	var hu_masses = [];
	hu_masses = get_piece_mass(board_array,1);
	console.log("hu_masss");
	console.log(hu_masses);
	console.log("piece_list");
	console.log(piece_list);
	var mass_x = 0;
	var mass_y = 0;
	*/
	console.log("piece_list")
	console.log(piece_list)

	// TODO for文に歩の数だけ回すようになってるからすべての駒の数にする
	for(i=0;i<NUM_PIECE[0];i++){
		// 敵は表示を上下反転
		if(piece_list[i].player == 1){
			reverce = -1;
		}else{
			reverce = 1;
		}
		mass_x = piece_list[i].mass;
		for(mass_y = 0;mass_x >= NUM_WIDTHMASS;mass_y++){
			mass_x -= NUM_WIDTHMASS;
		}
		console.log("massxy");
		console.log(mass_x,mass_y);
		piece_list[i].addChildTo(board_group)
			.setPosition(48 * (mass_x - (NUM_WIDTHMASS - 1) / 2) + 0,
				52 * (mass_y - (NUM_HEIGHTMASS - 1) / 2) + 0)
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
	var osyo_masses = [];
	osyo_masses = get_piece_mass(board_array, 2);
	for(i=0;i<NUM_OSYO;i++){
		if(osyosStatus[i].player == 1){
			reverce = -1;
		}else{
			reverce = 1;
		}
		Sprite('osyo').addChildTo(osyoGroup)
			.setPosition(50 * osyo_masses[i].x + 115,
						50 * hu_masses[i].y + 255)
			.setSize(mass_size, mass_size);
		osyoGroup[i].scaleY *= reverce;
	}

	// 金
	var kin_masses = [];
	kin_masses = get_piece_mass(board_array, ?);
	for(i=0;i<2;i++){
		Sprite('osyo').addChildTo(osyoGroup)
			.setPosition(50 * osyo_masses[i].x + 115,
						50 * hu_masses[i].y + 255)
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
				if (valid_actions.includes(l)) {
					board_group.children[l + 1 + SUM_PIECE].setInteractive(false);
				}
			}
			board_group.children[dragging_piece].mass = (i%NUM_WIDTHMASS,Math.floor(i/NUM_WIDTHMASS));
			board_array[board_group.children[dragging_piece].previousMass] = 0;
			board_array[i] = board_group.children[dragging_piece].syurui * board_group.children[dragging_piece].player;
			dragging = false;
			turn = 1;
		});
			board_group.children[i + j * NUM_WIDTHMASS + 1 + SUM_PIECE].alpha = 0.0;
		}
	}
	},
	// 毎フレーム更新処理
	update: function() {
	console.log("turn",turn,"dragging",dragging);
	// 自分の番
	if(turn == 0){
		if(dragging){
			board_group.children[dragging_piece].setposition(mouse.x,mouse.y);
			// 当たり判定 ちょっと光らせる
			for(i=0;i<NUM_WIDTHMASS*NUM_HEIGHTMASS;i++){
				if(board_group.children[dragging_piece]
					.hitTestElement(board_group.children[i+1+NUM_HU])){
					console.log(i, "hit");
					board_group.children[i+1+NUM_HU].alpha = 0.1;
				}else{
					board_group.children[i+1+NUM_HU].alpha = 0;
					console.log(i, "no hit");
				}
			}
		}
	// 相手の番
	}else if(turn == 1){
		var activePiece;
		
		// 動かすコマ
		activePiece = Math.floor(Math.random() * get_num_enemy_piece());
		var cnt = 0;
		// TODO for文に歩の数だけ回すようになってるからすべての駒の数にする
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
		// TODO for文に歩の数だけ回すようになってるからすべての駒の数にする
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
});
