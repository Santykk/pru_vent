import express from 'express';
import dotenv from 'dotenv';

dotenv.config(); // Cargar variables de entorno

const app = express();
const port = process.env.PORT || 4000;


app.get('/', (req, res) => {
  res.send('index.html')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})