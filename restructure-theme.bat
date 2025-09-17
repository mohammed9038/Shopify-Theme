@echo off
echo Shopify Theme Structure Reorganization Script
echo =============================================
echo.
echo WARNING: This script will reorganize your theme structure.
echo Make sure you have a backup or commit your changes before proceeding.
echo.
pause

:: Create directory structure if it doesn't exist
echo Creating directory structure...
if not exist assets\js\components mkdir assets\js\components
if not exist assets\js\utils mkdir assets\js\utils
if not exist assets\css\components mkdir assets\css\components
if not exist assets\css\sections mkdir assets\css\sections
if not exist assets\icons mkdir assets\icons
if not exist assets\images mkdir assets\images

if not exist snippets\components mkdir snippets\components
if not exist snippets\product mkdir snippets\product
if not exist snippets\cart mkdir snippets\cart
if not exist snippets\utils mkdir snippets\utils

if not exist sections\global mkdir sections\global
if not exist sections\product mkdir sections\product
if not exist sections\collection mkdir sections\collection
if not exist sections\misc mkdir sections\misc

:: Move JavaScript files
echo Moving JavaScript files...
move /y assets\cart.js assets\js\components\
move /y assets\facets.js assets\js\components\
move /y assets\product-form.js assets\js\components\
move /y assets\pubsub.js assets\js\utils\
move /y assets\constants.js assets\js\utils\
move /y assets\global.js assets\js\

:: Move CSS files
echo Moving CSS component files...
for /f "tokens=*" %%f in ('dir /b assets\component-*.css') do (
    move /y "assets\%%f" "assets\css\components\"
)

echo Moving CSS section files...
for /f "tokens=*" %%f in ('dir /b assets\section-*.css') do (
    move /y "assets\%%f" "assets\css\sections\"
)

move /y assets\base.css assets\css\

:: Move icons
echo Moving icons...
for /f "tokens=*" %%f in ('dir /b assets\icon-*.svg') do (
    move /y "assets\%%f" "assets\icons\"
)

:: Move images
echo Moving images...
move /y assets\*.svg assets\images\
move /y assets\*.gif assets\images\
move /y assets\*.jpg assets\images\
move /y assets\*.png assets\images\

echo.
echo Structure reorganization completed.
echo.
echo IMPORTANT: You need to update all asset references in your liquid files!
echo Use search and replace to update paths like:
echo   {{ 'cart.js' | asset_url }}
echo to:
echo   {{ 'js/components/cart.js' | asset_url }}
echo.
pause
