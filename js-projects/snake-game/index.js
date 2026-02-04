const playBoard=document.querySelector('.play-board');
const scoreElement=document.querySelector('.score');
const hightScoreElement=document.querySelector('.high-score');
const controls=document.querySelectorAll('.controls .img');

let gameOver=false;
let foodX,foodY;
let snakeX=5,snakeY=5;
let velocityX=0,velocityY=0;
let snakeBody=[];
let setIntervalId;
let score=0;

//high score from local storage

let hightScore=localStorage.getItem('high-score') || 0;
hightScoreElement.innerText=`High Score: ${hightScore}`;

//update food position by ramdon number
const updateFoodPosition=()=>{
    foodX=Math.floor(Math.random()*30+1);
    foodY=Math.floor(Math.random()*30+1);
};

//gameOver handle
let handleGameOver=()=>{
    clearInterval(setIntervalId);
    alert("Game Over");
    location.reload();
};

//change velocity value
let changeDirection=e=>{

    if((e.key==='ArrowUp' || e.key==="w") && velocityY!=1){
        velocityX=0;
        velocityY=-1;
    }else if((e.key==='ArrowDown' || e.key==="s") && velocityY!=-1){
        velocityX=0;
        velocityY=1;
    }else if((e.key==='ArrowLeft' || e.key==="a") && velocityX!=1){
        velocityX=-1;
        velocityY=0;
    }else if((e.key==='ArrowRight' || e.key==="d") && velocityX!=-1){
        velocityX=1;
        velocityY=0;
    }

};

//change direction when press a key
controls.forEach(
    button=>button.addEventListener(
        "click",
        ()=>changeDirection(
            {
                key: button.dataset.key
            }
        )
    )
);

//initialize game
let initGame=()=>{

    if(gameOver) return handleGameOver();
    let html = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

    //when snake eat the food
    if (snakeX===foodX && snakeY===foodY) {
        updateFoodPosition();
        snakeBody.push([foodY,foodX]);
        score++;
        hightScore=score>=hightScore?score:hightScore;

        localStorage.setItem('high-score',hightScore);
        scoreElement.innerText=`Score: ${score}`;
        hightScoreElement.innerText=`High Score: ${hightScore}`;
    }

    //update snake head
    snakeX+=velocityX;
    snakeY+=velocityY;

    //shifthing foward values of elements in snake body by one
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i]=snakeBody[i-1];
    }

    snakeBody[0]=[snakeX,snakeY];

    //check the snake is out of wall
    if(snakeX<=0 || snakeX>30 || snakeY<=0 || snakeY>30){
        return gameOver=true;
    }

    //increase body of snake
    for (let i = 0; i < snakeBody.length; i++) {
        html+=`<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;

        //check snake if hit itself
        if(i!==0 && snakeBody[0][1]===snakeBody[i][1] && snakeBody[0][0]===snakeBody[i][0]){
            gameOver=true;
        }
    }
    playBoard.innerHTML=html;
}

updateFoodPosition();
setIntervalId=setInterval(initGame,150);
document.addEventListener('keyup',changeDirection);