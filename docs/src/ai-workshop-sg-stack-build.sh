#!/usr/bin/env bash

set -euo pipefail

# Usage:
#   ./ai-workshop-sg-stack-build.sh [SUFFIX]
#
# Arguments:
#   SUFFIX  - Output folder suffix (default: today's date)
#
# Before running the script (optional):
# - Download the slides PDF to $HOME/Downloads:
#   - slides-ai-workshop-sg-stack.pdf

SUFFIX="${1:-$(date +%Y%m-%d)}"
SRC="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(dirname "$SRC")"
TRAINING="$(dirname "$REPO_ROOT")"
OUTPUT_FOLDER="$TRAINING/ai-workshop-sg-stack-$SUFFIX"
TARGET="$REPO_ROOT"

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

run_asciidoctor() {
  local input="$1"
  local output="$2"

  "${ASCIIDOCTOR_CMD[@]}" \
    "$(normalize_asciidoctor_path "$input")" \
    -o "$(normalize_asciidoctor_path "$output")"
}

copy_slides() {
  local slides="$1"
  local destination="$2"

  if [[ -f "$slides" ]]; then
    cp "$slides" "$destination"
  else
    echo "Warning: slides PDF not found at $slides, packaging without it." >&2
  fi
}

echo "Building AI workshop (sg-stack) HTML..."
resolve_asciidoctor
mkdir -p "$TARGET"
run_asciidoctor \
  "$SRC/instructions/ai-workshop-sg-stack.adoc" \
  "$TARGET/lab-instructions.html"

mkdir -p "$OUTPUT_FOLDER"
cp "$TARGET/lab-instructions.html" "$OUTPUT_FOLDER/"
cp -r "$SRC/lab-files" "$OUTPUT_FOLDER/lab-files"
copy_slides "$HOME/Downloads/slides-ai-workshop-sg-stack.pdf" "$OUTPUT_FOLDER/"

echo "Files generated in: $OUTPUT_FOLDER"
