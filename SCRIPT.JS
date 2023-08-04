// Importamos los módulos necesarios
const express = require('express');
const bodyParser = require('body-parser');

// Creamos la aplicación de Express
const app = express();
const port = 3000; // Puedes cambiar el número de puerto según tus necesidades

// Middleware para parsear el body de las peticiones como JSON
app.use(bodyParser.json());

// Endpoint para '/api/'
app.get('/api/', (req, res) => {
  res.status(200).json({ mensaje: 'hola mundo' });
});

// Endpoint para '/api/suma'
app.get('/api/suma', (req, res) => {
  const num1 = parseInt(req.query.num1);
  const num2 = parseInt(req.query.num2);

  if (isNaN(num1) || isNaN(num2)) {
    res.status(400).json({ error: 'Los parámetros num1 y num2 deben ser números válidos' });
  } else {
    const resultado = num1 + num2;
    res.status(200).json({ resultado });
  }
});

// Endpoint para '/api/usuario/'
app.get('/api/usuario/:nombre', (req, res) => {
  const nombreUsuario = req.params.nombre;
  res.status(200).json({ usuario: nombreUsuario });
});

// Endpoint para '/api/swapi'
const axios = require('axios');
app.get('/api/swapi/:numero', async (req, res) => {
  const numeroPersonaje = req.params.numero;
  try {
    const response = await axios.get(`https://swapi.dev/api/people/${numeroPersonaje}/`);
    const personaje = response.data;
    res.status(200).json({ personaje });
  } catch (error) {
    res.status(404).json({ error: 'No se encontró el personaje solicitado' });
  }
});

// Endpoint para '/api/body'
app.put('/api/body', (req, res) => {
  const requestBody = req.body;
  res.status(200).json(requestBody);
});

// Endpoint para el ejercicio 2 con una petición POST
app.post('/api/suma', (req, res) => {
  const num1 = parseInt(req.body.num1);
  const num2 = parseInt(req.body.num2);

  if (isNaN(num1) || isNaN(num2)) {
    res.status(400).json({ error: 'Los parámetros num1 y num2 deben ser números válidos' });
  } else {
    const resultado = num1 + num2;
    res.status(200).json({ resultado });
  }
});

// Endpoint para la petición de tipo DELETE
app.delete('/api/eliminar/:id', (req, res) => {
  const id = parseInt(req.params.id);

  if (id === 3) {
    res.status(200).json({ mensaje: `Se ha eliminado el objeto con ID ${id}` });
  } else {
    res.status(404).json({ mensaje: 'No se encontró el objeto con el ID especificado' });
  }
});

// Iniciamos el servidor en el puerto especificado
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
