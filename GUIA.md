# Backend Learning

Coleccion de mini proyectos para aprender Node.js y Express paso a paso.

## Proyectos

| Carpeta | Tema | Como iniciar |
| --- | --- | --- |
| `01-node-http-server` | Modulos nativos de Node, servidor HTTP y archivos | `node server.js` |
| `02-calculator-http-server` | Calculadora con el modulo HTTP | `node server.js` |
| `03-express-server` | Rutas, middleware, filtros y paginacion con Express | `node index.js` |
| `04-calculadora-api` | API REST de calculadora con Express | `npm start` |

## Requisitos

- Node.js 18 o superior.
- Ejecutar los comandos desde la carpeta del proyecto correspondiente.
- Ejecutar `npm install` en los proyectos que tengan dependencias.

## API de calculadora

Desde `04-calculadora-api`:

```powershell
npm install
npm start
```


## Convenciones

- Cada mini proyecto mantiene su propio `package.json`.
- Las dependencias se instalan dentro del proyecto que las necesita.
- Los archivos `.env` son locales y no deben subirse al repositorio.
- Los nombres de las carpetas siguen el orden del aprendizaje.