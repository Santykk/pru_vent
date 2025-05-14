import express from 'express';
import postgres from 'postgres';
import dotenv from 'dotenv';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';  // Importar cliente de Supabased

// Cargar variables de entorno
dotenv.config();

// Crear cliente de Supabase usando la URL y la clave anónima
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

// Obtener __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// **Configurar Express**
const app = express();
const port = process.env.PORT || 4000;

// **Middlewares**
app.use(cors());
app.use(express.json()); // Para recibir JSON en las peticiones
app.use(express.urlencoded({ extended: true })); // Para recibir datos de formularios
app.use(express.static(path.join(__dirname, 'public')));

// **Probar conexión a la base de datos**
(async () => {
    try {
        const test = await sql`SELECT 1 + 1 AS result`;
        console.log('✅ Conexión a la base de datos exitosa:', test);
    } catch (error) {
        console.error('❌ Error en la conexión a la base de datos:', error.message);
    }
})();

// **Carga dinámica de rutas desde la carpeta "api"**
const apiPath = __dirname;
fs.readdirSync(apiPath).forEach((file) => {
    if (file.endsWith('.js')) {
        import(`./api/${file}`).then((module) => {
            app.use(`/api/${file.replace('.js', '')}`, module.default);
            console.log(`📌 Cargada API: /api/${file.replace('.js', '')}`);
        }).catch(error => {
            console.error(`⚠️ Error al cargar /api/${file}:`, error);
        });
    }
});

// **Ruta dinámica para acceder a archivos HTML dentro de "public/html" sin .html**
app.get('/app/:page', (req, res) => {
    const page = req.params.page;
    const filePath = path.join(__dirname, 'public/html', `${page}.html`);

    // Verifica si el archivo existe antes de enviarlo
    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.status(404).send('Página no encontrada');
    }
});



app.get('/session-expired', (req, res) => {
    const filePath = path.join(__dirname, 'public/html', 'session.html');

    // Verifica si el archivo existe antes de enviarlo
    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.status(404).send('Página no encontrada');
    }
});




app.get('/auth', (req, res) => {
    const filePath = path.join(__dirname, 'public', 'index.html');

    // Verifica si el archivo existe antes de enviarlo
    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.status(404).send('Página no encontrada');
    }
});



// Iniciar servidor en puerto 3000 (o el que prefieras)
app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000');
});



app.get('/auth/signup', (req, res) => {
    const role = req.query.role; // Obtiene el valor del query string "?role=user"
    const filePath = path.join(__dirname, 'public/html', 'validate.html');

    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.status(404).send('Página no encontrada');
    }

    console.log(`Signup con rol: ${role}`); // Opcional, para ver en la consola qué rol se recibe
});


// **Redirigir raíz (/) a home.html**
app.get('/auth', (req, res) => {
    res.redirect('index.html'); // Cambia "home" por la página que quieras mostrar por defecto
});

// **Iniciar servidor**
app.listen(port, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
});

export default supabase;