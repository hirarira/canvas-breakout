import Ball from "./ball";
import Bar from "./bar";
import Block from "./block";

type GameStatus = 'title' | 'playing' | 'gameover';

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
    isRightUp: boolean,
    isEnter: boolean,
    isEsc: boolean
  }
  blocks: Block[];
  gameStatus: GameStatus;
  htmlElements: {
    status: HTMLElement,
    score: HTMLElement
  }
  score: number;

  constructor() {
    const canvas: any = document.getElementById('canvas');
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.windowSize = 800;
    this.ball = new Ball(0, 0, this.windowSize);
    this.bar = new Bar(this.windowSize);
    this.fps = 60;
    this.backgroundImage = new Image();
    this.backgroundImage.src = './img/sea.jpg';
    this.keyStatus = {
      isLeftUp: false,
      isRightUp: false,
      isEnter: false,
      isEsc: false
    },
    this.htmlElements = {
      status: document.getElementById('status'),
      score: document.getElementById('score')
    }
    this.blocks = [];
    this.gameStatus = 'title';
    this.score = 0;
  }

  setStatus(str: string) {
    this.htmlElements.status.innerHTML = `状況：${str}`
  }

  setScore(score: number) {
    this.htmlElements.score.innerHTML = `スコア：${score.toString()}`
  }

  addScore() {
    this.score += 100;
    this.setScore(this.score);
  }

  playing() {
    if(this.keyStatus.isRightUp) {
      this.bar.moveRight();
    }
    if(this.keyStatus.isLeftUp) {
      this.bar.moveLeft();
    }
    this.ball.frameChamge();
    this.bar.barToBall(this.ball);
    this.blocks.forEach((block: Block) => {
      if(block.isExist) {
        const isHit = block.blockToBall(this.ball);
        if(isHit) {
          this.addScore();
        }
      }
    })
    if(!this.ball.isExist) {
      this.gameStatus = 'gameover';
      this.setStatus('ゲームオーバー');
    }
    // Escが押されたらタイトルに戻る
    if(this.keyStatus.isEsc) {
      this.gameStatus = 'title';
      this.setStatus('タイトル');
    }
    this.playingDraw();
  }

  playingDraw() {
    this.ctx.clearRect(0, 0, this.windowSize, this.windowSize);
    this.ctx.beginPath();
    this.ctx.drawImage(this.backgroundImage, 0, 0, this.windowSize, this.windowSize, 0, 0, this.windowSize, this.windowSize);
    this.ball.draw(this.ctx);
    this.bar.draw(this.ctx);
    this.blocks.forEach((block: Block)=>{
      if(block.isExist) {
        block.draw(this.ctx)
      }
    })
  }

  resetGame() {
    // 初期設定
    this.ball.reset(200, 200);
    this.bar.reset();
    this.score = 0;
    this.blocks = [];
    this.gameStatus = 'playing';
    this.setScore(this.score);
    this.setStatus('プレイ中');
    for(let y=0; y<3; y++) {
      for(let x=0; x<10; x++) {
        this.blocks.push(
          new Block(x*80, y*40)
        );
      }
    }
  }

  title() {
    this.ctx.clearRect(0, 0, this.windowSize, this.windowSize);
    this.ctx.beginPath();
    this.ctx.drawImage(this.backgroundImage, 0, 0, this.windowSize, this.windowSize, 0, 0, this.windowSize, this.windowSize);
    this.ctx.font = '48px serif';
    this.ctx.fillText('ブロック崩し', 250, 300);
    this.ctx.fillText('Enterで開始', 250, 400);
    if(this.keyStatus.isEnter) {
      this.resetGame();
    }
  }

  gameOver() {
    this.playingDraw();
    this.ctx.font = '48px serif';
    this.ctx.fillText('GameOver', 250, 300);
    this.ctx.fillText('Enterでリトライ', 250, 400);
    if(this.keyStatus.isEnter) {
      this.resetGame();
      this.gameStatus = 'playing';
    }
  }
  
  main() {
    switch(this.gameStatus) {
      case 'title':
        this.title();
        break;
      case 'playing':
        this.playing();
        return;
      case 'gameover':
        this.gameOver();
        return;
    }
  }

  start() {
    this.timerID = setInterval(this.main.bind(this), (1000/this.fps));
  }
}

export default GameObject;
