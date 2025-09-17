# Shopify Dawn Theme Development

This repository contains the Dawn theme for Shopify, with custom development setup.

## Development Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.x or higher recommended)
- [npm](https://www.npmjs.com/) (v8.x or higher)
- [Shopify CLI](https://shopify.dev/themes/tools/cli)
- [Git](https://git-scm.com/)

### Installation

1. Clone this repository:

   ```
   git clone https://github.com/mohammed9038/Shopify-Theme.git
   cd Shopify-Theme
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Update the `config/cli.yml` file with your Shopify store credentials.

### Development Commands

- **Start development server**:

  ```
  shopify theme dev
  ```

- **Push theme to Shopify**:

  ```
  shopify theme push
  ```

- **Pull theme from Shopify**:

  ```
  shopify theme pull
  ```

- **Lint code**:

  ```
  npm run lint
  ```

- **Run tests**:
  ```
  npm test
  ```

## Project Structure

- `/assets` - Theme assets (CSS, JavaScript, images)
- `/config` - Theme configuration
- `/layout` - Theme layouts
- `/locales` - Translations
- `/sections` - Theme sections
- `/snippets` - Reusable code snippets
- `/templates` - Theme templates

## Best Practices

- Use semantic commits for better version history
- Run linting before committing code
- Test your theme on multiple devices and browsers
