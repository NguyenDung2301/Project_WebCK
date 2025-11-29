@echo off
echo Building React web app...
cd /d "%~dp0frontend\web"

if not exist node_modules (
    echo Installing dependencies...
    call npm.cmd install
    if errorlevel 1 (
        echo Failed to install dependencies!
        pause
        exit /b 1
    )
)

echo Building React app...
call npm.cmd run build

if errorlevel 1 (
    echo Build failed!
    pause
    exit /b 1
)

echo.
echo ========================================
echo Build successful! 
echo You can now run Flask app with: python app/main.py
echo ========================================
cd /d "%~dp0"
pause

