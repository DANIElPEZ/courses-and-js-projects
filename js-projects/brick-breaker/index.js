const score=document.querySelector('.score');
const btn=document.getElementById('start');
const sprite=document.getElementById('sprite');
const bricksImage=document.getElementById('bricks');
const canvas=document.getElementById('canvas');
const ctx=canvas.getContext('2d');

canvas.width=448;
canvas.height=400;

//--------------variables del juego----------------
let scorePoints=0;
//---------------variables de la bola--------------
const radius=5;
//posicion de la pelota
let xBall=canvas.width/2;
let yBall=canvas.height-30;
//velocidadpelota
let xSpeed=2;
let ySpeed=-2;

//---------------variables del jugador-------------
const playerWidth=50;
const playerHeight=10;

let playerX=(canvas.width-playerWidth)/2;
let playerY=canvas.height-playerHeight-10;

const playerSpeed=8;
let rightPressed=false;
let LeftPressed=false;

//---------------variables de los ladrillos--------
const brickRowCount=6;
const brickColumnCount=13;
const brickWidth=32;
const brickHeight=16;
const brickPadding=1;
const brickOffSetTop=80;
const brickOffSetLeft=10.5;
const bricks=[];
const brickStatus={
    built:1,
    destroyed:0
};

for (let row = 0; row < brickRowCount; row++) {
    let rowsBricks=[]; //guarda la fila
    for (let column = 0; column < brickColumnCount; column++) {
        //calcular posicion de cada ladrillo
        const brickX=column*(brickPadding+brickWidth)+brickOffSetLeft;
        const brickY=row*(brickPadding+brickHeight)+brickOffSetTop;
        //asignar color aleatorio
        const ColorBrick=Math.floor(Math.random()*8);
        //creamos un objeto para cada ladrillo
        rowsBricks.push({
            xPos:brickX,
            yPos:brickY,
            status:brickStatus.built,
            color:ColorBrick
        });
    }
    bricks.push(rowsBricks);
}

//definicon de las funciones
//-------------------------dibujado
function drawBall(){
    ctx.beginPath();
    ctx.arc(xBall,yBall,radius,0,360);
    ctx.fillStyle='#fff';
    ctx.fill();
    ctx.closePath();
}

function drawPlayer(){
    //sprite, recorte,posicion renderizado, tamaño
    ctx.drawImage(sprite,29,174,playerWidth,playerHeight,playerX,playerY,playerWidth,playerHeight);
}

function drawBricks(){
    for (let row = 0; row < brickRowCount; row++) {
        for (let column = 0; column < brickColumnCount; column++) {
            const currentBrick=bricks[row][column];
            
            if (currentBrick.status===brickStatus.destroyed) continue;

            let clipX=32*currentBrick.color;

            ctx.drawImage(bricksImage,clipX,0,32,14,currentBrick.xPos,currentBrick.yPos,brickWidth,brickHeight);
        }    
    }
}

//------------------------colisiones
function collitionDetection(){
    for (let row = 0; row < brickRowCount; row++) {
        for (let column = 0; column < brickColumnCount; column++) {
            const currentBrick=bricks[row][column];
            
            if (currentBrick.status===brickStatus.destroyed) continue;

            const xPosBallWithXbrick=xBall>currentBrick.xPos && xBall<currentBrick.xPos+brickWidth;
            const yPosBallWithYbrick=yBall>currentBrick.yPos-radius && yBall-radius<currentBrick.yPos+brickHeight;
        
            if(xPosBallWithXbrick && yPosBallWithYbrick){//toca a un ladrillo
                ySpeed=-ySpeed;
                currentBrick.status=brickStatus.destroyed;
                scorePoints++;
                score.textContent='Score: '+scorePoints;
            }
        }    
    }
}

function ballMovement(){
    //rebote laterales
    if (xBall>canvas.width-radius || xBall<radius) {
        xSpeed=-xSpeed;
    }
    //partesuperior
    if (yBall<radius) {
        ySpeed=-ySpeed;
    }
    
    const xPosBallWithXplayer=xBall>playerX && xBall<playerX+playerWidth;
    const yPosBallWithYplayer=yBall+radius>playerY;

    if(xPosBallWithXplayer && yPosBallWithYplayer){//toca a player
        ySpeed=-ySpeed;
    }else if (yBall>canvas.height-radius) {//toca el suelo
        document.location.reload();
    }
    xBall+=xSpeed;
    yBall+=ySpeed;
}

function playerMovement(){
    if (rightPressed && playerX < canvas.width-playerWidth) {
        playerX+=playerSpeed;
    } else if(LeftPressed && playerX > 0){
        playerX-=playerSpeed;
    }
}

function initEvents(){
    document.addEventListener('keydown', e=>{keydown(e)});
    document.addEventListener('keyup', e=>{keyup(e)});

    function keydown(e){
        const key=e.key;

        if (key.toLowerCase()==="a" || key==="ArrowLeft"){
            LeftPressed=true;
        }else if (key.toLowerCase()==="d" || key==="ArrowRight"){
            rightPressed=true;
        }
    }

    function keyup(e){
        const key=e.key;

        if (key.toLowerCase()==="a" || key==="ArrowLeft"){
            LeftPressed=false;
        }else if (key.toLowerCase()==="d" || key==="ArrowRight"){
            rightPressed=false;
        }
    }
}

//------------------------funcion principal
function draw(){
    //borrado frame anterior
    ctx.clearRect(0,0,canvas.width,canvas.height);
    //dibujado
    drawBall();
    drawPlayer();
    drawBricks();
    
    //colisiones
    collitionDetection();
    ballMovement();
    playerMovement();
    window.requestAnimationFrame(draw);
}

btn.addEventListener('click',()=>{
    draw();
    btn.style.display='none';
});
initEvents();