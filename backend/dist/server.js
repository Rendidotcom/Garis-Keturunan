"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mysql2_1 = __importDefault(require("mysql2"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const port = 3000;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
// Koneksi ke MySQL (XAMPP)
const db = mysql2_1.default.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'diagram_keluarga'
});
db.connect((err) => {
    if (err) {
        console.error('Gagal koneksi ke database:', err);
        return;
    }
    console.log('Terhubung ke MySQL');
});
// Contoh route login
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
    db.query(query, [username, password], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        if (results.length > 0) {
            res.json({ success: true, message: 'Login berhasil' });
        }
        else {
            res.status(401).json({ success: false, message: 'Username atau password salah' });
        }
    });
});
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
// Route untuk registrasi
app.post('/api/register', (req, res) => {
    const { username, password } = req.body;
    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [username], (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      if (results.length > 0) {
        return res.status(400).json({ success: false, message: 'Email sudah digunakan' });
      } else {
        // Insert user baru ke database
        const insertQuery = 'INSERT INTO users (username, password) VALUES (?, ?)';
        db.query(insertQuery, [username, password], (err, results) => {
          if (err) {
            return res.status(500).json({ error: 'Database error' });
          }
          res.json({ success: true, message: 'Registrasi berhasil' });
        });
      }
    });
  });
  