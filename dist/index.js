"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
var auth_1 = require("./auth");

(_a = document.getElementById("formLogin")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", function (e) {
  e.preventDefault();
  var email = document.getElementById("loginEmail").value;
  var password = document.getElementById("loginPassword").value;
  (0, auth_1.login)(email, password).then(function (result) {
    if (result) {
      alert("Login berhasil!");
      window.location.href = "profile.html";
    } else {
      alert("Email atau password salah.");
    }
  });
});

(_b = document.getElementById("formRegister")) === null || _b === void 0 ? void 0 : _b.addEventListener("submit", function (e) {
  e.preventDefault();
  var email = document.getElementById("regEmail").value;
  var password = document.getElementById("regPassword").value;
  (0, auth_1.register)(email, password).then(function (result) {
    if (result) {
      alert("Registrasi berhasil!");
    } else {
      alert("Email sudah digunakan.");
    }
  });
});
