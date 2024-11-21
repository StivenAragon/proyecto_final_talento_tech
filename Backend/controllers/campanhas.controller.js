import { pool } from '../db.js'
export const getCampanhas = async (req, res) => {
  try {
      const { proveedor, campanha, destinoDesde, destinoHasta, precio } = req.query;

      let query = `
          SELECT 
              c.id, 
              c.nombre, 
              c.observacion, 
              c.hora_salida, 
              c.precio,
              DATE_FORMAT(c.fecha_inicio, '%Y-%m-%d') AS fecha_inicio, 
              DATE_FORMAT(c.fecha_fin, '%Y-%m-%d') AS fecha_fin,      
              FORMAT(c.precio, 0) AS precio_format,                
              CONCAT(
                DATE_FORMAT(c.hora_salida, '%H:%i'), 
                ' - ',
                CASE
                  WHEN HOUR(c.hora_salida) >= 6 AND HOUR(c.hora_salida) < 12 THEN 'Mañana'
                  WHEN HOUR(c.hora_salida) >= 12 AND HOUR(c.hora_salida) < 18 THEN 'Mediodía'
                  WHEN HOUR(c.hora_salida) >= 18 AND HOUR(c.hora_salida) <= 23 THEN 'Noche'
                  ELSE 'Tarde'
                END
              ) AS tiempo_salida,
              d1.nombre AS destino_desde, 
              cd1.id AS destino_desde_id, 
              cd1.destino_id AS destino_desde_camp_dest,
              d2.nombre AS destino_hasta, 
              cd2.id AS destino_hasta_id, 
              cd2.destino_id AS destino_hasta_camp_dest,
              p.razon_social AS proveedor_nombre 
          FROM campanhas c
          LEFT JOIN campanhas_destinos cd1 
              ON c.id = cd1.campanha_id AND cd1.validate_destino = 1
          LEFT JOIN destinos d1 
              ON cd1.destino_id = d1.id
          LEFT JOIN campanhas_destinos cd2 
              ON c.id = cd2.campanha_id AND cd2.validate_destino = 2
          LEFT JOIN destinos d2 
              ON cd2.destino_id = d2.id
          LEFT JOIN proveedores p 
              ON c.proveedor_id = p.id 
      `;

      const conditions = [];
      const values = [];

      if (proveedor) {
          conditions.push("c.proveedor_id = ?");
          values.push(proveedor);
      }

      if (campanha) {
          conditions.push("c.id = ?");
          values.push(campanha);
      }

      if (destinoDesde) {
          conditions.push("cd1.id = ?");
          values.push(destinoDesde);
      }

      if (destinoHasta) {
          conditions.push("cd2.id = ?");
          values.push(destinoHasta);
      }

      if (precio) {
        conditions.push("c.precio = ?");
        values.push(Number(precio));
      }

      if (conditions.length > 0) {
          query += ` WHERE ${conditions.join(" AND ")}`;
      }

      query += " ORDER BY c.id ASC";

      const [result] = await pool.query(query, values);

      res.json(result);
  } catch (error) {
      return res.status(500).json({ status: 500, message: error.message });
  }
};

export const createCampanha = async (req, res) => {
    try {
      const { nombre, tiempo_salida, fecha_inicio, fecha_fin, precio, observacion, destino_desde, destino_hasta, proveedor_id } = req.body;

      const [proveedor] = await pool.query('SELECT id FROM proveedores WHERE id = ?', [proveedor_id]);

      if (proveedor.length === 0) {
        return res.status(404).json({ status: 404, message: 'Proveedor no encontrado.' });
      }

      const [result] = await pool.query('INSERT INTO campanhas(nombre, hora_salida, fecha_inicio, fecha_fin, precio, observacion, proveedor_id) VALUES (?, ?, ?, ?, ?, ?, ?)', 
                    [nombre, tiempo_salida, fecha_inicio, fecha_fin, precio, observacion, proveedor_id]);

      const campanhaId = result.insertId;

      const [resultDestinoDesde] = await pool.query('INSERT INTO campanhas_destinos(campanha_id, destino_id, validate_destino) VALUES (?, ?, ?)', 
                    [campanhaId, destino_desde, 1]);
      
      const [resultDestinoHasta] = await pool.query('INSERT INTO campanhas_destinos(campanha_id, destino_id, validate_destino) VALUES (?, ?, ?)', 
                    [campanhaId, destino_hasta, 2]);

      return res.status(201).json({ status: 200, message: 'Se ha registrado exitosamente.'});
    } catch (error) {
      return res.status(500).json({ status: 500, message: error.message });
    }
};

export const updateCampanha = async (req, res) => {
    try {
      const { id, nombre, tiempo_salida, fecha_inicio, fecha_fin, precio, observacion, destino_desde_id, destino_desde, destino_hasta_id, destino_hasta, proveedor_id } = req.body;

      const [proveedor] = await pool.query('SELECT id FROM proveedores WHERE id = ?', [proveedor_id]);

      if (proveedor.length === 0) {tiempo_salida
        return res.status(404).json({ status: 404, message: 'Proveedor no encontrado.' });
      }

      const [campanha] = await pool.query('SELECT id FROM campanhas WHERE id = ? AND proveedor_id = ?', [id, proveedor_id]);

      if (campanha.length === 0) {
        return res.status(404).json({ status: 404, message: 'Campaña no encontrada o no pertenece al proveedor.' });
      }

      const [result] = await pool.query('UPDATE campanhas SET nombre = ?, hora_salida = ?, fecha_inicio = ?, fecha_fin = ?, precio = ?, observacion = ? WHERE id = ? AND proveedor_id = ?',
                                      [nombre, tiempo_salida, fecha_inicio, fecha_fin, precio, observacion, id, proveedor_id]);

      const [resultDestinoDesde] = await pool.query('UPDATE campanhas_destinos SET destino_id = ? WHERE id = ? AND campanha_id = ?', 
                    [destino_desde, destino_desde_id ,id]);
      
      const [resultDestinoHasta] = await pool.query('UPDATE campanhas_destinos SET destino_id = ? WHERE id = ? AND campanha_id = ?', 
                    [destino_hasta, destino_hasta_id ,id]);
  
      return res.status(201).json({ status: 200, message: 'Se ha actualizado exitosamente.'});
    } catch (error) {
      return res.status(500).json({ status: 500, message: error.message });
    }
};

export const deleteCampanha = async (req, res) => {
  try {
    const { id, destino_desde, destino_hasta, proveedor_id } = req.body;
    const [proveedor] = await pool.query('SELECT id FROM proveedores WHERE id = ?', [proveedor_id]);

    if (proveedor.length === 0) {
      return res.status(404).json({ status: 404, message: 'Proveedor no encontrado.' });
    }

    const [resultDestinoDesde] = await pool.query('DELETE FROM campanhas_destinos WHERE campanha_id = ? AND destino_id = ?', [id, destino_desde]);
    
    const [resultDestinoHasta] = await pool.query('DELETE FROM campanhas_destinos WHERE campanha_id = ? AND destino_id = ?', [id, destino_hasta]);
    
    const [result] = await pool.query('DELETE FROM campanhas WHERE id = ? AND proveedor_id = ?', [id, proveedor_id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Campanha no encontrado" });
    }
    return res.status(201).json({ status: 200, message: 'Se ha eliminado exitosamente.'});
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
};

export const getCampanhasProveedor = async (req, res) => {
  try {
    const { proveedor_id } = req.body;  

    const [proveedor] = await pool.query('SELECT id FROM proveedores WHERE id = ?', [proveedor_id]);

    if (proveedor.length === 0) {
      return res.status(404).json({ status: 404, message: 'Proveedor no encontrado.' });
    }

    const [result] = await pool.query(`SELECT id, nombre FROM campanhas WHERE proveedor_id = ?`, [proveedor_id]);
  
    res.json(result);  
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
};

export const getCampanhasDestinosDesde = async (req, res) => {
  try {
    const { campanha_id } = req.body;  

    const [campanha] = await pool.query('SELECT id FROM campanhas WHERE id = ?', [campanha_id]);
    if (campanha.length === 0) {
      return res.status(404).json({ status: 404, message: 'Campanha no encontrada.' });
    }

    const [result] = await pool.query(`
      SELECT MIN(cd.id) AS campanha_destino_id, d.nombre AS destino_nombre 
      FROM campanhas_destinos cd
      JOIN destinos d ON cd.destino_id = d.id
      WHERE cd.campanha_id = ? AND cd.validate_destino = 1
      GROUP BY cd.destino_id, d.nombre`, [campanha_id]);

    res.json(result);  
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
};

export const getCampanhasDestinosHasta = async (req, res) => {
  try {
    const { campanha_id } = req.body;  

    const [campanha] = await pool.query('SELECT id FROM campanhas WHERE id = ?', [campanha_id]);
    if (campanha.length === 0) {
      return res.status(404).json({ status: 404, message: 'Campanha no encontrada.' });
    }

    const [result] = await pool.query(`
      SELECT MIN(cd.id) AS campanha_destino_id, d.nombre AS destino_nombre 
      FROM campanhas_destinos cd
      JOIN destinos d ON cd.destino_id = d.id
      WHERE cd.campanha_id = ? AND cd.validate_destino = 2
      GROUP BY cd.destino_id, d.nombre`, [campanha_id]);
  
    res.json(result);  
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
};