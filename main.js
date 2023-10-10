// JavaScript source code
// �O���[�o���ɓW�J
phina.globalize();
// �A�Z�b�g
var ASSETS = {
	// �摜
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

// �Ֆʂɋ�ǂ��ɂ��邩�̔z���Ԃ�
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
	//Sprite�N���X���p��
	superClass: 'Sprite',
	init: function(control_number,mass, actions, player, reserve=false) {
		// �e�N���X������
		this.superInit('hu');
		this.mass = mass;
		this.previousMass = mass;
		this.actions = actions;
		this.player = player;
		this.reserve = reserve;
		// ���@��
		this.seed = 1;
		this.control_number = control_number;
	},
});

phina.define("Keima", {
  //Sprite�N���X���p��
  superClass: 'Sprite',
  init: function (control_number,mass, actions, player, reserve = false) {
    // �e�N���X������
    this.superInit('keima');
    this.mass = mass;
    this.previousMass = mass;
    this.actions = actions;
    this.player = player;
    this.reserve = reserve;
    // ���@�j�n
    this.seed = 2;
		this.control_number = control_number;
  },
});

phina.define("Kyousya", {
  //Sprite�N���X���p��
  superClass: 'Sprite',
  init: function (control_number,mass, actions, player, reserve = false) {
    // �e�N���X������
    this.superInit('kyousya');
    this.mass = mass;
    this.previousMass = mass;
    this.actions = actions;
    this.player = player;
    this.reserve = reserve;
    // ���@����
    this.seed = 3;
		this.control_number = control_number;
  },
});

phina.define("Kin", {
  //Sprite�N���X���p��
  superClass: 'Sprite',
  init: function (control_number,mass, actions, player, reserve = false) {
    // �e�N���X������
    this.superInit('kin');
    this.mass = mass;
    this.previousMass = mass;
    this.actions = actions;
    this.player = player;
    this.reserve = reserve;
    // ���@��
    this.seed = 4;
		this.control_number = control_number;
  },
});

phina.define("Gin", {
  //Sprite�N���X���p��
  superClass: 'Sprite',
  init: function (control_number,mass, actions, player, reserve = false) {
    // �e�N���X������
    this.superInit('gin');
    this.mass = mass;
    this.previousMass = mass;
    this.actions = actions;
    this.player = player;
    this.reserve = reserve;
    // ���@��
    this.seed = 5;
		this.control_number = control_number;
  },
});

//TODO seed������
phina.define("Hisya", {
  //Sprite�N���X���p��
  superClass: 'Sprite',
  init: function (control_number,mass, actions, player, reserve = false) {
    // �e�N���X������
    this.superInit('hisya');
    this.mass = mass;
    this.previousMass = mass;
    this.actions = actions;
    this.player = player;
    this.reserve = reserve;
    // ���@���
    this.seed = 6;
		this.control_number = control_number;
  },
});

phina.define("Kaku", {
  //Sprite�N���X���p��
  superClass: 'Sprite',
  init: function (control_number,mass, actions, player, reserve = false) {
    // �e�N���X������
    this.superInit('kaku');
    this.mass = mass;
    this.previousMass = mass;
    this.actions = actions;
    this.player = player;
    this.reserve = reserve;
    // ���@�p
    this.seed = 7;
		this.control_number = control_number;
  },
});

phina.define("Osyo", {
	//Sprite�N���X���p��
	superClass: 'Sprite',
	init: function(control_number,mass, actions, player, reserve=false) {
		// �e�N���X������
		this.superInit('osyo');
		this.mass = mass;
		this.previousMass = mass;
		this.actions = actions;
		this.player = player;
		this.reserve = reserve;
		// ���@����
		this.seed = 8;
		this.control_number = control_number;
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
	this.gameStatus = ""
	this.piece_seed_list = [];
	this.piece_status = [];
	this.piece_list = [];
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
		// �G�͕\�����㉺���]
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
			.on('pointstart', this.pick_piece(this.control_number));
		this.board_group.children[i+1].scaleY *= reverce;
	}
	console.log(this.board_group);

	// �����Ղ̓����蔻��܂�
	for (j = 0; j < this.NUM_HEIGHTMASS; j++) {
		for (i = 0; i < this.NUM_WIDTHMASS; i++) {
		// RectangleShape
      RectangleShape({
        width: 45,
        height: 49,
        fill: 'red',
        // stroke: 'lime',
        strokeWidth: 0,
        cornerRadius: 0
      }).addChildTo(this.board_group)
        .setPosition(48 * (i - (this.NUM_WIDTHMASS - 1) / 2) + 0,
          52 * (j - (this.NUM_HEIGHTMASS - 1) / 2) + 0)
        .on('pointstart', function () {
          // ���u���Ƃ�(�����ɓ������Ƃ͊m�肵�Ă���)
          // piece �͒ʂ��ԍ�
          let mass = xy_to_mass(i, j, this.NUM_WIDTHMASS);
          let seed = 0;
          let num_idx = 0;
          [seed, num_idx] = find_piece_for_mass(piece_status, this.NUM_PIECE, mass);
          let piece = stat_num_to_ctr_num(seed, num_idx, this.NUM_PIECE);
          if (seed == 0) {
            dragging_piece_idx = piece + 1 + 0;
          } else {
            dragging_piece_idx = piece + 1 + sum_array(this.NUM_PIECE.slice(0, seed));
          }
          this.board_group.children[dragging_piece].mass = mass;
          // �^�b�`�C�x���g�𖳌��ɂ��� �L���ɂ��Ă��}�X�����@�������Ƃ�����
					let piece_number = 0;
					[seed, piece_number] = ctr_num_to_stat_num(dragging_piece);
					let valid_actions = get_valid_actions(board_array, piece_seed_list, piece_status, seed, piece_number);
          for (let l = 0;l < this.NUM_WIDTHMASS * NUM_HEIGHTMASS; l++) {
            if (valid_actions.includes(l)) {
              this.board_group.children[l + 1 + SUM_PIECE].setInteractive(false);
            }
          }

          dragging = false;

          let player = piece_status[seed][num_idx].player;
          [board_array, reservePieces, done] = syogi_step(board_array, piece_status, reservePieces, piece, action = mass, player = player);
          turn = 1;
      });
      let mass = xy_to_mass(i, j, this.NUM_WIDTHMASS);
			console.log(this.SUM_PIECE);
      this.board_group.children[mass + 1 + this.SUM_PIECE].alpha = 0.0;
    }
	}

	// ��̃^�b�`��L���ɂ���
	for(i = 0;i < this.SUM_PIECE;i++){
		 this.board_group.children[i + 1].setInteractive(true);
  }
	},
	// ���t���[���X�V����
	update: function() {
	console.log("turn",this.turn,"dragging",this.dragging);
	// �����̔�
	if(this.turn == 0){
		if(this.dragging){
			this.board_group.children[dragging_piece].setposition(mouse.x,mouse.y);
			// �����蔻�� ������ƌ��点��
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
	// ����̔�
	}else if(turn == 1){
		let activePiece;
		// �������R�}
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
		// �ǂ��ɓ���
		let seed = 0;
		let piece_number = 0;
		[seed, piece_number] = ctr_num_to_stat_num(control_number);
		let valid_actions = get_valid_actions(board_array, piece_seed_list, piece_status, seed, piece_number)
		let action = Math.floor(Math.random() * valid_actions.length);
		this.board_group.children[control_number + 1].mass = valid_actions[action];
		[this.board_array, this.reservePieces, this.done] = syogi_step(board_array, piece_status, reservePieces, piece = control_number, action = valid_actions[action], player = 1);
		turn = 0;
		// �^�[���I��
		// ��̃^�b�`��L���ɂ���
		for(i=0;i<this.SUM_PIECE;i++){
			this.board_group.children[i+1].setInteractive(true);
		}
	}
	},
	pick_piece: function(control_number){
		// ���I�ԂƂ�
		this.dragging = true;
		let dragging_piece = control_number;
		console.log("dragging_piece",dragging_piece);
		console.log("NUM_PIECE", this.NUM_PIECE)
		let seed = 0;
		let piece_number = 0;
		[seed, piece_number] = ctr_num_to_stat_num(dragging_piece, this.NUM_PIECE);
		this.board_group.children[dragging_piece+1].previousMass = board_group.children[dragging_piece+1].mass
		// �����Ղ̓����蔻��I�u�W�F�N�g�̃^�b�`�C�x���g��L���ɂ���
		// �������ꏊ����
		let valid_actions = get_valid_actions(board_array, piece_seed_list, piece_status, seed, piece_number);
		for(j=0;j<NUM_WIDTHMASS*NUM_HEIGHTMASS;j++){
			if(valid_actions.includes(j)){
				this.board_group.children[j+1+SUM_PIECE].setInteractive(true);
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
});

phina.define("ResultScene", {
	// �p��
	superClass: 'DisplayScene',
	// ������
	init: function() {
	},
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
