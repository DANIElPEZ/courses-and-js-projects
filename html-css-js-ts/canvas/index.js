/*basics of canvas*/
//get and set context to canvas
const canvas=document.getElementById('canvas');
const ctx=canvas.getContext('2d');

//define color
ctx.fillStyle='red';
//draw a rect
ctx.fillRect(120,150,50,100);

//draw a line
ctx.moveTo(0,0);
ctx.lineTo(100,200);
ctx.lineWidth=10;
ctx.strokeStyle='green'; //stroke defines color of the outline
ctx.lineCap='round';
ctx.stroke();

//draw a circle
ctx.beginPath();
ctx.arc(150,80,40,0,2*Math.PI);
ctx.fillStyle='#00f';
ctx.fill();
ctx.lineWidth=4;
ctx.strokeStyle='#fda5c8';
ctx.stroke();

//combining fill and stroke style
ctx.fillStyle='#00f';
ctx.fillRect(20,240,50,50);
ctx.strokeStyle='#0f6';
ctx.lineWidth=5;
ctx.strokeRect(17,237,56,56);

//create our shape
ctx.beginPath();
ctx.moveTo(10,100);
ctx.lineTo(30,100);
ctx.lineTo(50,150);
ctx.lineTo(10,130);
ctx.lineTo(10,100);
ctx.stroke();
//clear rect
ctx.fillStyle='#e02';
ctx.clearRect(35,255,20,20);

//curves
ctx.beginPath();
ctx.moveTo(0,340);
ctx.quadraticCurveTo(120,450,130,340);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(140, 340);
ctx.bezierCurveTo(180, 390, 180, 280, 240, 440);
ctx.stroke();

//gradients
const lGradient=ctx.createLinearGradient(0,0,50,0);
lGradient.addColorStop(0,'#48e');
lGradient.addColorStop(1,'#00f');

ctx.fillStyle=lGradient;
ctx.fillRect(10,400,50,150);

//text
ctx.font='30px san-serif';
ctx.fillStyle='#90f';
ctx.textBaseline='bottom';
ctx.fillText('hello world',90,450);

ctx.font='bold italic 40px arial';
ctx.strokeStyle='#0ae';
ctx.lineWidth=1;
ctx.textBaseline='top';
ctx.textAlign='center';
ctx.strokeText('hello',90,490);

//shadows
ctx.shadowColor='#00f6';
ctx.shadowBlur=6;
ctx.shadowOffsetX=20;
ctx.shadowOffsetY=20;

ctx.fillStyle='blue';
ctx.fillRect(150,470,120,80);

//draw image
const img=document.getElementById('img');

img.addEventListener('load',e=>{
    ctx.drawImage(img,180,150,80,80);
});