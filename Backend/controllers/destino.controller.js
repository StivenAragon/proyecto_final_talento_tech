import { pool } from '../db.js'

export const getDestinos = async(req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM destinos ORDER BY id ASC')
    
        res.json(result)
    }catch(error) {
        return res.status(500).json({ message: error.message });
    }
}

export const createDestino = async (req, res) => {
    try {
        const { nombre } = req.body;

        const [result] = await pool.query('INSERT INTO destinos(nombre) VALUES (?)', [nombre]);

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

export const updateDestino = async (req, res) => {
    try {
      const { id, nombre } = req.body;
      const [result] = await pool.query('UPDATE destinos SET nombre = ? WHERE id = ?', [nombre, id]);
  
      return res.status(201).json({
        status: 200,
        message: 'Destino actualizado exitosamente.'
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: error.message
      });
    }
};

export const deleteDestino = async (req, res) => {
    try {
      const { id } = req.body;
      const [result] = await pool.query('DELETE FROM destinos WHERE id = ?', [id]);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Destino no encontrado" });
      }
  
      res.send("Destino eliminado");
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
};