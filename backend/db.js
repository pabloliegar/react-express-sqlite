const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Abrir base de datos (se crea si no existe)
const db = new sqlite3.Database(path.resolve(__dirname, 'database.sqlite'), (err) => {
  if (err) console.error('Error al abrir DB:', err);
  else console.log('Base de datos abierta');
});

// Crear tabla usuarios si no existe
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      email TEXT NOT NULL
    )
  `);
});

module.exports = db;
