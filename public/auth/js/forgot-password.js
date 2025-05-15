document.getElementById('forgot-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;

    try {
      const response = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      const result = await response.json();
      const msg = document.getElementById('message');

      if (result.success) {
        msg.textContent = result.message;
        msg.style.color = 'green';
      } else {
        msg.textContent = '❌ ' + result.message;
        msg.style.color = 'red';
      }
    } catch (err) {
      document.getElementById('message').textContent = '❌ Error inesperado: ' + err.message;
    }
  });