"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ambilSemuaUser = ambilSemuaUser;
exports.simpanSemuaUser = simpanSemuaUser;
exports.ambilUserLogin = ambilUserLogin;
exports.simpanUserLogin = simpanUserLogin;
function ambilSemuaUser() {
    var data = localStorage.getItem("users");
    return data ? JSON.parse(data) : [];
}
function simpanSemuaUser(users) {
    localStorage.setItem("users", JSON.stringify(users));
}
function ambilUserLogin() {
    var data = localStorage.getItem("userLogin");
    return data ? JSON.parse(data) : null;
}
function simpanUserLogin(user) {
    localStorage.setItem("userLogin", JSON.stringify(user));
}
