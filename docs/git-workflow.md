# Git Workflow for Shopify Theme Development

## Branch Strategy

We follow a modified Git Flow workflow:

- `master` - Production-ready code
- `develop` - Integration branch for new features
- `feature/name` - Feature branches for specific changes
- `hotfix/name` - Quick fixes for production

## Pre-commit Hooks

Pre-commit hooks help maintain code quality by running checks before allowing commits.

### Setup with Husky

1. Install husky:
```bash
npm install --save-dev husky
npx husky install
npm set-script prepare "husky install"
```

2. Create pre-commit hook:
```bash
npx husky add .husky/pre-commit "npm run lint && shopify theme check"
```

### Manual Setup

If not using Husky, create a `.git/hooks/pre-commit` file:

```bash
#!/bin/sh
# Pre-commit hook for Shopify theme

# Run Theme Check
echo "Running Theme Check..."
shopify theme check

# If there are errors, prevent the commit
if [ $? -ne 0 ]; then
  echo "Theme Check failed. Please fix the issues before committing."
  exit 1
fi

# Run linting
echo "Running linting..."
npm run lint

# If there are errors, prevent the commit
if [ $? -ne 0 ]; then
  echo "Linting failed. Please fix the issues before committing."
  exit 1
fi

# All checks passed
echo "Pre-commit checks passed!"
exit 0
```

Make it executable:
```bash
chmod +x .git/hooks/pre-commit
```

## Commit Message Convention

We follow the Conventional Commits specification:

- `feat:` - A new feature
- `fix:` - A bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code changes that neither fix bugs nor add features
- `perf:` - Performance improvements
- `test:` - Adding or fixing tests
- `chore:` - Changes to the build process or auxiliary tools

Example: `feat: add new product card component`

## Pull Request Template

Create a `.github/PULL_REQUEST_TEMPLATE.md` file with the following structure:

```markdown
## Description
[Describe the changes in this PR]

## Type of change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Theme Check passes
- [ ] Tested on mobile devices
- [ ] Tested on multiple browsers
- [ ] Tested with different product types

## Screenshots
[If applicable, add screenshots]

## Checklist
- [ ] My code follows the style guidelines of this project
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
```
