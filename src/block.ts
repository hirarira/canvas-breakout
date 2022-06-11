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
  changeExist() {
    this.isExist = !this.isExist;
  }
  draw(ctx: any) {
    ctx.drawImage(this.image, 0, 0, this.width, this.height, this.x, this.y, this.width, this.height);
  }
}

export default Block;
