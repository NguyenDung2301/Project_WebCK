@echo off
echo Building React homepage...
cd homepage

if not exist node_modules (
    echo Installing dependencies...
    call npm install
    if errorlevel 1 (
        echo Failed to install dependencies!
        pause
        exit /b 1
    )
)

echo Building React app...
call npm run build

if errorlevel 1 (
    echo Build failed!
    pause
    exit /b 1
)

echo Build successful! You can now run Flask app.
cd ..
pause

