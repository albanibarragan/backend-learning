console.log("Hola desde Node");

const nombre = "Albani";
const edad = 25;

console.log(`Mi nombre es ${nombre} y tengo ${edad} años`);

const { sumar, restar } = require("./matematicas");

console.log(sumar(5, 3));
console.log(restar(5, 3));