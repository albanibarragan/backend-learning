import express from 'express'

//Puerto debe funcionar
const PORT = process.env.PORT || 3000;

const app = express();

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
  const {default: users} = await import('./users.json', { with: { type: 'json' } });
  const { limit, nombre, apellido, usuario } = req.query;
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

  if (limit) {
    const limitNumber = parseInt(limit, 10);
    filteredUsers = filteredUsers.slice(0, limitNumber);
  }

  res.json(filteredUsers);
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