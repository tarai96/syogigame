// JavaScript source code

/*
/// excel�t�@�C���ǂݍ��ނȂ炱���ŏ��������Ȃ��ϐ� ////////////
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
// ��
actions[0][0] = -1 * NUM_WIDTHMASS;
//����
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
	// �z���ǂݍ���ŁApiece_status,piece_seed_list,NUM_PIECE��Ԃ�(������)
	console.log("board_array");
	console.log(board_array);
	// �������z�� 0:�� 1:���ʏ�
	/*
	for (var i = 0; i < 2; i++) {
		piece_status[i] = [];
	}
	*/
	// �����z�񏉊��� var board_array = new Array(NUM_ALLMASS).fill(0);
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
	// ���N���X�̏�����
	// �e���̃A�N�V����
	// ���� actions �P�������΍��W���̃R�}�̍��W��0�Ƃ���
	//              x+y*(���̃}�X��)
	/*
	for (var i = 0; i < 2; i++) {
		actions[i] = [];
	}
	*/
	var actions = [[],[],[],[],[],[],[],[]];
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
	
	var piece_seed_list = [];
	var HU = new SyogiPiece(actions[0]);
	piece_seed_list.push(HU);
	var OSYO = new SyogiPiece(actions[1]);
	piece_seed_list.push(OSYO);

	// TODO �ق��̏������ǉ�

	console.log("piece_status,piece_seed_list,NUM_PIECE");
	console.log(piece_status,piece_seed_list,NUM_PIECE);
	return {piece_status ,piece_seed_list ,NUM_PIECE};
}

// ��P��
function piece_init(player,position,reserve = false){
	
	// �X�̋�
	var status = new SyogiPieceStatus(player,position,reserve);

	return status
}

// ���̏�����
function piece_init_0(){

}

function syogi_init_0(){
	NUM_HU_0 = [1,1];
	NUM_OSYO_0 = [1,1];
	NUM_PIECE_0 = [NUM_HU_0,NUM_OSYO_0];

	var board_array = new Array(NUM_ALLMASS).fill(0);

	board_array[3] = -2;
	board_array[3 + (NUM_WIDTHMASS * 1)] = -1;
	board_array[4 + (NUM_WIDTHMASS * 4)] = 1;
	board_array[3 + (NUM_WIDTHMASS * 5)] = 2;

	/*
	  board_array[0 + (NUM_WIDTHMASS * 0)] = 1;
	  board_array[1 + (NUM_WIDTHMASS * 2)] = 1;
	  board_array[2 + (NUM_WIDTHMASS * 3)] = -1;
	  board_array[5 + (NUM_WIDTHMASS * 5)] = 1;
	  board_array[6 + (NUM_WIDTHMASS * 6)] = -1;
	  board_array[7 + (NUM_WIDTHMASS * 7)] = 1;
	  board_array[8 + (NUM_WIDTHMASS * 8)] = 1;
	*/

	var piece_status = [];
	var piece_seed_list = [];
	// ��킸��
	for(var i=0;i<2;i++){
		// ���̃X�e�[�^�X
		var Piece = new SyogiPiece(actions[i]);
		piece_seed_list.push(Piece);
		for(var j=0;j<NUM_PIECE[i];j++){
			// �X�̋�̃X�e�[�^�X(��킸��)
			var statuses = [];
			for(var l=0;l<2;l++){
				//����A�G��ʁX 0:���@1:�G
				for(var p=0;p<NUM_PIECE_0[i,j];p++){
					var status = piece_init(l);
					statuses.push(status);
				}
			}
		piece_status.push(statuses)	
		}
	}

}