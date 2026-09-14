Instalar Node.js y gestionar versiones
En esta clase vamos a ver cómo instalar Node.js correctamente y, más importante aún, cómo gestionar múltiples versiones sin romper proyectos ni volvernos locos.

Instalar Node.js no es solo descargar un instalador y darle a “siguiente”. Si quieres trabajar en equipo y en proyectos reales, hay una forma profesional de hacerlo.

Dónde descargar Node.js
Si vas a la página oficial de Node.js, verás varias opciones de instalación según tu sistema operativo:

Windows (.msi)
macOS (.pkg)
Linux (binarios)
Aunque existe la opción de descargar un instalador clásico, esta no es la forma recomendada para trabajar en proyectos profesionales.

¿Por qué evitar el instalador clásico?
Versión única: Te obliga a tener una sola versión de Node.js instalada globalmente.
Dificultad de cambio: Cambiar de versión es complicado y requiere desinstalar e instalar de nuevo.
Problemas en equipo: Diferentes proyectos pueden requerir versiones distintas.
Conflictos: Proyectos antiguos pueden romperse si actualizas Node.js globalmente.
La forma correcta: usar un gestor de versiones
La forma recomendada de instalar Node.js es usando un gestor de versiones. Un gestor te permite:

✅ Tener varias versiones de Node.js instaladas simultáneamente.
✅ Cambiar de versión en segundos.
✅ Usar una versión distinta según el proyecto.
✅ Evitar conflictos entre entornos.
LTS vs Current: ¿Qué versión usar?
Antes de instalar nada, es vital entender las versiones disponibles:

LTS (Long Term Support):
Versión estable y con soporte extendido.
Mayor compatibilidad con el ecosistema.
Recomendada para producción y el día a día.
Current:
Versión más reciente con las últimas novedades.
Puede contener APIs experimentales.
Ideal para probar funciones nuevas, pero no para producción.
Consejo: Si tienes dudas, usa siempre la versión LTS.

FNM: Fast Node Manager
Existen varios gestores de versiones populares como nvm, n, o mise. En esta clase usamos FNM (Fast Node Manager) porque:

🚀 Es extremadamente rápido (escrito en Rust).
💻 Es multiplataforma (funciona igual en macOS, Windows y Linux).
🛠️ Es sencillo de configurar y usar.
Instalar FNM
Para instalar FNM, sigue las instrucciones de su repositorio oficial. Generalmente, basta con ejecutar un script en tu terminal.

Una vez instalado, recuerda:

Reiniciar tu terminal (o abrir una nueva pestaña).
Verificar que funciona ejecutando:
fnm --version

Copiar
Comandos esenciales de FNM
Aquí tienes los comandos que más utilizarás:

1. Instalar la versión LTS
No necesitas saber el número de versión, FNM lo busca por ti:

fnm install --lts

Copiar
2. Listar versiones instaladas
Para ver qué versiones tienes en tu equipo y cuál estás usando:

fnm list

Copiar
3. Cambiar de versión
Si necesitas una versión específica (por ejemplo, la 20):

fnm use 20

Copiar
4. Establecer una versión por defecto
Para que cada nueva terminal use siempre una versión concreta:

fnm default 20

Copiar
5. Desinstalar versiones antiguas
Mantén tu entorno limpio borrando lo que ya no usas:

fnm uninstall 18

Copiar
Para terminar…
Instalar Node.js de forma profesional es el primer paso para un flujo de trabajo sólido en el backend:

Nunca dependas de instaladores manuales.
Utiliza siempre un gestor de versiones (como fnm o nvm).
Prioriza la versión LTS para tus proyectos.
¡Con esto ya tienes Node.js configurado correctamente y estamos listos para empezar con Express!

Ficheros y sistema de módulos en Node.js
En esta clase damos el primer paso real trabajando con Node.js: crear archivos, ejecutarlos desde la terminal y entender cómo funciona su sistema de módulos, que es uno de los puntos donde más confusión suele haber al venir del frontend.

Creando el primer fichero en Node.js
Partimos de una carpeta vacía. No hay configuración, no hay magia. Creamos nuestro primer archivo: index.js.

Dentro escribimos el clásico Hello World y lo ejecutamos desde la terminal:

// index.js
console.log('¡Hola mundo desde Node.js!')

Copiar
Ejecutamos en la terminal:

node index.js

Copiar
Si vemos el mensaje por consola, ya sabemos dos cosas importantes:

Node.js está correctamente instalado.
Estamos usando la versión adecuada.
Dividir el código en ficheros
Igual que en frontend, no queremos tener todo en un solo archivo. Vamos a separar la lógica. Por ejemplo, vamos a crear un archivo para funciones matemáticas.

1. Creamos math.js
// math.js
export function sumar(a, b) {
  return a + b
}
export function restar(a, b) {
  return a - b
}

Copiar
2. Intentamos usarlo en index.js
// index.js
import { sumar } from './math'
console.log(sumar(5, 5))

Copiar
El error más común al importar módulos
Aunque el código parece correcto, Node.js lanzará un error diciendo que no encuentra el módulo si olvidas la extensión. ¿El motivo?

En Node.js, la extensión del fichero es obligatoria.

Nota importante: En el frontend, gracias a herramientas como Vite o Webpack, la extensión suele ser opcional porque el empaquetador la busca por ti. En Node.js, en tiempo de ejecución (runtime), no lo es.

Si el archivo se llama math.js, tienes que importar explícitamente ./math.js. Node.js no pierde tiempo intentando “adivinar” si buscas un .js, .json o una carpeta; busca exactamente lo que le pides.

Runtime vs Build time
Esta diferencia es fundamental para entender por qué Node.js es más estricto:

Concepto	Entorno	Comportamiento
Runtime	Node.js	El código se ejecuta directamente. Debe ser explícito.
Build time	Frontend	Un “empaquetador” procesa el código antes de enviarlo al navegador.
¿Y la advertencia?
Una vez solucionado el problema de añadir la extensión, Node.js nos mostrará una advertencia:

(node:12345) Warning: To load an ES module, set "type": "module" in the package.json or use the .mjs extension.

Copiar
Esta advertencia nos indica que debemos configurar nuestro proyecto para usar ES Modules.

Según la versión que estés usando es posible que sea un error y el programa no se ejecute o sea simplemente una advertencia (aunque te dirá que puede haber problemas de rendimiento). ¿Por qué pasa esto?

Porque Node.js no usa ES Modules por defecto, sino que usa CommonJS.

El pasado: CommonJS
Antes de que existiera un estándar oficial de módulos en JavaScript (ES Modules), Node.js creó su propio sistema llamado CommonJS. Todavía lo verás en muchos proyectos antiguos o librerías de npm.

Ejemplo en CommonJS:
// math.js (Estilo antiguo)
function sumar(a, b) {
  return a + b
}
module.exports = { sumar }

Copiar
// index.js (Estilo antiguo)
const { sumar } = require('./math') // Aquí la extensión solía ser opcional
console.log(sumar(5, 5))

Copiar
¿Por qué no se recomienda hoy en día? “CommonJS es un sistema síncrono y pensado originalmente para servidores, lo que lo hace incompatible con el estándar actual de la web. ES Modules es el estándar oficial de JavaScript, permite el ‘tree-shaking’ (eliminar código que no usas) y es compatible tanto con el navegador como con Node.js moderno.”

El presente: ES Modules
Es el estándar que usamos hoy en día (import / export). Para que Node.js sepa que queremos usarlo, debemos configurar nuestro proyecto.

Configurando el tipo de módulo
Debemos crear un archivo package.json en la raíz de nuestro proyecto:

// package.json
{
  "type": "module"
}

Copiar
Con esta propiedad "type": "module", Node.js:

Deja de mostrar advertencias.
Activa el soporte completo para import y export.
Nos permite usar el estándar moderno de la industria.
Antes de acabar…
Entender el sistema de módulos es vital para no frustrarse con errores de “módulo no encontrado” o advertencias extrañas en la terminal.

✅ Ejecutamos con node nombre-archivo.js.
✅ La extensión .js es obligatoria en los imports de ES Modules.
✅ Usamos "type": "module" en el package.json para trabajar con la sintaxis moderna.
En la siguiente clase ya empezamos a construir cosas más interesantes sobre esta base sólida.

Nuestro primer script con Node.js: leer y escribir archivos
Hasta ahora ya hemos ejecutado Node.js y entendido su sistema de módulos. En esta clase damos un paso clave: crear nuestro primer script real, interactuando directamente con el sistema operativo.

Vamos a ver por qué Node.js es tan potente para tareas de scripting y automatización.

Los módulos nativos de Node.js
Una de las grandes ventajas de Node.js es que incluye módulos nativos que nos permiten interactuar con el sistema sin necesidad de instalar librerías externas:

📂 Sistema de archivos (node:fs)
📁 Carpetas (node:fs)
🌐 Red (node:http, node:https, node:net)
⚙️ Procesos (node:process)
⌨️ Entrada y salida (node:readline)
En esta clase nos centramos en el módulo fs (File System), concretamente en su versión basada en promesas.

Leer archivos del sistema
Vamos a crear un script que lea el contenido de un archivo de texto. Para ello usamos el módulo nativo de Node.js:

import { readFile } from 'node:fs/promises'

Copiar
Este módulo nos permite leer archivos de forma asíncrona y sencilla.

Leer un archivo de texto
Al leer un archivo, es importante indicar la codificación para no recibir un buffer binario (ceros y unos que Node.js no sabe cómo interpretar como texto):

const content = await readFile('./archivo.txt', 'utf-8')
console.log(content)

Copiar
De esta forma obtenemos directamente el texto legible del archivo.

Cuidado: acceso total al sistema Node.js puede leer cualquier archivo del sistema si tiene permisos. Esto es muy potente, pero también peligroso: puedes acceder a cualquier ruta o leer información sensible. Más adelante veremos cómo limitar esto usando el sistema de permisos de Node.js.

Escribir archivos con Node.js
Una vez leído el contenido, podemos transformarlo y guardarlo en un nuevo archivo. Por ejemplo, vamos a convertir todo el texto a mayúsculas y escribirlo en un archivo diferente:

import { writeFile } from 'node:fs/promises'
const upperContent = content.toUpperCase()
await writeFile('./archivo-uppercase.txt', upperContent)

Copiar
Este método crea un nuevo archivo automáticamente si no existe, o sobrescribe el contenido si ya existía.

Crear carpetas de forma recursiva
Node.js también permite crear carpetas, incluso estructuras completas de directorios en una sola línea. Usamos mkdir con la opción recursive:

import { mkdir } from 'node:fs/promises'
await mkdir('output/files/documents', { recursive: true })

Copiar
Si la carpeta no existe, Node.js la crea junto con todas sus carpetas padre.

Escribir archivos dentro de carpetas creadas
Una vez creada la estructura, podemos guardar archivos directamente dentro:

await writeFile('output/files/documents/archivo-uppercase.txt', upperContent)

Copiar
El flujo completo queda claro:

Leemos un archivo.
Transformamos su contenido.
Creamos carpetas si no existen.
Guardamos el resultado en una nueva ubicación.
Por qué Node.js es ideal para scripts
Este tipo de programas muestran el verdadero poder de Node.js más allá de crear servidores web:

🛠️ Scripts de transformación de archivos.
🤖 Automatizaciones de tareas repetitivas.
📊 Procesamiento de datos.
📝 Generadores de contenido.
🔧 Herramientas internas y CLIs.
No solo Python sirve para scripting. Node.js es igual de versátil y muy cómodo si ya dominas JavaScript.

¡Lo aprendido en esta clase!
En esta clase has aprendido a:

✅ Usar módulos nativos de Node.js (con el prefijo node:).
✅ Leer archivos de forma asíncrona con promesas.
✅ Escribir archivos nuevos y transformar contenido.
✅ Crear carpetas recursivas con mkdir.
✅ Entender por qué Node.js es una herramienta excelente para scripting.
Este es el primer paso para usar Node.js más allá del navegador. En la siguiente clase seguiremos profundizando en Node.js y sentaremos las bases para empezar a construir un backend de verdad.

Trabajar con rutas de archivos en Node.js
Cuando trabajamos con archivos en Node.js es muy fácil cometer un error clásico: asumir que todas las rutas funcionan igual en todos los sistemas operativos.

Y no, no es así.

En esta clase vamos a ver cómo trabajar correctamente con rutas de archivos usando el módulo nativo node:path, evitando bugs y haciendo nuestro código realmente multiplataforma.

El problema con las rutas según el sistema operativo
Dependiendo de dónde se ejecute tu código, la forma de escribir una ruta cambia:

🐧 Linux y macOS: Usan la barra inclinada (forward slash) /. Ejemplo: carpeta/archivo.txt.
🪟 Windows: Usa la barra invertida (backslash) \. Ejemplo: carpeta\archivo.txt.
Si concatenas rutas manualmente usando strings, como por ejemplo:

const filePath = 'output/' + fileName

Copiar
Este código:

✅ Funciona perfectamente en macOS y Linux.
❌ Puede fallar en Windows, o generar rutas inconsistentes que causen errores difíciles de depurar.
La solución: el módulo node:path
Node.js incluye un módulo nativo llamado path que se encarga de gestionar estas diferencias por ti. Al usarlo, te aseguras de que:

No necesitas hacer comprobaciones manuales de sistema operativo (if (os === 'windows') ...).
No tienes que preocuparte por si falta o sobra una barra.
Tu código es 100% multiplataforma.
path.join: Concatenar rutas correctamente
La función path.join permite unir diferentes segmentos de una ruta (carpetas y archivos) de forma segura.

import path from 'node:path'
const outputDir = path.join('output', 'files')
console.log(outputDir)

Copiar
¿Qué hace Node.js aquí?

Detecta el sistema operativo actual.
Une los trozos usando / o \ según corresponda.
Normaliza la ruta (elimina barras duplicadas, por ejemplo).
Usar join para archivos finales
También puedes usar join para crear la ruta completa a un archivo y usarla directamente en operaciones de lectura o escritura:

import path from 'node:path'
import { writeFile } from 'node:fs/promises'
const filePath = path.join('output', 'files', 'archivo.txt')
// Ahora podemos usar esa ruta con total seguridad
await writeFile(filePath, 'Contenido del archivo')

Copiar
Resultado: un código más limpio, más seguro y más resiliente.

Obtener información de archivos con path
El módulo path no solo sirve para crear rutas, también tiene utilidades muy potentes para extraer información de una ruta ya existente.

path.basename: El nombre del archivo
Si tienes una ruta completa y solo quieres el nombre del archivo, usa basename:

const fullPath = '/home/user/documents/reporte.pdf'
const fileName = path.basename(fullPath)
console.log(fileName) // "reporte.pdf"

Copiar
Tip: No intentes usar .split('/') para esto. Es frágil y fallará si la ruta usa el separador de Windows.

path.extname: La extensión del archivo
extname te devuelve la extensión del archivo, incluyendo el punto:

const extension = path.extname('imagen.png')
console.log(extension) // ".png"

Copiar
Esto es ideal para:

✅ Validar si un archivo es del tipo correcto (ej: .jpg, .png).
✅ Procesar ficheros de forma distinta según su formato.
✅ Evitar errores con nombres de archivos complejos (como archivo.v1.backup.tar.gz).
Resumen de buenas prácticas
Usando path.join, basename y extname consigues:

🧼 Código más limpio: Menos manipulación manual de strings.
🐛 Menos errores: Node se encarga de los separadores de ruta.
🌍 Compatibilidad total: Tu script funcionará igual en el servidor Linux de producción que en tu portátil Windows de desarrollo.
🛠️ Mantenibilidad: Es el estándar profesional de la industria.
Conclusión: Si trabajas con archivos en Node.js, nunca concatenes rutas a mano. Usa siempre el módulo node:path.

En la siguiente clase seguiremos profundizando en cómo obtener metadatos más avanzados de los archivos, como su tamaño o fecha de creación.

← Anterior
Examen: Gestión de Versiones y Módulos
Si

Información del sistema operativo e instalación de paquetes
En esta clase damos un paso importante en Node.js: acceder a información real del sistema operativo y aprender cómo instalar paquetes externos cuando la funcionalidad nativa no es suficiente.

Esto es clave para crear scripts robustos, herramientas de terminal y aplicaciones backend que necesiten conocer el entorno donde se ejecutan.

El módulo nativo node:os
Node.js incluye un módulo nativo llamado os que nos permite acceder a información detallada del sistema operativo. Para importarlo correctamente, seguimos la recomendación de usar el prefijo node::

import os from 'node:os'

Copiar
Nota importante: El prefijo node: no es estrictamente obligatorio en versiones recientes, pero es muy recomendable. Garantiza que estás importando un módulo nativo de Node.js y evita conflictos si en el futuro instalas una dependencia externa que se llame igual.

Qué información podemos obtener
Con el módulo os podemos acceder fácilmente a datos técnicos de la máquina:

💻 Sistema: Tipo de sistema operativo (os.type()).
🏗️ Arquitectura: Si es x64, arm64, etc. (os.arch()).
🧠 Memoria: Memoria total y libre en bytes (os.totalmem(), os.freemem()).
🏠 Home: El directorio principal del usuario actual (os.homedir()).
⏱️ Uptime: Cuánto tiempo lleva encendido el sistema en segundos (os.uptime()).
🚀 CPUs: Información de los núcleos y su velocidad (os.cpus()).
Ejemplo práctico: script systeminfo.js
Vamos a crear un script sencillo que muestre un resumen de nuestro sistema:

import os from 'node:os'
console.log('Sistema:', os.type())
console.log('Plataforma:', os.platform())
console.log('Arquitectura:', os.arch())
console.log('Memoria total:', (os.totalmem() / 1024 / 1024 / 1024).toFixed(2), 'GB')
console.log('Memoria libre:', (os.freemem() / 1024 / 1024 / 1024).toFixed(2), 'GB')
console.log('Home:', os.homedir())
console.log('Uptime:', os.uptime(), 'segundos')

Copiar
Al ejecutarlo con node systeminfo.js, verás los datos reales de tu máquina.

El problema de la legibilidad
Si observas el os.uptime(), verás que nos devuelve un número enorme de segundos. Por ejemplo: 117000. Esto es difícil de interpretar para un humano.

Podríamos hacer cálculos matemáticos para convertirlo a días, horas y minutos, pero… ¿para qué reinventar la rueda? Aquí es donde entra la potencia del ecosistema de Node.js.

Instalando paquetes externos
Cuando la funcionalidad nativa de Node.js no es suficiente o queremos ahorrar tiempo, podemos instalar paquetes desde el registro de npm.

Para este ejemplo, usaremos un paquete muy popular llamado ms (creado por Vercel), que convierte milisegundos en formatos de texto legibles.

Cómo instalar una dependencia
En este proyecto utilizamos pnpm, así que para instalarlo ejecutamos:

pnpm add ms

Copiar
Este comando realiza tres acciones fundamentales:

📥 Descarga el código: Lo guarda en la carpeta node_modules.
📝 Actualiza el package.json: Añade ms a la lista de dependencies.
🔒 Genera el lockfile: Crea o actualiza el archivo de bloqueo para asegurar que todos usemos la misma versión exacta.
Tip: node_modules es la carpeta donde vive el código de todas tus dependencias. Nunca debes editarla manualmente y, por lo general, siempre debe estar en tu .gitignore.

Usando el paquete ms
Una vez instalada, podemos importar la librería y usarla para mejorar nuestro script:

import os from 'node:os'
import ms from 'ms'
// Convertimos el uptime (segundos) a milisegundos
const uptimeInMs = os.uptime() * 1000
// Formato corto
console.log('Uptime corto:', ms(uptimeInMs)) // Ejemplo: "1d"
// Formato largo
console.log('Uptime largo:', ms(uptimeInMs, { long: true })) // Ejemplo: "1 day"

Copiar
Por qué usar dependencias externas
Instalar dependencias nos permite:

🧼 Código más limpio: Delegamos tareas complejas a librerías especializadas.
⚡ Productividad: Aprovechamos soluciones que ya han sido probadas por miles de desarrolladores.
🛠️ Mantenibilidad: Es más fácil leer ms(time) que un bloque de lógica matemática personalizada.
Resumen de la clase
En esta lección hemos sentado las bases para trabajar profesionalmente con Node.js:

✅ Módulos nativos: Usamos node:os para conocer el hardware y el sistema.
✅ Prefijo node:: Una buena práctica para evitar conflictos de nombres.
✅ Gestión de paquetes: Aprendimos a instalar dependencias externas con pnpm.
✅ Ecosistema: Entendimos el papel de node_modules y la importancia de no “reinventar la rueda”.
¡Ya estamos listos para empezar a construir nuestro primer servidor web real!

Importante al instalar cualquier paquete en Node.js
Cuando instalas un paquete en Node.js no solo se descarga una dependencia y ya está. Ocurren varias cosas importantes que conviene entender bien, porque aquí nacen muchos bugs, sustos y problemas de seguridad.

En esta clase vamos a ver qué pasa realmente al instalar un paquete, cómo funcionan las versiones y por qué ese símbolo que aparece en el package.json no está ahí por casualidad.

Qué archivos se modifican al instalar un paquete
Cuando ejecutas un pnpm add (o npm install), pasan tres cosas clave:

📝 Se actualiza el package.json: Describe qué necesita tu proyecto para funcionar.
🔒 Se genera o modifica el lockfile (pnpm-lock.yaml o package-lock.json): Es una foto exacta de las versiones concretas que se han instalado.
📥 Se descargan las dependencias en node_modules: Contiene el código real que se importa cuando usas una dependencia.
Recuerda: node_modules es donde vive el código físico, pero package.json es el mapa que dice qué debe haber ahí.

De dónde salen las dependencias al hacer un import
Cuando haces un import de un paquete, Node.js no va a internet ni a npm. Lo que hace es:

Buscar en la carpeta node_modules.
Cargar la versión que esté instalada ahí.
Por eso es tan importante entender qué versión exacta se ha instalado y por qué.

El símbolo misterioso en las versiones: el caret (^)
Después de instalar un paquete, es muy habitual ver algo así en el package.json:

{
  "dependencies": {
    "ms": "^2.3.2"
  }
}

Copiar
Ese simbolito ^ no está ahí porque sí. Se llama caret.

Qué es el caret (^)
El caret indica un rango de versiones permitidas, no una versión exacta. Está directamente relacionado con el versionado semántico o SemVer.

Qué es el versionado semántico (SemVer)
Las versiones siguen este formato estándar: major.minor.patch. Ejemplo: 2.3.2

🔴 Major: Cambios grandes y breaking changes (rompen la compatibilidad).
🟡 Minor: Nuevas funcionalidades compatibles.
🟢 Patch: Correcciones de bugs o parches de seguridad.
En teoría:

Cambiar el Major puede romper tu código.
Cambiar el Minor añade cosas sin romper.
Cambiar el Patch solo arregla problemas.
La realidad: En la práctica, no siempre se respeta al 100%, y ahí vienen los problemas. Un cambio en la versión minor podría introducir un bug inesperado o un cambio de comportamiento que no tenías previsto.

Qué significa exactamente ^2.3.2
El caret delante de una versión quiere decir:

“Se permite cualquier versión mayor o igual a 2.3.2, siempre que sea menor que 3.0.0.”

Es decir, se podrían instalar automáticamente:

2.3.3
2.9.9
2.58.1000
Pero nunca se instalará la 3.0.0.

Por qué esto puede ser problemático
Aunque parezca una buena idea para tener parches de seguridad automáticos, este comportamiento ha provocado:

🐛 Bugs inesperados: Una actualización minor que introduce un error.
📉 Cambios de comportamiento: El código funciona distinto sin que hayas tocado nada.
🛡️ Ataques de supply chain: Un atacante toma el control de un paquete y sube una versión maliciosa (ej. 2.3.4) que se instala sola en tu servidor.
Cuándo tiene sentido quitar el caret
Si quieres control total sobre las dependencias y evitar sorpresas, una estrategia válida es quitar el caret y dejar la versión exacta:

"dependencies": {
  "ms": "2.3.2"
}

Copiar
Así te aseguras de que:

Siempre se instala esa versión concreta.
No hay actualizaciones silenciosas.
El entorno es reproducible (lo que funciona en tu máquina funcionará igual en el servidor).
El papel del lockfile
Aunque el package.json tenga rangos, el lockfile (pnpm-lock.yaml, package-lock.json, etc.) fija exactamente qué versión se instaló en ese momento.

Por eso:

✅ No deberías borrar el lockfile a la ligera.
✅ Es clave para que todos los entornos usen lo mismo.
✅ Evita sorpresas entre máquinas y despliegues.
¡Ya casi estamos!
Al instalar paquetes en Node.js:

No solo importa qué paquete usas, sino qué versión y qué rango permites.
El caret permite actualizaciones automáticas, lo cual es cómodo pero arriesgado.
Quitar el caret te da más control y estabilidad.
Entender esto te ahorrará muchísimos problemas “misteriosos” cuando empiezas a trabajar en backend y proyectos reales.

En la siguiente clase seguiremos profundizando en Node.js y su ecosistema, ya con ejemplos más prácticos.

Sistema de permisos en Node.js
Cuando ejecutas un programa con Node.js, este tiene mucho más poder del que normalmente somos conscientes. Puede leer archivos, escribir en el sistema, acceder a la red y ejecutar procesos de forma prácticamente ilimitada.

En esta clase vamos a ver por qué esto puede ser un riesgo de seguridad y cómo activar y controlar el sistema de permisos experimental de Node.js para ejecutar programas de forma mucho más segura.

El problema: Node.js tiene acceso casi total al sistema
Por defecto, un script de Node.js tiene los mismos privilegios que el usuario que lo ejecuta. Esto significa que puede:

📂 Leer archivos sensibles del sistema (como claves SSH o configuraciones).
📝 Escribir archivos en cualquier carpeta donde el usuario tenga permiso.
🌐 Acceder a la red para enviar o recibir datos.
⚙️ Ejecutar procesos externos.
🔧 Modificar recursos del sistema operativo.
Todo esto ocurre sin que Node.js te pida confirmación. El único límite real es el sistema de permisos del sistema operativo. Si ejecutas Node como root o administrador, el riesgo es máximo.

Por qué esto puede ser peligroso
Un script malicioso (o una dependencia de terceros comprometida) podría:

Leer tus archivos privados.
Extraer información sensible y enviarla a un servidor externo.
Instalar malware o crear archivos que se ejecuten al iniciar el sistema.
El sistema de permisos de Node.js
A partir de Node.js v20, se introdujo un sistema de permisos experimental que permite restringir qué puede hacer un script. Este sistema se inspira en otros entornos como Deno y permite controlar:

Acceso al sistema de archivos (Lectura/Escritura).
Acceso a la red.
Ejecución de procesos hijos.
Uso de worker_threads.
💡 Nota: Al ser una característica experimental, todavía requiere un flag específico para activarse.

Cómo activar el modo de permisos
Para activar este sistema, debes ejecutar Node.js con el flag --experimental-permission.

node --experimental-permission index.js

Copiar
Al hacerlo, Node entra en un modo restringido donde no puede acceder a nada sin permiso explícito. Si tu script intenta leer un archivo sin haberle dado permiso previo, el proceso fallará inmediatamente con un error de acceso denegado.

Conceder permisos específicos
En lugar de dar “permiso para todo”, la clave es ser específico. Podemos usar flags adicionales para conceder accesos controlados.

Dar permisos de lectura (--allow-fs-read)
Puedes permitir la lectura de forma global (poco recomendado) o limitarla a archivos o carpetas específicas:

# Permitir lectura en todo el sistema (Peligroso)
node --experimental-permission --allow-fs-read="*" index.js
# Permitir lectura solo en una carpeta específica (Recomendado)
node --experimental-permission --allow-fs-read="/Users/proyecto/data/*" index.js

Copiar
Dar permisos de escritura (--allow-fs-write)
Lo mismo ocurre con la escritura. Puedes restringir dónde puede guardar archivos tu aplicación:

# Permitir escribir solo en la carpeta 'output'
node --experimental-permission --allow-fs-write="./output/*" index.js

Copiar
Si el script intenta escribir en /etc/hosts o en tu carpeta personal, Node bloqueará la operación.

Otros permisos importantes
Además de archivos, puedes controlar otros aspectos críticos:

--allow-net: Controla el acceso a la red (puedes especificar dominios o IPs).
--allow-child-process: Permite o deniega la ejecución de comandos del sistema.
--allow-worker: Controla si el script puede crear hilos secundarios.
Controlar permisos desde el propio código
Node.js también nos proporciona una API para comprobar en tiempo de ejecución si tenemos un permiso concreto. Esto es muy útil para mostrar errores amigables en lugar de dejar que la aplicación explote.

Usamos el objeto process.permission:

if (process.permission.has('fs.read', '/ruta/archivo.txt')) {
  console.log('✅ Tenemos permiso de lectura')
} else {
  console.error('❌ Error: No tenemos permiso para leer este archivo')
}

Copiar
Mejorar los mensajes de error
En lugar de recibir errores crípticos del sistema, detectar la falta de permisos nos permite:

Mostrar mensajes claros al usuario.
Ofrecer alternativas o instrucciones de configuración.
Tener un comportamiento más predecible y profesional.
Por qué esto es vital en el Backend
En el desarrollo de servidores y herramientas profesionales:

Ejecutas código que a menudo depende de cientos de librerías de terceros.
Procesas archivos subidos por usuarios externos.
Trabajas en entornos donde la seguridad es la prioridad número uno.
Implementar el principio de mínimo privilegio (dar solo los permisos estrictamente necesarios) reduce drásticamente la superficie de ataque de tu aplicación.

Conclusión
El sistema de permisos de Node.js es una herramienta poderosa que está cambiando cómo entendemos la seguridad en el ecosistema:

✅ Por defecto, Node.js tiene acceso casi total; activar el modo de permisos es un gran paso en seguridad.
✅ Es fundamental ser específico y restrictivo con lo que permitimos.
✅ Usar la API de permisos en el código ayuda a crear aplicaciones más robustas y con mejores mensajes de error.
Dominar estas herramientas te permitirá construir aplicaciones no solo funcionales, sino también seguras y preparadas para entornos de producción exigentes.

Creando nuestro propio CLI con Node.js
En esta clase vamos a dar un paso muy importante: crear nuestro primer programa de línea de comandos con Node.js.

Un CLI (Command Line Interface) no es algo raro ni avanzado. De hecho, lo usas todos los días aunque no te des cuenta: ls, cd, npm, git… todos ellos son programas de línea de comandos. Y con Node.js, crear los nuestros es sorprendentemente sencillo.

¿Qué es un CLI?
Un CLI es simplemente un programa que se ejecuta desde la terminal. En lugar de tener una interfaz gráfica (GUI) con botones y ventanas, interactuamos con él a través de texto y argumentos.

Accediendo a los argumentos de la terminal
La base de cualquier CLI es poder leer los argumentos con los que se ejecuta. Node.js nos proporciona esto a través del objeto global process:

process.argv

Copiar
process.argv es un array que contiene todos los argumentos pasados al proceso al iniciarse.

¿Qué contiene exactamente process.argv?
Cuando ejecutas un comando como node index.js ./carpeta, el array process.argv contiene:

Posición 0: La ruta absoluta del ejecutable de Node.js.
Posición 1: La ruta absoluta del archivo que se está ejecutando.
Posición 2 y en adelante: Los argumentos reales que has pasado (en este caso, ./carpeta).
Regla de oro: Por norma general, los argumentos que te interesan para tu lógica siempre empiezan a partir de la posición 2.

Nuestro objetivo: Crear un mini ls
Como ejercicio práctico, vamos a construir un clon simplificado del comando ls. Nuestra herramienta hará lo siguiente:

Aceptar una ruta por argumento (o usar la actual por defecto).
Listar todos los archivos y carpetas.
Diferenciar visualmente entre ficheros y directorios.
Mostrar el tamaño de cada archivo de forma legible.
Usando módulos nativos: fs y path
Para este proyecto no necesitamos ninguna librería externa. Utilizaremos:

node:fs/promises: Para leer el contenido de los directorios y obtener información (stats) de los archivos de forma asíncrona.
node:path: Para construir rutas de forma segura y multiplataforma.
Paso 1: Determinar la carpeta a listar
Lo primero es capturar el argumento que nos pasa el usuario. Si no nos pasa nada, listaremos la carpeta actual (.):

import path from 'node:path'
// El argumento 2 es nuestra carpeta, si no existe usamos '.'
const folder = process.argv[2] ?? '.'

Copiar
Paso 2: Leer el contenido del directorio
Usaremos readdir para obtener la lista de nombres de archivos en esa carpeta:

import { readdir } from 'node:fs/promises'
let files
try {
  files = await readdir(folder)
} catch {
  console.error(`❌ No se pudo leer el directorio: ${folder}`)
  process.exit(1)
}

Copiar
Paso 3: Obtener información detallada de cada archivo
Solo con el nombre no sabemos si es una carpeta o cuánto pesa. Necesitamos usar stat para obtener los metadatos:

import { stat } from 'node:fs/promises'
const filePromises = files.map(async (file) => {
  const filePath = path.join(folder, file)
  const stats = await stat(filePath)
  const isDirectory = stats.isDirectory()
  const fileType = isDirectory ? '📁' : '📄'
  const fileSize = stats.size.toString()
  const fileModified = stats.mtime.toLocaleString()
  return `${fileType} ${file.padEnd(20)} ${fileSize.padStart(10)} ${fileModified}`
})
const filesInfo = await Promise.all(filePromises)
filesInfo.forEach((line) => console.log(line))

Copiar
Paso 4: Formateando el tamaño para humanos
Mostrar 1048576 bytes no es muy útil. Vamos a crear una pequeña utilidad para mostrar KB o MB de forma legible:

function formatSize(bytes) {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

Copiar
Renderizando el resultado final
Para que nuestro CLI se vea profesional, usamos padding (padEnd y padStart) para alinear las columnas. Esto hace que la información sea mucho más fácil de leer de un vistazo.

El resultado final es una herramienta que funciona tanto con rutas relativas como absolutas y se comporta de forma muy similar al ls real, dándonos un control total sobre qué información queremos mostrar.

Ideas para mejorar tu CLI
Este ejercicio es la base perfecta para practicar Node.js real. Puedes intentar añadir estas funcionalidades:

Ordenar: Mostrar primero los directorios y luego los archivos, u ordenar alfabéticamente.
Filtrar: Añadir flags como --only-files o --only-dirs para filtrar el contenido.
Extensiones: Filtrar por tipo de archivo (ej: solo archivos .js).
Colores: Usar códigos ANSI o librerías externas para resaltar información importante.
En esta clase has aprendido que…
Crear herramientas de terminal con Node.js es potente y accesible.
process.argv es la base de cualquier CLI para interactuar con el usuario.
Los módulos nativos de Node.js son suficientes para construir herramientas profesionales sin depender de librerías externas.
Dominar la creación de CLIs te permitirá automatizar tus propios flujos de trabajo y entender mucho mejor cómo funcionan por dentro las herramientas que usas a diario en tu carrera como desarrollador.

Creando nuestro primer servidor HTTP y usando watch
En esta clase damos el primer paso real en el desarrollo backend con Node.js: crear un servidor HTTP desde cero, sin frameworks y usando únicamente módulos nativos.

Entender cómo funciona la comunicación básica entre cliente y servidor es fundamental antes de pasar a herramientas de mayor nivel como Express.

El módulo nativo node:http
Node.js trae de serie todo lo necesario para montar un servidor. No necesitas instalar nada externo para empezar, ya que Node:

Tiene módulos nativos para comunicaciones.
Tiene acceso directo a la red.
Puede levantar servidores HTTP de forma eficiente.
Para empezar, usaremos el módulo node:http, que es la base de prácticamente todos los frameworks web en el ecosistema de Node.js.

Crear un servidor HTTP básico
Un servidor HTTP en Node.js se basa en un ciclo de petición (Request) y respuesta (Response).

Para crear uno, utilizamos el método createServer. Este método recibe una función (callback) que se ejecutará cada vez que el servidor reciba una petición.

import http from 'node:http'
const server = http.createServer((req, res) => {
  console.log('Petición recibida')
  res.end('Hola desde tu primer servidor de Node.js!')
})

Copiar
Request y Response
La función que pasamos a createServer recibe dos objetos fundamentales:

req (Request): Contiene toda la información de la petición que hace el cliente (la URL, el método HTTP, las cabeceras, etc.).
res (Response): Es el objeto que usamos para enviarle la respuesta al cliente.
Escuchar en un puerto
Una vez definido el servidor, tenemos que decirle que “escuche” en un puerto específico de nuestra máquina para poder recibir tráfico.

const DESIRED_PORT = 3000
server.listen(DESIRED_PORT, () => {
  console.log(`Servidor escuchando en el puerto http://localhost:${DESIRED_PORT}`)
})

Copiar
El ciclo de vida de la respuesta
Un error común al empezar es olvidar finalizar la respuesta. Si el servidor recibe la petición pero nunca llama a res.end(), el navegador se quedará cargando indefinidamente (en estado pending) esperando a que el servidor cierre la conexión.

Siempre debemos:

Escribir el contenido (opcionalmente con res.write()).
Finalizar la respuesta con res.end().
Cabeceras y Codificación (UTF-8)
Si intentas enviar caracteres especiales (como acentos o emojis) y no configuras correctamente el servidor, el navegador podría mostrarlos mal. Esto sucede porque el navegador no sabe qué tipo de contenido está recibiendo ni qué codificación usa.

Podemos solucionar esto enviando una cabecera HTTP:

const server = http.createServer((req, res) => {
  // Configuramos la cabecera con el código de estado 200 (OK)
  res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  res.end('¡Hola Mundo! 🚀 Aquí tienes un servidor con tildes.')
})

Copiar
Tip: Puedes inspeccionar estas cabeceras en las Herramientas de Desarrollo de tu navegador (F12), en la pestaña Network, seleccionando la petición a localhost.

Mejorando el desarrollo con el modo watch
Por defecto, cuando haces un cambio en tu archivo de Node.js, tienes que:

Parar el proceso actual (Ctrl + C).
Volver a ejecutar node servidor.js.
Esto es muy tedioso. Afortunadamente, las versiones recientes de Node.js (v18.11+) incluyen un modo watch nativo.

Para usarlo, simplemente añade el flag --watch:

node --watch servidor.js

Copiar
Ahora, cada vez que guardes el archivo, Node.js reiniciará el servidor automáticamente. ¡Mucho más productivo!

Por qué empezar sin frameworks
Aunque en el mundo real usaremos Express, Fastify o NestJS, empezar con el módulo http nativo te permite entender:

Qué es realmente una petición.
Cómo funcionan los flujos de datos (streams).
La importancia de las cabeceras.
El ciclo de vida de una conexión.
Una vez dominas esto, verás que Express no es “magia”, sino una capa de utilidades sobre lo que acabas de aprender.

Resumen de la clase
✅ Creamos un servidor con node:http.
✅ Entendimos la diferencia entre req (petición) y res (respuesta).
✅ Aprendimos a configurar el puerto con server.listen.
✅ Vimos la importancia de las cabeceras para la codificación UTF-8.
✅ Usamos el flag --watch para un desarrollo más rápido.
¡Ya tienes tu primer servidor funcionando! En la siguiente clase empezaremos a gestionar diferentes rutas.

← Anterior

Cambiar el puerto usando variables de entorno
Uno de los primeros problemas reales cuando levantas un servidor es el conflicto de puertos. El típico puerto 3000 puede estar ocupado por otra aplicación y, si lo tienes hardcodeado, tu servidor simplemente no arranca.

En esta clase vamos a ver cómo hacer el puerto configurable, primero entendiendo el problema y luego resolviéndolo correctamente con variables de entorno.

El problema de fijar el puerto en el código
Si defines el puerto directamente en el código, tu aplicación se vuelve poco flexible:

server.listen(3000, () => {
  console.log('Servidor en http://localhost:3000')
})

Copiar
Si el puerto 3000 ya está siendo usado por otro servicio (como un frontend de React o un proceso de Docker), recibirás un error de tipo EADDRINUSE y el servidor se detendrá.

Además, en entornos de producción (como AWS, Vercel o Railway), no sueles elegir tú el puerto; el proveedor te lo asigna dinámicamente y te lo pasa a través de una variable.

¿Qué son las variables de entorno?
Las variables de entorno son valores externos a tu código que definen cómo debe comportarse tu aplicación según el entorno donde se ejecute (desarrollo, testing, producción).

En Node.js, podemos acceder a estas variables a través del objeto global process.env.

Usando el puerto de forma dinámica
Para que nuestro servidor sea flexible, debemos intentar leer el puerto desde una variable de entorno llamada PORT. Si no existe, entonces podemos usar un valor por defecto (como el 3000).

// Leemos el puerto de la variable de entorno o usamos el 3000 por defecto
const desiredPort = process.env.PORT ?? 3000
server.listen(desiredPort, () => {
  console.log(`Servidor escuchando en el puerto http://localhost:${desiredPort}`)
})

Copiar
¿Cómo pasamos el puerto desde la terminal?
Al ejecutar tu script de Node.js, puedes definir la variable de entorno justo antes del comando:

PORT=1234 node servidor.js

Copiar
Ahora, tu servidor escuchará en el puerto 1234 sin que hayas tenido que tocar ni una sola línea de código.

Beneficios de este enfoque
Portabilidad: Tu aplicación puede correr en cualquier máquina sin preocuparte de si el puerto 3000 está libre.
Preparado para producción: Casi todos los servicios de hosting inyectan una variable PORT automáticamente.
Seguridad: Puedes ocultar información sensible (como claves de API o URLs de bases de datos) fuera de tu código fuente.
El repaso final
✅ Entendimos por qué hardcodear el puerto es una mala práctica.
✅ Aprendimos qué es process.env y cómo acceder a variables externas.
✅ Implementamos un puerto dinámico con un valor de respaldo (fallback).
✅ Vimos cómo pasar variables de entorno directamente desde la terminal.
Configurar el puerto correctamente es el primer paso para crear aplicaciones de Node.js profesionales y escalables. ¡Nos vemos en la siguiente clase!