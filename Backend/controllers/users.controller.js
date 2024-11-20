import { pool } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET;

export const registerUser = async (req, res) => {
    try {
        const { nombre, email, password } = req.body;

        if (!nombre || !email || !password) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }

        const [userExists] = await pool.query("SELECT * FROM usuarios WHERE email = ?", [email]);
        if (userExists.length > 0) {
            return res.status(400).json({ message: "El usuario ya está registrado" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await pool.query("INSERT INTO usuarios (nombre, email, password, rol_id) VALUES (?, ?, ?, ?)", [ nombre, email, hashedPassword, "4", ]);

        return res.status(201).json({ message: "Usuario registrado exitosamente" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }

        const [user] = await pool.query("SELECT * FROM usuarios WHERE email = ?", [email]);
        if (user.length === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        const userData = user[0];

        const isPasswordValid = await bcrypt.compare(password, userData.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Credenciales incorrectas" });
        }

        const token = jwt.sign(
            { id: userData.id, nombre: userData.nombre, email: userData.email },
            SECRET_KEY,
            { expiresIn: "1h" } 
        );

        return res.status(200).json({
            message: "Login exitoso",
            token,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const checkEmails = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "El email es obligatorio" });
        }

        const [rows] = await pool.query("SELECT * FROM usuarios WHERE email = ?", [email]);

        if (rows.length === 0) {
            return res.status(200).json({ message: "Email no existe", validate: true });
        }

        return res.status(200).json({ message: "Email existe", validate: false });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};