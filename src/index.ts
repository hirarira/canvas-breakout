"use strict";

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
    this.vx = 5;
    this.vy = 2;
    this.windowSize = windowSize;
    this.ballSize = 20;
    this.image = new Image();
    this.image.src = './img/ball.png';
  }

  frameChamge() {
    if(this.x < 10 || this.x > this.windowSize - 10) {
      this.vx *= -1;
    }
    if(this.y < 10 || this.y > this.windowSize - 10) {
      this.vy *= -1;
    }
    this.x += this.vx;
    this.y += this.vy;
  }

  draw(ctx: any) {
    ctx.drawImage(this.image, 0, 0, this.ballSize, this.ballSize, this.x - (this.ballSize/2), this.y - (this.ballSize/2), this.ballSize, this.ballSize);
  }
}

class Bar {
  x: number;
  y: number;
  ballSize: number;
  image: HTMLImageElement;
  windowSize: number;
  barWidth: number

  constructor(windowSize: number) {
    this.x = 300;
    this.y = 720;
    this.barWidth = 200;
    this.windowSize = windowSize;
    this.image = new Image();
    this.image.src = './img/bar.png';
  }

  draw(ctx: any) {
    ctx.drawImage(this.image, 0, 0, this.barWidth, 30, this.x, this.y, this.barWidth, 30);
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

}

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

  frame() {
    this.ball.frameChamge();
    if(this.keyStatus.isRightUp) {
      this.bar.moveRight();
    }
    if(this.keyStatus.isLeftUp) {
      this.bar.moveLeft();
    }
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

window.onload = async () => {
  const gameObjet = new GameObject();
  gameObjet.start();
  window.addEventListener("keydown", async (evt) => {
    switch(evt.key) {
      case 'ArrowRight':
        gameObjet.keyStatus.isRightUp = true;
        break;
      case 'ArrowLeft':
        gameObjet.keyStatus.isLeftUp = true;
        break;
    }
  });
  window.addEventListener("keyup", async (evt) => {
    switch(evt.key) {
      case 'ArrowRight':
        gameObjet.keyStatus.isRightUp = false;
        break;
      case 'ArrowLeft':
        gameObjet.keyStatus.isLeftUp = false;
        break;
    }
  });
}
