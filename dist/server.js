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
// Middleware
app.use((0, cors_1.default)({
    origin: "http://localhost:5500", // Sesuaikan dengan URL frontend Anda
    credentials: true,
}));
app.use(body_parser_1.default.json()); // Untuk membaca JSON pada request body
// Koneksi ke MySQL
const db = mysql2_1.default.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "diagram_keluarga",
});
db.connect((err) => {
    if (err) {
        console.error("❌ Gagal konek ke database:", err);
    }
    else {
        console.log("✅ Terkoneksi ke MySQL!");
    }
});
// 🟢 API: Register user baru
app.post("/register", (req, res) => {
    const { email, password, namaLengkap } = req.body;
    if (!email || !password || !namaLengkap) {
        return res.status(400).json({ message: "Semua field wajib diisi.", success: false });
    }
    const query = "INSERT INTO users (email, password, nama_lengkap) VALUES (?, ?, ?)";
    db.query(query, [email, password, namaLengkap], (err, result) => {
        if (err) {
            console.error("❌ Error insert:", err);
            return res.status(500).json({ message: "Gagal mendaftar", error: err, success: false });
        }
        res.json({ message: "Berhasil mendaftar", userId: result.insertId, success: true });
    });
});
// 🟢 API: Login user
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email dan password harus diisi.", success: false });
    }
    const query = "SELECT * FROM users WHERE email = ? AND password = ?";
    db.query(query, [email, password], (err, results) => {
        if (err) {
            console.error("❌ Error login:", err);
            return res.status(500).json({ message: "Terjadi kesalahan saat login.", success: false });
        }
        if (results.length === 0) {
            return res.status(401).json({ message: "Email atau password salah.", success: false });
        }
        const user = results[0];
        res.json({ message: "Login berhasil", user, success: true });
    });
});
// Jalankan server
app.listen(port, () => {
    console.log(`🚀 Server aktif di http://localhost:${port}`);
});
