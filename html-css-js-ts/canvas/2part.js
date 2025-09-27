const canvas=document.getElementById('cv');
const ctx=canvas.getContext('2d');
const canvas2=document.getElementById('cvs');
const ctx2=canvas2.getContext('2d');

//scale
ctx.strokeRect(5, 5, 25, 25);

ctx.scale(2, 2);

ctx.strokeStyle = "blue";
ctx.strokeRect(5, 5, 25, 25);

//transform
ctx.fillStyle = "yellow";
ctx.transform(1,0.2,-0.5,1,20,30);
ctx.fillRect(20, 40, 20, 30);

//transformations
ctx.fillStyle='#f00';
ctx.fillRect(10,10,90,40);

ctx.translate(70,70);

ctx.fillStyle='#0f0';
ctx.fillRect(10,10,90,40);

//rotate
ctx.rotate(45);
ctx.fillRect(100,90,90,40);

//compositing
ctx2.globalCompositeOperation = "source-over";

ctx2.fillStyle = "blue";
ctx2.fillRect(0, 0, 20, 20);
ctx2.fillStyle = "red";
ctx2.fillRect(10, 0, 20, 20);


ctx2.globalCompositeOperation = "destination-over";

ctx2.fillStyle = "blue";
ctx2.fillRect(0, 30, 20, 20);
ctx2.fillStyle = "red";
ctx2.fillRect(10, 30, 20, 20);


ctx2.globalCompositeOperation = "lighter";

ctx2.fillStyle = "blue";
ctx2.fillRect(10, 60, 50, 50);
ctx2.fillStyle = "red";
ctx2.fillRect(20, 80, 50, 50);
/*
ctx2.globalCompositeOperation = "source-over";

ctx2.fillStyle = "blue";
ctx2.fillRect(0, 150, 20, 20);
ctx2.fillStyle = "red";
ctx2.fillRect(10, 150, 20, 20);

ctx2.globalCompositeOperation = "source-over";

ctx2.fillStyle = "blue";
ctx2.fillRect(0, 150, 20, 20);
ctx2.fillStyle = "red";
ctx2.fillRect(10, 150, 20, 20);
*/
//clip
let r = new Path2D();
r.rect(180,10, 45,130);
r.rect(160,50, 140,50);
ctx2.clip(r, "evenodd");

// Draw a rectangle
ctx2.fillStyle = "red";
ctx2.fillRect(150, 0, 300, 150);