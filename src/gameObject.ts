import Ball from "./ball";
import Bar from "./bar";
import Block from "./block";

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
  blocks: Block[];

  constructor() {
    const canvas: any = document.getElementById('canvas');
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.windowSize = 800;
    this.ball = new Ball(200, 200, this.windowSize);
    this.bar = new Bar(this.windowSize);
    this.fps = 60;
    this.backgroundImage = new Image();
    this.backgroundImage.src = './img/sea.jpg';
    this.keyStatus = {
      isLeftUp: false,
      isRightUp: false
    }
    this.blocks = [];
  }

  frame() {
    if(this.keyStatus.isRightUp) {
      this.bar.moveRight();
    }
    if(this.keyStatus.isLeftUp) {
      this.bar.moveLeft();
    }
    this.ball.frameChamge();
    this.bar.barToBall(this.ball);
    this.draw();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.windowSize, this.windowSize);
    this.ctx.beginPath();
    this.ctx.drawImage(this.backgroundImage, 0, 0, this.windowSize, this.windowSize, 0, 0, this.windowSize, this.windowSize);
    this.ball.draw(this.ctx);
    this.bar.draw(this.ctx);
    this.blocks.forEach((x)=>{
      x.draw(this.ctx)
    })
  }

  start() {
    // 初期設定
    for(let y=0; y<3; y++) {
      for(let x=0; x<10; x++) {
        this.blocks.push(
          new Block(x*80, y*40)
        );
      }
    }
    this.timerID = setInterval(this.frame.bind(this), (1000/this.fps));
  }
}

export default GameObject;
