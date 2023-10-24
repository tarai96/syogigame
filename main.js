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
		'keima': "image/syougi10_keima.png",
    'kyousya': "image/syougi12_kyousya.png",
	  'ban': "image/syougi_ban.png",
	},
};

// 盤面に駒がどこにあるかの配列を返す
function get_piece_mass(board,number_piece){
	let mass_list = [];
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

function get_num_enemy_piece(board_group){
	let cnt = 0;
	for(i=0;i<NUM_HU;i++){
		if(board_group.children[i+1].player == -1){
			cnt++;
		}
	}
	return cnt;
}


phina.define("Hu", {
	//Spriteクラスを継承
	superClass: 'Sprite',
	init: function(control_number,mass, actions, player, reserve=false) {
		// 親クラス初期化
		this.superInit('hu');
		this.mass = mass;
		this.previousMass = mass;
		this.actions = actions;
		this.player = player;
		this.reserve = reserve;
		// 駒種　歩
		this.seed = 1;
		this.control_number = control_number;
	},
});

phina.define("Keima", {
  //Spriteクラスを継承
  superClass: 'Sprite',
  init: function (control_number,mass, actions, player, reserve = false) {
    // 親クラス初期化
    this.superInit('keima');
    this.mass = mass;
    this.previousMass = mass;
    this.actions = actions;
    this.player = player;
    this.reserve = reserve;
    // 駒種　桂馬
    this.seed = 2;
		this.control_number = control_number;
  },
});

phina.define("Kyousya", {
  //Spriteクラスを継承
  superClass: 'Sprite',
  init: function (control_number,mass, actions, player, reserve = false) {
    // 親クラス初期化
    this.superInit('kyousya');
    this.mass = mass;
    this.previousMass = mass;
    this.actions = actions;
    this.player = player;
    this.reserve = reserve;
    // 駒種　香車
    this.seed = 3;
		this.control_number = control_number;
  },
});

phina.define("Kin", {
  //Spriteクラスを継承
  superClass: 'Sprite',
  init: function (control_number,mass, actions, player, reserve = false) {
    // 親クラス初期化
    this.superInit('kin');
    this.mass = mass;
    this.previousMass = mass;
    this.actions = actions;
    this.player = player;
    this.reserve = reserve;
    // 駒種　金
    this.seed = 4;
		this.control_number = control_number;
  },
});

phina.define("Gin", {
  //Spriteクラスを継承
  superClass: 'Sprite',
  init: function (control_number,mass, actions, player, reserve = false) {
    // 親クラス初期化
    this.superInit('gin');
    this.mass = mass;
    this.previousMass = mass;
    this.actions = actions;
    this.player = player;
    this.reserve = reserve;
    // 駒種　銀
    this.seed = 5;
		this.control_number = control_number;
  },
});

//TODO seedをつける
phina.define("Hisya", {
  //Spriteクラスを継承
  superClass: 'Sprite',
  init: function (control_number,mass, actions, player, reserve = false) {
    // 親クラス初期化
    this.superInit('hisya');
    this.mass = mass;
    this.previousMass = mass;
    this.actions = actions;
    this.player = player;
    this.reserve = reserve;
    // 駒種　飛車
    this.seed = 6;
		this.control_number = control_number;
  },
});

phina.define("Kaku", {
  //Spriteクラスを継承
  superClass: 'Sprite',
  init: function (control_number,mass, actions, player, reserve = false) {
    // 親クラス初期化
    this.superInit('kaku');
    this.mass = mass;
    this.previousMass = mass;
    this.actions = actions;
    this.player = player;
    this.reserve = reserve;
    // 駒種　角
    this.seed = 7;
		this.control_number = control_number;
  },
});

phina.define("Osyo", {
	//Spriteクラスを継承
	superClass: 'Sprite',
	init: function(control_number,mass, actions, player, reserve=false) {
		// 親クラス初期化
		this.superInit('osyo');
		this.mass = mass;
		this.previousMass = mass;
		this.actions = actions;
		this.player = player;
		this.reserve = reserve;
		// 駒種　王将
		this.seed = 8;
		this.control_number = control_number;
	},
});

phina.define('Mass',{
	superClass: 'RectangleShape',
	init: function(number){
		this.superInit({
      width: 45,
      height: 49,
      fill: 'red',
      // stroke: 'lime',
      strokeWidth: 0,
      cornerRadius: 0
    });
		this.number = number;
  }
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

	this.currentMass = 0;
	this.hold = false;
	this.holdPiece = 0;
	this.flag = false;
	this.caught = false;
	this.dragging = false;
	this.gameStatus = ""
	this.piece_seed_list = [];
	this.piece_status = [];
	this.piece_list = [];
	this.pick = false;
	this.num_pick_piece = 0;
	this.put = false;
	this.put_mass = 0;
	this.previousMass = 0;
	this.reservePieces = [];
	this.turn = 0;

	this.NUM_WIDTHMASS = 9;
	this.NUM_HEIGHTMASS = 9;
	this.NUM_ALLMASS = this.NUM_HEIGHTMASS * this.NUM_WIDTHMASS;
	this.NUM_PIECE = [];

	this.mass_size = 50;
	this.BOARD_MARJIN = 5;

	// 盤面初期化
	// board_array　相手の駒はマイナス
	this.board_array = [-3, -2, -5, -4, -8, -4, -5, -2, -3,
										0, -6, 0, 0, 0, 0, 0, -7, 0,
										-1,-1,-1,-1,-1,-1,-1,-1,-1,
										0, 0, 0, 0, 0, 0, 0, 0, 0,
										0, 0, 0, 0, 0, 0, 0, 0, 0,
										0, 0, 0, 0, 0, 0, 0, 0, 0,
										1, 1, 1, 1, 1, 1, 1, 1, 1,
										0, 7, 0, 0, 0, 0, 0, 6, 0,
										3, 2, 5, 4, 8, 4, 5, 2, 3,
										]

    let num_piece = [];
	[this.piece_status,this.piece_seed_list,num_piece] = syogi_init(this.board_array,this.NUM_WIDTHMASS,this.NUM_HEIGHTMASS);
    this.NUM_PIECE = num_piece;
    this.SUM_PIECE = sum_array(this.NUM_PIECE);
    console.log("piece_status,piece_seed_list,NUM_PIECE");
	console.log(this.piece_status,this.piece_seed_list,this.NUM_PIECE);
	// 駒初期化

	// メモ　game本体 piece_status[駒種-1][通し番号]
	//       Sprite piece_list[番号] 番号の求め方（仮）(駒種ごとの駒の数のそれまでの合計)+(上の通し番号)
		let control_number = 0;
	  //歩 no.1
	  for(let i=0;i<this.NUM_PIECE[0];i++){
		  // mass,action,player 
		  this.piece_list.push(Hu(control_number,this.piece_status[0][i].mass,this.piece_seed_list[0].actions,this.piece_status[0][i].player));
      control_number++;
			}
    //桂馬 no.2
    for (let i = 0; i < this.NUM_PIECE[1]; i++) {
      // mass,action,player 
      this.piece_list.push(Keima(control_number,this.piece_status[1][i].mass,this.piece_seed_list[1].actions, this.piece_status[1][i].player));
			control_number++;
		}
    //香車 no.3
    for (let i = 0; i < this.NUM_PIECE[2]; i++) {
      // mass,action,player 
      this.piece_list.push(Kyousya(control_number,this.piece_status[2][i].mass, this.piece_seed_list[2].actions, this.piece_status[2][i].player));
			control_number++;
		}
    //金 no.4
    for (let i = 0; i < this.NUM_PIECE[3]; i++) {
      // mass,action,player 
      this.piece_list.push(Kin(control_number,this.piece_status[3][i].mass, this.piece_seed_list[3].actions, this.piece_status[3][i].player));
			control_number++;
		}
    //銀 no.5
    for (let i = 0; i < this.NUM_PIECE[4]; i++) {
      // mass,action,player 
      this.piece_list.push(Gin(control_number,this.piece_status[4][i].mass, this.piece_seed_list[4].actions, this.piece_status[4][i].player));
			control_number++;
		}
    //飛車 no.6
    for (let i = 0; i < this.NUM_PIECE[5]; i++) {
      // mass,action,player 
      this.piece_list.push(Hisya(control_number,this.piece_status[5][i].mass, this.piece_seed_list[5].actions, this.piece_status[5][i].player));
			control_number++;
		}
    //角 no.7
    for (let i = 0; i < this.NUM_PIECE[6]; i++) {
      // mass,action,player 
      this.piece_list.push(Kaku(control_number,this.piece_status[6][i].mass, this.piece_seed_list[6].actions, this.piece_status[6][i].player));
			control_number++;
		}
	  //王将 no.8
	  for(let i=0;i<this.NUM_PIECE[7];i++){
		  // mass,action,player 
		  this.piece_list.push(Osyo(control_number,this.piece_status[7][i].mass,this.piece_seed_list[7].actions,this.piece_status[7][i].player));
			control_number++;
		}

	// 持ち駒初期化
	// reservePieces 2次元配列 0 自分　1 相手
	for(let i = 0; i < 2; i++) { this.reservePieces.push(Array(64).fill(0)); }
	
	// Sprite
	this.board_group = DisplayElement().addChildTo(this);
	this.board_group.setPosition(this.gridX.center(), this.gridY.center());
	// board 
	Sprite('ban').addChildTo(this.board_group)
	let reverce = 1;
	
	console.log("piece_list")
	console.log(this.piece_list) 

	for(let i=0;i<this.SUM_PIECE;i++){
		// 敵は表示を上下反転
		if(this.piece_list[i].player == 1){
			reverce = -1;
		}else{
			reverce = 1;
		}
		var mass_x = this.piece_list[i].mass;
		for(var mass_y = 0;mass_x >= this.NUM_WIDTHMASS;mass_y++){
			mass_x -= this.NUM_WIDTHMASS;
		}
		console.log("massxy");
		console.log(mass_x,mass_y);
		this.piece_list[i].addChildTo(this.board_group)
			.setPosition(48 * (mass_x - (this.NUM_WIDTHMASS - 1) / 2) + 0,
				52 * (mass_y - (this.NUM_HEIGHTMASS - 1) / 2) + 0)
			.setSize(this.mass_size, this.mass_size)
			.on('pointstart', function(){
				this.parent.parent.pick = true;
				this.parent.parent.num_pick_piece = this.control_number;
			});
		this.board_group.children[i+1].scaleY *= reverce;
	}
	console.log(this.board_group);

	// 将棋盤の当たり判定ます
	for (j = 0; j < this.NUM_HEIGHTMASS; j++) {
		for (i = 0; i < this.NUM_WIDTHMASS; i++) {
		// RectangleShape
			let mass = xy_to_mass(i, j, this.NUM_WIDTHMASS);
      Mass(mass).addChildTo(this.board_group)
        .setPosition(48 * (i - (this.NUM_WIDTHMASS - 1) / 2) + 0,
          52 * (j - (this.NUM_HEIGHTMASS - 1) / 2) + 0)
        .on('pointstart', function () {
          // 駒を置くとき(ここに動くことは確定している)
          this.parent.parent.put = true;
					this.parent.parent.put_mass = this.number;
				});
			console.log(this.SUM_PIECE);
      this.board_group.children[mass + 1 + this.SUM_PIECE].alpha = 0.0;
    }
	}

	// 駒のタッチを有効にする
	for(i = 0;i < this.SUM_PIECE;i++){
		 this.board_group.children[i + 1].setInteractive(true);
  }
	},
	// 毎フレーム更新処理
	update: function() {
	console.log("turn",this.turn,"dragging",this.dragging,"pick",this.pick,"put",this.put);
	// 自分の番
	if(this.turn == 0){
		if(this.dragging){
			this.board_group.children[dragging_piece].setposition(mouse.x,mouse.y);
			// 当たり判定 ちょっと光らせる
			for(i=0;i<NUM_WIDTHMASS*NUM_HEIGHTMASS;i++){
				if(this.board_group.children[dragging_piece]
					.hitTestElement(this.board_group.children[i+1+SUM_PIECE])){
					console.log(i, "hit");
					this.board_group.children[i+1+SUM_PIECE].alpha = 0.1;
				}else{
					this.board_group.children[i+1+SUM_PIECE].alpha = 0;
					console.log(i, "no hit");
				}
			}
		}
		if(this.put){
			this.put_piece();
    }
		if(this.pick){
			this.pick_piece();
    }
	// 相手の番
	}else if(turn == 1){
		let activePiece;
		// 動かすコマ
		activePiece = Math.floor(Math.random() * get_num_enemy_piece());
		let cnt = 0;
		for(i=0;i<this.SUM_PIECE;i++){
			if(this.board_group.children[i+1].player == -1){
				if(cnt==activePiece){
				break;
				}
				cnt++;
			}
		}
		let control_number = i;
		// どこに動く
		let seed = 0;
		let piece_number = 0;
		[seed, piece_number] = ctr_num_to_stat_num(control_number);
		let valid_actions = get_valid_actions(board_array, piece_seed_list, piece_status, seed, piece_number)
		let action = Math.floor(Math.random() * valid_actions.length);
		this.board_group.children[control_number + 1].mass = valid_actions[action];
		[this.board_array, this.reservePieces, this.done] = syogi_step(board_array, piece_status, reservePieces, piece = control_number, action = valid_actions[action], player = 1);
		turn = 0;
		// ターン終了
		// 駒のタッチを有効にする
		for(i=0;i<this.SUM_PIECE;i++){
			this.board_group.children[i+1].setInteractive(true);
		}
	}
	},
	pick_piece: function(){
		console.log("pick_piece")
		// 駒を選ぶとき
		this.dragging = true;
		let dragging_piece = this.num_pick_piece;
		console.log("dragging_piece",dragging_piece);
		console.log("NUM_PIECE", this.NUM_PIECE)
		let seed = 0;
		let piece_number = 0;
		[seed, piece_number] = ctr_num_to_stat_num(dragging_piece, this.NUM_PIECE);
		this.board_group.children[dragging_piece+1].previousMass = board_group.children[dragging_piece+1].mass
		// 将棋盤の当たり判定オブジェクトのタッチイベントを有効にする
		// 駒が動ける場所だけ
		let valid_actions = get_valid_actions(board_array, piece_seed_list, piece_status, seed, piece_number);
		for(j=0;j<NUM_WIDTHMASS*NUM_HEIGHTMASS;j++){
			if(valid_actions.includes(j)){
				this.board_group.children[j+1+SUM_PIECE].setInteractive(true);
			}
		}
		this.pick = false;
		this.num_pick_piece = 0;
  },
	get_status: function(){
		class status{
			constructor(currentMass,hold,holdPiece,flag,caught,dragging,gameStatus,piece_seed_list,piece_status,piece_list,previousMass,reservePieces,turn,NUM_WIDTHMASS,NUM_HEIGHTMASS,NUM_PIECE){
				this.currentMass = currentMass;
				this.hold = hold;
				this.holdPiece = holdPiece;
				this.flag = flag;
				this.caught = caught;
				this.dragging = dragging;
				this.gameStatus = gameStatus;
				this.piece_seed_list = piece_seed_list;
				this.piece_status = piece_status;
				this.piece_list = piece_list;
				this.previousMass = previousMass;
				this.reservePieces = reservePieces;
				this.turn = turn;

				this.NUM_WIDTHMASS = NUM_WIDTHMASS;
				this.NUM_HEIGHTMASS = NUM_HEIGHTMASS;
				this.NUM_ALLMASS = this.NUM_HEIGHTMASS * this.NUM_WIDTHMASS;
				this.NUM_PIECE = NUM_PIECE;
      }
    }
		let STATUS = status(this.currentMass,this.hold,this.holdPiece,this.flag,this.caught,this.dragging,this.gameStatus,this.piece_seed_list,this.piece_status,this.piece_list,this.previousMass,this.reservePieces,this.turn,this.NUM_WIDTHMASS,this.NUM_HEIGHTMASS,this.NUM_PIECE);
		return STATUS;
  },
	put_piece: function(){
    // 駒を置くとき(ここに動くことは確定している)
    // piece は通し番号
    let mass = this.put_mass;
    let seed = 0;
    let num_idx = 0;
    [seed, num_idx] = find_piece_for_mass(piece_status, this.NUM_PIECE, mass);
    let piece = stat_num_to_ctr_num(seed, num_idx, this.NUM_PIECE);
		let dragging_piece_idx = 0;
    if (seed == 0) {
      dragging_piece_idx = piece + 1 + 0;
    } else {
      dragging_piece_idx = piece + 1 + sum_array(this.NUM_PIECE.slice(0, seed));
    }
    this.board_group.children[dragging_piece_idx].mass = mass;
    // タッチイベントを無効にする 有効にしてたマスだけ　動けたとこだけ
		let piece_number = 0;
		[seed, piece_number] = ctr_num_to_stat_num(dragging_piece_idx - 1);
		let valid_actions = get_valid_actions(this.board_array, this.piece_seed_list, this.piece_status, seed, piece_number);
    for (let l = 0;l < this.NUM_WIDTHMASS * this.NUM_HEIGHTMASS; l++) {
      if (valid_actions.includes(l)) {
        this.board_group.children[l + 1 + this.SUM_PIECE].setInteractive(false);
      }
    }

    this.dragging = false;

    let player = this.piece_status[seed][num_idx].player;
    [this.board_array, this.reservePieces, this.done] = syogi_step(this.board_array, this.piece_status, this.reservePieces, piece, action = mass, player = player);
    this.put = false;
		this.put_mass = 0;
		this.turn = 1;
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
