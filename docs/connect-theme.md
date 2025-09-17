# Connecting Your Local Theme to Shopify

## Prerequisites
- Shopify CLI installed (`shopify version` to verify)
- A development store created in your Shopify Partner account
- Git repository initialized (`git init` if not already done)

## Authentication

```bash
# Login to your Shopify Partner account
shopify login

# If you need to switch stores
shopify switch --store=your-development-store.myshopify.com
```

## Theme Development Commands

### Development Mode (Live Preview)
```bash
# Start development server with hot-reload
shopify theme dev --store=your-development-store.myshopify.com
```

This command:
- Creates a development theme in your store
- Establishes a connection for real-time updates
- Provides a URL for previewing changes

### Pushing Theme Changes
```bash
# Push all theme files to your development theme
shopify theme push --theme=your-theme-id

# Pull the latest theme version (if collaborating)
shopify theme pull --theme=your-theme-id
```

### Theme Check
```bash
# Run theme check before pushing changes
shopify theme check
```

## Configuration File

Create a `.shopify-cli.yml` file in your project root for easy configuration:

```yaml
project_type: theme
store: your-development-store.myshopify.com
theme_id: your-theme-id
```

With this file, you can simply run `shopify theme dev` without additional parameters.

## CI/CD Integration

For automated deployments, you can use GitHub Actions with the Shopify CLI:

```yaml
name: Deploy Theme
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install -g @shopify/cli @shopify/theme
      - run: shopify theme check
      - run: shopify theme push --theme=your-theme-id
        env:
          SHOPIFY_CLI_STORE: ${{ secrets.SHOPIFY_STORE }}
          SHOPIFY_CLI_PASSWORD: ${{ secrets.SHOPIFY_PASSWORD }}
```
