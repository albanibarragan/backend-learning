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

app.use((req, res) => {
  res.status(404).send('No encontrado')
  
})

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
})