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

}

export default Bar;
