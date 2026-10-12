const { add, subtract, divide, multiply  } = require("./calculadora");
console.log(add(5, 3));
console.log(subtract(5, 3));
console.log(divide(5, 3));
console.log(multiply(5, 3));
try {
  dividir(5, 0); // aquí se lanza el error
  console.log("esto tampoco se ejecuta"); // el throw ya cortó la ejecución
} catch (error) {
  console.log("Ocurrió un error:", error.message); // aquí "aterriza" el error
}
console.log("esto sí se ejecuta, el programa sigue vivo");