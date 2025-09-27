//mouse events
let box=document.getElementById('container');

box.onmouseover = box.onmouseout = handler;

function handler(event) {

    if (event.type=='mouseover'){
        event.target.style.background = '#00f'
    }

    if (event.type=='mouseout'){
        event.target.style.background = 'none'
    }
}

//drag and drop
let ball=document.getElementById('balon');

ball.onpointerdown=function(event){

    let xpos=event.pageX - ball.getBoundingClientRect().left;
    let ypos=event.pageY - ball.getBoundingClientRect().top;

    ball.style.position='absolute';
    ball.style.zIndex=100;

    document.body.append(ball);

    function move(x,y){
        ball.style.top=y - ypos + "px";
        ball.style.left=x - xpos + "px";
    }

    move(event.pageX,event.pageY);//actualiza posicion del balon

    function mousemove(event){
        move(event.pageX,event.pageY); //mover balon con el puntero
    }

    document.addEventListener('pointermove',mousemove);

    ball.onpointerup=function(){
        document.removeEventListener('pointermove',mousemove);
        ball.onpointerup = null;
    };
};

ball.ondragstart = () => false;

//mover slider
let thumb = slider.querySelector('.thumb');
let shiftX;

function onThumbDown(event) {

  shiftX = event.clientX - thumb.getBoundingClientRect().left;

  thumb.setPointerCapture(event.pointerId);

  thumb.onpointermove = onThumbMove;

  thumb.onpointerup = event => {
    // arrastre finalizado, no se necesita seguir rastreando el puntero
    // ... toda otra lógica de finalización de arrastre aquí...
    thumb.onpointermove = null;
    thumb.onpointerup = null;
  }
};

function onThumbMove(event) {
  let newLeft = event.clientX - shiftX - slider.getBoundingClientRect().left;

  // si el puntero está fuera del slider => ajustar "izquierda" para que esté dentro de los límites
  if (newLeft < 0) {
    newLeft = 0;
  }
  let rightEdge = slider.offsetWidth - thumb.offsetWidth;
  if (newLeft > rightEdge) {
    newLeft = rightEdge;
  }

  thumb.style.left = newLeft + 'px';
};

thumb.onpointerdown = onThumbDown;

thumb.ondragstart = () => false;

//key down-up
document.addEventListener('keydown',function(event){
  if(event.code=='KeyW'){
    console.log(`presiono ${event.code}`);
  }
});

let telefono = document.getElementById('telefono');

telefono.addEventListener('keydown',function(event){
  let key=event.key;
  console.log(key);
  if ((key >= '0' && key <= '9') || ['+', '-', '(', ')','Tab'].includes(key)) return true;
  event.preventDefault();
});

/*formularios y controles*/

//accediendo a los elemntos
let form=document.getElementById('form');

let login = form.elements['login'];
login.value = 'hello world';

//crear option
let options=['Manzana','Pera','Banano','Uva'];
let seleccion=document.getElementById('seleccion');

for (let index = 0; index < options.length; index++) {

  let option = document.createElement('option');
  option.text=options[index];
  option.value=options[index].toLocaleLowerCase();
  seleccion.appendChild(option);
}

//focus/blur
let email=document.getElementById('email');
let error=document.getElementById('error');

email.addEventListener('focusout',function(){
  if(!email.value.includes('@')){
    email.classList.add('invalid');
    error.textContent='Por favor introduzca un correo valido';
  }
});

email.addEventListener('focusin',function(){
  if(email.classList.contains('invalid')){
    email.classList.remove('invalid');
    error.textContent='';
  }
});

//evento change, input, copy, paste, cut
let change=document.getElementById('changevalue');

change.addEventListener('change',function(){
  switch(parseInt(change.value)){
    case 0:
      document.body.style.background='#fff';
      break;
    case 1:
      document.body.style.background='#f00';
      break;
    case 2:
      document.body.style.background='#0f0';
      break;
    case 3:
      document.body.style.background='#00f';
      break;
  }
});

//copy
document.getElementById('copy').addEventListener('click',function(){
  navigator.clipboard.readText()
                .then(texto => {
                  document.body.innerHTML = texto;
                    console.log('Texto pegado desde el portapapeles:', texto);
                })
                .catch(err => {
                    console.error('Error al pegar desde el portapapeles:', err);
                });
});

//formulario modal
let formContainer = document.getElementById('prompt-form-container');
let cancelButton = document.getElementById('cancel');
let searchForm = document.getElementById('prompt-form');

document.getElementById("buscar").addEventListener('click',()=>{
  formContainer.style.display = 'flex';
});

cancelButton.addEventListener('click', function() {
  formContainer.style.display = 'none';
});

searchForm.addEventListener('submit', function() {
  let searchTerm = document.getElementById('text').value.trim(); // Obtener el término de búsqueda

  let googleSearchUrl = 'https://www.google.com/search?q=' + encodeURIComponent(searchTerm);
  window.open(googleSearchUrl, '_blank');

  formContainer.style.display = 'none';
});
