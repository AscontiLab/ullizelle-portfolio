/* ── Lightbox: Projektgalerie mit Focus-Trap und Barrierefreiheit ── */
var PROJECTS = {
  kpm: {
    title: 'KPM Königliche Porzellan-Manufaktur',
    meta: 'Retail · Berlin · Flagship Store',
    imgs: [
      { src: 'kpm_02_lounge_blau.jpg' },
      { src: 'kpm_01_lab_kueche.jpg' },
      { src: 'kpm_03_regal_detail.jpg' },
      { src: 'kpm_04_lab_hocker.jpg' },
    ]
  },
  amberra: {
    title: 'Amberra HQ Berlin',
    meta: 'Workplace · Berlin · Historisches Gewölbegebäude',
    imgs: [
      { src: 'amberra_01_halle_gewoelbe.jpg' },
      { src: 'amberra_02_meetingroom_vorhang.jpg' },
      { src: 'amberra_03_lounge_bts.jpg' },
      { src: 'amberra_04_meetingroom_clean.jpg' },
    ]
  },
  ikea: {
    title: 'Ikea Office Berlin Spandau',
    meta: 'Workplace · Berlin · Konferenzbereich',
    imgs: [
      { src: 'ikea_01_simplicity_frontal.jpg' },
      { src: 'ikea_02_simplicity_weitwinkel.jpg' },
    ]
  }
};

var cur = null, idx = 0;
var _lbTrigger = null; // Element das die Lightbox geoeffnet hat

function openLightbox(project) {
  _lbTrigger = document.activeElement;
  cur = project; idx = 0;
  document.getElementById('lb-title').textContent = PROJECTS[project].title;
  document.getElementById('lb-meta').textContent = PROJECTS[project].meta;
  buildThumbs(); showImg(0);

  var lb = document.getElementById('lightbox');
  lb.classList.add('active');
  lb.setAttribute('role', 'dialog');
  lb.setAttribute('aria-modal', 'true');
  document.body.style.overflow = 'hidden';

  // Fokus auf Schliessen-Button setzen
  var closeBtn = lb.querySelector('.lb-close');
  if (closeBtn) closeBtn.focus();
}

function closeLightbox() {
  var lb = document.getElementById('lightbox');
  lb.classList.remove('active');
  lb.removeAttribute('role');
  lb.removeAttribute('aria-modal');
  document.body.style.overflow = '';

  // Fokus zurueck zum ausloesenden Element
  if (_lbTrigger && _lbTrigger.focus) {
    _lbTrigger.focus();
    _lbTrigger = null;
  }
}

function buildThumbs() {
  var c = document.getElementById('lb-thumbs');
  c.innerHTML = '';
  PROJECTS[cur].imgs.forEach(function(img, i) {
    var t = document.createElement('img');
    t.className = 'lb-thumb' + (i === 0 ? ' active' : '');
    t.src = img.src;
    t.alt = PROJECTS[cur].title + ' – Bild ' + (i + 1);
    t.onclick = function() { showImg(i); };
    c.appendChild(t);
  });
}

function showImg(i) {
  var imgs = PROJECTS[cur].imgs;
  idx = (i + imgs.length) % imgs.length;
  var el = document.getElementById('lb-img');
  el.classList.remove('loaded');
  el.src = imgs[idx].src;
  el.alt = PROJECTS[cur].title + ' – Bild ' + (idx + 1);
  el.onload = function() { el.classList.add('loaded'); };
  document.querySelectorAll('.lb-thumb').forEach(function(t, j) {
    t.classList.toggle('active', j === idx);
  });
}

function lbNav(d) { showImg(idx + d); }

/* ── Focus-Trap: Tab innerhalb der Lightbox halten ── */
function _lbFocusTrap(e) {
  var lb = document.getElementById('lightbox');
  if (!lb.classList.contains('active')) return;
  if (e.key !== 'Tab') return;

  var focusable = lb.querySelectorAll('button, [href], input, [tabindex]:not([tabindex="-1"]), img[onclick]');
  if (focusable.length === 0) return;

  var first = focusable[0];
  var last = focusable[focusable.length - 1];

  if (e.shiftKey) {
    if (document.activeElement === first) {
      e.preventDefault();
      last.focus();
    }
  } else {
    if (document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
}

/* ── Tastatursteuerung ── */
document.addEventListener('keydown', function(e) {
  var lb = document.getElementById('lightbox');
  if (!lb.classList.contains('active')) return;

  if (e.key === 'ArrowLeft') lbNav(-1);
  if (e.key === 'ArrowRight') lbNav(1);
  if (e.key === 'Escape') closeLightbox();

  // Focus-Trap
  _lbFocusTrap(e);
});

/* ── Klick auf Overlay schliesst Lightbox ── */
document.getElementById('lightbox').addEventListener('click', function(e) {
  if (e.target === document.getElementById('lightbox')) closeLightbox();
});
