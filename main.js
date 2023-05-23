// - global -------------------------------------------------------------------
var screenCanvas, info;
var run = true;
var fps = 1000 / 30;
var mouse = new Point();
var ctx;
var fire = false;

// - const
var CHARA_COLOR = 'rgba(0, 0, 255, 0.75)';
var CHARA_SHOT_COLOR = 'rgba(0, 255, 0, 0.75)';
var CHARA_SHOT_MAX_COUNT = 10;
var NUM_WIDTHMASS = 6;
var NUM_HEIGHTMASS = 6;
var NUM_ALLMASS = NUM_HEIGHTMASS * NUM_WIDTHMASS;
var BOARD_MARJIN = 5;

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

    // 盤面初期化
    var board = new Array(NUM_ALLMASS).fill(0);
    console.log(board);
    var mass_positionx = 0;
    var mass_positiony = 0;
    var mass_size = (screenCanvas.width - 2*BOARD_MARJIN) / NUM_WIDTHMASS;

    // 自機初期化
    var chara = new Character();
    chara.init(10);

    //ショットの初期化
    var charaShot = new Array(CHARA_SHOT_MAX_COUNT);
    for(i = 0; i < CHARA_SHOT_MAX_COUNT; i++){
        charaShot[i] = new CharacterShot();
    }

    // レンダリング処理を呼び出す
    (function () {
        // HTMLを更新
        info.innerHTML = mouse.x + ' : ' + mouse.y;

        // screenクリア 
        ctx.clearRect(0, 0, screenCanvas.width, screenCanvas.height);
        
        // パスの設定を開始
        ctx.beginPath();

        // 色を設定する
        ctx.fillStyle = 'rgba(182, 102, 85, 0.75)';
        
        for(var j = 0;j < NUM_HEIGHTMASS;j++){
            for(i = 0;i < NUM_WIDTHMASS;i++){
                // 位置を設定
                mass_positionx = i * mass_size + BOARD_MARJIN;
                mass_positiony = j * mass_size +  BOARD_MARJIN;

                // パスを設定
                ctx.fillRect(mass_positionx, mass_positiony, mass_size, mass_size);
                
                if((mass_positionx < mouse.x && mouse.x < mass_positionx+mass_size) && (mass_positiony < mouse.y && mouse.y < mass_positiony+mass_size)){
                    console.log("True");
                    console.log(mass_positionx, mass_positiony, mass_size, mass_size)
                    ctx.fillStyle = 'rgba(0, 0, 255, 0.75)';
				}else{
                    // 色を設定する
                    ctx.fillStyle = 'rgba(182, 102, 85, 0.75)';
                }
                ctx.closePath();
            }
        }
        
        
        ctx.fill();
        
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
    fire = true;
}

function keyDown(event) {
    // キーコードを取得
    var ck = event.keyCode;

    // Escキーが押されていたらフラグを降ろす
    if (ck === 27) { run = false; }
}