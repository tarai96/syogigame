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
	var actions = [[],[],[],[],[],[],[],[],[],[],[],[]];
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
	// ���̃A�N�V����
	for(var i=2;i<12;i++){
		actions[i][0] = -1 * NUM_WIDTHMASS - 1
	}
	
	var piece_seed_list = [];
	var HU = new SyogiPiece(actions[0]);
	var OSYO = new SyogiPiece(actions[1]);

	for(var i =0;i<12;i++){
		piece_seed_list.push(new SyogiPiece(actions[i]));
	}

	// TODO �ق��̏������ǉ�

	console.log("piece_status,piece_seed_list,NUM_PIECE");
	console.log(piece_status,piece_seed_list,NUM_PIECE);
	return {piece_status ,piece_seed_list ,NUM_PIECE};
}

