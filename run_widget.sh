#!/bin/bash
cd "/home/viniciuscampos/Documents/Desafio-Semanal/semana_2/widget-github-electron"
# Setup environment from .env
set -a
[ -f .env ] && source .env
set +a
# Run electron
"/home/viniciuscampos/Documents/Desafio-Semanal/semana_2/widget-github-electron/node_modules/.bin/electron" .
