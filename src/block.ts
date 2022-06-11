import Ball from "./ball";

class Block {
  x: number;
  y: number;
  width: number;
  height: number;
  image: HTMLImageElement;
  isExist: boolean;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.width = 80;
    this.height = 40;
    this.isExist = true;
    this.image = new Image();
    this.image.src = './img/block.png';
  }

  draw(ctx: any) {
    ctx.drawImage(this.image, 0, 0, this.width, this.height, this.x, this.y, this.width, this.height);
  }

  blockToBall(ball: Ball) {
    const isOverX = (ball.x + ball.ballSize) > this.x && ball.x < (this.x + this.width);
    const isOverY = (ball.y + ball.ballSize) > this.y && ball.y < (this.y + this.height);
    if(isOverX && isOverY) {
      if(ball.vy > 0) {
        ball.y = this.y - ball.ballSize;
      }
      else {
        ball.y = this.y + this.height;
      }
      ball.vy *= -1;
      this.isExist = false;
      return true;
    }
    return false;
  }
}

export default Block;
