/*funciones avanzado*/

//recursion
function pow(x,n){
    if(n==1){
        return x;
    }else{
        return x*pow(x,n-1);
    }
}

console.log(pow(2,3));

//parametros rest
function suma(txt,...values){
    let total=0;

    for (let value of values) total+=value;

    return total+txt;
}

console.log(suma(' $', 2,3,4,5,6,7,8,9,9,3,3,3,3 ));

//closure o referencia al entorno lexico
function makeCounter() {
    let count = 0;

    return function() {
        return count++;
    };
}

let counter = makeCounter();
counter();//si la llama incrementa count
console.log(counter());

counter=null;//limpiar memoria

//setTimeout y setInterval

//settimeout
function sayHi(param_1){
    console.log(`1 ${param_1}`);
}

let timerid=setTimeout(sayHi,1000,'py');
clearTimeout(timerid);//calcelar la funcion

//setitmeout anidado
let timeid=setTimeout(function word(){
    console.log('word');
    clearInterval(timeid,2000);
}, 2000);

//set interval
function print(txt){
    console.log(txt);
}

let intervalid=setInterval(print,1000,'texto');

setTimeout(()=>clearInterval(intervalid),5000);

//decoradores
function slow(x){
    return x**x;
}

function decorator(func){
    let cache = new Map();

    return function(x){
        if(cache.has(x)) return cache.get(x);

        let result=func(x);//decorando funcion

        cache.set(x,result);
        return result;
    };
}

slow=decorator(slow);

console.log( 'devuelto',slow(1) );

//decoradores con objetos
let worker = {
    slow(x) {
      return x * 2;
    }
};

function cachingDecorator(func) {

    let cache = new Map();

    return function(x) {
        if (cache.has(x)) return cache.get(x);

        let result = func.call(this, x);

        cache.set(x, result);

        return result;
    };
}

worker.slow = cachingDecorator(worker.slow);

console.log('devuelto obj decorator',worker.slow(4));

//evitar perdida del this
let user = {
    firstName: "John",
    sayHi() {
        console.log(`Hello, ${this.firstName}!`);
    }
};

let hola = user.sayHi.bind(user);

setTimeout(hola, 1000);

/*propiedades de objetos*/

//descriptor de propiedad
let aircraft={
    model:'A'
};

let descriptor=Object.getOwnPropertyDescriptor(aircraft,'model');
console.log(descriptor);

//definir propiedad
Object.defineProperty(aircraft,'model',{
    writable:false,
    enumerable:false
});

//getter y setter
const _name = Symbol('name');
const _surname = Symbol('surname');

let person = {
    [_name]: "John",
    [_surname]: "Smith",
    get name(){
        return this[_name]+this[_surname];
    },
    set name(name){
        this[_name], this[_surname]=name.split(" ")
    }
};

console.log(person.name);
person.name='andres gu'

/*clases*/

//clase
class User{
    //atributos
    nombre;
    #clave='0';//privado
    //constructor
    constructor(name,id){
        this.nombre=name;
        this.#clave+=id;
    }
    //funcion
    show(text){
        return `${this.nombre} ${text}`;
    }
    //getter
    get name(){
        return this.#clave;
    }
    //setter
    set name(id){
        this.#clave=id;
    }
}

let pe=new User('juan','323134');
console.log(pe.name);

//herencia
class Animal {
    constructor(name,sound) {
        this.sound = sound;
        this.name = name;
    }
    sonido() {
        console.log(`${this.name} hace ${this.sound}.`);
    }
}

class perro extends Animal{
    constructor(name,sound){
        super(name,sound);
    }
}

let perrito=new perro('jaja','gueu guevon');
perrito.sonido();

//metodos estaticos
/*
-Estos metodos se acceden sin instancia de clase es decir
nombre_de_la_clase.nombre_del_metodo.

-solo se puede acceder a stributos y metodos que sean estaticos.

-estos metodos estan relacionados con la clase.
*/
class Article {
    static publisher = "Ilya Kantor";

    static show() {
        console.log(this.publisher);
    }
}

Article.show();

/*promesas y async/await*/

//cargar scripts
function loadScript(src) {
    return new Promise((resolve, reject) => {
        let script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve(script);
        script.onerror = () => reject(new Error(`Failed to load script ${src}`));
        document.head.append(script);
    });
}

loadScript("/incorrect/path/to/one.js") // Intencionadamente incorrecto para probar el manejo de errores
    .then(script1 => {
        console.log('Script loaded:', script1);
    })
    .catch(error => {
        console.error('Catch block error:', error);
    });

//ejemplo con fetch
let promise = fetch('https://reflex.dev');

promise.then(function(response) {
    // response.text() devuelve una nueva promesa que se resuelve con el texto de respuesta completo
    return response.text();
}).then(function(text) {
    console.log(text);
});

//manejo de errores
new Promise((resolve, reject) => {
    resolve("ok");
}).then((result) => {
    blabla(); // Función inexistente
}).catch(console.log('errorrrrrr'));

//async/await
async function insertar(){
    let promise=new Promise((resolve,reject)=>{
        setTimeout(()=>resolve("listo"),1000)
    });

    let asw=await promise;

    console.log(asw);
}

insertar();