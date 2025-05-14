// api/login.js

import express from 'express';
import dotenv from 'dotenv';
import { Client } from 'pg'; // Importamos el cliente de PostgreSQL
import crypto from 'crypto';

dotenv.config();

const router = express.Router();

// Crear cliente de PostgreSQL
const client = new Client({
  connectionString: process.env.DATABASE_URL, // Usar la URL de conexión de PostgreSQL
  ssl: { rejectUnauthorized: false }, // Necesario si estás usando una conexión SSL (dependiendo de la configuración)
});

client.connect(); // Conectar al servidor de base de datos

// 🔹 LOGIN con PostgreSQL y token local
router.post('/', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Autenticación en la base de datos de PostgreSQL
    const query = 'SELECT * FROM usuarios WHERE email = $1 AND password = $2';
    const values = [email, password];
    const result = await client.query(query, values);

    if (result.rowCount === 0) {
      return res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
    }

    const user = result.rows[0];
    const userId = user.id;

    // Buscar el rol desde la tabla personalizada
    const roleQuery = 'SELECT role_tusrl FROM usuariorol_usrl WHERE id_uusrl = $1';
    const roleResult = await client.query(roleQuery, [userId]);

    if (roleResult.rowCount === 0) {
      return res.status(404).json({ success: false, message: 'Rol no encontrado' });
    }

    const roleData = roleResult.rows[0];

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
