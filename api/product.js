import express from 'express';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const router = express.Router();

// Supabase client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

/* 🔹 Obtener todos los productos */
router.get('/api/product', async (req, res) => {
  try {
    const { data, error } = await supabase.from('producto_prd').select('*');

    if (error) throw error;

    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

/* 🔹 Obtener producto por ID */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('producto_prd')
      .select('*')
      .eq('id_uprd', id)
      .single();

    if (error || !data) throw new Error('Producto no encontrado');

    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
});

/* 🔹 Insertar producto */
router.post('/', async (req, res) => {
  try {
    const producto = req.body;

    if (!producto.user_id || !producto.nombre_tprd || !producto.precio_nprd) {
      return res.status(400).json({ success: false, message: 'Campos obligatorios faltantes' });
    }

    const { data, error } = await supabase.from('producto_prd').insert([producto]);

    if (error) throw error;

    res.status(201).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

/* 🔹 Editar producto por ID */
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const producto = req.body;

    const { data, error } = await supabase
      .from('producto_prd')
      .update(producto)
      .eq('id_uprd', id)
      .select();

    if (error || !data.length) throw new Error('Error al actualizar o producto no encontrado');

    res.status(200).json({ success: true, data: data[0] });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

/* 🔹 Eliminar producto por ID */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('producto_prd')
      .delete()
      .eq('id_uprd', id)
      .select();

    if (error || !data.length) throw new Error('No se pudo eliminar el producto');

    res.status(200).json({ success: true, message: 'Producto eliminado correctamente' });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

export default router;
