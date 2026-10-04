import express from 'express'
import { middlewareCors } from './middlewares/cors.js';
import { usersRouter } from './router/users.js';

const app = express();

app.use(express.json());
app.use(middlewareCors());
app.use('/users', usersRouter);

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime()
  })
})

app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

export default app;