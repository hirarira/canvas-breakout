import Ball from "./ball";

class Bar {
  x: number;
  y: number;
  image: HTMLImageElement;
  windowSize: number;
  barHeight: number;
  barWidth: number;

  constructor(windowSize: number) {
    this.x = 300;
    this.y = 670;
    this.barHeight = 30;
    this.barWidth = 200;
    this.windowSize = windowSize;
    this.image = new Image();
    this.image.src = './img/bar.png';
  }

  draw(ctx: any) {
    ctx.drawImage(this.image, 0, 0, this.barWidth, this.barHeight, this.x, this.y, this.barWidth, this.barHeight);
  }

  moveRight() {
    if(this.x < (this.windowSize - this.barWidth)) {
      this.x += 10;
    }
  }

  moveLeft() {
    if(this.x > 0) {
      this.x -= 10;
    }
  }
  
  /**
   * ボールとバーの当たり判定
   * @param ball 
   */
   barToBall(ball: Ball) {
    const isOverX = (ball.x + ball.ballSize) > this.x && ball.x < (this.x + this.barWidth);
    const isOverY = (ball.y + ball.ballSize) > this.y && ball.y < (this.y + this.barHeight);
    if(isOverX && isOverY) {
      if(ball.vy > 0) {
        ball.y = this.y - ball.ballSize;
      }
      else {
        ball.y = this.y + this.barHeight;
      }
      ball.vy *= -1;
    }
  }

}

export default Bar;
