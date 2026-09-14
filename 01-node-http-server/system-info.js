import os from 'node:os';
import ms from 'ms';

// Obtener información del sistema operativo
console.log('Sistema operativo:', os.type());
console.log('Versión del sistema operativo:', os.release());
console.log('Arquitectura del sistema operativo:', os.arch());
console.log('Número de CPUs:', os.cpus().length);
// Obtener información de la memoria
console.log('Memoria total (bytes):', os.totalmem());
console.log('Memoria libre (bytes):', os.freemem());
console.log("tiempo de actividad del sistema (segundos):", ms(os.uptime() * 1000, {long: true})); // Convertir a milisegundos y luego a formato legibles
