@echo off
title Tirumala Garden Website Local Server
echo ==========================================================
echo           TIRUMALA GARDEN RESTAURANT LOCAL SERVER
echo ==========================================================
echo.
echo Launching website at http://localhost:8000 in your browser...
start "" http://localhost:8000
echo.
echo Server is running. Press Ctrl+C in this window to stop it.
echo.
python -m http.server 8000
