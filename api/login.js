// server.js

import express from 'express';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// Inicializar Supabase
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

app.use(express.json()); // Middleware para JSON

// 🔹 LOGIN con Supabase y token local
app.post('/api/login', async (req, res) => {
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

    // Crear token de sesión local (opcional, para frontend o cookies)
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

app.listen(port, () => {
  console.log(`✅ API escuchando en el puerto ${port}`);
});
