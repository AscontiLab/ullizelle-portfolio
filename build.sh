#!/bin/bash
# build.sh — Injiziert gemeinsame Nav/Footer-Partials in alle HTML-Seiten.
# Ausfuehren nach Aenderungen an partials/nav.html oder partials/footer.html:
#   ./build.sh
#
# Seiten muessen die Marker-Kommentare enthalten:
#   <!-- PARTIAL:NAV -->    (wird durch partials/nav.html ersetzt)
#   <!-- PARTIAL:FOOTER --> (wird durch partials/footer.html ersetzt)

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
NAV_FILE="$SCRIPT_DIR/partials/nav.html"
FOOTER_FILE="$SCRIPT_DIR/partials/footer.html"

if [ ! -f "$NAV_FILE" ]; then
  echo "FEHLER: $NAV_FILE nicht gefunden"
  exit 1
fi
if [ ! -f "$FOOTER_FILE" ]; then
  echo "FEHLER: $FOOTER_FILE nicht gefunden"
  exit 1
fi

inject_partial() {
  local page="$1"
  local marker="$2"
  local partial_file="$3"

  if grep -q "$marker" "$page"; then
    python3 -c "
import sys
marker = sys.argv[1]
with open(sys.argv[2]) as f:
    partial = f.read().rstrip('\n')
with open(sys.argv[3]) as f:
    page = f.read()
lines = page.split('\n')
result = []
for line in lines:
    if marker in line:
        result.append(partial)
    else:
        result.append(line)
with open(sys.argv[3], 'w') as f:
    f.write('\n'.join(result))
" "$marker" "$partial_file" "$page"
    echo "  -> $(basename "$partial_file") injiziert"
  fi
}

echo "Baue Seiten..."
echo ""

for page in "$SCRIPT_DIR"/index.html \
            "$SCRIPT_DIR"/impressum.html \
            "$SCRIPT_DIR"/datenschutz.html \
            "$SCRIPT_DIR"/projekte/*.html; do
  if [ -f "$page" ]; then
    relpath="${page#$SCRIPT_DIR/}"
    echo "Verarbeite: $relpath"
    inject_partial "$page" "<!-- PARTIAL:NAV -->" "$NAV_FILE"
    inject_partial "$page" "<!-- PARTIAL:FOOTER -->" "$FOOTER_FILE"
  fi
done

echo ""
echo "Fertig!"
