import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// Para obtener __dirname en ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// **Carga dinámica de rutas desde la carpeta "api"**
const apiPath = path.join(__dirname, 'api');
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

// Servir archivos estáticos desde "public"
app.use(express.static(path.join(__dirname, 'public')));

// Ruta principal: enviar index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
