import { pool } from '../db.js';
import generatePassword from './generatePassword.js';
import bcrypt from "bcryptjs";

export const getProveedores = async(req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM proveedores ORDER BY id ASC')
    
        res.json(result)
    }catch(error) {
        return res.status(500).json({ message: error.message });
    }
}

export const createProveedor = async (req, res) => {
  try {
    const { razon_social, nit, email, telefono } = req.body;

    const nuevaContrasena = generatePassword();

    const hashedPassword = await bcrypt.hash(nuevaContrasena, 10);

    const [userResult] = await pool.query("INSERT INTO usuarios (nombre, email, password, rol_id) VALUES (?, ?, ?, ?)", [razon_social, email, hashedPassword, "3"]);

    const userId = userResult.insertId;

    await pool.query('INSERT INTO proveedores (razon_social, nit, email, telefono, usuario_id) VALUES (?, ?, ?, ?, ?)', [razon_social, nit, email, telefono, userId]);

    return res.status(201).json({
      status: 200,
      message: 'Se ha registrado exitosamente.'
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

export const updateProveedor = async (req, res) => {
    try {
      const { id, razon_social, nit, email, telefono } = req.body;

      const [result] = await pool.query('UPDATE proveedores SET razon_social = ?, nit = ?, telefono = ? WHERE id = ?', [razon_social, nit, telefono, id]);
  
      return res.status(201).json({
        status: 200,
        message: 'Proveedor actualizado exitosamente.'
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: error.message
      });
    }
};
export const deleteProveedor = async (req, res) => {
  try {
    const { id } = req.body;

    const [proveedor] = await pool.query('SELECT usuario_id FROM proveedores WHERE id = ?', [id]);

    if (proveedor.length === 0) {
      return res.status(404).json({ message: "Proveedor no encontrado" });
    }

    const { usuario_id } = proveedor[0];

    await pool.query('DELETE FROM usuarios WHERE id = ?', [usuario_id]);

    const [result] = await pool.query('DELETE FROM proveedores WHERE id = ?', [id]);

    res.status(200).json({ message: "Proveedor eliminado exitosamente" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};