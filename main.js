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
    this.dragging_piece = 0;
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
	for(let i = 0; i < 2; i++) { this.reservePieces.push([]); }
	
	// Sprite
	this.board_group = DisplayElement().addChildTo(this);
	this.board_group.setPosition(this.gridX.center(), this.gridY.center());
	// board 
	Sprite('ban').addChildTo(this.board_group)
	let reverce = 1;
	
	console.log("piece_list")
	console.log(this.piece_list) 

	// 駒
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
	update: function(app) {
	console.log("turn",this.turn,"dragging",this.dragging,"pick",this.pick,"put",this.put);
	// 自分の番
	if(this.turn == 0){
    if (this.dragging) {
      /*
      const mouse = app.pointer;
			this.board_group.children[this.dragging_piece+1].setPosition(mouse.x,mouse.y);
			// 当たり判定 ちょっと光らせる
			for(let i=0;i<this.NUM_WIDTHMASS*this.NUM_HEIGHTMASS;i++){
        if (this.board_group.children[this.dragging_piece+1]
					.hitTestElement(this.board_group.children[i+1+this.SUM_PIECE])){
					//console.log(i, "hit");
					this.board_group.children[i+1+this.SUM_PIECE].alpha = 0.1;
				}else{
					this.board_group.children[i+1+this.SUM_PIECE].alpha = 0;
					//console.log(i, "no hit");
				}
			}
      */
		}
		if(this.put){
			this.put_piece();
    }
		if(this.pick){
			this.pick_piece();
    }
	// 相手の番
	}else if(this.turn == 1){
    let activePiece;
    console.log("enemy_pieces", this.get_num_enemy_piece());
		let valid_actions = [];
		let cnt = 0;
		let control_number = 0;
		let seed = 0;
		let piece_number = 0;
		while(valid_actions.length === 0){
			console.log("in while");
			// 動かすコマ
		  activePiece = Math.floor(Math.random() * this.get_num_enemy_piece());
			console.log("activePiece",activePiece);
      cnt = 0;
      for (i = 0; i < this.SUM_PIECE; i++) {
        if (this.board_group.children[i + 1].player == 1) {
          if (cnt != activePiece) {
            break;
          }
					cnt++;
				}
			}
			control_number = i;
			// どこに動く
			seed = 0;
			piece_number = 0;
			[seed, piece_number] = ctr_num_to_stat_num(control_number, this.NUM_PIECE);
			valid_actions = get_valid_actions(this.board_array, this.piece_seed_list, this.piece_status, seed, piece_number)
      console.log("valid_actions, control_number,seed, piece_number", valid_actions, control_number, seed, piece_number);
		}
		let action_idx = Math.floor(Math.random() * valid_actions.length);
		let action = valid_actions[action_idx];
    console.log("mass,action", this.board_group.children[control_number + 1].mass, action);
    console.log("piece_status", this.piece_status);
    console.log("board_group", this.board_group);
    this.board_group.children[control_number + 1].mass = action;
    [this.board_array, this.reservePieces, this.done] = syogi_step(this.board_array, this.piece_status, this.reservePieces, this.NUM_PIECE, piece = control_number, action, player = 1);
		
		console.log("turn:1,piece,action",control_number,action)
		// 駒の表示位置更新
		let mass_x = 0;
		let mass_y = 0;
		[mass_x,mass_y] = mass_to_xy(this.board_group.children[control_number + 1].mass,this.NUM_HEIGHTMASS,this.NUM_WIDTHMASS);
		console.log("action,x,y",this.board_group.children[control_number + 1].mass,mass_x,mass_y);
		this.board_group.children[control_number + 1].setPosition(48 * (mass_x - (this.NUM_WIDTHMASS - 1) / 2) + 0,
				52 * (mass_y - (this.NUM_HEIGHTMASS - 1) / 2) + 0);

    // 敵のコマを取ったら
    console.log(this.reservePieces);
    for (let i = 0; i < this.reservePieces[1].length; i++) {
      ctr_num = this.reservePieces[1][i];
      // まだパラメータを更新していなければ
      if (this.board_group.children[1 + ctr_num].reserve == false) {
        this.board_group.children[1 + ctr_num].reserve = true;
        this.board_group.children[1 + ctr_num].mass = -1;
        if (this.board_group.children[1 + ctr_num].player == 0) {
          this.board_group.children[1 + ctr_num].player = 1;
        } else if (this.board_group.children[1 + ctr_num].player == 1) {
          this.board_group.children[1 + ctr_num].player = 0;
        }
        // TODO 表示処理
        this.board_group.children[1 + ctr_num].alpha = 0.0;
        this.board_group.children[1 + ctr_num].setPosition(-100, -100);

      }
    }

		this.turn = 0;
		// ターン終了
		// 駒のタッチを有効にする
		for(i=0;i<this.SUM_PIECE;i++){
			// 自分の駒だけ
			if(this.board_group.children[i+1].player == 0){
				this.board_group.children[i+1].setInteractive(true);
      }
		}
	}
	},
	pick_piece: function(){
		console.log("pick_piece")
		// 駒を選ぶとき
		// 駒のタッチを無効にする
		for(i=0;i<this.SUM_PIECE;i++){
			this.board_group.children[i+1].setInteractive(false);
		}
		this.dragging = true;
		this.dragging_piece = this.num_pick_piece;
		console.log("dragging_piece",this.dragging_piece);
    console.log("NUM_PIECE", this.NUM_PIECE);
		let seed = 0;
    let piece_number = 0;
    [seed, piece_number] = ctr_num_to_stat_num(this.dragging_piece, this.NUM_PIECE);
    console.log("seed,piece_number", seed, piece_number);
		let mass = this.board_group.children[this.dragging_piece + 1].mass;
		this.board_group.children[this.dragging_piece+1].previousMass = mass;
    // コマがある場所を光らせる
    this.board_group.children[mass + 1 + this.SUM_PIECE].alpha = 0.1;
    // 将棋盤の当たり判定オブジェクト(マス)のタッチイベントを有効にする
    // 駒が動ける場所だけ
    let valid_actions = get_valid_actions(this.board_array, this.piece_seed_list, this.piece_status, seed, piece_number, this.NUM_HEIGHTMASS, this.NUM_WIDTHMASS);
    console.log("valid_actions", valid_actions);
    // 動ける場所がなければキャンセルする
    if (valid_actions.length == 0) {
      console.log("cancel");
      this.pick = false;
      this.num_pick_piece = 0;
      // コマがある場所を暗くする
      this.board_group.children[mass + 1 + this.SUM_PIECE].alpha = 0.0;
      // 駒のタッチを有効にする
      for (i = 0; i < this.SUM_PIECE; i++) {
        // 自分の駒だけ
        if (this.board_group.children[i + 1].player == 0) {
          this.board_group.children[i + 1].setInteractive(true);
        }
      }
    }
    for (let j = 0; j < this.NUM_WIDTHMASS * this.NUM_HEIGHTMASS; j++){
			if(valid_actions.includes(j)){
        this.board_group.children[j + 1 + this.SUM_PIECE].setInteractive(true);
        // コマが動けるところを光らせる
        this.board_group.children[j + 1 + this.SUM_PIECE].alpha = 0.1;
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
    console.log("put_mass", mass);
    let dragging_piece = this.dragging_piece;
    let dragging_piece_idx = dragging_piece + 1;
    let seed = 0;
    let number = 0;
    [seed, number] = ctr_num_to_stat_num(dragging_piece, this.NUM_PIECE);
    // 光らせた場所を暗くする
    let previous_mass = this.board_group.children[dragging_piece_idx].mass;
    this.board_group.children[previous_mass + 1 + this.SUM_PIECE].alpha = 0.0;
    let valid_actions = get_valid_actions(this.board_array, this.piece_seed_list, this.piece_status, seed, number);
    for (let l = 0; l < this.NUM_WIDTHMASS * this.NUM_HEIGHTMASS; l++) {
      if (valid_actions.includes(l)) {
        // タッチイベントを無効にする
        this.board_group.children[l + 1 + this.SUM_PIECE].setInteractive(false);
        // 光らせた場所を暗くする
        this.board_group.children[l + 1 + this.SUM_PIECE].alpha = 0.0;
      }
    }
		// 駒の表示位置更新
    this.board_group.children[dragging_piece_idx].mass = mass;
		let mass_x = 0;
		let mass_y = 0;
		[mass_x,mass_y] = mass_to_xy(mass,this.NUM_HEIGHTMASS,this.NUM_WIDTHMASS);
		console.log("put,action,x,y",mass,mass_x,mass_y);
		this.board_group.children[dragging_piece_idx].setPosition(48 * (mass_x - (this.NUM_WIDTHMASS - 1) / 2) + 0,
				52 * (mass_y - (this.NUM_HEIGHTMASS - 1) / 2) + 0);

    this.dragging = false;
    let player = this.piece_status[seed_to_index(seed)][number].player;
    [this.board_array, this.reservePieces, this.done] = syogi_step(this.board_array, this.piece_status, this.reservePieces, this.NUM_PIECE, dragging_piece, action = mass, player = player);
    // 敵のコマを取ったら
    console.log(this.reservePieces);
    for (let i = 0; i < this.reservePieces[0].length; i++) {
      ctr_num = this.reservePieces[0][i];
      // まだパラメータを更新していなければ
      if (this.board_group.children[1 + ctr_num].reserve == false) {
        this.board_group.children[1 + ctr_num].reserve = true;
        this.board_group.children[1 + ctr_num].mass = -1;
        if (this.board_group.children[1 + ctr_num].player == 0) {
          this.board_group.children[1 + ctr_num].player = 1;
        } else if (this.board_group.children[1 + ctr_num].player == 1) {
          this.board_group.children[1 + ctr_num].player = 0;
        }
        // TODO 表示処理
        this.board_group.children[1 + ctr_num].alpha = 0.0;
        this.board_group.children[1 + ctr_num].setPosition(-100, -100);
      }
    }
    this.put = false;
		this.put_mass = 0;
		this.turn = 1;
  },

  // 盤面に駒がどこにあるかの配列を返す
  get_piece_mass: function(number_piece){
    let mass_list =[];
    for(var j = 0; j<NUM_HEIGHTMASS;j++){
      for (i = 0; i < NUM_WIDTHMASS; i++) {
        // 
        if (this.board_array[i + (NUM_WIDTHMASS * j)] == number_piece) {
          mass_list.push(new position(i, j));
        }
      }
    }
    return mass_list;
  },

  get_num_enemy_piece: function() {
    let cnt = 0;
    for (i = 0; i < this.SUM_PIECE; i++) {
      if (this.board_group.children[i + 1].player == 1) {
        cnt++;
      }
    }
    return cnt;
  }
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
