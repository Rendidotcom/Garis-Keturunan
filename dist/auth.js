"use strict";

exports.login = function (email, password) {
  // Mengirimkan data login ke backend
  return fetch('http://localhost:3000/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: email,  // Gunakan email untuk username
      password: password
    })
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      // Jika login berhasil
      localStorage.setItem("currentUserId", email);  // Menyimpan email sebagai ID pengguna
      return true;
    } else {
      return false;
    }
  })
  .catch(error => {
    console.error('Error:', error);
    return false;
  });
};

exports.register = function (email, password) {
  // Mengirimkan data registrasi ke backend
  return fetch('http://localhost:3000/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: email,  // Gunakan email untuk username
      password: password
    })
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      // Jika registrasi berhasil
      return true;
    } else {
      return false;
    }
  })
  .catch(error => {
    console.error('Error:', error);
    return false;
  });
};
