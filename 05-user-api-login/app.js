import express from "express";
import userRoutes from "./routes/user.routes.js";

const PORT = 3000;
const app = express();

// Middleware para interpretar JSON
app.use(express.json());

//ruta de usuarios
app.use('/users', userRoutes);

// inicializar el puerto 
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
} );