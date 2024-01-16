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
    // 座標をセット
    this.position.x = p.x;
    this.position.y = p.y;

    // サイズ、スピードをセット
    this.size = size;
    this.speed = speed;

    // 生存フラグを立てる
    this.alive = true;
};

CharacterShot.prototype.move = function () {
  // 座標を真上にspeed分だけ移動させる
  this.position.y -= this.speed;

  // 一定以上の座標に到達していたら生存フラグを降ろす
  if (this.position.y < -this.size) {
      this.alive = false;
  }
};

class SyogiPiece{
  constructor(action,seed){
    this.actions = action;
    this.seed = seed;
  }
}

class SyogiPieceStatus{
  constructor(seed, control_number, player, mass = 0, reserve = false){
    this.seed = seed;
    this.control_number = control_number;
    // 0(手前),1(奥)
     this.player = player;
     this.mass = mass;
     this.reserve = reserve;
  }
}
