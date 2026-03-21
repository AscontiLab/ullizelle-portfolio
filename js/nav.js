/* ── Navigation: Scroll-Effekt fuer sticky Nav ── */
window.addEventListener('scroll', function() {
  document.getElementById('nav').classList.toggle('scrolled', scrollY > 50);
});
