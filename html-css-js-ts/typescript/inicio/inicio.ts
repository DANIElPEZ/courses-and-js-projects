//variables basicas
let texto: string = "texto";
let numero: number = 42;
let booleano: boolean = true;
let nulo: null;
let indefinido: undefined | string;
let something: any = "cualquier valor";
console.log(texto, numero, booleano, indefinido, something);
something = 123;
indefinido = "indefinido";
console.log(something, indefinido);

//variables compuestas
let arreglo: number[] = [1, 2, 3];
let arreglomix: any[] = [1, "dos", true];
let tupla: [number, string] = [1, "dos"];
enum Dias {
     Lunes,
     Martes,
     Miercoles,
     Jueves,
     Viernes,
     Sabado,
     Domingo,
}
let dia: Dias = Dias.Lunes;
console.log(arreglo, arreglomix, tupla, dia, Dias[dia]);
let objeto: { clave: string; valor: number } = { clave: "clave", valor: 100 };

//funciones
function suma(a?: number, b: number = 3): number {
     if (a === undefined) {
          return b; //parametro opcional
     }
     return a + b; //parametro a defecto
}
console.log(suma(5, 10), suma(3));

function sumatoria(...numeros: number[]): number {
     return numeros.reduce(
          (acumulador, valorActual) => acumulador + valorActual,
          0
     );
}
console.log(sumatoria(1, 2, 3, 4, 5));

//interfaces
interface Usuario {
     nombre: string;
     readonly edad: number;
     activo?: boolean; //propiedad opcional
}

let usuarios: Array<Usuario> = [
     {
          nombre: "Juan",
          edad: 30,
          activo: true,
     },
     {
          nombre: "Ana",
          edad: 25,
     },
     {
          nombre: "Luis",
          edad: 40,
          activo: false,
     },
];
console.log(usuarios);

interface empleado extends Usuario {
     puesto: string;
}

let empleado: empleado = {
     nombre: "Carlos",
     edad:35,
     puesto: "Desarrollador"
};
console.log(empleado);

//clases
class Persona {
     public name: string;
     private age: number;

     constructor(name: string, age: number) {
          this.name = name;
          this.age = age;
     }

     //metodo
     public saludar(): string {
          return `Hola, mi nombre es ${this.name} y tengo ${this.age} años.`;
     }
}

let persona: Persona= new Persona("María", 28);
console.log(persona.saludar());

class Empleado extends Persona {
     public puesto: string;
     constructor(name: string, age: number, puesto: string) {
          super(name, age);
          this.puesto = puesto;
     }

     public registrar(): string {
          return `${this.saludar()} Trabajo como ${this.puesto}.`;
     }
}

let empleado2: Empleado = new Empleado("Pedro", 32, "Ingeniero");
console.log(empleado2.registrar());

//valores genericos
function imprimir<g>(valor: g): g {
     return valor;
}
console.log(imprimir<string>("Hola, TypeScript!"));
console.log(imprimir<number>(123));