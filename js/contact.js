/* ── Kontaktformular: Validierung und Webhook-Versand ── */
(function() {
  // ============================================================
  // WEBHOOK URL KONFIGURATION
  // Ersetze diese URL mit dem echten n8n Webhook-Endpoint:
  // z.B. 'https://agents.umzwei.de/webhook/contact-form'
  // ============================================================
  var WEBHOOK_URL = 'https://agents.umzwei.de/webhook/ullizelle-contact';

  var form = document.getElementById('contact-form');
  var submitBtn = document.getElementById('contact-submit');
  var msgEl = document.getElementById('form-msg');

  function showMsg(text, type) {
    msgEl.textContent = text;
    msgEl.className = 'form-msg ' + type;
  }

  function clearMsg() {
    msgEl.textContent = '';
    msgEl.className = 'form-msg';
  }

  function validateEmail(email) {
    return email.indexOf('@') > 0 && email.indexOf('.') > email.indexOf('@');
  }

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    clearMsg();

    // Alle invalid-Markierungen entfernen
    form.querySelectorAll('.invalid').forEach(function(el) {
      el.classList.remove('invalid');
    });

    var name = document.getElementById('contact-name');
    var email = document.getElementById('contact-email');
    var message = document.getElementById('contact-message');

    var errors = [];
    if (!name.value.trim()) {
      name.classList.add('invalid');
      errors.push('Name');
    }
    if (!email.value.trim() || !validateEmail(email.value.trim())) {
      email.classList.add('invalid');
      errors.push('E-Mail');
    }
    if (!message.value.trim()) {
      message.classList.add('invalid');
      errors.push('Nachricht');
    }

    if (errors.length > 0) {
      showMsg('Bitte fülle folgende Felder korrekt aus: ' + errors.join(', '), 'error');
      return;
    }

    // Absenden
    submitBtn.disabled = true;
    submitBtn.textContent = 'Wird gesendet...';

    var params = new URLSearchParams();
    params.append('name', name.value.trim());
    params.append('email', email.value.trim());
    params.append('projekttyp', document.getElementById('contact-type').value.trim());
    params.append('nachricht', message.value.trim());

    fetch(WEBHOOK_URL, {
      method: 'POST',
      body: params
    })
    .then(function(response) {
      if (response.ok) {
        showMsg('Vielen Dank! Deine Nachricht wurde gesendet. Ich melde mich in Kürze.', 'success');
        form.reset();
      } else {
        throw new Error('Server-Fehler');
      }
    })
    .catch(function() {
      showMsg('Leider konnte die Nachricht nicht gesendet werden. Bitte versuche es später erneut oder schreibe direkt an hello@ullizelle.de.', 'error');
    })
    .finally(function() {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Absenden \u2192';
    });
  });
})();
