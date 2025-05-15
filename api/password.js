// api/forgot-password.js

import express from 'express';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const router = express.Router();

// Inicializar Supabase
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

// 🔹 Ruta POST para recuperación de contraseña
router.post('/', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: 'El correo es requerido' });
  }

  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'http://localhost:3000/cambiar-clave.html' // Cambia esto según tu frontend
    });

    if (error) {
      return res.status(500).json({ success: false, message: 'Error: ' + error.message });
    }

    res.status(200).json({
      success: true,
      message: '✅ Enlace de recuperación enviado al correo',
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error interno: ' + err.message });
  }
});

export default router;
