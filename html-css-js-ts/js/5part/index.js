/*documento y carga de recursos*/

//Domcontentloaded, load y unload
document.addEventListener('DOMContentLoaded',()=>{
    console.log('carga despues de que este el DOM, sin incluir recursos (Img, Estilos, Etc)');
});

window.addEventListener('load',()=>{
    console.log('carga despues de que este el DOM, incluyendo recursos');
});

let analyticsData = {
     /* objeto con datos recopilados */ 
    };

window.addEventListener('unload',()=>{
    navigator.sendBeacon('/analytics',JSON.stringify(analyticsData));
});

//cargando y ejecutar funcion
function sumar(){
    console.log('sumando...');
}

if (document.readyState=='loading'){
    document.addEventListener('DOMContentLoaded',sumar);
}else{
    sumar()
}

//onload y onerror
let img =document.createElement("img");
img.src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Roblox_Logo_2022.jpg";

img.addEventListener('load',()=>{
    document.body.appendChild(img);
});

img.addEventListener('error',()=>{
    alert('error al cargar');
});
//animacion con js
let button=document.getElementById('btn');
let loaditem=document.getElementById('load');

button.addEventListener('click',()=>{
    button.firstChild.textContent='';
    loaditem.style.display='block';
    setTimeout(()=>{
        loaditem.style.display='none';
        button.firstChild.textContent='IR';
        let googleSearchUrl = 'https://www.roblox.com/home';
        window.open(googleSearchUrl, '_blank');
    },2000);
});