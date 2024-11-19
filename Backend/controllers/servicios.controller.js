import { pool } from '../db.js'

export const getServicios = async(req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM servicios ORDER BY id ASC')
    
        res.json(result)
    }catch(error) {
        return res.status(500).json({ message: error.message });
    }
}

export const createServicio = async (req, res) => {
    try {
        const { nombre } = req.body;

        const [result] = await pool.query('INSERT INTO servicios(nombre) VALUES (?)', [nombre]);

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

export const updateServicio = async (req, res) => {
    try {
      const { id, nombre } = req.body;
      const [result] = await pool.query('UPDATE servicios SET nombre = ? WHERE id = ?', [nombre, id]);
  
      return res.status(201).json({
        status: 200,
        message: 'Servicio actualizado exitosamente.'
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: error.message
      });
    }
};

export const deleteServicio = async (req, res) => {
    try {
      const { id } = req.body;
      const [result] = await pool.query('DELETE FROM servicios WHERE id = ?', [id]);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Servicio no encontrado" });
      }
  
      res.send("Servicio eliminado");
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
};