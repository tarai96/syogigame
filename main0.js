// - global -------------------------------------------------------------------
var screenCanvas, info;
var run = true;
var fps = 1000 / 30;
var mouse = new Point();
var actions = [];
var boardImg = new Image();
var huImg = new Image();
var ousyouImage = new Image();
var ctx;
var click = false;
var cnt = 0;
var capturedPiece = [];
var currentMass = 0;
var gameStatus = "stop";    // stop, play, win, lose
var turn = 0;
var hold = false;
var holdPiece = 0;
var flag = false;
var caught = false;
var pieceList = [];
var previousMass = 0;
var i = 0;
var j = 0;

// - const
var CHARA_COLOR = 'rgba(0, 0, 255, 0.75)';
var CHARA_SHOT_COLOR = 'rgba(0, 255, 0, 0.75)';
var CHARA_SHOT_MAX_COUNT = 10;
var NUM_WIDTHMASS = 9;
var NUM_HEIGHTMASS = 9;
var NUM_ALLMASS = NUM_HEIGHTMASS * NUM_WIDTHMASS;
var BOARD_MARJIN = 5;
var NUM_HU = 2;
var NUM_OSYO = 2;

// - main ---------------------------------------------------------------------
window.onload = function () {

    // �X�N���[���̏�����
    screenCanvas = document.getElementById('screen');
    screenCanvas.width = 256;
    screenCanvas.height = 256;

    // 2d�R���e�L�X�g
    ctx = screenCanvas.getContext('2d');

    // �C�x���g�̓o�^
    screenCanvas.addEventListener('mousemove', mouseMove, true);
    screenCanvas.addEventListener('mousedown', mouseDown, true);
    window.addEventListener('keydown', keyDown, true);

    // �G�������g�֘A
    info = document.getElementById('info');

    // �����
    // ���� actions �P�������΍��W���̃R�}�̍��W��0�Ƃ���
    //              x+y*(���̃}�X��)
    for (i = 0; i < 2; i++) {
        actions[i] = []
    }
    var size = new Size(0,0);
    size.x = 30;
    size.y = 30;

    //�� no.1
    actions[0][0] = -1 * NUM_WIDTHMASS;
    var hu = new SyogiPiece(size,actions[0]);
    var husStatus = new Array(NUM_HU).fill(new SyogiPieceStatus(0));
    husStatus[1].player = 1;
    console.log(actions[0]);

    //���� no.2
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

    // ��̃��X�g
    pieceList[0] = hu;
    pieceList[1] = osyo;

    // ���������
    // capturedPiece 2�����z�� 0 �����@1 ����
    for(i = 0; i < 2; i++) { capturedPiece.push(Array(64).fill(0)); }

    // �Ֆʏ�����
    // board�@����̋�̓}�C�i�X
    var board = new Array(NUM_ALLMASS).fill(0);
    var mass_positionx = 0;
    var mass_positiony = 0;
    var mass_size = (screenCanvas.width - 2*BOARD_MARJIN) / NUM_WIDTHMASS;
    
    board[3] = 2;
    board[3 + (NUM_WIDTHMASS * 1)] = 1;
    board[3 + (NUM_WIDTHMASS * 4)] = 1;
    board[3 + (NUM_WIDTHMASS * 5)] = 2;


    /*
    // ���@������
    var chara = new Character();
    chara.init(10);

    //�V���b�g�̏�����
    var charaShot = new Array(CHARA_SHOT_MAX_COUNT);
    for(i = 0; i < CHARA_SHOT_MAX_COUNT; i++){
        charaShot[i] = new CharacterShot();
    }
    */
    gameStatus = "play";
    // �����_�����O�������Ăяo��
    (function(){
        

        // HTML���X�V
        info.innerHTML = mouse.x + ' : ' + mouse.y;

        if(turn == 0){
            // �����Ֆ� i->x j->y
            flag = false;
            for(var j = 0;j < NUM_HEIGHTMASS;j++){
                for(i = 0;i < NUM_WIDTHMASS;i++){
                    // �ʒu��ݒ�(����)
                    mass_positionx = i * mass_size + BOARD_MARJIN;
                    mass_positiony = j * mass_size +  BOARD_MARJIN;

                    // �}�E�X�����݂̎l�p�̒��ɂ��邩�ǂ������`�F�b�N����
                    if ((mass_positionx < mouse.x && mouse.x < mass_positionx + mass_size) &&
                        (mass_positiony < mouse.y && mouse.y < mass_positiony + mass_size)) {
                        currentMass = i + j * NUM_WIDTHMASS;
                        flag = true;
                        break;
                    }
                }
                if(flag) {
                    break;
                }
            }
            // �}�E�X�N���b�N�ŃR�}��u�����I��
            if (click && hold) {
                console.log(pieceList[holdPiece - 1].actions);
                for (i in pieceList[holdPiece - 1].actions){
                    if (currentMass == previousMass + pieceList[holdPiece - 1].actions[i]) {
                        // �s���\�ȃ}�X�Ȃ��
                        // ����
                        // �������Ƃ��Ă���}�X�ɑ���̋����Ȃ�
                        if (board[currentMass] > 0) {
                            // �������ꂪ����������
                            if (board[currentMass] == 2) {
                                // ����
                                gameStatus = "win"
                                console.log("win!");
                                break;
                            }
                            for (i = 0; i < 64; i++) {
                                if (capturedPiece[0][i] == 0) {
                                    break;
                                }
                            }
                            capturedPiece[0][i] = board[currentMass];
                        }
                        board[currentMass] = holdPiece;
                        holdPiece = 0;
                        hold = false;
                        turn = 1;
                        break;
                    } else {
                        // �����ɂ͓����Ȃ�
                        console.log("unable action");
                    }
				}
            } else if (click) {
                console.log(currentMass);
                if (board[currentMass] != 0){
                    // �����
                    holdPiece = board[currentMass];
                    previousMass = currentMass;
                    board[currentMass] = 0;
                    hold = true;
                    console.log("hold!");
                }
			}
		}
        if(turn == 1){
            // ����̃^�[��
            turn = 0;
		}


        /*********************************************************
                                �`��
        **********************************************************/

        // screen�N���A 
        ctx.clearRect(0, 0, screenCanvas.width, screenCanvas.height);
        
        // �p�X�̐ݒ���J�n
        ctx.beginPath();

        // �����Ֆ�
        for(var j = 0;j < NUM_HEIGHTMASS;j++){
            for(i = 0;i < NUM_WIDTHMASS;i++){
                // �ʒu��ݒ�(����)
                mass_positionx = i * mass_size + BOARD_MARJIN;
                mass_positiony = j * mass_size +  BOARD_MARJIN;

                // �}�E�X�����݂̎l�p�̒��ɂ��邩�ǂ������`�F�b�N����
                if((mass_positionx < mouse.x && mouse.x < mass_positionx+mass_size) && 
                    (mass_positiony < mouse.y && mouse.y < mass_positiony+mass_size)){
                    // �}�E�X���l�p�̒��ɓ����Ă���̂ŁA�h��Ԃ��X�^�C����ɐݒ肷��
                    // ctx.fillStyle = 'rgba(0, 0, 255, 0.75)';
				}else{
                    // �}�E�X���l�p�̒��ɓ����Ă��Ȃ��ꍇ�́A�h��Ԃ��X�^�C�����f�t�H���g�̐F�ɐݒ肵�܂��B
                    // ctx.fillStyle = 'rgba(255, 0, 0, 0.75)';
                }

                // �p�X��ݒ�
                // ctx.fillRect(mass_positionx, mass_positiony, mass_size, mass_size);
                ctx.closePath();

                if (board[i + (NUM_WIDTHMASS * j)] != 0){
                    // ��
                    if (board[i + (NUM_WIDTHMASS * j)] == 1){
                        ctx.beginPath();
                        ctx.fillStyle = 'rgba(0, 255, 0, 0.75)';
                        // ctx.fillRect(mass_positionx, mass_positiony, hu.size.x, hu.size.y);
                    // ����
					}else if (board[i + (NUM_WIDTHMASS * j)] == 2){
                        ctx.beginPath();
                        ctx.fillStyle = 'rgba(150, 255, 0, 0.75)';
                        // ctx.fillRect(mass_positionx, mass_positiony, hu.size.x, hu.size.y);
                    }
                    
				}
            }
        }

        // �摜�\��
        boardImg.onload = function onImageLoad() {
            ctx.drawImage(boardImg, 0, 0, screenCanvas.width, screenCanvas.height)  
		}
        boardImg.src = "Image/syougi_ban.png"

        var huPositions = [];
        var osyoPositions = [];
        for(var j = 0;j < NUM_HEIGHTMASS;j++){
            for(i = 0;i < NUM_WIDTHMASS;i++){
                if (board[i + (NUM_WIDTHMASS * j)] != 0){
                    // ��
                    if (board[i + (NUM_WIDTHMASS * j)] == 1){
                        ctx.beginPath();
                        ctx.fillStyle = 'rgba(0, 255, 0, 0.75)';
                        // ctx.fillRect(mass_positionx, mass_positiony, hu.size.x, hu.size.y);
                    // ����
					}else if (board[i + (NUM_WIDTHMASS * j)] == 2){
                        ctx.beginPath();
                        ctx.fillStyle = 'rgba(150, 255, 0, 0.75)';
                        // ctx.fillRect(mass_positionx, mass_positiony, hu.size.x, hu.size.y);
                    }
                    
				}
            }
        }
        huImg.onload = function onImageLoad() {
            ctx.drawImage(huImg, mass_positionx, mass_positiony, hu.size.x, hu.size.y)  
		}
        huImg.src = "Image/syougi14_fuhyou.png"

        ousyouImage.onload = function onImageLoad() {
            ctx.drawImage(ousyouImage, mass_positionx, mass_positiony, hu.size.x, hu.size.y)  
		}
        ousyouImage.src = "Image/syougi01_ousyou.png"

        if(gameStatus == "win"){
            ctx.fillStyle = 'rgba(30,90,30,0.75)';
            // ctx.fillRect(50,50,100,100);
            ctx.fillStyle = 'rgba(0,0,0,0.75)';
            ctx.font = '48px serif';
            ctx.strokeText('WIN', 60, 150);
		}
        
        ctx.fill();
        
        /*
        // �p�X�̐ݒ���J�n
        ctx.beginPath();

        // �~�̐F��ݒ肷��
        ctx.fillStyle = 'rgba(0, 0, 255, 0.75)';

        // ���@�̈ʒu��ݒ�
        chara.position.x = mouse.x;
        chara.position.y = mouse.y;

        // ���@��`���p�X��ݒ�
        ctx.arc(chara.position.x, chara.position.y, chara.size, 0, Math.PI * 2, false);

        // ���@�̐F��ݒ肷��
        ctx.fillStyle = CHARA_COLOR;

        ctx.closePath();
        ctx.fill();

        // fire�t���O�̒l�ɂ�蕪��
        if(fire){
            // ���ׂĂ̎��@�V���b�g�𒲍�����
            for(i = 0; i < CHARA_SHOT_MAX_COUNT; i++){
                // ���@�V���b�g�����ɔ��˂���Ă��邩�`�F�b�N
                if(!charaShot[i].alive){
                    // ���@�V���b�g��V�K�ɃZ�b�g
                    charaShot[i].set(chara.position, 3, 5);
    
                    // ���[�v�𔲂���
                    break;
                }
            }
            // �t���O���~�낵�Ă���
            fire = false;
        }

        // �p�X�̐ݒ���J�n
        ctx.beginPath();

        // ���ׂĂ̎��@�V���b�g�𒲍�����
        for(i = 0; i < CHARA_SHOT_MAX_COUNT; i++){
        // ���@�V���b�g�����ɔ��˂���Ă��邩�`�F�b�N
            if(charaShot[i].alive){
                // ���@�V���b�g�𓮂���
                charaShot[i].move();

                // ���@�V���b�g��`���p�X��ݒ�
                ctx.arc(
                    charaShot[i].position.x,
                    charaShot[i].position.y,
                    charaShot[i].size,
                    0, Math.PI * 2, false
                );

                // �p�X�������������
                ctx.closePath();
            }
        }

        // ���@�V���b�g�̐F��ݒ肷��
        ctx.fillStyle = CHARA_SHOT_COLOR;

        // ���@�V���b�g��`��
        ctx.fill();
        */

        //�t���O��߂�
        click = false;

        // �t���O�ɂ��ċA�Ăяo��
        if (run) { setTimeout(arguments.callee, fps); }
    })();
};

// - event --------------------------------------------------------------------
function mouseMove(event) {
    // �}�E�X�J�[�\�����W�̍X�V
    mouse.x = event.clientX - screenCanvas.offsetLeft;
    mouse.y = event.clientY - screenCanvas.offsetTop;
}

function mouseDown(event) {
    // �t���O�𗧂Ă�
    click = true;
}

function keyDown(event) {
    // �L�[�R�[�h���擾
    var ck = event.keyCode;

    // Esc�L�[��������Ă�����t���O���~�낷
    if (ck === 27) { run = false; }
}