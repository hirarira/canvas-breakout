"use strict";

class Ball {
  x: number;
  y: number;
  vx: number;
  vy: number;
  windowSize: number;

  constructor(init_x: number, init_y: number, windowSize: number) {
    this.x = init_x;
    this.y = init_y;
    this.vx = 5;
    this.vy = 2;
    this.windowSize = windowSize;
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
}

class GameObject {
  canvas: HTMLElement;
  ctx: any;
  /** 画面の解像度 */
  windowSize: number;
  ball: Ball;
  timerID: any;
  fps: number;
  backgroundImage: HTMLImageElement;

  constructor() {
    const canvas: any = document.getElementById('canvas');
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.windowSize = 800;
    this.ball = new Ball(100, 100, this.windowSize);
    this.fps = 60;
    this.backgroundImage = new Image();
    this.backgroundImage.src = './img/sea.jpg';
  }

  frame() {
    console.log(this.windowSize);
    this.ball.frameChamge();
    this.draw();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.windowSize, this.windowSize);
    this.ctx.beginPath();
    this.ctx.drawImage(this.backgroundImage, 0, 0, this.windowSize, this.windowSize, 0, 0, this.windowSize, this.windowSize)
    this.ctx.arc( this.ball.x, this.ball.y, 10, 0 * Math.PI / 180, 360 * Math.PI / 180, false ) ;
    this.ctx.fillStyle = "rgba(255,0,0,0.8)" ;
    this.ctx.fill() ;
  }

  start() {
    console.log("start");
    this.timerID = setInterval(this.frame.bind(this), (1000/this.fps));
  }

}

window.onload = () => {
  const gameObjet = new GameObject();
  gameObjet.start();
}
