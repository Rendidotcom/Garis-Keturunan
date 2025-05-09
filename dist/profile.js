"use strict";
// Ambil elemen DOM sesuai ID di HTML
const idEl = document.getElementById("user-id");
const usernameEl = document.getElementById("username");
const fotoInput = document.getElementById("foto-input");
const fotoEl = document.getElementById("foto-profil");
const namaInput = document.getElementById("nama-lengkap");
const simpanBtn = document.getElementById("simpan-profil");
const logoutBtn = document.getElementById("logout");
// Ambil user aktif dari localStorage
function getCurrentUser() {
    const email = localStorage.getItem("currentUser");
    if (!email)
        return null;
    const usersString = localStorage.getItem("users");
    if (!usersString)
        return null;
    const users = JSON.parse(usersString);
    return users.find(user => user.email === email) || null;
}
// Tampilkan data user di halaman
function tampilkanProfil(user) {
    idEl.textContent = user.id;
    usernameEl.textContent = user.email;
    namaInput.value = user.namaLengkap || "";
    fotoEl.src = user.foto || "default.png";
}
// Simpan perubahan profil
function simpanProfil() {
    var _a;
    const user = getCurrentUser();
    if (!user)
        return;
    const usersString = localStorage.getItem("users");
    if (!usersString)
        return;
    const users = JSON.parse(usersString);
    const index = users.findIndex(u => u.email === user.email);
    if (index === -1)
        return;
    users[index].namaLengkap = namaInput.value;
    // Simpan foto jika ada
    const file = (_a = fotoInput.files) === null || _a === void 0 ? void 0 : _a[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            users[index].foto = reader.result;
            localStorage.setItem("users", JSON.stringify(users));
            alert("Profil berhasil disimpan!");
            tampilkanProfil(users[index]);
        };
        reader.readAsDataURL(file);
    }
    else {
        localStorage.setItem("users", JSON.stringify(users));
        alert("Profil berhasil disimpan!");
        tampilkanProfil(users[index]);
    }
}
// Logout
function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
}
// Jalankan saat halaman dibuka
document.addEventListener("DOMContentLoaded", () => {
    const user = getCurrentUser();
    if (!user) {
        window.location.href = "index.html";
        return;
    }
    tampilkanProfil(user);
});
// Tambahkan event listener
simpanBtn.addEventListener("click", simpanProfil);
logoutBtn.addEventListener("click", logout);
// Fungsi ubah akun belum diisi
function ubahAkun() {
    const newEmail = document.getElementById("editEmail").value;
    const newPassword = document.getElementById("editPassword").value;
    const user = getCurrentUser();
    if (!user)
        return;
    const usersString = localStorage.getItem("users");
    if (!usersString)
        return;
    const users = JSON.parse(usersString);
    const index = users.findIndex(u => u.email === user.email);
    if (index === -1)
        return;
    if (newEmail)
        users[index].email = newEmail;
    if (newPassword)
        users[index].password = newPassword;
    localStorage.setItem("users", JSON.stringify(users));
    if (newEmail) {
        localStorage.setItem("currentUser", newEmail);
    }
    alert("Akun berhasil diperbarui. Silakan login ulang jika diperlukan.");
    tampilkanProfil(users[index]);
}
