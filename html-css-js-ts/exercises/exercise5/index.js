let piece, obstacles=[], score=0;

let restartBtn=document.getElementById('restart');

let gameArea={
    canvas: document.getElementById('canvas'),
    start:function(){
        this.context=this.canvas.getContext('2d');
        this.frameNo=0;
        this.interval=setInterval(updateGame,20);
    },
    clearBoardGame:function(){
        this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
    },
    stopGame:function(){
        clearInterval(this.interval);
        restartBtn.style.display='block';
    }
}

function component(width,height,color,x,y,type){
    this.type=type;
    this.width=width;
    this.height=height;
    this.y=y;
    this.x=x;

    this.angle=0;

    this.speedX=0;
    this.speedY=0;

    this.update=function(){
        ctx=gameArea.context;
        if(this.type==='text'){
            ctx.fillStyle=color;
            ctx.font = this.width + " " + this.height;
            ctx.fillText(this.text, this.x, this.y);
        } else{
            ctx.fillStyle=color;
            ctx.fillRect(this.x,this.y,this.width,this.height);
        }
    };

    this.newPosition=function(){
        this.x+=this.speedX;
        this.y+=this.speedY;
    };

    this.hit=function(obstacleObj){
        let gameOver=false;

        let mainLeft=this.x;
        let mainRight=this.x+this.width;
        let mainTop=this.y;
        let mainBottom=this.y+this.height;

        let obstacleLeft=obstacleObj.x;
        let obstacleRight=obstacleObj.x+obstacleObj.width;
        let obstacleTop=obstacleObj.y;
        let obstacleBottom=obstacleObj.y+obstacleObj.height;

        if(!(mainBottom<obstacleTop || mainTop>obstacleBottom || mainLeft>obstacleRight || mainRight<obstacleLeft)) gameOver=true;

        return gameOver;
    };
}

function updateGame(){
    let x, height, minHeight=20, maxHeight=201, gap, minGap=50, maxGap=201;
    for(let i=0;i<obstacles.length;i++){
        if(piece.hit(obstacles[i])){
            gameArea.stopGame();
            return;
        }
    }
    
    gameArea.clearBoardGame();

    gameArea.frameNo++;

    if(gameArea.frameNo===1 || ((gameArea.frameNo/150) % 1 === 0)){

        x=gameArea.canvas.width;

        height=Math.floor(Math.random()*(maxHeight-minHeight)+minHeight);
        gap=Math.floor(Math.random()*(maxGap-minGap)+minGap);

        obstacles.push(new component(10,height,'green',x,0));
        obstacles.push(new component(10,x-height-gap,'green',x,height+gap));
    }

    for(let i=0;i<obstacles.length;i++){
        obstacles[i].x+=-1;
        obstacles[i].update();
    }

    score.text="Score: "+gameArea.frameNo;
    score.update();
    piece.newPosition();
    piece.update();
}

document.addEventListener('keyup',()=>{
    piece.speedX=0;
    piece.speedY=0;
});

document.addEventListener('keydown',e=>{
    if(e.key==="w") piece.speedY=-1;
    else if(e.key==="s") piece.speedY=1;
    else if(e.key==="a") piece.speedX=-1;
    else if(e.key==="d") piece.speedX=1;
});

restartBtn.addEventListener('click',()=>{
    obstacles=[];
    score=0;
    gameArea.stopGame();
    gameArea.clearBoardGame();
    startGame();
});

function startGame(){
    piece=new component(30,30,'red',10,120);
    score=new component("30px", "san-serif", "#fff", 20, 40, "text");
    gameArea.start();
    restartBtn.style.display='none';
}

startGame();