document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm") as HTMLFormElement;
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = (document.getElementById("email") as HTMLInputElement).value;
      const password = (document.getElementById("password") as HTMLInputElement).value;

      const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find((u) => u.email === email && u.password === password);

      if (user) {
        localStorage.setItem("currentUserId", user.id);
        window.location.href = "profile.html";
      } else {
        alert("Email atau password salah.");
      }
    });
  }
});
