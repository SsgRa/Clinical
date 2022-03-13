let status = {
  unexposed: "#000000",
  positive: "#ff0000",
  immune: "#00B000",
  deceased: "#000090",
};

class Person {
  // Constructor to create a Person
  constructor(
    id_ = 0,
    // Position
    x_ = width / 2,
    y_ = height / 2,
    r_ = 2,
    spread_ = 30,
    stat_ = "unexposed",
    maxforce_ = 0.05
  ) {
    this.id = id_;
    // move
    this.acceleration = createVector(0, 0);
    this.velocity = p5.Vector.random2D().mult(0.3);
    this.position = createVector(x_, y_);
    this.maxspeed = 0.8; // Maximum speed
    this.maxforce = maxforce_;
    //size
    this.diam = r_;
    //proximity/span
    this.spread = spread_;
    // health status
    this.stat = stat_;
    // vaccination status
    this.vaccinated = 0;
    //
    this.was_positive = 0;
    this.days_positive = 0;
    //
    this.days_immune = 0;
  }
  seek(target) {
    let desired = p5.Vector.sub(target, this.position); // A vector pointing from the location to the target
    // Normalize desired and scale to maximum speed
    desired.normalize();
    desired.mult(this.maxspeed);
    // Steering = Desired minus Velocity
    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce); // Limit to maximum steering force
    return steer;
  }

  move(target) {
    if (this.position.x < 0 || this.position.x > width) {
      this.velocity.x = -1 * this.velocity.x;
    }
    if (this.position.y < 0 || this.position.y > height) {
      this.velocity.y = -1 * this.velocity.y;
    }
    this.acceleration.add(this.seek(target));
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    // Reset acceleration to 0 each cycle
    this.acceleration.mult(0);
  }

  move_randomly() {
    if (this.position.x < 0 || this.position.x > width) {
      this.velocity.x = -1 * this.velocity.x;
    }
    if (this.position.y < 0 || this.position.y > height) {
      this.velocity.y = -1 * this.velocity.y;
    }
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
  
  update_force(force){
    this.maxforce = force;
  }

  show() {
    noStroke();
    fill(color(status[this.stat]));
    ellipse(this.position.x, this.position.y, this.diam / 2, this.diam / 2);
    //fill(0,0,0,30);
    //ellipse(this.x, this.y, this.spread, this.spread);
  }

  updateHealth() {
    if (this.stat == "positive") {
      this.days_positive++;
    }
    // cured/genesen
    if (this.days_positive > 5) {
      this.stat = "immune";
      this.was_positive++;
    }
  }
}
