/* ── Kontaktformular: Validierung, Anti-Spam und Webhook-Versand ── */
(function() {
  var WEBHOOK_URL = 'https://agents.umzwei.de/webhook/ullizelle-contact';
  var MIN_SUBMIT_TIME_MS = 3000; // Mensch braucht mindestens 3 Sekunden

  var form = document.getElementById('contact-form');
  var submitBtn = document.getElementById('contact-submit');
  var msgEl = document.getElementById('form-msg');
  var tsField = document.getElementById('contact-ts');

  // Timestamp setzen wenn Seite geladen wird
  tsField.value = Date.now().toString();

  function showMsg(text, type) {
    msgEl.textContent = text;
    msgEl.className = 'form-msg ' + type;
  }

  function clearMsg() {
    msgEl.textContent = '';
    msgEl.className = 'form-msg';
  }

  function validateEmail(email) {
    var at = email.indexOf('@');
    return at > 0 && email.lastIndexOf('.') > at;
  }

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    clearMsg();

    // Anti-Spam: Honeypot pruefen
    var honeypot = document.getElementById('contact-website');
    if (honeypot.value) {
      // Bot erkannt — tue so als waere es erfolgreich
      showMsg('Vielen Dank! Deine Nachricht wurde gesendet. Ich melde mich in Kürze.', 'success');
      form.reset();
      return;
    }

    // Anti-Spam: Zeitpruefung
    var loadedAt = parseInt(tsField.value, 10);
    var elapsed = Date.now() - loadedAt;
    if (elapsed < MIN_SUBMIT_TIME_MS) {
      showMsg('Vielen Dank! Deine Nachricht wurde gesendet. Ich melde mich in Kürze.', 'success');
      form.reset();
      return;
    }

    // Alle invalid-Markierungen entfernen
    form.querySelectorAll('.invalid').forEach(function(el) {
      el.classList.remove('invalid');
    });

    var name = document.getElementById('contact-name');
    var email = document.getElementById('contact-email');
    var message = document.getElementById('contact-message');
    var dsgvo = document.getElementById('contact-dsgvo');

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
    if (!dsgvo.checked) {
      errors.push('Datenschutz-Zustimmung');
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
    params.append('_hp', honeypot.value);
    params.append('_elapsed', elapsed.toString());

    fetch(WEBHOOK_URL, {
      method: 'POST',
      body: params
    })
    .then(function(response) {
      if (response.ok) {
        showMsg('Vielen Dank! Deine Nachricht wurde gesendet. Ich melde mich in Kürze.', 'success');
        form.reset();
        tsField.value = Date.now().toString();
      } else {
        throw new Error('Server-Fehler');
      }
    })
    .catch(function() {
      showMsg('Leider konnte die Nachricht nicht gesendet werden. Bitte versuche es später erneut oder schreibe direkt an hallo@ullizelle.de.', 'error');
    })
    .finally(function() {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Nachricht senden \u2192';
    });
  });
})();
