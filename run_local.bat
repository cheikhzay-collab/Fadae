@echo off
title Espace Sagesse et Savoir - Serveur Local
echo ====================================================
echo  Lancement du serveur local Espace Sagesse et Savoir
echo ====================================================
echo.
start http://localhost:3000
node "%~dp0server.js"
pause