#!/bin/bash
cd /home/kavia/workspace/code-generation/notemaster-105046-a449da78/notes_backend
npm run lint
LINT_EXIT_CODE=$?
if [ $LINT_EXIT_CODE -ne 0 ]; then
  exit 1
fi

