/* ── Portfolio Kategorie-Filter ── */
(function() {
  var buttons = document.querySelectorAll('.filter-btn');
  var cards = document.querySelectorAll('.portfolio-card');

  buttons.forEach(function(btn) {
    btn.addEventListener('click', function() {
      var filter = btn.dataset.filter;

      buttons.forEach(function(b) { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');

      cards.forEach(function(card) {
        if (filter === 'alle' || card.dataset.category === filter) {
          card.removeAttribute('data-hidden');
        } else {
          card.setAttribute('data-hidden', 'true');
        }
      });
    });
  });
})();
