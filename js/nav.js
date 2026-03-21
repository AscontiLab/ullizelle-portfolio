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
  });
  // Menue schliessen bei Link-Klick
  navLinks.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function() {
      hamburger.setAttribute('aria-expanded', 'false');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
  // Menue schliessen bei Escape-Taste
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
      hamburger.setAttribute('aria-expanded', 'false');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
}
