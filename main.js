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

var NUM_WIDTHMASS = 9;
var NUM_HEIGHTMASS = 9;
var NUM_ALLMASS = NUM_HEIGHTMASS * NUM_WIDTHMASS;
var BOARD_MARJIN = 5;

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
	init: function(mass, actions, player, reserve=false) {
		// �e�N���X������
		this.superInit('hu');
		this.mass = mass;
		this.previousMass = mass;
		this.actions = actions;
		this.player = player;
		this.reserve = reserve;
		// ���@��
		this.seed = 1;
	},
});

phina.define("Keima", {
  //Sprite�N���X���p��
  superClass: 'Sprite',
  init: function (mass, actions, player, reserve = false) {
    // �e�N���X������
    this.superInit('keima');
    this.mass = mass;
    this.previousMass = mass;
    this.actions = actions;
    this.player = player;
    this.reserve = reserve;
    // ���@�j�n
    this.seed = 2;
  },
});

phina.define("Kyousya", {
  //Sprite�N���X���p��
  superClass: 'Sprite',
  init: function (mass, actions, player, reserve = false) {
    // �e�N���X������
    this.superInit('kyousya');
    this.mass = mass;
    this.previousMass = mass;
    this.actions = actions;
    this.player = player;
    this.reserve = reserve;
    // ���@����
    this.seed = 3;
  },
});

phina.define("Kin", {
  //Sprite�N���X���p��
  superClass: 'Sprite',
  init: function (mass, actions, player, reserve = false) {
    // �e�N���X������
    this.superInit('kin');
    this.mass = mass;
    this.previousMass = mass;
    this.actions = actions;
    this.player = player;
    this.reserve = reserve;
    // ���@��
    this.seed = 4;
  },
});

phina.define("Gin", {
  //Sprite�N���X���p��
  superClass: 'Sprite',
  init: function (mass, actions, player, reserve = false) {
    // �e�N���X������
    this.superInit('gin');
    this.mass = mass;
    this.previousMass = mass;
    this.actions = actions;
    this.player = player;
    this.reserve = reserve;
    // ���@��
    this.seed = 5;
  },
});

//TODO seed������
phina.define("Hisya", {
  //Sprite�N���X���p��
  superClass: 'Sprite',
  init: function (mass, actions, player, reserve = false) {
    // �e�N���X������
    this.superInit('hisya');
    this.mass = mass;
    this.previousMass = mass;
    this.actions = actions;
    this.player = player;
    this.reserve = reserve;
    // ���@���
    this.seed = 6;
  },
});

phina.define("Kaku", {
  //Sprite�N���X���p��
  superClass: 'Sprite',
  init: function (mass, actions, player, reserve = false) {
    // �e�N���X������
    this.superInit('kaku');
    this.mass = mass;
    this.previousMass = mass;
    this.actions = actions;
    this.player = player;
    this.reserve = reserve;
    // ���@�p
    this.seed = 7;
  },
});

phina.define("Osyo", {
	//Sprite�N���X���p��
	superClass: 'Sprite',
	init: function(mass, actions, player, reserve=false) {
		// �e�N���X������
		this.superInit('osyo');
		this.mass = mass;
		this.previousMass = mass;
		this.actions = actions;
		this.player = player;
		this.reserve = reserve;
		// ���@����
		this.seed = 8;
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

	// �Ֆʏ�����
	// board_array�@����̋�̓}�C�i�X
	var board_array = [-3, -2, -5, -4, -8, -4, -5, -2, -3,
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
	[piece_status,piece_seed_list,num_piece] = syogi_init(board_array,NUM_WIDTHMASS,NUM_HEIGHTMASS);
    const NUM_PIECE = num_piece;
    const SUM_PIECE = sum_array(NUM_PIECE);
    console.log("piece_status,piece_seed_list,NUM_PIECE");
	console.log(piece_status,piece_seed_list,NUM_PIECE);
	// �����

	// �����@game�{�� piece_status[���-1][�ʂ��ԍ�]
	//       Sprite piece_list[�ԍ�] �ԍ��̋��ߕ��i���j(��킲�Ƃ̋�̐��̂���܂ł̍��v)+(��̒ʂ��ԍ�)

	  //�� no.1
	  for(let i=0;i<NUM_PIECE[0];i++){
		  // mass,action,player 
		  piece_list.push(Hu(piece_status[0][i].mass,piece_seed_list[0].actions,piece_status[0][i].player));
      }
    //�j�n no.2
    for (let i = 0; i < NUM_PIECE[1]; i++) {
      // mass,action,player 
      piece_list.push(Keima(piece_status[1][i].mass, piece_seed_list[1].actions, piece_status[1][i].player));
    }
    //���� no.3
    for (let i = 0; i < NUM_PIECE[2]; i++) {
      // mass,action,player 
      piece_list.push(Kyousya(piece_status[2][i].mass, piece_seed_list[2].actions, piece_status[2][i].player));
    }
    //�� no.4
    for (let i = 0; i < NUM_PIECE[3]; i++) {
      // mass,action,player 
      piece_list.push(Kin(piece_status[3][i].mass, piece_seed_list[3].actions, piece_status[3][i].player));
    }
    //�� no.5
    for (let i = 0; i < NUM_PIECE[4]; i++) {
      // mass,action,player 
      piece_list.push(Gin(piece_status[4][i].mass, piece_seed_list[4].actions, piece_status[4][i].player));
    }
    //��� no.6
    for (let i = 0; i < NUM_PIECE[5]; i++) {
      // mass,action,player 
      piece_list.push(Hisya(piece_status[5][i].mass, piece_seed_list[5].actions, piece_status[5][i].player));
    }
    //�p no.7
    for (let i = 0; i < NUM_PIECE[6]; i++) {
      // mass,action,player 
      piece_list.push(Kaku(piece_status[6][i].mass, piece_seed_list[6].actions, piece_status[6][i].player));
    }
	  //���� no.8
	  for(let i=0;i<NUM_PIECE[7];i++){
		  // mass,action,player 
		  piece_list.push(Osyo(piece_status[7][i].mass,piece_seed_list[7].actions,piece_status[7][i].player));
	  }

	// ���������
	// reservePieces 2�����z�� 0 �����@1 ����
	for(let i = 0; i < 2; i++) { reservePieces.push(Array(64).fill(0)); }

	var mass_size = 50;
	console.log("mass_size",mass_size);
	
	// Sprite
	var board_group = DisplayElement().addChildTo(this);
	board_group.setPosition(this.gridX.center(), this.gridY.center());
	// board 
	Sprite('ban').addChildTo(board_group)
	var reverce = 1;
	
	console.log("piece_list")
	console.log(piece_list)

	for(let i=0;i<SUM_PIECE;i++){
		// �G�͕\�����㉺���]
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
				// ���I�ԂƂ�
				dragging = true;
				board_group.children[i+1].previousMass = board_group.children[i+1].mass
				// �����Ղ̓����蔻��I�u�W�F�N�g�̃^�b�`�C�x���g��L���ɂ���
				// �������ꏊ����
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

	// �����Ղ̓����蔻��܂�
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
        .on('pointstart', function () {
          // ���u���Ƃ�(�����ɓ������Ƃ͊m�肵�Ă���)
          // piece �͒ʂ��ԍ�
          let mass = xy_to_mass(i, j);
          let seed = 0;
          let num_idx = 0;
          [seed, num_idx] = find_piece_for_mass(piece_status, NUM_PIECE, mass);
          let piece = stat_num_to_ctr_num(seed, num_idx, NUM_PIECE);
          if (seed == 0) {
            dragging_piece_idx = piece + 1 + 0;
          } else {
            dragging_piece_idx = piece + 1 + sum_array(NUM_PIECE.slice(0, seed));
          }
          board_group.children[dragging_piece].mass = mass;
          // �^�b�`�C�x���g�𖳌��ɂ��� �L���ɂ��Ă��}�X�����@�������Ƃ�����
          var valid_actions = get_valid_action(board_array, dragging_piece);
          for (let l = 0;l < NUM_WIDTHMASS * NUM_HEIGHTMASS; l++) {
            if (valid_actions.includes(l)) {
              board_group.children[l + 1 + SUM_PIECE].setInteractive(false);
            }
          }

          dragging = false;

          let player = piece_status[seed][num_idx].player;
          [board_array, reservePieces, done] = syogi_step(board_array, piece_status, reservePieces, piece, action = mass, player = player);
          turn = 1;
      });
      let mass = xy_to_mass(i, j);
			console.log(SUM_PIECE);
      board_group.children[i + j * NUM_WIDTHMASS + 1 + SUM_PIECE].alpha = 0.0;
    }
	}
	},
	// ���t���[���X�V����
	update: function() {
	console.log("turn",turn,"dragging",dragging);
	// �����̔�
	if(turn == 0){
		if(dragging){
			board_group.children[dragging_piece].setposition(mouse.x,mouse.y);
			// �����蔻�� ������ƌ��点��
			for(i=0;i<NUM_WIDTHMASS*NUM_HEIGHTMASS;i++){
				if(board_group.children[dragging_piece]
					.hitTestElement(board_group.children[i+1+SUM_PIECE])){
					console.log(i, "hit");
					board_group.children[i+1+SUM_PIECE].alpha = 0.1;
				}else{
					board_group.children[i+1+SUM_PIECE].alpha = 0;
					console.log(i, "no hit");
				}
			}
		}
	// ����̔�
	}else if(turn == 1){
		var activePiece;
		
		// �������R�}
		activePiece = Math.floor(Math.random() * get_num_enemy_piece());
		var cnt = 0;
		for(i=0;i<SUM_PIECE;i++){
			if(board_group.children[i+1].player == -1){
				if(cnt==activePiece){
				break;
				}
				cnt++;
			}
		}
		board_group.children[activeMass].previousMass = board_group.children[activeMass].mass;
		// �ǂ��ɓ���
		var valid_action = get_valid_action(board_group.children[i]);
		var action = Math.floor(Math.random() * valid_action.length);
		board_group.children[activePiece].mass += board_group.children[activePiece].actions[action];
		board_array[board_group.children[activePiece].previousMass] = 0;
		board_array[i] = board_group.children[activePiece].syurui * board_group.children[activePiece].player
		turn = 0;
		// �^�[���I��
		// ��̃^�b�`��L���ɂ���
		for(i=0;i<SUM_PIECE;i++){
			board_group.children[i+1].setInteractive(true);
		}
	}
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
