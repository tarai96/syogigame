// - global -------------------------------------------------------------------
var screenCanvas, info;
var run = true;
var fps = 1000 / 30;
var mouse = new Point();
var ctx;
var click = false;
var turn = 0;
var hold = false;
var flag = false;

// - const
var CHARA_COLOR = 'rgba(0, 0, 255, 0.75)';
var CHARA_SHOT_COLOR = 'rgba(0, 255, 0, 0.75)';
var CHARA_SHOT_MAX_COUNT = 10;
var NUM_WIDTHMASS = 6;
var NUM_HEIGHTMASS = 6;
var NUM_ALLMASS = NUM_HEIGHTMASS * NUM_WIDTHMASS;
var BOARD_MARJIN = 5;
var NUM_HU = 2;
var NUM_OSYO = 2;

// - main ---------------------------------------------------------------------
window.onload = function () {

    // スクリーンの初期化
    screenCanvas = document.getElementById('screen');
    screenCanvas.width = 256;
    screenCanvas.height = 256;

    // 2dコンテキスト
    ctx = screenCanvas.getContext('2d');

    // イベントの登録
    screenCanvas.addEventListener('mousemove', mouseMove, true);
    screenCanvas.addEventListener('mousedown', mouseDown, true);
    window.addEventListener('keydown', keyDown, true);

    // エレメント関連
    info = document.getElementById('info');

    // 駒初期化
    var actions = new Array(8).fill(0);
    var size = new Size(0,0);
    size.x = 30;
    size.y = 30;

    //歩 no.1
    actions[1] = 1;
    var hu = new SyogiPiece(size,actions);
    var husStatus = new Array(NUM_HU).fill(new SyogiPieceStatus(0));
    husStatus[1].player = 1;

    //王将 no.2
    actions.fill(1);
    var hu = new SyogiPiece(size,actions);
    var osyosStatus = new Array(NUM_OSYO).fill(new SyogiPieceStatus(0));
    osyosStatus[1].player = 1;

    // 盤面初期化
    var board = new Array(NUM_ALLMASS).fill(0);
    var mass_positionx = 0;
    var mass_positiony = 0;
    var mass_size = (screenCanvas.width - 2*BOARD_MARJIN) / NUM_WIDTHMASS;
    
    board[3] = 2;
    board[3 + (NUM_WIDTHMASS * 1)] = 1;
    board[3 + (NUM_WIDTHMASS * 4)] = 1;
    board[3 + (NUM_WIDTHMASS * 5)] = 2;


    /*
    // 自機初期化
    var chara = new Character();
    chara.init(10);

    //ショットの初期化
    var charaShot = new Array(CHARA_SHOT_MAX_COUNT);
    for(i = 0; i < CHARA_SHOT_MAX_COUNT; i++){
        charaShot[i] = new CharacterShot();
    }
    */
    // レンダリング処理を呼び出す
    (function () {
        // HTMLを更新
        info.innerHTML = mouse.x + ' : ' + mouse.y;

        if (hold){
              
		}else if(turn == 0){
            // 将棋盤面
            for(var j = 0;j < NUM_HEIGHTMASS;j++){
                for(i = 0;i < NUM_WIDTHMASS;i++){
                    // 位置を設定(左上)
                    mass_positionx = i * mass_size + BOARD_MARJIN;
                    mass_positiony = j * mass_size +  BOARD_MARJIN;

                    // マウスが現在の四角の中にあるかどうかをチェックする
                    if((mass_positionx < mouse.x && mouse.x < mass_positionx+mass_size) && 
                        (mass_positiony < mouse.y && mouse.y < mass_positiony+mass_size)){
                        flag = true;
                        break;
                        if(click){
                                          
						}
                    
		}

        // screenクリア 
        ctx.clearRect(0, 0, screenCanvas.width, screenCanvas.height);
        
        // パスの設定を開始
        ctx.beginPath();

        // 将棋盤面
        for(var j = 0;j < NUM_HEIGHTMASS;j++){
            for(i = 0;i < NUM_WIDTHMASS;i++){
                // 位置を設定(左上)
                mass_positionx = i * mass_size + BOARD_MARJIN;
                mass_positiony = j * mass_size +  BOARD_MARJIN;

                // マウスが現在の四角の中にあるかどうかをチェックする
                if((mass_positionx < mouse.x && mouse.x < mass_positionx+mass_size) && 
                    (mass_positiony < mouse.y && mouse.y < mass_positiony+mass_size)){
                    // マウスが四角の中に入っているので、塗りつぶしスタイルを青に設定する
                    ctx.fillStyle = 'rgba(0, 0, 255, 0.75)';
				}else{
                    // マウスが四角の中に入っていない場合は、塗りつぶしスタイルをデフォルトの色に設定します。
                    ctx.fillStyle = 'rgba(255, 0, 0, 0.75)';
                }

                // パスを設定
                ctx.fillRect(mass_positionx, mass_positiony, mass_size, mass_size);
                ctx.closePath();

                if (board[i + (NUM_WIDTHMASS * j)] != 0){
                    if (board[i + (NUM_WIDTHMASS * j)] == 1){
                        ctx.fillStyle = 'rgba(0, 255, 0, 0.75)';
                        ctx.fillRect(mass_positionx, mass_positiony, hu.size.x, hu.size.y);
					}else if (board[i + (NUM_WIDTHMASS * j)] == 2){
                        ctx.fillStyle = 'rgba(150, 255, 0, 0.75)';
                        ctx.fillRect(mass_positionx, mass_positiony, hu.size.x, hu.size.y);
					}
                    
				}
            }
        }
        
        ctx.fill();
        
        /*
        // パスの設定を開始
        ctx.beginPath();

        // 円の色を設定する
        ctx.fillStyle = 'rgba(0, 0, 255, 0.75)';

        // 自機の位置を設定
        chara.position.x = mouse.x;
        chara.position.y = mouse.y;

        // 自機を描くパスを設定
        ctx.arc(chara.position.x, chara.position.y, chara.size, 0, Math.PI * 2, false);

        // 自機の色を設定する
        ctx.fillStyle = CHARA_COLOR;

        ctx.closePath();
        ctx.fill();

        // fireフラグの値により分岐
        if(fire){
            // すべての自機ショットを調査する
            for(i = 0; i < CHARA_SHOT_MAX_COUNT; i++){
                // 自機ショットが既に発射されているかチェック
                if(!charaShot[i].alive){
                    // 自機ショットを新規にセット
                    charaShot[i].set(chara.position, 3, 5);
    
                    // ループを抜ける
                    break;
                }
            }
            // フラグを降ろしておく
            fire = false;
        }

        // パスの設定を開始
        ctx.beginPath();

        // すべての自機ショットを調査する
        for(i = 0; i < CHARA_SHOT_MAX_COUNT; i++){
        // 自機ショットが既に発射されているかチェック
            if(charaShot[i].alive){
                // 自機ショットを動かす
                charaShot[i].move();

                // 自機ショットを描くパスを設定
                ctx.arc(
                    charaShot[i].position.x,
                    charaShot[i].position.y,
                    charaShot[i].size,
                    0, Math.PI * 2, false
                );

                // パスをいったん閉じる
                ctx.closePath();
            }
        }

        // 自機ショットの色を設定する
        ctx.fillStyle = CHARA_SHOT_COLOR;

        // 自機ショットを描く
        ctx.fill();
        */

        // フラグにより再帰呼び出し
        if (run) { setTimeout(arguments.callee, fps); }
    })();
};

// - event --------------------------------------------------------------------
function mouseMove(event) {
    // マウスカーソル座標の更新
    mouse.x = event.clientX - screenCanvas.offsetLeft;
    mouse.y = event.clientY - screenCanvas.offsetTop;
}

function mouseDown(event) {
    // フラグを立てる
    click = true;
}

function keyDown(event) {
    // キーコードを取得
    var ck = event.keyCode;

    // Escキーが押されていたらフラグを降ろす
    if (ck === 27) { run = false; }
}