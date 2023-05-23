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

    // �Ֆʏ�����
    var board = new Array(NUM_ALLMASS).fill(0);
    console.log(board);
    var mass_positionx = 0;
    var mass_positiony = 0;
    var mass_size = (screenCanvas.width - 2*BOARD_MARJIN) / NUM_WIDTHMASS;

    // ���@������
    var chara = new Character();
    chara.init(10);

    //�V���b�g�̏�����
    var charaShot = new Array(CHARA_SHOT_MAX_COUNT);
    for(i = 0; i < CHARA_SHOT_MAX_COUNT; i++){
        charaShot[i] = new CharacterShot();
    }

    // �����_�����O�������Ăяo��
    (function () {
        // HTML���X�V
        info.innerHTML = mouse.x + ' : ' + mouse.y;

        // screen�N���A 
        ctx.clearRect(0, 0, screenCanvas.width, screenCanvas.height);
        
        // �p�X�̐ݒ���J�n
        ctx.beginPath();

        // �F��ݒ肷��
        ctx.fillStyle = 'rgba(182, 102, 85, 0.75)';
        
        for(var j = 0;j < NUM_HEIGHTMASS;j++){
            for(i = 0;i < NUM_WIDTHMASS;i++){
                // �ʒu��ݒ�
                mass_positionx = i * mass_size + BOARD_MARJIN;
                mass_positiony = j * mass_size +  BOARD_MARJIN;

                // �p�X��ݒ�
                ctx.fillRect(mass_positionx, mass_positiony, mass_size, mass_size);
                
                if((mass_positionx < mouse.x && mouse.x < mass_positionx+mass_size) && (mass_positiony < mouse.y && mouse.y < mass_positiony+mass_size)){
                    console.log("True");
                    console.log(mass_positionx, mass_positiony, mass_size, mass_size)
                    ctx.fillStyle = 'rgba(0, 0, 255, 0.75)';
				}else{
                    // �F��ݒ肷��
                    ctx.fillStyle = 'rgba(182, 102, 85, 0.75)';
                }
                ctx.closePath();
            }
        }
        
        
        ctx.fill();
        
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
    fire = true;
}

function keyDown(event) {
    // �L�[�R�[�h���擾
    var ck = event.keyCode;

    // Esc�L�[��������Ă�����t���O���~�낷
    if (ck === 27) { run = false; }
}