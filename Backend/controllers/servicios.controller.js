import { pool } from '../db.js'

export const getServicios = async(req, res) => {
    try {
      const [result] = await pool.query('SELECT * FROM servicios ORDER BY id ASC')
  
      res.json(result)
    }catch(error) {
      return res.status(500).json({ status: 500, message: error.message });
    }
}

export const createServicio = async (req, res) => {
    try {
      const { nombre, proveedor_id } = req.body;

      const [proveedor] = await pool.query('SELECT id FROM proveedores WHERE id = ?', [proveedor_id]);

      if (proveedor.length === 0) {
        return res.status(404).json({ status: 404, message: 'Proveedor no encontrado.' });
      }

      const [result] = await pool.query('INSERT INTO servicios(nombre, proveedor_id) VALUES (?, ?)', [nombre, proveedor_id]);

      return res.status(201).json({ status: 200, message: 'Se ha registrado exitosamente.'});
    } catch (error) {
      return res.status(500).json({ status: 500, message: error.message });
    }
};

export const updateServicio = async (req, res) => {
    try {
      const { id, nombre, proveedor_id } = req.body;

      const [proveedor] = await pool.query('SELECT id FROM proveedores WHERE id = ?', [proveedor_id]);

      if (proveedor.length === 0) {
        return res.status(404).json({ status: 404, message: 'Proveedor no encontrado.' });
      }

      const [result] = await pool.query('UPDATE servicios SET nombre = ? WHERE id = ? AND proveedor_id = ?', [nombre, id, proveedor_id]);
  
      return res.status(201).json({ status: 200, message: 'Se ha actualizado exitosamente.'});
    } catch (error) {
      return res.status(500).json({ status: 500, message: error.message });
    }
};

export const deleteServicio = async (req, res) => {
  try {
    const { id, proveedor_id } = req.body;
    const [proveedor] = await pool.query('SELECT id FROM proveedores WHERE id = ?', [proveedor_id]);

    if (proveedor.length === 0) {
      return res.status(404).json({ status: 404, message: 'Proveedor no encontrado.' });
    }

    const [result] = await pool.query('DELETE FROM servicios WHERE id = ? AND proveedor_id = ?', [id, proveedor_id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Servicio no encontrado" });
    }
    return res.status(201).json({ status: 200, message: 'Se ha eliminado exitosamente.'});
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
};