@echo off
echo Running theme flattener...
powershell -ExecutionPolicy Bypass -File "%~dp0flatten-theme-structure.ps1" %*
if %ERRORLEVEL% NEQ 0 (
  echo Error occurred while flattening theme.
  pause
  exit /b %ERRORLEVEL%
)
echo.
echo Theme successfully flattened!
echo.
echo Press any key to exit...
pause > nul
