/*documento*/

//selectores
//id
let elemento=document.getElementById('elemento');

elemento.style.backgroundColor='red'

//All
let li=document.querySelectorAll('ul > li:last-child');

for (const item of li) {
    console.log(item.innerHTML);
}

//selector className
let ul=document.querySelector('.cl');
ul.style.backgroundColor='#48e';

//crear elemento
let div = document.createElement('div');
div.className = "alert";
div.innerHTML = "<strong>¡Hola!</strong> Usted ha leído un importante mensaje.";

document.body.append(div);

div.insertAdjacentHTML('beforebegin', '<p>Hola</p>');

/*eventos*/
let show=true;
elemento.addEventListener('click',()=>{
    if(show){
        div.style.display='none';
        show=false;
    }else{
        div.style.display='block';
        show=true;
    }
    
});

let btn=document.getElementById('boton');

class Menu {
    handleEvent(event) {
        switch(event.type) {
        case 'mousedown':
            btn.innerHTML = "Botón del mouse presionado";
            break;
        case 'mouseup':
            btn.innerHTML += "...y soltado.";
            break;
        }
    }
}

let menu = new Menu();

btn.addEventListener('mousedown', menu);
btn.addEventListener('mouseup', menu);

//repeticion de eventos
let tabla=document.getElementById('bagua-table');

let selectedTd;

tabla.onclick = function(event) {
  let target = event.target; // ¿dónde fue el clic?

  if (target.tagName != 'TD') return; // ¿no es un TD? No nos interesa

  highlight(target); // destacarlo
};

function highlight(td) {
    if (selectedTd) { // quitar cualquier celda destacada que hubiera antes
        selectedTd.classList.remove('highlight');
    }
    selectedTd = td;
    selectedTd.classList.add('highlight'); // y destacar el nuevo td
}