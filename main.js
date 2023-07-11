// JavaScript source code
// �O���[�o���ɓW�J
phina.globalize();
// �A�Z�b�g
var ASSETS = {
	// �摜
	image: {
	 'hu': "image/syougi14_fuhyou.png",
	 'ban': "image/syougi_ban.png",
	},
};
var currentMass = 0;
var turn = 0;
var hold = false;
var holdPiece = 0;
var reservePieces = [];
var pieceStatus = [];
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

// �Ֆʂɋ�ǂ��ɂ��邩�̔z���Ԃ�
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
	for(var i in pieceList[number_piece].actions){
		x = pieceStatus[number_piece-1][control_number].position.x + pieceList[number_piece].actions.x;
		y = pieceStatus[number_piece-1][control_number].position.y + pieceList[number_piece].actions.y;
		actions_list.push(new Point(x,y));
	}
	return actions_list;
	
}

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
	// �����
	// ���� actions �P�������΍��W���̃R�}�̍��W��0�Ƃ���
	//              x+y*(���̃}�X��)
	var actions = [];

	for (i = 0; i < 2; i++) {
		actions[i] = [];
	}

	var size = new Size(50,50);

	//�� no.1
	var huGroup = DisplayElement().addChildTo(this);

	actions[0][0] = -1 * NUM_WIDTHMASS;
	var hu = new SyogiPiece(size,actions[0]);
	var husStatus = new Array(NUM_HU).fill(new SyogiPieceStatus(0));
	husStatus[1].player = 1;
	console.log(actions[0]);
	pieceStatus.push(husStatus)


	//���� no.2
	var osyoGroup = DisplayElement().addChildTo(this);

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

	// ��̃��X�g
	pieceList[0] = hu;
	pieceList[1] = osyo;

	// ���������
	// reservePiece 2�����z�� 0 �����@1 ����
	for(i = 0; i < 2; i++) { reservePiece.push(Array(64).fill(0)); }

	// �Ֆʏ�����
	// board_array�@����̋�̓}�C�i�X
	var board_array = new Array(NUM_ALLMASS).fill(0);
	var mass_positionx = 320;
	var mass_positiony = 480;
	var mass_size = 50;
	console.log("mass_size",mass_size);
	
	board_array[3] = 2;
	board_array[3 + (NUM_WIDTHMASS * 1)] = 1;
	board_array[3 + (NUM_WIDTHMASS * 4)] = 1;
	board_array[3 + (NUM_WIDTHMASS * 5)] = 2;

	// Sprite
	var board = Sprite('ban').addChildTo(this)
				.setPosition(mass_positionx, mass_positiony);
	console.log(board.width,board.height);	// 460, 500
	// �n�_(����)x:320-(460/2)=90 y:480-(500/2)=230
	// ��̈ʒu x:��}�X(50)*���݃}�X+�n�_+��}�X�̔���
	//			y:���l
	var reverce = 1;
	// ��
	var hu_positions = [];
	hu_positions = get_piece_position(board_array,1);
	console.log(hu_positions);
	for(i=0;i<NUM_HU;i++){
		// �G�͕\�����㉺���]
		if(husStatus[i].player == 1){
			reverce = -1;
		}
		Sprite('hu').addChildTo(huGroup)
			.setPosition(50 * hu_positions[i].x + 115,
						50 * hu_positions[i].y + 255)
			.setSize(mass_size, mass_size);
		huGroup[i].scaleY *= reverce;
	}
	/*
	// ����
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

	// ��
	var kin_positions = [];
	kin_positions = get_piece_position(board_array, ?);
	for(i=0;i<2;i++){
		Sprite('osyo').addChildTo(osyoGroup)
			.setPosition(50 * osyo_positions[i].x + 115,
						50 * hu_positions[i].y + 255)
			.setSize(mass_size, mass_size);
	}
	*/


  },
  // ���t���[���X�V����
  update: function() {
	// �ȉ��ɃR�[�h�������Ă���  
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
});// JavaScript source code
