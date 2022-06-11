import Ball from "./ball";
import Bar from "./bar";

class GameObject {
  canvas: HTMLElement;
  ctx: any;
  /** 画面の解像度 */
  windowSize: number;
  ball: Ball;
  bar: Bar;
  timerID: any;
  fps: number;
  backgroundImage: HTMLImageElement;
  keyStatus: {
    isLeftUp: boolean,
    isRightUp: boolean
  }

  constructor() {
    const canvas: any = document.getElementById('canvas');
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.windowSize = 800;
    this.ball = new Ball(100, 100, this.windowSize);
    this.bar = new Bar(this.windowSize);
    this.fps = 60;
    this.backgroundImage = new Image();
    this.backgroundImage.src = './img/sea.jpg';
    this.keyStatus = {
      isLeftUp: false,
      isRightUp: false
    }
  }

  /**
   * ボールとバーの当たり判定
   * @param ball 
   */
  barToBall(ball: Ball) {
    const isOverX = (ball.x + ball.ballSize) > this.bar.x && ball.x < (this.bar.x + this.bar.barWidth);
    const isOverY = (ball.y + ball.ballSize) > this.bar.y && ball.y < (this.bar.y + this.bar.barHeight);
    if(isOverX && isOverY) {
      if(ball.vy > 0) {
        ball.y = this.bar.y - ball.ballSize;
      }
      else {
        ball.y = this.bar.y + this.bar.barHeight;
      }
      ball.vy *= -1;
    }
  }

  frame() {
    if(this.keyStatus.isRightUp) {
      this.bar.moveRight();
    }
    if(this.keyStatus.isLeftUp) {
      this.bar.moveLeft();
    }
    this.ball.frameChamge();
    this.barToBall(this.ball);
    this.draw();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.windowSize, this.windowSize);
    this.ctx.beginPath();
    this.ctx.drawImage(this.backgroundImage, 0, 0, this.windowSize, this.windowSize, 0, 0, this.windowSize, this.windowSize);
    this.ball.draw(this.ctx);
    this.bar.draw(this.ctx);
  }

  start() {
    this.timerID = setInterval(this.frame.bind(this), (1000/this.fps));
  }
}

export default GameObject;
