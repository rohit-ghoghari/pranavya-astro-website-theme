#!/usr/bin/env bash
# Non-destructive packaging script for commercial marketplace release.
# Generates pranavya-yoga-astro-theme.zip excluding internal/dev assets.
# All original working files (update_mds.py, CORRECTION.md, etc.) remain intact.

set -euo pipefail

PACKAGE_NAME="pranavya-yoga-astro-theme.zip"

echo "==> Creating commercial customer-facing release archive: ${PACKAGE_NAME}..."
rm -f "${PACKAGE_NAME}"

zip -r "${PACKAGE_NAME}" . -x@.releaseignore

echo "==> Archive created successfully!"
ls -lh "${PACKAGE_NAME}"
