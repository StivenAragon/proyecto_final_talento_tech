import express from "express";
import cors from "cors";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import queryWeb from "./routes/web.router.js";
import dotenv from "dotenv";

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

app.listen(PORT, HOST, () => {
    console.log(`Server is running at http://${HOST}:${PORT}`);
});