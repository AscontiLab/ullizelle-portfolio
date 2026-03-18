# UI/UX-Audit: ullizelle.de

**Erstellt:** 18. März 2026 | **Perspektive:** UI Designer + UX Researcher

---

## 1. First Impression / Above the Fold

### Stärken
- 3-Sekunden-Test bestanden: Interior Design, Berlin, professionell
- Hero-Headline "Räume, die wirken." ist prägnant und merkfähig
- Gestaffelte slideUp-Animationen erzeugen hochwertigen Eindruck

### Probleme
- **Hero-Bild = Ikea-Projektbild** — Besucher sieht dasselbe Bild zweimal
- Eyebrow redundant (gleiche Info wie Nav-Logo-Subtext)
- Neon-Akzent (#FF5C35) auf Hintergrund (#F2EDE5) hat nur 3.2:1 Kontrast

---

## 2. Navigation & Informationsarchitektur

### Stärken
- Reduzierte Nav (4 Links) — kein Cognitive Overload
- Sticky Nav mit Blur — technisch sauber
- CTA "Kontakt" hervorgehoben

### Probleme
- **Keine Mobile-Navigation!** Bei <900px wird Nav einfach ausgeblendet, kein Hamburger-Menu
- Kein "Über mich"-Link in der Nav
- Nav-Links bei 0.72rem (11.5px) an der Lesbarkeitsschwelle
- Impressum/Datenschutz Links → `#`

---

## 3. Projekt-Showcase

### Stärken
- Asymmetrisches 7/5 Grid erzeugt Dynamik
- Hochwertige Hover-Effekte (Scale + Brightness + Overlay)
- Lightbox mit Keyboard-Support

### Probleme
- **KPM erscheint zweimal** (Karte 1 + 4) — täuscht Umfang vor
- Keine Projektbeschreibungen/Storytelling
- Ikea nur 2 Bilder vs. KPM/Amberra je 4
- Keine Alt-Texte in der Lightbox

---

## 4. Conversion Design

### Stärken
- Doppelter CTA im Hero
- Kontaktformular schlank (4 Felder)
- Statistiken als Vertrauenssignal (50+ Projekte, 15 Jahre)

### Probleme
- **Formular funktioniert nicht** — kritischster Bug
- Keine Telefonnummer
- Keine Testimonials/Referenzen
- Kein CTA zwischen Projekten und Kontakt
- LinkedIn und Email nicht klickbar
- Form-Labels ohne `for`-Attribut

---

## 5. Visual Design

### Farbsystem
- Erdtöne (#F2EDE5, #7D5C3E, #B8844A) passen perfekt zu Interior Design
- Neon (#FF5C35) bricht mit der Palette — Terracotta (#C4704B) wäre stimmiger
- 3 kaum unterscheidbare Hintergrundabstufungen (bg, bg2, bg3)

### Typografie
- Unbounded + DM Sans — gute Kombination
- **12 verschiedene Schriftgrößen unter 1rem** — sollten auf 5-6 konsolidiert werden

### Bilder
- About-Bild hat WhatsApp-Dateinamen — unprofessionell
- **Dateiname-Mismatch** — Bild lädt nicht (Unterstrich vs. Bindestrich)

---

## 6. Mobile Experience

### Kritisch
- **Keine Mobile-Navigation** — Showstopper
- Touch-Targets zu klein (Nav-CTA ca. 35x26px statt min. 44x44px)
- Nur ein Breakpoint (900px) — fehlen 480px und 1200px
- Process-Steps bei 2 Spalten werden unter 400px eng

---

## 7. Konkrete Verbesserungsvorschläge

### Quick Wins

| # | Maßnahme | Impact | Aufwand |
|---|---|---|---|
| 1 | Formular funktionsfähig machen | Kritisch | 30 Min |
| 2 | Mobile Hamburger-Menu | Kritisch | 1-2 Std |
| 3 | Testimonials hinzufügen | Hoch | 2-3 Std |
| 4 | Bild-Bugs fixen (Pfade, Duplikat, Hero) | Hoch | 30 Min |
| 5 | Email + LinkedIn klickbar machen | Hoch | 5 Min |
| 6 | Form-Labels mit for/id verknüpfen | Mittel | 15 Min |

### Mittlerer Aufwand
7. Testimonial-Section zwischen Projekte und Leistungen
8. Projekt-Case-Studies (Aufgabe → Konzept → Ergebnis)
9. Hero-Bild tauschen (nicht aus Projekt-Galerie)
10. Schriftgrößen auf 5-6 Stufen konsolidieren

### Größerer Redesign-Bedarf
11. Separate Projektseiten mit vollständiger Case Study
12. Blog/Journal-Section für SEO
13. Mehrsprachigkeit (DE/EN)

---

## 8. Benchmark vs. Branchenstandard

| Feature | ullizelle.de | Top-Portfolios |
|---|---|---|
| Einzelne Projektseiten | Nein | Ja, mit Case-Study |
| Vorher/Nachher-Bilder | Nein | Häufig |
| Grundrisse/Pläne | Nein | Oft als Overlay |
| Video/Animation | Nein | Zunehmend Standard |
| Testimonials | Nein | Fast immer |
| Auszeichnungen/Presse | Nein | Prominent platziert |
| Filterbares Portfolio | Nein | Nach Kategorie |

**Größte Lücke:** Fehlende eigenständige Projektseiten mit Storytelling. Interior-Design-Kunden erwarten: Herausforderung → Idee → Ergebnis.

---

## Zusammenfassung

Die Seite hat eine solide gestalterische Basis. Farbwelt, Typografie und Layout sind professionell. Die Hauptprobleme sind funktional: totes Formular, fehlende Mobile-Nav und fehlender Social Proof verhindern Conversions.

**Top 5:** Formular reparieren → Mobile Nav → Testimonials → Bild-Bugs → Case Studies

---

*Erstellt mit Claude Opus 4.6 — UI Designer + UX Researcher Agent Personalities*
