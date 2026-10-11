import express from "express";
import userRoutes from "./routes/user.routes.js";
import { loggerMiddleware } from "./logger/logger.middleware.js";

const PORT = 3000;
const app = express();

app.use(loggerMiddleware);
// Middleware para interpretar JSON
app.use(express.json());

//ruta de usuarios
app.use('/users', userRoutes);

// inicializar el puerto 
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
} );