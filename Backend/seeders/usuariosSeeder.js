import { pool } from "../db.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

export const seedUsuarios = async () => {
    const CLAVE_SUPER_ADMINISTRADOR = process.env.CLAVE_SUPER_ADMINISTRADOR;
    const CLAVE_ADMINISTRADOR = process.env.CLAVE_ADMINISTRADOR;

    if (!CLAVE_SUPER_ADMINISTRADOR || !CLAVE_ADMINISTRADOR) {
        throw new Error("Faltan claves en las variables de entorno");
    }
    
    const hashedPasswordSuperAdmin = await bcrypt.hash(CLAVE_SUPER_ADMINISTRADOR, 10);
    const hashedPasswordAdmin = await bcrypt.hash(CLAVE_ADMINISTRADOR, 10);

    const usuarios = [
        { nombre: "Super Administrador", email: "super_administrador@gmail.com", password: hashedPasswordSuperAdmin,  rol: 1, },
        { nombre: "Administrador", email: "administrador@gmail.com", password: hashedPasswordAdmin,  rol: 2, },
    ];

    for (const usuario of usuarios) {
        const [rows] = await pool.query("SELECT COUNT(*) AS count FROM usuarios WHERE email = ?", [usuario.email]);

        if (rows[0].count === 0) {
            const [roleRows] = await pool.query("SELECT id FROM roles WHERE id = ?", [usuario.rol]);
            if (roleRows.length === 0) {
                continue;
            }
            const roleId = roleRows[0].id;

            await pool.query( "INSERT INTO usuarios (nombre, email, password, rol) VALUES (?, ?, ?, ?)", [usuario.nombre, usuario.email, usuario.password, roleId] );
        }
    }
};
