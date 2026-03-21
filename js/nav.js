/* ── Navigation: Scroll-Effekt fuer sticky Nav ── */
window.addEventListener('scroll', function() {
  document.getElementById('nav').classList.toggle('scrolled', scrollY > 50);
});

/* ── Hamburger Menu ── */
var hamburger = document.getElementById('nav-hamburger');
var navLinks = document.getElementById('nav-links');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', function() {
    var expanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', String(!expanded));
    navLinks.classList.toggle('open');
    document.body.style.overflow = expanded ? '' : 'hidden';
    if (!expanded) {
      // Menue geoeffnet: Fokus auf ersten Link
      var firstLink = navLinks.querySelector('a');
      if (firstLink) firstLink.focus();
    } else {
      // Menue geschlossen: Fokus zurueck auf Hamburger
      hamburger.focus();
    }
  });
  // Menue schliessen bei Link-Klick
  navLinks.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function() {
      hamburger.setAttribute('aria-expanded', 'false');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
      hamburger.focus();
    });
  });
  // Menue schliessen bei Escape-Taste
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
      hamburger.setAttribute('aria-expanded', 'false');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
      hamburger.focus();
    }
  });
  // Focus-Trap: Tab bleibt im offenen Menue
  document.addEventListener('keydown', function(e) {
    if (!navLinks.classList.contains('open') || e.key !== 'Tab') return;
    var focusable = navLinks.querySelectorAll('a, button');
    var first = focusable[0];
    var last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });
}
