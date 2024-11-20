import { pool } from "../db.js";

export const seedRoles = async () => {
    const roles = ["Super Administrador", "Administrador", "Proveedor", "Visitante"];

    for (const role of roles) {
        const [rows] = await pool.query("SELECT COUNT(*) AS count FROM roles WHERE nombre = ?", [role]);

        if (rows[0].count === 0) {
            await pool.query("INSERT INTO roles (nombre) VALUES (?)", [role]);
        }
    }
};
