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

// piece_listの番号からpiece_statusの番号へ
function ctr_num_to_stat_num(control_number, NUM_PIECE) {
  let status_number = control_number;
  if (control_number >= sum_array(NUM_PIECE)) {
    console.log("error");
    console.log("control_number,NUM_PIECE", control_number, NUM_PIECE);
  }
  for (let seed_idx = 0; seed_idx < NUM_PIECE.length; seed_idx++) {
    console.log("seed_idx","status_number",seed_idx, status_number);
		if (status_number >= NUM_PIECE[seed_idx]) {
      status_number -= NUM_PIECE[seed_idx];
    } else {
      // seedは１から始まる
      return [seed_idx+1, status_number];
		}
	}
}

function stat_num_to_ctr_num(seed, status_number, NUM_PIECE) {
  let control_number = 0;
  let seed_idx = seed_to_index(seed);
	for (let i = 0; i < seed_idx; i++) {
		control_number += NUM_PIECE[i];
	}
	control_number += status_number;
	const sum_piece = sum_array(NUM_PIECE);
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

function is_valid_action(board_array, action, player,NUM_HEIGHTMASS,NUM_WIDTHMASS) {
  console.log(board_array, action, player);
  let NUM_ALLMASS = NUM_HEIGHTMASS * NUM_WIDTHMASS;
	if (action < 0 && action >= NUM_ALLMASS) {
		// 将棋盤の外
		  return false;
	}	else if (board_array[action] < 0 && player == 0) {
		// 動こうとするマスにこの駒の味方の駒がいなければ動ける
		  return true;
	} else if (board_array[action] > 0 && player == 1) {
		  return true;
	} else if (board_array[action] == 0) {
    return true;
  } else if (board_array[action] > 0 && player == 0) {
    return false;
  } else if (board_array[action] < 0 && player == 1) {
    return false;
  } else {
	  console.log("error,action,board_array[action]",action,board_array[action]);
	}
}

// 一つの駒を指定し動けるマスを座標で返す
function get_valid_actions(board_array, piece_seed_list, pieces_status, seed, piece_number,NUM_HEIGHTMASS,NUM_WIDTHMASS) {
	let board = board_array.concat();
	let piece_status = pieces_status.concat();
	let actions_list = [];
	if (piece_status[seed_to_index(seed)][piece_number].reserve) {
		return [];
	}
  // 駒種のアクションを実際の座標に直す
  let position = 0;
  let action = 0;
  let seed_idx = seed_to_index(seed);
  for (var i in piece_seed_list[seed_idx].actions) {
    position = piece_status[seed_idx][piece_number].mass;
		if(piece_status[seed_idx][piece_number].player == 1){
			action = position - piece_seed_list[seed_idx].actions[i];
		}else if(piece_status[seed_idx][piece_number].player == 0){
			action = position + piece_seed_list[seed_idx].actions[i];
    }else{
			console.log("error");
    }
		if (is_valid_action(board, action, piece_status[seed_idx][piece_number].player, NUM_HEIGHTMASS, NUM_WIDTHMASS)) {
			actions_list.push(action);
		}
	}
	return actions_list;
}

function find_piece_for_mass(piece_status,mass,NUM_PIECE) {
	for (var seed_idx = 0; seed_idx < NUM_PIECE.length; seed_idx++) {
		for (var piece_idx = 0; piece_idx < NUM_PIECE[seed_idx]; piece_idx++) {
      if (piece_status[seed_idx][piece_idx].mass == mass) {
				return [seed_idx+1, piece_idx];
			}
		}
  }
  console.log("not find");
  console.log("NUM_PIECE", NUM_PIECE);
  console.log("NUM_PIECE.length, NUM_PIECE[seed_idx]", NUM_PIECE.length, NUM_PIECE[seed_idx]);
	return [-1, -1];
}

function syogi_init(board_array, NUM_WIDTHMASS, NUM_HEIGHTMASS) {
	// 配列を読み込んで、piece_status,piece_seed_list,NUM_PIECEを返す
	console.log("board_array");
	console.log(board_array);
	// メモ配列初期化 var board_array = new Array(NUM_ALLMASS).fill(0);
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
	// 駒種クラスの初期化
	// 各駒種のアクション
	// メモ actions １次元相対座標そのコマの座標を0として
	//              x+y*(横のマス数)
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

  // action
  // 歩
  actions[0][0] = -1 * NUM_WIDTHMASS;
  //桂馬
  actions[1][0] = -2 * NUM_WIDTHMASS - 1;
  actions[1][1] = -2 * NUM_WIDTHMASS + 1;
  // 香車
  for (let j = 1; j <= NUM_HEIGHTMASS - 1; j++) {
    actions[2][j - 1] = -j * NUM_WIDTHMASS;
  }
  // 金
  actions[3][0] = -1 * NUM_WIDTHMASS - 1;
  actions[3][1] = -1 * NUM_WIDTHMASS;
  actions[3][2] = -1 * NUM_WIDTHMASS + 1;
  actions[3][3] = -1;
  actions[3][4] = 1;
  actions[3][5] = 1 * NUM_WIDTHMASS;

  // 銀
  actions[4][0] = -1 * NUM_WIDTHMASS - 1;
  actions[4][1] = -1 * NUM_WIDTHMASS;
  actions[4][2] = -1 * NUM_WIDTHMASS + 1;
  actions[4][3] = 1 * NUM_WIDTHMASS - 1;
  actions[4][4] = 1 * NUM_WIDTHMASS + 1;

  // 飛車
  for (let j = 1; j <= NUM_HEIGHTMASS; j++) {
    actions[5][j - 1] = -j * NUM_WIDTHMASS;
    actions[5][NUM_HEIGHTMASS + j - 1] = j * NUM_WIDTHMASS;
  }
  for (let j = 1; j <= NUM_WIDTHMASS; j++) {
    if (j == 0) {
      continue
    }
    actions[5][2 * NUM_HEIGHTMASS + j - 1] = -j;
    actions[5][2 * NUM_HEIGHTMASS + NUM_WIDTHMASS + j - 1] = j;
  }
  // 角
  for (let j = 1; j <= NUM_HEIGHTMASS; j++) {
    actions[6][j - 1] = -j * NUM_WIDTHMASS - j;
    actions[6][NUM_HEIGHTMASS + j - 1] = -j * NUM_WIDTHMASS + j;
  }
  for (let j = 1; j <= NUM_HEIGHTMASS; j++) {
    actions[6][2 * NUM_HEIGHTMASS + j - 1] = j * NUM_WIDTHMASS - j;
    actions[6][2 * NUM_HEIGHTMASS + NUM_WIDTHMASS + j - 1] = j * NUM_WIDTHMASS + j;
  }
  // 王
  actions[7][0] = -1 * NUM_WIDTHMASS - 1;
  actions[7][1] = -1 * NUM_WIDTHMASS;
  actions[7][2] = -1 * NUM_WIDTHMASS + 1;
  actions[7][3] = -1;
  actions[7][4] = 1;
  actions[7][5] = 1 * NUM_WIDTHMASS - 1;
  actions[7][6] = 1 * NUM_WIDTHMASS;
  actions[7][7] = 1 * NUM_WIDTHMASS + 1;

  // 竜王
  for (let j = 1; j <= NUM_HEIGHTMASS; j++) {
    actions[8][j - 1] = -j * NUM_WIDTHMASS;
    actions[8][NUM_HEIGHTMASS + j - 1] = j * NUM_WIDTHMASS;
  }
  actions[8][2 * NUM_HEIGHTMASS + 0] = -1 * NUM_WIDTHMASS - 1;
  actions[8][2 * NUM_HEIGHTMASS + 1] = -1 * NUM_WIDTHMASS + 1;
  actions[8][2 * NUM_HEIGHTMASS + 2] = 1 * NUM_WIDTHMASS - 1;
  actions[8][2 * NUM_HEIGHTMASS + 3] = 1 * NUM_WIDTHMASS + 1;
  actions[8][2 * NUM_HEIGHTMASS + 4] = j * NUM_WIDTHMASS;
  for (let j = 1; j <= NUM_WIDTHMASS; j++) {
    if (j == 0) {
      continue;
    }
    actions[8][2 * NUM_HEIGHTMASS + 5 + j - 1] = -j;
    actions[8][2 * NUM_HEIGHTMASS + 5 + NUM_WIDTHMASS + j - 1] = j;
  }
  // 竜馬
  for (let j = 1; j <= NUM_HEIGHTMASS; j++) {
    actions[9][j - 1] = -j * NUM_WIDTHMASS - j;
    actions[9][NUM_HEIGHTMASS + j - 1] = -j * NUM_WIDTHMASS + j;
  }
  for (let j = 1; j <= NUM_HEIGHTMASS; j++) {
    actions[9][2 * NUM_HEIGHTMASS + j - 1] = j * NUM_WIDTHMASS - j;
    actions[9][3 * NUM_HEIGHTMASS + j - 1] = j * NUM_WIDTHMASS + j;
  }
  actions[9][4 * NUM_HEIGHTMASS] = -1 * NUM_WIDTHMASS;
  actions[9][4 * NUM_HEIGHTMASS + 1] = 1 * NUM_WIDTHMASS;
  actions[9][4 * NUM_HEIGHTMASS + 2] = -1;
  actions[9][4 * NUM_HEIGHTMASS + 3] = 1;


	var piece_seed_list = [];

	for (var i = 0; i < 12; i++) {
		piece_seed_list.push(new SyogiPiece(actions[i]));
	}

	// TODO ほかの初期化追加
  /*
	console.log("piece_status,piece_seed_list,NUM_PIECE");
	console.log(piece_status, piece_seed_list, NUM_PIECE);
  */
	return [piece_status, piece_seed_list, NUM_PIECE];
}

// 戻り値 board_array, reserve_pieces, done
function syogi_step(board_array, pieces_status, reserve_pieces,NUM_PIECE, piece_control_number, action, player) {
  // 引数の配列を変えたくないのでコピーを取る
  let board = board_array.concat();
  let piece_status = pieces_status.concat();
  let reserve_piece = reserve_pieces.concat();
  let done = false;
  let seed = 0;
  let seed_idx = 0;
  let piece_idx = 0;
  if ((board[action] < 0 && player == 0) || (board[action] > 0 && player == 1)) {
    // 動こうとするマスにこの駒の敵の駒がいれば
    // TODO 王を取った時の処理
    // 持ち駒にするコマ
    [seed, piece_idx] = find_piece_for_mass(piece_status,action ,NUM_PIECE);
    seed_idx = seed_to_index(seed);
		console.log(piece_status,seed_idx,piece_idx);
    piece_status[seed_idx][piece_idx].reserve = true;
    if (piece_status[seed_idx][piece_idx].player == 0) {
      piece_status[seed_idx][piece_idx].player = 1;
    } else {
      piece_status[seed_idx][piece_idx].player = 0;
    }
    piece_status[seed_idx][piece_idx].mass = -1;
    console.log("seed, piece_idx", seed, piece_idx);
    reserve_piece_number = stat_num_to_ctr_num(seed, piece_idx, NUM_PIECE);
    reserve_piece[player].push(reserve_piece_number);
    if([8].includes(seed) === true){
      done = true;
    }
    // 動かすコマ
    [seed, piece_idx] = ctr_num_to_stat_num(piece_control_number, NUM_PIECE);
    seed_idx = seed_to_index(seed);
    board[piece_status[seed_idx][piece_idx].mass] = 0;
    piece_status[seed_idx][piece_idx].mass = -1;
    board[action] = (seed_idx + 1) * piece_status[seed_idx][piece_idx].player;
    piece_status[seed_idx][piece_idx].mass = action;
  } else if (board_array[action] == 0) {
    [seed, piece_idx] = ctr_num_to_stat_num(piece_control_number, NUM_PIECE);
    seed_idx = seed_to_index(seed);
    board[piece_status[seed_idx][piece_idx].mass] = 0;
    board[action] = seed * piece_status[seed_idx][piece_idx].player;
    piece_status[seed_idx][piece_idx].mass = action;
  } else {
    console.log("error");
    console.log("board, action,player, reserve_piece");
    console.log(board, action, player, reserve_piece);
    // TODO エラー処理
  }

  return [board_array, reserve_pieces, done];
}