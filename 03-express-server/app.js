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

if(process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log('Server is running on port ${PORT}');
  });
}

export default app;