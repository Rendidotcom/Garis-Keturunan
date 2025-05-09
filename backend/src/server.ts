import express from 'express';
import cors from 'cors';  // import cors
import mysql from 'mysql2';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

// Gunakan middleware cors
app.use(cors());  // Menambahkan CORS middleware

app.use(bodyParser.json());

// Koneksi ke MySQL (XAMPP)
const db = mysql.createConnection({
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
    } else {
      res.status(401).json({ success: false, message: 'Username atau password salah' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
