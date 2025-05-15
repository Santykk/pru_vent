import express from 'express';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const router = express.Router();
router.use(express.json());

// Crear cliente Supabase
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

// Obtener todas las ventas
router.get('/', async (_req, res) => {
  try {
    const { data: sales, error } = await supabase
      .from('sales')
      .select('*')
      .order('sale_date', { ascending: false });

    if (error) throw error;

    res.json({ success: true, sales });
  } catch (error) {
    console.error('Error al obtener ventas:', error.message);
    res.status(500).json({ success: false, message: 'Error al obtener ventas.' });
  }
});

// Insertar una venta
router.post('/', async (req, res) => {
  const { sale_date, payment_method, total_price } = req.body;

  if (!sale_date || !payment_method || !total_price) {
    return res.status(400).json({ success: false, message: 'Faltan datos para registrar la venta.' });
  }

  try {
    const { data, error } = await supabase
      .from('sales')
      .insert([{ sale_date, payment_method, total_amount: total_price }])
      .select('sale_code');

    if (error) throw error;

    res.status(201).json({ success: true, sale_code: data[0].sale_code });
  } catch (error) {
    console.error('Error al registrar la venta:', error.message);
    res.status(500).json({ success: false, message: 'Error al registrar la venta.' });
  }
});

// Eliminar una venta
router.delete('/:sale_code', async (req, res) => {
  const saleCode = req.params.sale_code;

  try {
    const { data, error } = await supabase
      .from('sales')
      .delete()
      .eq('sale_code', saleCode);

    if (error) throw error;
    if (data.length === 0) {
      return res.status(404).json({ success: false, message: 'Venta no encontrada.' });
    }

    res.json({ success: true, message: 'Venta eliminada correctamente.' });
  } catch (error) {
    console.error('Error al eliminar venta:', error.message);
    res.status(500).json({ success: false, message: 'Error al eliminar venta.' });
  }
});

export default router;
