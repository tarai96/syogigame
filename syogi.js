// JavaScript source code

function seed_to_index(seed){
	return seed - 1;
}

function sum_array(arr) {
  let sum = 0;
	for (let i = 0; i < arr.length; i++) {
		sum += arr[i];
  }
	return sum;
}

// piece_list�̔ԍ�����piece_status�̔ԍ���
function ctr_num_to_stat_num(control_number, NUM_PIECE) {
  let status_number = control_number;
  for (let seed = 0; seed < NUM_PIECE.length; seed++) {
    console.log("seed","status_number",seed, status_number);
		if (status_number >= NUM_PIECE[seed]) {
      status_number -= NUM_PIECE[seed];
    } else {
      // seed�͂P����n�܂�
      return [seed+1, status_number];
		}
	}
}

function stat_num_to_ctr_num(seed, status_number, NUM_PIECE) {
	let control_number = 0;
	for (let i = 0; i < seed; i++) {
		control_number += NUM_PIECE[i];
	}
	control_number += status_number;
	const sum_piece = sum_2darray(NUM_PIECE);
	if (control_number >= sum_piece) {
		console.log("error control_number >= sum_piece");
		console.log("control_number, sum_piece,NUM_PIECE");
		console.log(control_number, sum_piece, NUM_PIECE);
	}
	return control_number;
}

function mass_to_xy(mass,NUM_HEIGHTMASS,NUM_WIDTHMASS) {
	let x = mass;
  for (let y = 0; y < NUM_HEIGHTMASS; y++) {
    if (x < NUM_WIDTHMASS) {
			return [x, y];
		}
		x -= NUM_WIDTHMASS;
	}
}

function xy_to_mass(x, y, NUM_WIDTHMASS) {
  let mass = y * NUM_WIDTHMASS + x;
  console.log(mass);
  return mass;
}

function is_valid_action(board_array, action, player) {
  console.log(board_array, action, player);
	if (action < 0 && action >= NUM_ALLMASS) {
		// �����Ղ̊O
		  return false;
	}	else if (board_array[action] < 0 && player == 0) {
		// �������Ƃ���}�X�ɂ��̋�̖����̋���Ȃ���Γ�����
		  return true;
	} else if (board_array[action] > 0 && player == 1) {
		  return true;
	} else if (board_array[action] == 0) {
		  return true;
	} else {
	  console.log("error");
	}
}

// ��̋���w�肵������}�X�����W�ŕԂ�
function get_valid_actions(board_array, piece_seed_list, pieces_status, seed, piece_number,NUM_HEIGHTMASS,NUM_WIDTHMASS) {
	let board = board_array.concat();
	let piece_status = pieces_status.concat();
	let actions_list = [];
	if (piece_status[seed_to_index(seed)][piece_number].reserve) {
		return [];
	}
  // ���̃A�N�V���������ۂ̍��W�ɒ���
  let position = 0;
  let action = 0;
  let seed_idx = seed_to_index(seed);
  console.log(piece_seed_list);
  for (var i in piece_seed_list[seed_idx].actions) {
    position = piece_status[seed_idx][piece_number].mass;
    action = position + piece_seed_list[seed_idx].actions[i];
    if (is_valid_action(board, action, piece_status[seed_idx][piece_number].player)){
			actions_list.push(action);
		}
	}
	return actions_list;
}

function find_piece_for_mass(piece_status, NUM_PIECE, mass) {
	for (var i = 0; i < NUM_PIECE.length; i++) {
		for (var j = 0; j < NUM_PIECE[i]; j++) {
			if (piece_status[i][j].mass == mass) {
				return [i, j];
			}
		}
	}
	console.log("not find");
	return -1, -1;
}

function syogi_init(board_array, NUM_WIDTHMASS, NUM_HEIGHTMASS) {
	// �z���ǂݍ���ŁApiece_status,piece_seed_list,NUM_PIECE��Ԃ�
	console.log("board_array");
	console.log(board_array);
	// �����z�񏉊��� var board_array = new Array(NUM_ALLMASS).fill(0);
	var piece_status = [[], [], [], [], [], [], [], [], [], [], []];
	var player = 0;
	var seed = 0;
	var NUM_PIECE = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	let control_number = 0;
	for (var i = 0; i < NUM_WIDTHMASS * NUM_HEIGHTMASS; i++) {
		if (board_array[i] != 0) {
			if (board_array[i] < 0) {
				seed = -board_array[i];
				player = 1;
			} else {
				seed = board_array[i];
				player = 0;
			}
			piece_status[seed_to_index(seed)].push(new SyogiPieceStatus(seed, control_number, player, mass = i));
			NUM_PIECE[seed_to_index(seed)] += 1;
		}
	}
	seed = 1;
	let j = 0;
	control_number = 0;
	for(let i = 0;i < sum_array(NUM_PIECE);i++){
		piece_status[seed_to_index(seed)][j].control_number = control_number;
		control_number++;
		if(j >= NUM_PIECE[seed_to_index(seed)] - 1){
			j++;
			j -= NUM_PIECE[seed_to_index(seed)];
			seed++;
    }else{
			j++;
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
	var actions = [[], [], [], [], [], [], [], [], [], [], [], []];
	var cnt = 0;
	actions[0][0] = -1 * NUM_WIDTHMASS;
	cnt = 0;
	for (j = -(NUM_WIDTHMASS + 1); j <= NUM_WIDTHMASS + 1; j++) {
		if (-1 * (NUM_WIDTHMASS + 1) <= j && j <= -1 * (NUM_WIDTHMASS - 1)) {
			actions[1][cnt] = j;
			cnt++;
		} else if (j == -1 || j == 1) {
			actions[1][cnt] = j;
			cnt++;
		} else if (NUM_WIDTHMASS - 1 <= j && j <= NUM_WIDTHMASS + 1) {
			actions[1][cnt] = j;
			cnt++;
		}
	}
	// ���̃A�N�V����
	for (var i = 2; i < 12; i++) {
		actions[i][0] = -1 * NUM_WIDTHMASS - 1
	}

	var piece_seed_list = [];

	for (var i = 0; i < 12; i++) {
		piece_seed_list.push(new SyogiPiece(actions[i]));
	}

	// TODO �ق��̏������ǉ�

	console.log("piece_status,piece_seed_list,NUM_PIECE");
	console.log(piece_status, piece_seed_list, NUM_PIECE);
	return [piece_status, piece_seed_list, NUM_PIECE];
}

// �߂�l board_array, reserve_pieces, done
function syogi_step(board_array, pieces_status, reserve_pieces, piece_control_number, action, player) {
  // �����̔z���ς������Ȃ��̂ŃR�s�[�����
  let board = board_array.concat();
  let piece_status = pieces_status.concat();
  let reserve_piece = reserve_pieces.concat();
  let piece_idx = 0;
  let n_idx = 0;
  if ((board[action] < 0 && player == 0) || (board[action] > 0 && player == 1)) {
    // �������Ƃ���}�X�ɂ��̋�̓G�̋�����
    [piece_idx, n_idx] = find_piece_for_mass(piece_status, NUM_PIECE, action);
    piece_status[piece_idx][n_idx].reserve = true;
    if (piece_status[piece_idx][n_idx].player == 0) {
      piece_status[piece_idx][n_idx].player = 1;
    } else {
      piece_status[piece_idx][n_idx].player = 0;
    }
    [piece_idx, n_idx] = ctr_num_to_stat_num(piece_control_number, NUM_PIECE);
    board[piece_status[piece_idx][n_idx].mass] = 0;
    piece_status[piece_idx][n_idx].mass = -1;
    board[action] = (piece_idx + 1) * piece_status[piece_idx][n_idx].player;
    piece_status[piece_idx][n_idx].mass = action;
  } else if (board_array[action] == 0) {
    [piece_idx, n_idx] = ctr_num_to_stat_num(piece, NUM_PIECE);
    board[piece_status[piece_idx][n_idx].mass] = 0;
    board[action] = (piece_idx + 1) * piece_status[piece_idx][n_idx].player;
    piece_status[piece_idx][n_idx].mass = action;
  } else {
    console.log("error");
    console.log("board, action,player, reserve_piece");
    console.log(board, action, player, reserve_piece);
    // TODO �G���[����
  }

  return [board_array, reserve_pieces, done];
}