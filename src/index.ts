"use strict";

class Ball {
  x: number;
  y: number;
  vx: number;
  vy: number;

  constructor(init_x: number, init_y: number) {
    this.x = init_x;
    this.y = init_y;
    this.vx = 1;
    this.vy = 1;
  }

  frameChamge() {
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

  constructor() {
    const canvas: any = document.getElementById('canvas');
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.windowSize = 1000;
    this.ball = new Ball(100, 100);
    this.fps = 60;
  }

  frame() {
    console.log(this.windowSize);
    this.ball.frameChamge();
    this.draw();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.windowSize, this.windowSize);
    this.ctx.beginPath();
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
