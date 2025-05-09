"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var button = document.getElementById("myButton");
button.addEventListener("click", function () {
    alert("Halo! Ini dari Widi Ilahi 🎉");
});
var form = document.getElementById("formKeluarga");
var namaInput = document.getElementById("nama");
var hubunganInput = document.getElementById("hubungan");
var daftar = document.getElementById("daftarKeluarga");
var dataKeluarga = [];
form.addEventListener("submit", function (e) {
    e.preventDefault();
    var anggota = {
        nama: namaInput.value,
        hubungan: hubunganInput.value,
    };
    dataKeluarga.push(anggota);
    tampilkanDaftar();
    // Reset input
    namaInput.value = "";
    hubunganInput.value = "";
});
function tampilkanDaftar() {
    daftar.innerHTML = "";
    dataKeluarga.forEach(function (a) {
        var li = document.createElement("li");
        li.textContent = "".concat(a.nama, " (").concat(a.hubungan, ")");
        daftar.appendChild(li);
    });
}
