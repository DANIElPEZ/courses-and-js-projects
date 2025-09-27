/*impresion en pantalla*/
"use strict";//para navegadores antiguos
console.log('hola');

/*variables y constantes, tipos de datos, concatenacion*/
let name=0,name2=0;
let another="xd", nome=false, nulo=null,nodefinido;
const nombre=3.14;
let str=`aprendiendo js ${name}, ${nombre} con comillas invertidas`;
console.log(str,typeof(nome));

/*operadores aritmeticos, logicos y relacionales*/

//aritmetica
console.log(3+3);
console.log(3-3);
console.log(3*3);
console.log(3/3);
console.log(3%3);
console.log(3**3);
console.log(name++);
console.log(name2--);

//relacionales
console.log(3<3);
console.log(3>3);
console.log(3<=3);
console.log(3>=3);
console.log(3==3);
console.log(3!=3);
console.log('' == false); //distinto tipo de dato
console.log('' === false);//debe ser el mismo tipo de dato

//logicos
console.log(3<4 || 4>4);
console.log(3<4 && 4>4);
console.log(3<4 && !(4>4));

/*if-else, ?, switch, Nullish Coalescing conditional*/

//if-else
if(name==name2){
    console.log('the numbers are equal');
}else if(name!==name2){
    console.log('the numbers are different');
}else{
    console.log('rancio');
}

//?
let asw=name!==name2?'the numbers are equal':'the numbers are different';

//switch
switch(name2){
    case 0:
        console.log(0);
        break;
    case 1:
        console.log(1);
        break;
    default:
        console.log(3);
}

//Nullish Coalescing
let user;
console.log(user ?? "en caso de que sea valor nulo");

/*bucles while, do while, for, break y continue*/

//while loop
while(name2<9){
    console.log("imprime while");
    name2++;
}

//do while loop
do{
    console.log("imprime do while");
    name++;
}while(name<9);

//for loop
for(let i = 0; i<name2; i++){
    console.log("imprime for");
}

//break y continue
let numero=0;
while(numero<20){
    console.log(numero);
    if(numero==3){
        break;
    }
    numero++;
}

/*funciones, Expresiones de función, funciones flecha*/

//funciones
function sumar(number1,number2=2){//number2 valor por defecto
    let suma=number1+number2;
    return suma;
}

let result=sumar(3);
console.log(result);

//funciones de expresion
let square= function(numero){
    return numero**2;
};

console.log(square(3));

//funciones flecha con return y sin return
let arrow=(numero)=>{
    return numero+1;
};

console.log(arrow(3));

let arrow2=(numero)=>{
    console.log(numero+1);
};
arrow2(3);

/*objetos*/

//creando objeto
let dictionary={
    name:'jhon',
    age:20
};

//añadiendo, obteniendo y eliminando

//añadiendo
dictionary['lastname']='poo';

//obteniendo
console.log(`${dictionary.age}, ${'lastname' in dictionary}`);

//eliminando
delete dictionary.name;

//ciclo for iterando objeto
for (let item in dictionary) {
    console.log(item);
    
}

//this
let usuario={
    name:'juan',
    getname(){
        console.log(`usando this ${this.name}`);
    }
};

usuario.getname();

//creando con new
function Car(model,year){
    this.model=model;
    this.year=year;
}

let carro=new Car('5r',2019);
console.log(carro.model,carro.year);

//dato symbol
let id=Symbol('id');//evita colision de propiedades
let id2=Symbol('id');
let obj={
    [id]:'dato no visible'//datos no visibles
}
console.log(obj[id]);

/*tipos de datos*/

//numeros
let billion=1e9;//1000000000
let mcs=1e-6;//0.000001
let num=20.5;

console.log(num.toString(2));//base 2

//redondeo hacia abajo, arriba, mas cercano
console.log(Math.floor(3.9),Math.ceil(3.1),num.toFixed(2),(0.1+0.2).toFixed(3));

//parseo
console.log(parseInt('23px'),parseFloat('12.63'));

//random, min, max, potenciacion
console.log(Math.random(),Math.min(100,50),Math.max(100,50),Math.pow(2,3));

//string

//escape de comillas, longitud, posicion
console.log('txt\'mas texto\'','txt\'mas texto\''.length,'texto'.at(-2));

//iterando un string
for (const char of 'hola') {
    console.log(char);
}

//mayusculas, minusculas
console.log('texto'.toUpperCase(),'TEXto'.toLowerCase());

//arrays
let numbers=[0,3,2,4,1,5];
let matrix = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ];

//iterando array
for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix.length; j++) {
        console.log(matrix[i][j]);
    }
}

//comportamiento de pila
numbers.push(6);
console.log(numbers.length,numbers[1],numbers);
numbers.pop();
console.log(numbers.length,numbers);

//eliminando elemento
delete numbers.splice(0,1);

//ordenando, mapeando, filtrando, reduciendo (3 ultimos de programacion funcional), join
console.log(numbers.length,numbers.sort(),numbers.map(x=>x**2),numbers.filter(x=>x<3),numbers.reduce((sum,current)=>sum+current,0),numbers.join(','));

//maps

//creando mapa
let aircrafts=new Map();
aircrafts.set('b737',30000);
aircrafts.set('a320',20000)
        .set('a300b4',2000);

//obteniendo valor del mapa, tamaño
console.log(aircrafts.get('b737'),aircrafts.size);

//iterando mapa
for (let item of aircrafts) {
    console.log(item);
}

//mapa a objeto
let obj_arcraft=Object.fromEntries(aircrafts.entries());
console.log(obj_arcraft);

//objeto a mapa
let obj_cars={
    name: "John",
    age: 30
};

let map_cars=new Map(Object.entries(obj_cars));
console.log(map_cars);

//weakmap

//creando weakmap
//La primera diferencia con Map es que en WeakMap las claves deben ser objetos, no valores primitivos
let wkmap=new WeakMap();

//añadiendo
let obj_wkmap={name: "John"};

wkmap.set(obj_wkmap,'visitante');
console.log(wkmap.get(obj_wkmap));

obj_wkmap=null;//jhon deja la pagina, con weakmap evita fuga de memoria

//desempaquetado array
let arr=["John", "Smith"];

let [nombreuser,apellidouser]=arr;
console.log(nombreuser,apellidouser);

//desempaquetado de objetos
let persona = {
    name: "John",
    age: 30
};

let {persona_name,persona_age}=persona;
console.log(persona_name,persona_age)

// recorrer claves-y-valores
for (let [key, value] of Object.entries(persona)) {
    console.log(`${key}:${value}`); 
}

//fechas
let today=new Date();
console.log(today.getFullYear(),today.getDate());
console.log(today.getUTCHours());

//json

//objeto a json
let student = {
    name: 'John',
    age: 30,
    isAdmin: false,
    courses: ['html', 'css', 'js'],
    spouse: null
};

let json=JSON.stringify(student);
console.log(json);

//Excluyendo y transformando: sustituto
let room = {
    number: 23
};

let meetup = {
    title: "Conference",
    participants: [
        {name: "John"}, 
        {name: "Alice"}
    ],
    place: room // meetup hace referencia a room
};

room.occupiedBy = meetup; // room hace referencia a meetup

console.log( JSON.stringify(meetup, ['title', 'participants','place', 'name', 'number']) );

//json a objeto
let obj_json=JSON.parse(json);
console.log(obj_json);

//parseando fecha
let meet = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';

let reunion = JSON.parse(meet, function(key, value) {
    if (key == 'date') return new Date(value);
    return value;
});

console.log(reunion.date.getDate());

/*try-catch-throw*/
let upnumber="4";
let downnumber=2;
try{
    if(typeof(upnumber)!==typeof(downnumber)) 
        throw new SyntaxError('tipado distinto');
    console.log(upnumber*downnumber);
}catch(e){
    console.log(e,'xd');
}