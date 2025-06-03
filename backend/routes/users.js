const express = require('express');
const router = express.Router();
const db = require('../db');  // importar la conexión

// Obtener todos los usuarios
router.get('/', (req, res) => {
  db.all('SELECT * FROM users', (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error en la base de datos' });
    }
    res.json(rows);
  });
});

// Crear usuario nuevo
router.post('/', (req, res) => {
  console.log('POST /api/users body:', req.body);  // <--- log
  const { username, email } = req.body;
  if (!username || !email) {
    console.log('Faltan datos:', req.body);
    return res.status(400).json({ error: 'Faltan datos' });
  }

  const sql = 'INSERT INTO users (username, email) VALUES (?, ?)';
  db.run(sql, [username, email], function (err) {
    if (err) {
      console.error('Error al insertar:', err);
      return res.status(500).json({ error: 'Error al insertar en la base de datos' });
    }
    res.json({ id: this.lastID, username, email });
  });
});


module.exports = router;
