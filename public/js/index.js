// login.js

document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // Guardar los datos en localStorage
      localStorage.setItem('user_id', data.userId);
      localStorage.setItem('role_tusrl', data.role);

      document.getElementById('responseMessage').textContent = `Bienvenido, tu rol es: ${data.role}`;
    } else {
      document.getElementById('responseMessage').textContent = data.error;
    }
  } catch (error) {
    document.getElementById('responseMessage').textContent = 'Error al conectar con el servidor.';
  }
});
