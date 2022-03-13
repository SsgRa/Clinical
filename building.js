class Building {
  constructor(
    id_ = 0,
    x_ = random(width - 50),
    y_ = random(height - 50),
    w_ = 50,
    h_ = 50
  ) {
    this.id = id_;
    this.x = x_;
    this.y = y_;
    this.w = w_;
    this.h = h_;
  }
  move() {
  }

  collide() {}
//build rect
  show() {
    noFill();
    strokeWeight(4);
    stroke(51);
    rectMode(CENTER);
    rect(this.x, this.y, this.w, this.h);
  }
}
