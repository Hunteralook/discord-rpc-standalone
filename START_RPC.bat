@echo off
chcp 65001 >nul
title Discord RPC

echo ================================
echo       Discord RPC launcher
echo ================================
echo.

where node >nul 2>&1
if errorlevel 1 (
    echo [ОШИБКА] Node.js не найден.
    echo.
    echo Скачай LTS-версию Node.js с:
    echo https://nodejs.org/
    echo.
    echo После установки закрой это окно и запусти START_RPC.bat снова.
    pause
    exit /b 1
)

if not exist "node_modules\@xhayper\discord-rpc" (
    echo [1/2] Первая установка. Ставлю библиотеку...
    call npm install
    if errorlevel 1 (
        echo.
        echo [ОШИБКА] npm install завершился с ошибкой.
        pause
        exit /b 1
    )
    echo.
)

echo [2/2] Запускаю RPC...
echo.
node index.js

echo.
echo RPC остановлен.
pause
