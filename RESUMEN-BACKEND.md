# Resumen del proyecto backend

Este repositorio es una colección de mini proyectos de aprendizaje para comprender cómo funciona el backend con Node.js y Express, desde lo más básico hasta una API REST con estructura modular.

## 1. Cómo está implementado el proyecto

La estructura general del repositorio está organizada por carpetas en orden de aprendizaje:

- `01-node-http-server`: servidor HTTP nativo de Node.js
- `02-calculator-http-server`: servidor con lógica de cálculo y manejo de rutas
- `03-express-server`: API REST con Express y separación en capas
- `04-calculadora-api`: API simple de operaciones matemáticas

El proyecto principal que más representa la parte de backend moderna dentro del repo es `03-express-server`.

### Estructura del proyecto `03-express-server`

La app está construida con Express y usa una arquitectura simple pero clara:

- `app.js`: punto de entrada de la aplicación
- `router/users.js`: define las rutas relacionadas con usuarios
- `controller/user.js`: contiene la lógica de cada endpoint
- `models/user.js`: guarda la lógica de datos y la colección en memoria
- `middlewares/cors.js`: middleware para controlar CORS
- `logger/`: registra cada petición con nivel, código HTTP y duración
- `test/users.test.js`: pruebas automatizadas del CRUD y de la unicidad del correo
- `config.js`: configuración general de paginación

#### Punto de entrada

En `app.js` se crea la instancia de Express, se habilita `express.json()` para leer JSON del cuerpo de la petición y se monta el router `'/users'`.

Además, se define un endpoint de salud:

- `GET /health`: responde con status y uptime

Esto es una práctica muy común en backend para verificar si el servicio está activo.

#### Routing

En `router/users.js` se definen las rutas CRUD principales:

- `GET /users`: obtener todos los usuarios
- `GET /users/:id`: obtener un usuario por id
- `POST /users`: crear usuario
- `PATCH /users/:id`: actualizar parcialmente
- `PUT /users/:id`: reemplazar completamente
- `DELETE /users/:id`: eliminar usuario

Esto muestra una API REST bastante clara y bien estructurada para un proyecto inicial.

#### Controlador

El archivo `controller/user.js` maneja la lógica de cada endpoint y valida lo que llega desde la petición.

Incluye:

- validación de `limit` y `offset` para paginación
- validación de campos obligatorios (`name`, `lastname`, `username`, `email`)
- normalización del correo y prevención de correos duplicados
- comprobación de existencia de usuario antes de editar o eliminar
- respuesta con códigos HTTP adecuados like 200, 201, 400, 404, 204

Esto ya refleja un nivel real de backend porque no solo se responde con texto plano, sino que se gestionan errores y estados HTTP.

#### Modelo

En `models/user.js` se define una lista en memoria de usuarios:

- arreglo de objetos con `id`, `name`, `lastname`, `username`, `email`
- búsquedas por id
- filtros por nombre, apellido, username y correo
- paginación con `slice(offset, offset + limit)`
- creación, actualización, reemplazo y eliminación

Es una implementación muy útil para aprender la lógica de persistencia sin necesidad de base de datos todavía.

#### Middleware CORS

El middleware en `middlewares/cors.js` permite restringir qué dominios pueden hacer peticiones al backend.

Esto es importante en backend porque evita acceso no autorizado desde otros orígenes. Aquí se define una lista de orígenes permitidos y se valida la petición antes de dejarla pasar.

## 2. Qué tipo de backend he estado haciendo hasta ahora

Hasta este punto, el nivel es de aprendizaje práctico y base de backend, no de backend productivo avanzado.

### Lo que ya he trabajado

- creación de servidores HTTP con Node.js nativo
- manejo de métodos HTTP (`GET`, `POST`)
- lectura de `req.url` y `req.method`
- parseo de query params
- manejo de JSON
- creación de APIs REST
- rutas con parámetros dinámicos
- validación básica de entradas del usuario
- manejo de errores HTTP
- paginación en endpoints
- uso de middleware
- registro de peticiones HTTP en archivos de log
- pruebas automatizadas con `node:test`
- control de CORS
- separación de responsabilidades por carpetas

### Lo que sí está presente en una API backend real

- endpoints REST
- estructura modular
- separación entre routes/controllers/models
- validación de entradas
- control de respuestas HTTP
- arquitectura orientada a servicios / capas

### Lo que todavía no está implementado

No he llegado aún a un backend completo de producción. Faltan cosas como:

- base de datos real (MySQL, PostgreSQL, MongoDB)
- ORM o query builder
- autenticación y autorización
- JWT, sessions o cookies
- encriptación de contraseñas
- validación con librerías especializadas
- Docker y despliegue
- arquitectura escalable con servicios, capas, repositorios y capas de seguridad
- manejo de logs avanzados
- caché, colas o microservicios

## 3. Nivel actual de backend

El nivel actual se puede describir como:

- principiante a intermedio en backend
- muy bueno para entender cómo funciona una API desde cero
- sólido en conceptos de HTTP, Express, rutas y control del flujo de una petición
- todavía en fase de fundamentos, no en backend empresarial o profesional completo

En otras palabras, ya se está aprendiendo la base del backend y la mentalidad de construir APIs, pero todavía no se ha entrado en profundidad en persistencia, seguridad, despliegue, arquitectura avanzada ni herramientas de producción.

## 4. Evolución del aprendizaje en el repositorio

### `01-node-http-server`

Aquí se aprende lo más básico: cómo crear un servidor con Node, escuchar puertos, responder con JSON y manejar rutas simples.

### `02-calculator-http-server`

Se refuerza la lógica de manejo de requests y `POST` con cuerpo JSON para operaciones matemáticas. Además, se ve validación muy básica y respuesta con status codes.

### `03-express-server`

Aquí ya se organiza un proyecto más realista: rutas, controladores, modelos, middleware y CRUD de usuarios. Es la parte más cercana a cómo se desarrolla una API típica.

### `04-calculadora-api`

Repite la idea de API con operaciones matemáticas, pero ya orientado a la lógica del servidor con Node puro y manejo de JSON.

## 5. Conclusión

Este proyecto demuestra un proceso de aprendizaje progresivo en backend:

- primero se trabajó con Node puro
- luego con HTTP y manejo de requests
- después con Express y arquitectura modular
- y finalmente con lógica REST para consumir y manipular datos

El nivel actual es muy bueno para entender el flujo backend de una API, pero todavía faltan capas de complejidad profesional como bases de datos, autenticación, testing y despliegue.

Si lo resumimos en una frase:

> He construido la base sólida de APIs REST con Node.js y Express, pero aún estoy en la etapa de fundamentos del backend, no en un backend full-stack o de producción completo.
