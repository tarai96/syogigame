function Character() {
    this.position = new Point();
    this.size = 0;
}

Character.prototype.init = function (size) {
    this.size = size;
};

function CharacterShot() {
    this.position = new Point();
    this.size = 0;
    this.speed = 0;
    this.alive = false;
}

CharacterShot.prototype.set = function (p, size, speed) {
    // ���W���Z�b�g
    this.position.x = p.x;
    this.position.y = p.y;

    // �T�C�Y�A�X�s�[�h���Z�b�g
    this.size = size;
    this.speed = speed;

    // �����t���O�𗧂Ă�
    this.alive = true;
};

CharacterShot.prototype.move = function () {
    // ���W��^���speed�������ړ�������
    this.position.y -= this.speed;

    // ���ȏ�̍��W�ɓ��B���Ă����琶���t���O���~�낷
    if (this.position.y < -this.size) {
        this.alive = false;
    }
};

class SyogiPiece{
    constructor(action){
     this.actions = action;
	}
}

class SyogiPieceStatus{
    constructor(player, position = new Point(0,0), reserve = false){
    // 0(��O),1(��)
     this.player = player;
     this.position = position;
     this.reserve = reserve;
	}
}
