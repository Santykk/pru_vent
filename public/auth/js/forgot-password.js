// Crear cliente de Supabase usando la URL y la clave anónima
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);


    // Enviar correo de recuperación
    document.getElementById('forgot-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;

      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'https://tudominio.com/cambiar-clave.html'
      });

      const msg = document.getElementById('message');
      if (error) {
        msg.textContent = '❌ Error: ' + error.message;
      } else {
        msg.textContent = '✅ Se ha enviado el enlace a tu correo.';
      }
    });