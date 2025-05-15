import express from 'express';
import dotenv from 'dotenv';
import postgres from 'postgres';

dotenv.config();

const router = express.Router();
router.use(express.json());

const sql = postgres(process.env.DATABASE_URL, {
  debug: (connection, query, params) => {
    console.log('SQL Query:', query, 'Params:', params);
  },
});

// Obtener productos, con filtro opcional por user_id
router.get('/', async (req, res) => {
  const { user_id } = req.query;

  try {
    let productos;

    if (user_id) {
      productos = await sql`
        SELECT * FROM producto_prd
        WHERE user_id = ${user_id}
        ORDER BY created_at DESC
      `;
    } else {
      productos = await sql`
        SELECT * FROM producto_prd
        ORDER BY created_at DESC
      `;
    }

    res.json({ success: true, productos });
  } catch (error) {
    console.error('Error al obtener productos:', error.message);
    res.status(500).json({ success: false, message: 'Error al obtener productos.' });
  }
});

// Insertar un producto
router.post('/', async (req, res) => {
  const {
    nombre_tprd,
    categoria_tprd,
    precio_nprd,
    descripcion_tprd,
    imagenprinc_tprd,
    imagen1_tprd,
    imagen2_tprd,
    imagen3_tprd,
    imagen4_tprd,
    imagen5_tprd,
    stock_nprd,
    user_id
  } = req.body;

  if (!nombre_tprd || !precio_nprd || !stock_nprd || !user_id) {
    return res.status(400).json({ success: false, message: 'Faltan campos obligatorios.' });
  }

  try {
    const result = await sql`
      INSERT INTO producto_prd (
        nombre_tprd, categoria_tprd, precio_nprd, descripcion_tprd, imagenprinc_tprd,
        imagen1_tprd, imagen2_tprd, imagen3_tprd, imagen4_tprd, imagen5_tprd,
        stock_nprd, user_id
      ) VALUES (
        ${nombre_tprd}, ${categoria_tprd}, ${precio_nprd}, ${descripcion_tprd}, ${imagenprinc_tprd},
        ${imagen1_tprd}, ${imagen2_tprd}, ${imagen3_tprd}, ${imagen4_tprd}, ${imagen5_tprd},
        ${stock_nprd}, ${user_id}
      )
      RETURNING id_uprd
    `;

    res.status(201).json({ success: true, id_uprd: result[0].id_uprd });
  } catch (error) {
    console.error('Error al insertar producto:', error.message);
    res.status(500).json({ success: false, message: 'Error al insertar producto.' });
  }
});

// Eliminar un producto por id_uprd
router.delete('/:id_uprd', async (req, res) => {
  const { id_uprd } = req.params;

  try {
    const result = await sql`
      DELETE FROM producto_prd WHERE id_uprd = ${id_uprd} RETURNING *
    `;

    if (result.length === 0) {
      return res.status(404).json({ success: false, message: 'Producto no encontrado.' });
    }

    res.json({ success: true, message: 'Producto eliminado correctamente.' });
  } catch (error) {
    console.error('Error al eliminar producto:', error.message);
    res.status(500).json({ success: false, message: 'Error al eliminar producto.' });
  }
});

// Verificar conexión a la base de datos
sql`SELECT 1`.then(() => {
  console.log('Conexión a la base de datos establecida correctamente');
}).catch((err) => {
  console.error('Error al conectar a la base de datos:', err);
});

export default router;
