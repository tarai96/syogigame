// JavaScript source code
// �O���[�o���ɓW�J
phina.globalize();
// �A�Z�b�g
var ASSETS = {
	// �摜
	image: {
	  'hu': "image/syougi14_fuhyou.png",
	  'tokin' : "image/syougi15_tokin.png",
	  'osyo': "image/syougi01_ousyou.png",
    'hisya': "image/syougi03_hisya.png",
    'ryuou': "image/syougi04_ryuuou.png",
	  'kaku' : "image/syougi05_gakugyou.png",
    'ryuma': "image/syougi06_ryuuma.png",
	  'kin' : "image/syougi07_kinsyou.png",
	  'gin' : "image/syougi08_ginsyou.png",
	  'narigin' : "image/syougi09_narigin.png",
		'keima': "image/syougi10_keima.png",
		'narikei': "image/syougi11_narikei.png",
    'kyousya': "image/syougi12_kyousya.png",
    'narikyou': "image/syougi13_narikyou.png",
	  'ban': "image/syougi_ban.png",
	},
};

phina.define("Piece_class", {
  superClass: 'DisplayElement',
  init: function (seed, control_number, mass, actions, player, reserve = false, evolve = false, evolves_to = "", evolves_sprite=null) {
    this.superInit();
    this.mass = mass;
    this.previousMass = mass;
    this.actions = actions;
    this.player = player;
    this.reserve = reserve;
    this.seed = seed; // ���
    this.control_number = control_number;
    this.evolve = evolve;
    this.evolves_to = evolves_to;
    this.evolve_sprite = evolves_sprite;
  },
  set_on_mass(x, y) {
    // mainscene����
    let NUM_WIDTHMASS = this.parent.parent.parent.parent.NUM_WIDTHMASS;
    let NUM_HEIGHTMASS = this.parent.parent.parent.parent.NUM_HEIGHTMASS;

    this.parent.position.x = 48 * (x - (NUM_WIDTHMASS - 1) / 2);
    this.parent.position.y = 52 * (y - (NUM_HEIGHTMASS - 1) / 2);
  },
  show() {
    if (this.evolve) {
      this.parent.alpha = 0.0;
      this.evolves_sprite.alpha = 1.0;
      this.evolves_sprite.setPosition(this.parent.position.x, this.parent.position.y);
    } else {
      this.parent.alpha = 1.0;
      this.evolves_sprite.alpha = 0.0;
      // ��ʊO�ɒu���Ƃ�����
      this.evolves_sprite.setPosition(-500, -500);
    }
  }
});


phina.define("Hu", {
	//Sprite�N���X���p��
	superClass: 'Sprite',
  init: function (control_number, mass, actions, player, reserve = false,evolve = false, evolves_to = "", evolves_sprite=null) {
		// �e�N���X������
    this.superInit('hu');
    this.c = Piece_class(1, control_number, mass, actions, player, reserve, evolve, evolves_to, evolves_sprite).addChildTo(this);
	},
});

phina.define("Keima", {
  //Sprite�N���X���p��
  superClass: 'Sprite',
  init: function (control_number, mass, actions, player, reserve = false, evolve = false, evolves_to = "", evolves_sprite = null) {
    // �e�N���X������
    this.superInit('keima');
    this.c = Piece_class(2, control_number, mass, actions, player, reserve, evolve, evolves_to, evolves_sprite).addChildTo(this);
  },
});

phina.define("Kyousya", {
  //Sprite�N���X���p��
  superClass: 'Sprite',
  init: function (control_number, mass, actions, player, reserve = false, evolve = false, evolves_to = "", evolves_sprite = null) {
    // �e�N���X������
    this.superInit('kyousya');
    this.c = Piece_class(3, control_number, mass, actions, player, reserve, evolve, evolves_to, evolves_sprite).addChildTo(this);
  },
});

phina.define("Kin", {
  //Sprite�N���X���p��
  superClass: 'Sprite',
  init: function (control_number, mass, actions, player, reserve = false, evolve = false, evolves_to = "", evolves_sprite = null) {
    // �e�N���X������
    this.superInit('kin');
    this.c = Piece_class(4, control_number, mass, actions, player, reserve, evolve, evolves_to, evolves_sprite).addChildTo(this);
  },
});

phina.define("Gin", {
  //Sprite�N���X���p��
  superClass: 'Sprite',
  init: function (control_number, mass, actions, player, reserve = false, evolve = false, evolves_to = "", evolves_sprite = null) {
    // �e�N���X������
    this.superInit('gin');
    this.c = Piece_class(5, control_number, mass, actions, player, reserve, evolve, evolves_to, evolves_sprite).addChildTo(this);
  },
});

phina.define("Hisya", {
  //Sprite�N���X���p��
  superClass: 'Sprite',
  init: function (control_number, mass, actions, player, reserve = false, evolve = false, evolves_to = "", evolves_sprite = null) {
    // �e�N���X������
    this.superInit('hisya');
    this.c = Piece_class(6, control_number, mass, actions, player, reserve, evolve, evolves_to, evolves_sprite).addChildTo(this);
  },
});

phina.define("Kaku", {
  //Sprite�N���X���p��
  superClass: 'Sprite',
  init: function (control_number, mass, actions, player, reserve = false, evolve = false, evolves_to = "", evolves_sprite = null) {
    // �e�N���X������
    this.superInit('kaku');
    this.c = Piece_class(7, control_number, mass, actions, player, reserve, evolve, evolves_to, evolves_sprite).addChildTo(this);
  },
});

phina.define("Osyo", {
	//Sprite�N���X���p��
	superClass: 'Sprite',
  init: function (control_number, mass, actions, player, reserve = false, evolve = false, evolves_to = "", evolves_sprite = null) {
		// �e�N���X������
		this.superInit('osyo');
    this.c = Piece_class(8, control_number, mass, actions, player, reserve, evolve, evolves_to, evolves_sprite).addChildTo(this);
  },
});

phina.define('Board_Space',{
	superClass: 'DisplayElement',
	init: function(){
		this.superInit();
    this.ban = Sprite('ban').addChildTo(this);
    this.pieces = DisplayElement().addChildTo(this);
    this.mass = DisplayElement().addChildTo(this);
  },
});

phina.define('Mass',{
	superClass: 'RectangleShape',
	init: function(number){
		this.superInit({
      width: 45,
      height: 49,
      fill: '#D9885B',
      // stroke: 'lime',
      strokeWidth: 0,
      cornerRadius: 0
    });
		this.number = number;
  }
});

phina.define('Reserve_Space',{
	superClass: 'DisplayElement',
	init: function(){
		this.superInit();
    this.show_timing = [[], []];
    Reserve_Ban(0).addChildTo(this).setPosition(200, 350);
    Reserve_Ban(1).addChildTo(this).setPosition(-200, -350);
  },
  sort: function (piece_list) {
    console.log(this.show_timing);
    let tar1;
    let tar2;
    for (let player = 0; player < 2; player++) {
      for (let i = 0; i < this.show_timing[player].length - 1; i++) {
        tar1 = this.show_timing[player][i]

        for (let j = i + 1; j < this.show_timing[player].length; j++) {
          tar2 = this.show_timing[player][j]
          console.log(piece_list[tar1].c.seed > piece_list[tar2].c.seed);
          if (piece_list[tar1].c.seed > piece_list[tar2].c.seed) {
            this.show_timing[player][i] = tar2;
            this.show_timing[player][j] = tar1;
          }
        }
      }
    }
    console.log(this.show_timing);
    for (i = 0; i < 2; i++) {
      this.children[i].reload();
    }
  },
  add_piece: function (player,ctr_num,piece_list) {
    piece_list[ctr_num].addChildTo(this.children[player]);
    this.show_timing[player].push(ctr_num);
    console.log("reserve_group");
    console.log(this);
    console.log("this.reserve_group.show_timing");
    console.log(this.show_timing);
    this.sort(piece_list);
  },
  del_piece: function(piece){
    console.log("del_piece, piece",piece);
    let idx = 0;
    for(let p=0;p<2;p++){
      idx = this.show_timing[p].findIndex(elem => elem === piece);
      console.log("idx",idx);
      if(idx != null){
        this.show_timing[p].splice(idx, 1);
      }
    }
    this.reserve_group.sort(this.piece_list);
    console.log("this.show_timing",this.show_timing);
    // console.log("idx",idx);
  }
});
  

phina.define('Reserve_Ban',{
	superClass: 'RectangleShape',
	init: function(player){
		this.superInit({
      width: 150,
      height: 150,
      // TODO �F
      fill: '#BB9657',
      // stroke: 'lime',
      strokeWidth: 0,
      cornerRadius: 0
    });
		this.player = player;
  },
	reload: function(){
    let piece_sprite;
    // ����
    let x = -50;
    let y = -50;
    for (let i = 0; i < this.parent.show_timing[this.player].length; i++) {
      console.log(this.parent.show_timing[this.player].length);
      piece_sprite = this.find_piece(this.parent.show_timing[this.player][i]);
      piece_sprite.setPosition(x, y, 1);
      let reverce = -1;
      if (piece_sprite.c.player == 1) {
        if (piece_sprite.scaleY > 0) {
          piece_sprite.scaleY *= reverce;
        }
      } else {
        if (piece_sprite.scaleY < 0) {
          piece_sprite.scaleY *= reverce;
        }
      }
      piece_sprite.alpha = 1.0;
      x += 50;
      if (x > 50) {
        x = -50;
        y += 50;
      }
    }
  },
  find_piece: function (ctr_num) {
    let ctrs = [];
    console.log(this.children);
    for (let i = 0; i < this.children.length; i++) {
      console.log(this.children[i].c);
      ctrs.push(this.children[i].c.control_number);
      if (this.children[i].c.control_number == ctr_num) {
        console.log("find");
        return this.children[i];
      }
    }
    console.log(ctrs);
  },
});

phina.define('Reserve_Pieces',{
  superClass: 'DisplayElement',
	init: function(){
    this.superInit();
  },
});

phina.define('Result',{
	superClass: 'DisplayElement',
	init: function(){
		 this.superInit();
  },
});

/*
 * ���C���V�[��
 */
phina.define("MainScene", {
	// �p��
	superClass: 'DisplayScene',
	// ������
	init: function() {
	// �e�N���X������
	this.superInit();
	// �w�i�F
	this.backgroundColor = 'skyblue';

	this.currentMass = 0;
	this.hold = false;
	this.holdPiece = 0;
	this.flag = false;
	this.caught = false;
    this.dragging = false;
    this.dragging_piece = 0;
	this.game_status = ""
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

	// �Ֆʏ�����
	// board_array�@����̋�̓}�C�i�X
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
	// �����

	// �����@game�{�� piece_status[���-1][�ʂ��ԍ�]
	//       Sprite piece_list[�ԍ�] �ԍ��̋��ߕ��i���j(��킲�Ƃ̋�̐��̂���܂ł̍��v)+(��̒ʂ��ԍ�)
		let control_number = 0;
	  //�� no.1
	  for(let i=0;i<this.NUM_PIECE[0];i++){
		  // mass,action,player 
		  this.piece_list.push(Hu(control_number,this.piece_status[0][i].mass,this.piece_seed_list[0].actions,this.piece_status[0][i].player));
      control_number++;
			}
    //�j�n no.2
    for (let i = 0; i < this.NUM_PIECE[1]; i++) {
      // mass,action,player 
      this.piece_list.push(Keima(control_number,this.piece_status[1][i].mass,this.piece_seed_list[1].actions, this.piece_status[1][i].player));
			control_number++;
		}
    //���� no.3
    for (let i = 0; i < this.NUM_PIECE[2]; i++) {
      // mass,action,player 
      this.piece_list.push(Kyousya(control_number,this.piece_status[2][i].mass, this.piece_seed_list[2].actions, this.piece_status[2][i].player));
			control_number++;
		}
    //�� no.4
    for (let i = 0; i < this.NUM_PIECE[3]; i++) {
      // mass,action,player 
      this.piece_list.push(Kin(control_number,this.piece_status[3][i].mass, this.piece_seed_list[3].actions, this.piece_status[3][i].player));
			control_number++;
		}
    //�� no.5
    for (let i = 0; i < this.NUM_PIECE[4]; i++) {
      // mass,action,player 
      this.piece_list.push(Gin(control_number,this.piece_status[4][i].mass, this.piece_seed_list[4].actions, this.piece_status[4][i].player));
			control_number++;
		}
    //��� no.6
    for (let i = 0; i < this.NUM_PIECE[5]; i++) {
      // mass,action,player 
      this.piece_list.push(Hisya(control_number,this.piece_status[5][i].mass, this.piece_seed_list[5].actions, this.piece_status[5][i].player));
			control_number++;
		}
    //�p no.7
    for (let i = 0; i < this.NUM_PIECE[6]; i++) {
      // mass,action,player 
      this.piece_list.push(Kaku(control_number,this.piece_status[6][i].mass, this.piece_seed_list[6].actions, this.piece_status[6][i].player));
			control_number++;
		}
	  //���� no.8
	  for(let i=0;i<this.NUM_PIECE[7];i++){
		  // mass,action,player 
		  this.piece_list.push(Osyo(control_number,this.piece_status[7][i].mass,this.piece_seed_list[7].actions,this.piece_status[7][i].player));
			control_number++;
		}

	  // ���������
	  // reservePieces 2�����z�� 0 �����@1 ����
	  for(let i = 0; i < 2; i++) { this.reservePieces.push([]); }
	
	  // Sprite
	  // board
	  this.board_group = Board_Space().addChildTo(this);
	  this.board_group.setPosition(this.gridX.center(), this.gridY.center());
 
    
    let reverce = 1;
	
	  // ������O���[�v
	  this.reserve_group = Reserve_Space().addChildTo(this).setPosition(this.gridX.center(), this.gridY.center());
	  

    console.log("piece_list");
    console.log(this.piece_list);

	// ��
	for(let i=0;i<this.SUM_PIECE;i++){
		// �G�͕\�����㉺���]
		if(this.piece_list[i].c.player == 1){
			reverce = -1;
		}else{
			reverce = 1;
		}
		var mass_x = this.piece_list[i].c.mass;
		for(var mass_y = 0;mass_x >= this.NUM_WIDTHMASS;mass_y++){
			mass_x -= this.NUM_WIDTHMASS;
    }
    this.piece_list[i].addChildTo(this.board_group.pieces)
			.setSize(this.mass_size, this.mass_size)
			.on('pointstart', function(){
				this.parent.parent.parent.pick = true;
				this.parent.parent.parent.num_pick_piece = this.c.control_number;
      });
    this.piece_list[i].c.set_on_mass(mass_x, mass_y);
		this.piece_list[i].scaleY *= reverce;
	}
	console.log(this.board_group);

	// �����Ղ̓����蔻��܂�
	for (j = 0; j < this.NUM_HEIGHTMASS; j++) {
		for (i = 0; i < this.NUM_WIDTHMASS; i++) {
		// RectangleShape
			let mass = xy_to_mass(i, j, this.NUM_WIDTHMASS);
      Mass(mass).addChildTo(this.board_group.mass)
        .setPosition(48 * (i - (this.NUM_WIDTHMASS - 1) / 2) + 0,
          52 * (j - (this.NUM_HEIGHTMASS - 1) / 2) + 0)
        .on('pointstart', function () {
          // ���u���Ƃ�(�����ɓ������Ƃ͊m�肵�Ă���)
          this.parent.parent.parent.put = true;
					this.parent.parent.parent.put_mass = this.number;
				});
      this.board_group.mass.children[mass].alpha = 0.0;
    }
	}

	// ��̃^�b�`��L���ɂ���
	for(i = 0;i < this.SUM_PIECE;i++){
		 this.piece_list[i].setInteractive(true);
  }
	},
	// ���t���[���X�V����
	update: function(app) {
	console.log("turn",this.turn,"dragging",this.dragging,"pick",this.pick,"put",this.put);
	// �����̔�
	if(this.turn == 0){
    if (this.dragging) {
      /*
      const mouse = app.pointer;
			this.board_group.children[this.dragging_piece+1].setPosition(mouse.x,mouse.y);
			// �����蔻�� ������ƌ��点��
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
	// ����̔�
	}else if(this.turn == 1){
    let activePiece;
    // console.log("enemy_pieces", this.get_num_enemy_piece());
		let valid_actions = [];
		let cnt = 0;
		let control_number = 0;
		let seed = 0;
		let piece_number = 0;
		while(valid_actions.length === 0){
			console.log("in while");
			// �������R�}
		  activePiece = Math.floor(Math.random() * this.get_num_enemy_piece());
			console.log("activePiece",activePiece);
      cnt = 0;
      for (let i = 0; i < this.SUM_PIECE; i++) {
        if (this.piece_list[i].c.player == 1) {
          // console.log("player=1,cnt,control_number",cnt,i);
          if (cnt == activePiece) {
			      control_number = i;
            break;
          }
					cnt++;
				}
      }
      console.log("control_number",control_number);
			// �ǂ��ɓ���
			seed = 0;
			piece_number = 0;
			[seed, piece_number] = ctr_num_to_stat_num(control_number, this.NUM_PIECE);
			valid_actions = get_valid_actions(this.board_array, this.piece_seed_list, this.piece_status, seed, piece_number,this.NUM_HEIGHTMASS,this.NUM_WIDTHMASS)
      console.log("valid_actions, control_number,seed, piece_number", valid_actions, control_number, seed, piece_number);
		}
		let action_idx = Math.floor(Math.random() * valid_actions.length);
		let action = valid_actions[action_idx];
    console.log("mass,action", this.piece_list[control_number].c.mass, action);
    console.log("piece_status", this.piece_status);
    console.log("board_group", this.board_group);
    this.piece_list[control_number].c.mass = action;
    [this.board_array, this.reservePieces, this.done] = syogi_step(this.board_array, this.piece_status, this.reservePieces, this.NUM_PIECE, piece = control_number, action, player = 1);

		console.log("turn:1,piece,action",control_number,action)
		// ��̕\���ʒu�X�V
		let mass_x = 0;
		let mass_y = 0;
		[mass_x,mass_y] = mass_to_xy(this.piece_list[control_number].c.mass,this.NUM_HEIGHTMASS,this.NUM_WIDTHMASS);
		console.log("action,x,y",this.piece_list[control_number].c.mass,mass_x,mass_y);
		this.piece_list[control_number].c.set_on_mass(mass_x,mass_y);

    // �G�̃R�}���������
    console.log(this.reservePieces);
    this.obtain_piece(player=1);

		this.turn = 0;
		// �^�[���I��
		// ��̃^�b�`��L���ɂ���
		for(i=0;i<this.SUM_PIECE;i++){
			// �����̋��
			if(this.piece_list[i].c.player == 0){
				this.piece_list[i].setInteractive(true);
      }
		}
		if(this.done == true){
			this.turn = 10;
			this.game_status = "enemy win"
    }
	}else if(this.turn == 10){
		 // �Q�[���I��
		 this.show_result();
		 this.turn = 11;
  }
	},
	pick_piece: function(){
		console.log("pick_piece")
		// ���I�ԂƂ�
		// ��̃^�b�`�𖳌��ɂ���
		for(i=0;i<this.SUM_PIECE;i++){
			this.piece_list[i].setInteractive(false);
		}
		this.dragging = true;
		this.dragging_piece = this.num_pick_piece;
    /*
		console.log("dragging_piece",this.dragging_piece);
    console.log("NUM_PIECE", this.NUM_PIECE);
    */
    if (this.piece_list[this.dragging_piece].c.reserve === true){
      this.pick_reserve_piece();
    }else{
      let seed = 0;
      let piece_number = 0;
      [seed, piece_number] = ctr_num_to_stat_num(this.dragging_piece, this.NUM_PIECE);
      console.log("seed,piece_number", seed, piece_number);
		  let mass = this.piece_list[this.dragging_piece].c.mass;
		  this.piece_list[this.dragging_piece].c.previousMass = mass;
      // �R�}������ꏊ�����点��
      this.board_group.mass.children[mass].alpha = 0.5;
      // �����Ղ̓����蔻��I�u�W�F�N�g(�}�X)�̃^�b�`�C�x���g��L���ɂ���
      // �������ꏊ����
      let valid_actions = get_valid_actions(this.board_array, this.piece_seed_list, this.piece_status, seed, piece_number, this.NUM_HEIGHTMASS, this.NUM_WIDTHMASS);
      console.log("valid_actions", valid_actions);
      // ������ꏊ���Ȃ���΃L�����Z������
      if (valid_actions.length == 0) {
        console.log("cancel");
        this.pick = false;
        this.num_pick_piece = 0;
        // �R�}������ꏊ���Â�����
        this.board_group.mass.children[mass].alpha = 0.0;
        // ��̃^�b�`��L���ɂ���
        for (i = 0; i < this.SUM_PIECE; i++) {
          // �����̋��
          if (this.piece_list[i].c.player == 0) {
            this.piece_list[i].setInteractive(true);
          }
        }
      }
      for (let j = 0; j < this.NUM_WIDTHMASS * this.NUM_HEIGHTMASS; j++){
		  	if(valid_actions.includes(j)){
          this.board_group.mass.children[j].setInteractive(true);
          // �R�}��������Ƃ�������点��
          this.board_group.mass.children[j].alpha = 0.5;
		  	}
		  }
    }
		this.pick = false;
		this.num_pick_piece = 0;
  },
  // pick_piece�̒��ɖ��ߍ���
  pick_reserve_piece: function () {
    console.log("pick_reserve_piece");
    NUM_HEIGHTMASS = this.NUM_HEIGHTMASS;
    NUM_WIDTHMASS = this.NUM_WIDTHMASS;
    let pick_piece = this.dragging_piece;
    let seed = 0;
    let piece_number = 0;
    [seed, piece_number] = ctr_num_to_stat_num(pick_piece, this.NUM_PIECE);
    let player = this.piece_status[seed_to_index(seed)][piece_number].player;
    // ��̂܂������点�ă^�b�`��L���ɂ���
    let empty_mass = this.get_empty_mass();
    for (let i = 0; i < empty_mass.length; i++) {
      this.board_group.mass.children[empty_mass[i]].alpha = 0.5;
      this.board_group.mass.children[empty_mass[i]].setInteractive(true);
    }
    // �Ղ̏㉺�R�}�X�����u�������Ɠ����邩���ׂ�
    let dummy_board = [];
    let dummy_valid_actions = [];
    let mass = 0;
    let valid = true;
    for (let i = 0; i < this.NUM_HEIGHTMASS; i++) {
      for (let j = 0; j < this.NUM_WIDTHMASS; j++) {
        valid = true;
      /*
        if (i < 3 || i >= this.NUM_HEIGHTMASS - 3) {
          dummy_board = this.board_array.concat();
          dummy_board[mass_to_xy(j, i, this.NUM_WIDTHMASS)] = seed * player;
          // dummy_valid_actions = get_valid_actions(this.board_array, this.piece_seed_list, this.piece_status, seed, piece_number, this.NUM_HEIGHTMASS, this.NUM_WIDTHMASS);
          
          // �u���Ȃ��}�X�͌��������^�b�`����
          if (dummy_valid_actions == []) {
            mass = xy_to_mass(j, i); 
            this.board_group.mass.children[mass].alpha = 0.0;
            this.board_group.mass.children[mass].setInteractive(false);
          }
        }
        */
        if(i < 2 && player == 0){
          if(i == 0 && [1,2,3].includes(seed)){
            valid = false;
          }else if(i==1 && [2].includes(seed)){
            valid = false;
          }
        }else if(i >= NUM_HEIGHTMASS - 2 && player == 1){
          if(i == NUM_HEIGHTMASS -1 && [1,2,3].includes(seed)){
            valid = false;
          }else if(i == NUM_HEIGHTMASS -2 && [2].includes(seed)){
            valid = false;
          }
        }
        if (valid == false) {
          mass = xy_to_mass(j, i,this.NUM_WIDTHMASS); 
          this.board_group.mass.children[mass].alpha = 0.0;
          this.board_group.mass.children[mass].setInteractive(false);
        }
      }
    }
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
    // ���u���Ƃ�(�����ɓ������Ƃ͊m�肵�Ă���)
    // piece �͒ʂ��ԍ�
    let mass = this.put_mass;
    // console.log("put_mass", mass);
    let dragging_piece = this.dragging_piece;
    let seed = 0;
    let number = 0;
    [seed, number] = ctr_num_to_stat_num(dragging_piece, this.NUM_PIECE);
    if(this.piece_list[dragging_piece].c.reserve === true){
      this.piece_list[dragging_piece].c.reserve = false;
      this.piece_list[dragging_piece].addChildTo(this.board_group.pieces);
      this.reserve_group.del_piece(dragging_piece);
    }
    // ���点���ꏊ���Â�����
    for(let i = 0; i<this.NUM_ALLMASS;i++){
      this.board_group.mass.children[i].alpha = 0.0;
      this.board_group.mass.children[i].setInteractive(false);
    }
    /*
    let previous_mass = this.piece_list[dragging_piece].mass;
    this.board_group.mass.children[previous_mass].alpha = 0.0;
    let valid_actions = get_valid_actions(this.board_array, this.piece_seed_list, this.piece_status, seed, number);
    for (let l = 0; l < this.NUM_WIDTHMASS * this.NUM_HEIGHTMASS; l++) {
      if (valid_actions.includes(l)) {
        // �^�b�`�C�x���g�𖳌��ɂ���
        this.board_group.mass.children[l].setInteractive(false);
        // ���点���ꏊ���Â�����
        this.board_group.mass.children[l].alpha = 0.0;
      }
    }
    */
		// ��̕\���ʒu�X�V
    this.piece_list[dragging_piece].c.mass = mass;
		let mass_x = 0;
		let mass_y = 0;
		[mass_x,mass_y] = mass_to_xy(mass,this.NUM_HEIGHTMASS,this.NUM_WIDTHMASS);
		console.log("put,action,x,y",mass,mass_x,mass_y);
		this.piece_list[dragging_piece].c.set_on_mass(mass_x,mass_y);

    this.dragging = false;
    let player = this.piece_status[seed_to_index(seed)][number].player;
    [this.board_array, this.reservePieces, this.done] = syogi_step(this.board_array, this.piece_status, this.reservePieces, this.NUM_PIECE, dragging_piece, action = mass, player = player);
    
		// �G�̃R�}���������
    console.log(this.reservePieces);
    this.obtain_piece(player);
    this.put = false;
		this.put_mass = 0;
		this.turn = 1;
		if(this.done == true){
			this.turn = 10;
			this.game_status = "player win"
    }
  },
  
  // �Ֆʂɋ�ǂ��ɂ��邩�̔z���Ԃ�
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
      if (this.piece_list[i].c.player == 1) {
        cnt++;
      }
    }
    return cnt;
  },
  get_empty_mass: function(){
    let empty_mass = [];
    let idx = 0;
    for(let i=0;i<this.NUM_ALLMASS;i++){
      empty_mass.push(i);
    }
    for(i=0;i<this.SUM_PIECE;i++){
      if(this.piece_list[i].c.mass === -1){
        continue;
      }
      idx = empty_mass.findIndex(elem => elem === this.piece_list[i].c.mass);
      empty_mass.splice(idx, 1);
    }
    console.log(empty_mass);
    return empty_mass;
  },
  // �����Ȃ��}�X�����点��
  flash_empty_mass: function () {
    for (let i = 0; i < this.NUM_ALLMASS; i++) {
      if (this.board_array[i] == 0) {
        console.log("this.board_group.mass.children[i]",this.board_group.mass.children[i]);
        this.board_group.mass.children[i].alpha = 0.5;
      }
    }
  },
  // ����Ƃ�
  obtain_piece: function (player) {
    for (let i = 0; i < this.reservePieces[player].length; i++) {
      ctr_num = this.reservePieces[player][i];
      // �܂��p�����[�^���X�V���Ă��Ȃ����
      if (this.piece_list[ctr_num].c.reserve == false) {
        this.piece_list[ctr_num].c.reserve = true;
        this.piece_list[ctr_num].c.mass = -1;
        if (this.piece_list[ctr_num].c.player == 0) {
          this.piece_list[ctr_num].c.player = 1;
        } else if (this.piece_list[ctr_num].c.player == 1) {
          this.piece_list[ctr_num].c.player = 0;
        }
        this.reserve_group.add_piece(player,ctr_num, this.piece_list);
      }
    }
    
  },

	show_result: function() {
		let result_elements = Result().addChildTo(this)
																	.setPosition(this.gridX.center(),this.gridY.center());
		let rect = RectangleShape({
      width: 300,
      height: 200,
      fill: '#5BA8D9',
      // stroke: 'lime',
      strokeWidth: 0,
      cornerRadius: 0
    }).addChildTo(result_elements);
		rect.alpha = 0.7;
		// ���x���\��
		let label = Label(this.game_status).addChildTo(result_elements);
		// label.setPosition(result_elements.gridX.center(), result_elements.gridY.center());
  }
});

/*
 * ���C������
 */
phina.main(function() {
	// �A�v���P�[�V�����𐶐�
	var app = GameApp({
	// MainScene ����J�n
	startLabel: 'main',
	// �A�Z�b�g�ǂݍ���
	assets: ASSETS,
	});
	// fps�\��
	app.enableStats();
	// ���s
	app.run();
});
