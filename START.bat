@echo off
title Party Yacht Goa — Dev Server
color 0A

echo.
echo  ╔══════════════════════════════════════════╗
echo  ║      PARTY YACHT GOA — DEV SERVER       ║
echo  ╚══════════════════════════════════════════╝
echo.

:: Check if node_modules exists
if not exist "node_modules\" (
    echo  [1/2] Installing dependencies — please wait...
    echo        This only runs once. It may take 2-3 minutes.
    echo.
    npm install
    if errorlevel 1 (
        echo.
        echo  ERROR: npm install failed.
        echo  Make sure Node.js is installed from https://nodejs.org
        pause
        exit /b 1
    )
    echo.
    echo  Dependencies installed successfully!
    echo.
)

echo  [2/2] Starting development server...
echo.
echo  Once ready, open your browser to:
echo.
echo        http://localhost:3000
echo.
echo  Press Ctrl+C to stop the server.
echo.

npm run dev
pause
