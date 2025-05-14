// api/login.js

import express from 'express';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

dotenv.config();

const router = express.Router();
const sql = postgres(process.env.DATABASE_URL, {
  debug: (connection, query, params) => {
    console.log('SQL Query:', query, 'Params:', params);
  }
});

// 🔹 LOGIN con Supabase y token local
router.post('/', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Autenticación Supabase
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      return res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
    }

    const userId = authData.user.id;

    // Buscar el rol desde tabla personalizada
    const { data: roleData, error: roleError } = await supabase
      .from('usuariorol_usrl')
      .select('role_tusrl')
      .eq('id_uusrl', userId)
      .single();

    if (roleError || !roleData) {
      return res.status(404).json({ success: false, message: 'Rol no encontrado' });
    }

    // Crear token de sesión local
    const token = crypto.randomBytes(32).toString('hex');

    // 🚀 Respuesta final
    res.status(200).json({
      success: true,
      userId,
      email,
      role: roleData.role_tusrl,
      token,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error interno: ' + error.message });
  }
});

// ✅ Exportar el router como default para que lo reconozca tu sistema dinámico
export default router;
