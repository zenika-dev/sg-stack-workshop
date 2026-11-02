#!/usr/bin/env bash

set -euo pipefail

INPUT="${1:-}"
DEFAULT_INPUT="ai-workshop-sg-stack.adoc"

if [[ -z "$INPUT" || ! -f "$INPUT" ]]; then
  INPUT="$DEFAULT_INPUT"
fi

if [[ ! -f "$INPUT" ]]; then
  echo "Error: no input file found. Tried $INPUT." >&2
  exit 1
fi

INPUT_DIR="$(cd "$(dirname "$INPUT")" && pwd)"
INPUT_FILE="$INPUT_DIR/$(basename "$INPUT")"
OUTPUT_DIR_ABS="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"

resolve_asciidoctor() {
  if command -v asciidoctor >/dev/null 2>&1; then
    ASCIIDOCTOR_CMD=(asciidoctor)
    ASCIIDOCTOR_USES_WINDOWS_PATHS=false
    return
  fi

  if command -v npx >/dev/null 2>&1; then
    ASCIIDOCTOR_CMD=(npx -y @asciidoctor/cli)
    ASCIIDOCTOR_USES_WINDOWS_PATHS=true
    return
  fi

  echo "Error: asciidoctor is not installed and npx is unavailable for the fallback CLI." >&2
  exit 1
}

normalize_asciidoctor_path() {
  local path="$1"

  if [[ "$ASCIIDOCTOR_USES_WINDOWS_PATHS" != true ]]; then
    printf '%s\n' "$path"
    return
  fi

  if command -v wslpath >/dev/null 2>&1; then
    wslpath -w "$path"
    return
  fi

  if command -v cygpath >/dev/null 2>&1; then
    cygpath -w "$path"
    return
  fi

  printf '%s\n' "$path"
}

open_html() {
  local file_path="$1"

  if command -v open >/dev/null 2>&1; then
    open "$file_path" >/dev/null 2>&1 &
  elif command -v xdg-open >/dev/null 2>&1; then
    xdg-open "$file_path" >/dev/null 2>&1 &
  elif command -v wslview >/dev/null 2>&1; then
    wslview "$file_path" >/dev/null 2>&1 &
  else
    echo "Generated HTML: $file_path"
  fi
}

resolve_asciidoctor
"${ASCIIDOCTOR_CMD[@]}" \
  --safe-mode unsafe \
  --trace \
  -v \
  -B "$(normalize_asciidoctor_path "$INPUT_DIR")" \
  -o "$(normalize_asciidoctor_path "$OUTPUT_DIR_ABS/lab-instructions.html")" \
  "$(normalize_asciidoctor_path "$INPUT_FILE")"

open_html "$OUTPUT_DIR_ABS/lab-instructions.html"