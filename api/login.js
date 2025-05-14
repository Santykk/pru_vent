// server.js

import express from 'express';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config(); // Cargar las variables de entorno

const app = express();
const port = process.env.PORT || 4000;

// Inicializa Supabase
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

app.use(express.json()); // Para poder leer el cuerpo de las peticiones JSON

// Ruta para iniciar sesión
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Iniciar sesión con el email y password
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      return res.status(401).json({ error: 'Error en la autenticación: ' + authError.message });
    }

    const userId = authData.user.id;

    // Obtener el rol del usuario desde la tabla 'usuarios_roles'
    const { data: roleData, error: roleError } = await supabase
      .from('usuarios_roles')
      .select('role_tusrl')
      .eq('user_id', userId)
      .single();

    if (roleError) {
      return res.status(404).json({ error: 'No se encontró el rol del usuario' });
    }

    // Responder con los datos del usuario y su rol
    res.status(200).json({
      userId,
      role: roleData.role_tusrl,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor: ' + error.message });
  }
});

app.listen(port, () => {
  console.log(`API escuchando en el puerto ${port}`);
});
