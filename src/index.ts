"use strict";

class GameObject {
  canvas: HTMLElement;
  ctx: any;
  /** 画面の解像度 */
  windowSize: number;

  constructor() {
    const canvas: any = document.getElementById('canvas');
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.windowSize = 1000;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.windowSize, this.windowSize);
    this.ctx.arc( 100, 100, 10, 0 * Math.PI / 180, 360 * Math.PI / 180, false ) ;
    this.ctx.fillStyle = "rgba(255,0,0,0.8)" ;
    this.ctx.fill() ;
  }

}

window.onload = () => {
  const gameObjet = new GameObject();
  gameObjet.draw();
}
