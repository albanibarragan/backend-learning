import express from 'express'
import { DEFAULT_LIMIT, DEFAULT_OFFSET } from './config.js';
import cors from 'cors';

//Puerto debe funcionar
const PORT = process.env.PORT || 3000;

const ACCEPTED_ORIGINS = ['http://localhost:3000', 'http://example.com'];

const app = express();

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || ACCEPTED_ORIGINS.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Origen no permitido'));
    }
  }
}));

app.use((request, response, next) =>{
    const timeString = new Date().toLocaleTimeString();
    console.log(`Petición recibida a las ${timeString}, ${request.method} ${request.url}`);
    next();
})

const previusHomeMiddleware = (req, res, next) => {
    console.log("Middleware ejecutando antes de la ruta /")
    next();
}

app.get('/', previusHomeMiddleware, (req, res) => {
    return res.send('Hola mundo');
});

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime()
  })
})

app.get('/users', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // cambiar esto a un dominio específico en producción
  const {default: users} = await import('./users.json', { with: { type: 'json' } });
  const limit = Number(req.query.limit) || DEFAULT_LIMIT;
  const offset = Number(req.query.offset) || DEFAULT_OFFSET;
  const { nombre, apellido, usuario } = req.query;
  console.log('Query parameters:', req.query);
 
  let filteredUsers = users;

  if (nombre) {
    filteredUsers = filteredUsers.filter(user => user.nombre.toLowerCase() === nombre.toLowerCase());
  }

  if (apellido) {
    filteredUsers = filteredUsers.filter(user => user.apellido.toLowerCase().includes(apellido.toLowerCase()));
  }

  if (usuario) {
    filteredUsers = filteredUsers.filter(user => user.usuario.toLowerCase().includes(usuario.toLowerCase()));
  }

  const paginatedUsers = filteredUsers.slice(offset, offset + limit);

  res.json(paginatedUsers);
});

app.get('/users/:id', (req, res) => {
  const {id} = req.params;
  const idNumber = parseInt(id, 10);
  res.json({ id: idNumber, name: `User ${id}` });
})


//ruta opcional - acd o abcd

app.get('a{b}cd', (req, res) => {
  res.send('Ruta con patrón de expresión regular');
})

app.use((req, res) => {
  res.status(404).send('No encontrado')
  
})

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
})