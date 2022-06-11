import Ball from "./ball";
import Bar from "./bar";
import Block from "./block";

type GameStatus = 'title' | 'playing' | 'gameover';

class GameObject {
  ctx: any;
  /** 画面の解像度 */
  windowSize: number;
  balls: Ball[];
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
    canvas: HTMLElement
    status: HTMLElement,
    score: HTMLElement,
    ballNum: HTMLElement
  }
  score: number;
  ballStock: number;

  constructor() {
    const canvas: any = document.getElementById('canvas');
    this.ctx = canvas.getContext('2d');
    this.windowSize = 800;
    this.balls = [];
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
      score: document.getElementById('score'),
      ballNum: document.getElementById('ball_num'),
      canvas: canvas
    }
    this.blocks = [];
    this.gameStatus = 'title';
    this.score = 0;
    this.ballStock = 0;
  }

  setStatus() {
    const statusStr = (()=>{
      switch(this.gameStatus) {
        case 'gameover':
          return 'ゲームオーバー';
        case 'playing':
          return 'プレイ中';
        case 'title':
          return 'タイトル';
      }
    })()
    this.htmlElements.status.innerHTML = `状況：${statusStr}`
  }

  setScore() {
    this.htmlElements.score.innerHTML = `スコア：${this.score.toString()}`
  }

  setBallNum() {
    this.htmlElements.ballNum.innerHTML = `残り弾：${this.ballStock.toString()}`
  }

  addScore() {
    this.score += 100;
    this.setScore();
  }

  playing() {
    if(this.keyStatus.isRightUp) {
      this.bar.moveRight();
    }
    if(this.keyStatus.isLeftUp) {
      this.bar.moveLeft();
    }
    let existBallCount = 0;
    this.balls.forEach((ball: Ball)=>{
      ball.frameChamge();
      this.bar.barToBall(ball);
      if(ball.isExist) {
        existBallCount++;
      }
    })
    this.blocks.forEach((block: Block) => {
      if(block.isExist) {
        this.balls.forEach((ball: Ball)=>{
          const isHit = block.blockToBall(ball);
          if(isHit) {
            this.addScore();
          }
        })
      }
    })
    if(existBallCount <= 0 && this.ballStock <= 0) {
      this.gameStatus = 'gameover';
      this.setStatus();
    }
    // Escが押されたらタイトルに戻る
    if(this.keyStatus.isEsc) {
      this.gameStatus = 'title';
      this.setStatus();
    }
    this.playingDraw();
  }

  shotBall() {
    if(this.gameStatus === 'playing' && this.ballStock > 0) {
      this.ballStock--;
      this.setBallNum();
      this.balls.push(
        new Ball(this.bar.x + (this.bar.barWidth / 2), this.bar.y, this.windowSize)
      )
    }
  }

  playingDraw() {
    this.ctx.clearRect(0, 0, this.windowSize, this.windowSize);
    this.ctx.beginPath();
    this.ctx.drawImage(this.backgroundImage, 0, 0, this.windowSize, this.windowSize, 0, 0, this.windowSize, this.windowSize);
    this.balls.forEach((ball: Ball)=>{
      ball.draw(this.ctx);
    })
    this.bar.draw(this.ctx);
    this.blocks.forEach((block: Block)=>{
      if(block.isExist) {
        block.draw(this.ctx)
      }
    })
  }

  resetGame() {
    // 初期設定
    this.balls = [];
    this.bar.reset();
    this.score = 0;
    this.blocks = [];
    this.ballStock = 5;
    this.gameStatus = 'playing';
    this.setScore();
    this.setStatus();
    this.setBallNum();
    for(let y=0; y<5; y++) {
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
