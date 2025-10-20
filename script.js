// Header: nav toggle mobile
const navToggle = document.getElementById('navToggle');
const siteNav = document.getElementById('siteNav');
navToggle?.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  if (siteNav.style.display === 'block') {
    siteNav.style.display = '';
  } else {
    siteNav.style.display = 'block';
  }
});

// Aggiorna anno footer
document.getElementById('year').textContent = new Date().getFullYear();

// Gestione form (se usi Formspree basta lasciare action; qui gestiamo la UI)
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');

if (form) {
  form.addEventListener('submit', async (e) => {
    // Se action è ancora quello di Formspree, il browser invierà il POST;
// qui intercettiamo solo per mostrare messaggio migliore all'utente.
    e.preventDefault();
    const action = form.getAttribute('action');
    const formData = new FormData(form);

    try {
      // se non hai un action reale, simuliamo una "inviazione"
      if (!action || action.includes('YOUR_FORM_ID')) {
        // simulazione
        status.textContent = 'Invio simulato: riceverai una conferma locale. Sostituisci action con Formspree per invio reale.';
        form.reset();
        return;
      }

      // invio reale con fetch (Formspree supporta JSON o form-data)
      const response = await fetch(action, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: formData
      });

      if (response.ok) {
        status.textContent = 'Messaggio inviato. Riceverai una conferma via email se configurata.';
        form.reset();
      } else {
        const data = await response.json();
        status.textContent = data?.error || 'Si è verificato un errore durante l\'invio.';
      }
    } catch (err) {
      status.textContent = 'Errore di rete. Riprova più tardi.';
      console.error(err);
    }
  });
}
