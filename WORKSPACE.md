# Shopify Dawn Theme Workspace

This workspace is organized to facilitate efficient theme development for Shopify using the Dawn theme.

## Directory Structure

### Main Development Theme
- **dawn-flat-final/**: The primary working directory for theme development
  - Contains a properly flattened theme structure that works with Shopify
  - Use this directory for all theme development and customization

### Original Files
- **Orginal Theme Files/**: Reference directory with the original Dawn theme files
  - Useful for comparing your changes against the original theme

### Support Files
- **scripts/**: Utility scripts for theme management
  - `flatten-theme-final.ps1`: PowerShell script for flattening the theme
  - `flatten-theme.bat`: Batch file wrapper for Windows
  - `flatten-theme.sh`: Shell script wrapper for Unix/Linux

### Development Files
- **.vscode/**: Visual Studio Code settings and configurations
- **node_modules/**: Node.js dependencies for development tools
- **__tests__/**: Test files for theme functionality
- **docs/**: Documentation for the Dawn theme

## Development Workflow

1. Make changes in the `dawn-flat-final` directory
2. Test your changes locally:
   ```
   cd dawn-flat-final
   shopify theme dev
   ```
3. Deploy to Shopify when ready:
   ```
   cd dawn-flat-final
   shopify theme push
   ```

## Organizing Changes

- Keep all files in the main root directories required by Shopify
- Use consistent naming conventions for clarity
- Add appropriate comments in code to maintain organization
- All theme files are contained solely in the `dawn-flat-final` directory (duplicate directories have been removed)

## Maintenance

To regenerate the flattened theme structure:
```powershell
cd scripts
.\flatten-theme-final.ps1 -rootPath "C:\Shopify\dawn\Orginal Theme Files" -outputPath "C:\Shopify\dawn\dawn-flat-final" -Force
```

This will create a fresh flattened version of the theme from the original files.
