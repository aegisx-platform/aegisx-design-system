#!/usr/bin/env bash
# Regenerate PNG / ICO exports from the source SVG logos.
# Requires macOS `sips` (built-in). Run from repo root or logo/ — path-agnostic.
#
# Usage: ./logo/build-assets.sh

set -euo pipefail

LOGO_DIR="$(cd "$(dirname "$0")" && pwd)"
PNG_DIR="$LOGO_DIR/png"
FAV_DIR="$LOGO_DIR/favicons"

mkdir -p "$PNG_DIR" "$FAV_DIR"

say() { printf "  \033[36m%s\033[0m\n" "$*"; }

render() {
  local src="$1" out="$2" size="$3"
  sips -s format png "$src" --out "$out" -Z "$size" >/dev/null 2>&1
  say "png  $(basename "$out")  (${size}px)"
}

render_ico() {
  local src="$1" out="$2" size="$3"
  sips -s format ico "$src" --out "$out" -Z "$size" >/dev/null 2>&1
  say "ico  $(basename "$out")  (${size}px)"
}

echo "→ Favicons (from icon-light.svg)"
SRC_ICON_LIGHT="$LOGO_DIR/icon-light.svg"
render     "$SRC_ICON_LIGHT" "$FAV_DIR/favicon-16.png"        16
render     "$SRC_ICON_LIGHT" "$FAV_DIR/favicon-32.png"        32
render     "$SRC_ICON_LIGHT" "$FAV_DIR/favicon-48.png"        48
render     "$SRC_ICON_LIGHT" "$FAV_DIR/apple-touch-icon.png" 180
render     "$SRC_ICON_LIGHT" "$FAV_DIR/icon-192.png"         192
render     "$SRC_ICON_LIGHT" "$FAV_DIR/icon-512.png"         512
render_ico "$SRC_ICON_LIGHT" "$FAV_DIR/favicon.ico"          48

echo "→ Horizontal logos (light/dark) @1x/@2x/@3x"
for variant in horizontal-light horizontal-dark horizontal-mono horizontal-mono-inverse; do
  src="$LOGO_DIR/${variant}.svg"
  render "$src" "$PNG_DIR/${variant}@1x.png"  200
  render "$src" "$PNG_DIR/${variant}@2x.png"  400
  render "$src" "$PNG_DIR/${variant}@3x.png"  600
done

echo "→ Vertical logos (light/dark) @1x/@2x/@3x"
for variant in vertical-light vertical-dark; do
  src="$LOGO_DIR/${variant}.svg"
  render "$src" "$PNG_DIR/${variant}@1x.png"  240
  render "$src" "$PNG_DIR/${variant}@2x.png"  480
  render "$src" "$PNG_DIR/${variant}@3x.png"  720
done

echo "→ Icon-only (light/dark) @1x/@2x/@3x"
for variant in icon-light icon-dark; do
  src="$LOGO_DIR/${variant}.svg"
  render "$src" "$PNG_DIR/${variant}@1x.png"   64
  render "$src" "$PNG_DIR/${variant}@2x.png"  128
  render "$src" "$PNG_DIR/${variant}@3x.png"  192
done

echo
echo "✅ Done. Generated:"
echo "   $FAV_DIR"
echo "   $PNG_DIR"
