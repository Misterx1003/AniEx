// login.js
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('login-form');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const enteredUsername = document.getElementById('login-username').value;
    const enteredPassword = document.getElementById('login-password').value;

    const savedUsername = localStorage.getItem('registeredUsername');
    const savedPassword = localStorage.getItem('registeredPassword');

    if (enteredUsername === savedUsername && enteredPassword === savedPassword) {
      localStorage.setItem('currentUser', enteredUsername);
      window.location.href = 'dashboard.html';
    } else {
      alert('Неверное имя пользователя или пароль');
    }
  });
});
