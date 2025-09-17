@echo off
echo Running all tests for Dawn Shopify Theme...
echo.

echo === Running Jest Tests ===
call npm test
if %ERRORLEVEL% NEQ 0 (
  echo Jest tests failed!
  exit /b %ERRORLEVEL%
)
echo.

echo === Running Theme Check ===
call shopify theme check
if %ERRORLEVEL% NEQ 0 (
  echo Theme Check failed!
  exit /b %ERRORLEVEL%
)
echo.

echo All tests completed successfully!
