#!/usr/bin/env bash

set -euo pipefail

# Usage:
#   ./ai-workshop-sg-stack-build.sh
#
# Builds lab-docs/lab-instructions.html from instructions/ai-workshop-sg-stack.adoc.

SRC="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(dirname "$SRC")"
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

echo "Building AI workshop (sg-stack) HTML..."
resolve_asciidoctor
mkdir -p "$TARGET"
run_asciidoctor \
  "$SRC/instructions/ai-workshop-sg-stack.adoc" \
  "$TARGET/lab-instructions.html"

echo "File generated: $TARGET/lab-instructions.html"
