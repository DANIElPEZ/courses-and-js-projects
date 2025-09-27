var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
//variables basicas
var texto = "texto";
var numero = 42;
var booleano = true;
var nulo;
var indefinido;
var something = "cualquier valor";
console.log(texto, numero, booleano, indefinido, something);
something = 123;
indefinido = "indefinido";
console.log(something, indefinido);
//variables compuestas
var arreglo = [1, 2, 3];
var arreglomix = [1, "dos", true];
var tupla = [1, "dos"];
var Dias;
(function (Dias) {
    Dias[Dias["Lunes"] = 0] = "Lunes";
    Dias[Dias["Martes"] = 1] = "Martes";
    Dias[Dias["Miercoles"] = 2] = "Miercoles";
    Dias[Dias["Jueves"] = 3] = "Jueves";
    Dias[Dias["Viernes"] = 4] = "Viernes";
    Dias[Dias["Sabado"] = 5] = "Sabado";
    Dias[Dias["Domingo"] = 6] = "Domingo";
})(Dias || (Dias = {}));
var dia = Dias.Lunes;
console.log(arreglo, arreglomix, tupla, dia, Dias[dia]);
var objeto = { clave: "clave", valor: 100 };
//funciones
function suma(a, b) {
    if (b === void 0) { b = 3; }
    if (a === undefined) {
        return b; //parametro opcional
    }
    return a + b; //parametro a defecto
}
console.log(suma(5, 10), suma(3));
function sumatoria() {
    var numeros = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        numeros[_i] = arguments[_i];
    }
    return numeros.reduce(function (acumulador, valorActual) { return acumulador + valorActual; }, 0);
}
console.log(sumatoria(1, 2, 3, 4, 5));
var usuarios = [
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
var empleado = {
    nombre: "Carlos",
    edad: 35,
    puesto: "Desarrollador"
};
console.log(empleado);
//clases
var Persona = /** @class */ (function () {
    function Persona(name, age) {
        this.name = name;
        this.age = age;
    }
    //metodo
    Persona.prototype.saludar = function () {
        return "Hola, mi nombre es ".concat(this.name, " y tengo ").concat(this.age, " a\u00F1os.");
    };
    return Persona;
}());
var persona = new Persona("María", 28);
console.log(persona.saludar());
var Empleado = /** @class */ (function (_super) {
    __extends(Empleado, _super);
    function Empleado(name, age, puesto) {
        var _this = _super.call(this, name, age) || this;
        _this.puesto = puesto;
        return _this;
    }
    Empleado.prototype.registrar = function () {
        return "".concat(this.saludar(), " Trabajo como ").concat(this.puesto, ".");
    };
    return Empleado;
}(Persona));
var empleado2 = new Empleado("Pedro", 32, "Ingeniero");
console.log(empleado2.registrar());
//valores genericos
function imprimir(valor) {
    return valor;
}
console.log(imprimir("Hola, TypeScript!"));
console.log(imprimir(123));
