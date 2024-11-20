import express from "express";
import cors from "cors";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import queryWeb from "./routes/web.router.js";
import dotenv from "dotenv";

import { seedRoles } from "./seeders/rolesSeeder.js";
import { seedUsuarios } from "./seeders/usuariosSeeder.js";

// Cargar variables de entorno desde .env
dotenv.config();

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use(queryWeb);

// Servir archivos estaticos
app.use(express.static(join(__dirname, '../Front/dist')));

// Configuracion del servidor
const PORT = process.env.PORT;
const HOST = process.env.HOST;

// Función para ejecutar los seeders
const seedDatabase = async () => {
    try {
        await seedRoles(); 
        await seedUsuarios(); 
    } catch (error) {
        console.error("Error ejecutando seeders:", error);
    }
};

seedDatabase().then(() => {
    app.listen(PORT, HOST, () => {
        console.log(`Server is running at http://${HOST}:${PORT}`);
    });
});