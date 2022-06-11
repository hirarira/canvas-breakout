class Ball {
  x: number;
  y: number;
  vx: number;
  vy: number;
  windowSize: number;
  ballSize: number;
  image: HTMLImageElement;

  constructor(init_x: number, init_y: number, windowSize: number) {
    this.x = init_x;
    this.y = init_y;
    this.vx = 6;
    this.vy = 4;
    this.windowSize = windowSize;
    this.ballSize = 20;
    this.image = new Image();
    this.image.src = './img/ball.png';
  }

  frameChamge() {
    if(this.x < 0 || this.x > this.windowSize - this.ballSize) {
      if(this.vx > 0) {
        this.x = this.windowSize - this.ballSize
      }
      else {
        this.x = 0;
      }
      this.vx *= -1;
    }
    if(this.y < 0 || this.y > this.windowSize - this.ballSize) {
      if(this.vy > 0) {
        this.y = this.windowSize - this.ballSize
      }
      else {
        this.y = 0;
      }
      this.vy *= -1;
    }
    this.x += this.vx;
    this.y += this.vy;
  }

  draw(ctx: any) {
    ctx.drawImage(this.image, 0, 0, this.ballSize, this.ballSize, this.x, this.y , this.ballSize, this.ballSize);
  }

  reset(init_x: number, init_y: number) {
    this.x = init_x;
    this.y = init_y;
    this.vx = 6;
    this.vy = 4;
  }
}

export default Ball;
