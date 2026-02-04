/*init elements*/

//elements html
const score=document.querySelector('.score');
const btnBeginRestart=document.querySelector('.begin');

//canvas
const canvas=document.getElementById('canvas');
const ctx=canvas.getContext('2d');

//const
const BLOCK_SIZE=20;
const BOARD_WIDTH=14;
const BOARD_HEIGHT=30;


//width, height of canvas
canvas.width=BOARD_WIDTH*BLOCK_SIZE;
canvas.height=BOARD_HEIGHT*BLOCK_SIZE;

ctx.scale(BLOCK_SIZE,BLOCK_SIZE);

/*board and pieces*/
//board
const board=[
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0]
];

//piece model
const piece={
    position:{
        x:6,
        y:0
    },
    shape:[
        [1,1],
        [1,1]
    ]
};

//pieces shapes
const PIECES=[
    [
        [1,1],
        [1,1]
    ],
    [
        [1,1,1,1]
    ],
    [
        [0,1,0],
        [1,1,1]
    ],
    [
        [1,1,0],
        [0,1,1]
    ],
    [
        [0,1,1],
        [1,1,0]
    ],
    [
        [1,0],
        [1,0],
        [1,1]
    ],
    [
        [0,1],
        [0,1],
        [1,1]
    ]
];

//pieces colors
const PiecesColors=[
    '#48e',
    '#009600',
    '#720404',
    '#852fb1',
    '#f0a308'
];


//some variables to game (pieceselected define the shape and color,score,gameOver)
let pieceSelected=0,scorePoints=0,gameOver=false;
//music
const music = new Audio('./Tetris.mp3');
music.loop=true;

/*game loop*/
let lastTime=0,dropCounter=0;

//update
function update(time=0){

    if (!gameOver) {
        dropCounter+=time-lastTime;

        lastTime=time;

        if(dropCounter>300){
            piece.position.y++;
            dropCounter=0;

            if(checkCollision()){
                piece.position.y--;
                addPieceToBoard();
                removeRow();
            }
        }

        ctx.clearRect(0,0,canvas.width,canvas.height);
        draw();
        window.requestAnimationFrame(update);

        score.innerHTML='Score: '+scorePoints;
    }
}

//draw
function draw(){

    board.forEach((row,yIndex)=>{
        row.forEach((column,xIndex)=>{
            if (column===1){
                ctx.fillStyle='#8f0';
                ctx.fillRect(xIndex, yIndex, 1, 1);
            }
        });
    });

    piece.shape.forEach((row,yIndex)=>{
        row.forEach((column,xIndex)=>{
            if (column===1){
                ctx.fillStyle=PiecesColors[pieceSelected];
                ctx.fillRect(xIndex+piece.position.x, yIndex+piece.position.y, 1, 1);
            }
        });
    });
}


//collitions
function checkCollision(){
    return piece.shape.find((row,yIndex)=>{
        return row.find((column,xIndex)=>{
            //shape and board[y][x]!=0
            return (column!==0 && board[yIndex+piece.position.y]?.[xIndex+piece.position.x]!==0);
        });
    });
}


//add piece to board
function addPieceToBoard(){
    piece.shape.forEach((row,yIndex)=>{
        row.forEach((column,xIndex)=>{
            if (column===1){
                board[yIndex+piece.position.y][xIndex+piece.position.x]=1;
            }
        });
    });

    pieceSelected=Math.floor(Math.random()*PIECES.length);

    piece.shape=PIECES[pieceSelected];

    piece.position.x=6;
    piece.position.y=0;

    if (checkCollision()) {
        gameOver=true;
        btnBeginRestart.style.display='block';
        btnBeginRestart.innerHTML='Restart Game';
        btnBeginRestart.addEventListener('click',()=>{
            board.forEach(row=>row.fill(0));
            music.play();
            scorePoints=0;
            gameOver=false;
        });
    }
    scorePoints++;
}

//remove row if the row is filled by 1
function removeRow(){
    const removedRows=[];

    board.forEach((row,yIndex)=>{
        if(row.every(valuesRow=>valuesRow===1)) removedRows.push(yIndex);
    });

    removedRows.forEach(xIndex=>{
        board.splice(xIndex,1);

        const newRow=Array(BOARD_WIDTH).fill(0);

        board.unshift(newRow);
    });

}

/*game controls*/
//key events
document.addEventListener('keydown',e=>{

    if (e.key==='d'){
        piece.position.x++;
        if(checkCollision()){
            piece.position.x--;
        }
    }

    if (e.key==='a') {
        piece.position.x--;
        if(checkCollision()){
            piece.position.x++;
        }
    }

    if (e.key==='s') {
        piece.position.y++;
        if(checkCollision()){
            piece.position.y--;
            addPieceToBoard();
            removeRow();
        }
    }

    if (e.key==='w') {
        const rotatePiece=[];

        for(let i=0;i<piece.shape[0].length;i++){
            const row=[];

            for (let j = piece.shape.length-1; j >= 0; j--) {
                row.push(piece.shape[j][i]);
            }
            rotatePiece.push(row);
        }

        const previousPieceShape=piece.shape;
        piece.shape=rotatePiece;
        if(checkCollision()){
            piece.shape=previousPieceShape;
        }
    }
});

//begin button
btnBeginRestart.addEventListener('click',()=>{
    btnBeginRestart.style.display='none';
    music.play();
    setTimeout(update,400);
});