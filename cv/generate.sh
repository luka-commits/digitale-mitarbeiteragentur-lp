#!/usr/bin/env bash
# Generate professional CV PDFs for DMA personas via headless Chrome.
#
# Usage:
#   ./generate.sh                    # generates all 3 personas
#   ./generate.sh paula              # generates one
#
# Output: ../assets/cv/<persona>.pdf

set -euo pipefail

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TEMPLATE="$HERE/template.html"
OUT_DIR="$HERE/../assets/cv"

mkdir -p "$OUT_DIR"

if [ ! -x "$CHROME" ]; then
  echo "Chrome not found at: $CHROME" >&2
  exit 1
fi

PERSONAS=("${@:-paula martin jonas}")
# If first arg passed, only that one. Otherwise default list.
if [ "$#" -eq 0 ]; then
  PERSONAS=(paula martin jonas)
else
  PERSONAS=("$@")
fi

for PERSONA in "${PERSONAS[@]}"; do
  URL="file://${TEMPLATE}?persona=${PERSONA}"
  OUT="${OUT_DIR}/${PERSONA}.pdf"
  echo "→ Rendering ${PERSONA} → ${OUT}"
  "$CHROME" \
    --headless=new \
    --disable-gpu \
    --no-pdf-header-footer \
    --no-margins \
    --virtual-time-budget=4000 \
    --print-to-pdf="$OUT" \
    "$URL" \
    >/dev/null 2>&1
done

echo
echo "Done. Generated:"
ls -lh "$OUT_DIR"/*.pdf
