/* ── Reveal-Animation via IntersectionObserver ── */
(function() {
  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e, i) {
      if (e.isIntersecting) {
        setTimeout(function() { e.target.classList.add('visible'); }, i * 70);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.reveal').forEach(function(el) {
    obs.observe(el);
  });
})();
