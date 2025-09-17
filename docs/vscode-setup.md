# VS Code Setup for Shopify Theme Development

## Recommended Extensions

### Shopify Extensions
- **Shopify Liquid** (`shopify.theme-check-vscode`)
  - Liquid syntax highlighting
  - Theme Check integration
  - Snippets and autocompletion

### HTML/CSS Extensions
- **HTML CSS Support** (`ecmel.vscode-html-css`)
- **CSS Peek** (`pranaygp.vscode-css-peek`)
- **IntelliSense for CSS** (`zignd.html-css-class-completion`)

### JavaScript Extensions
- **ESLint** (`dbaeumer.vscode-eslint`)
- **Prettier** (`esbenp.prettier-vscode`)
- **JavaScript (ES6) Code Snippets** (`xabikos.javascriptsnippets`)

### Git Extensions
- **GitLens** (`eamodio.gitlens`)
- **Git History** (`donjayamanne.githistory`)

### Productivity Extensions
- **Path Intellisense** (`christian-kohler.path-intellisense`)
- **Auto Close Tag** (`formulahendry.auto-close-tag`)
- **Auto Rename Tag** (`formulahendry.auto-rename-tag`)
- **Todo Tree** (`gruntfuggly.todo-tree`)

## VS Code Settings

Create a `.vscode/settings.json` file in your project with these settings:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[liquid]": {
    "editor.formatOnSave": false,
    "editor.defaultFormatter": "shopify.theme-check-vscode"
  },
  "files.associations": {
    "*.liquid": "liquid"
  },
  "emmet.includeLanguages": {
    "liquid": "html"
  },
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "liquid.format.enable": true,
  "css.validate": false,
  "less.validate": false,
  "scss.validate": false,
  "stylelint.validate": ["css", "scss"],
  "eslint.validate": ["javascript"],
  "liquid.completion.tags": true,
  "liquid.completion.objects": true,
  "liquid.completion.filters": true,
  "liquid.hover.tags": true,
  "liquid.hover.objects": true,
  "liquid.hover.filters": true,
  "editor.tabSize": 2,
  "workbench.colorCustomizations": {
    "statusBar.background": "#7048e8",
    "statusBar.foreground": "#ffffff"
  },
  "todo-tree.general.tags": [
    "BUG",
    "HACK",
    "FIXME",
    "TODO",
    "XXX",
    "[ ]",
    "[x]"
  ],
  "todo-tree.highlights.defaultHighlight": {
    "icon": "alert",
    "type": "text",
    "foreground": "white",
    "background": "#e51400",
    "opacity": 50
  }
}
```

## Snippets

Create a `.vscode/liquid.code-snippets` file for custom snippets:

```json
{
  "Shopify Section": {
    "prefix": "section",
    "body": [
      "{% schema %}",
      "{",
      "  \"name\": \"${1:Section name}\",",
      "  \"tag\": \"section\",",
      "  \"class\": \"${2:section}\",",
      "  \"settings\": [",
      "    {",
      "      \"type\": \"${3|text,textarea,image_picker,checkbox,range,color,select|}\",",
      "      \"id\": \"${4:setting_id}\",",
      "      \"label\": \"${5:Setting Label}\"",
      "    }",
      "  ],",
      "  \"presets\": [",
      "    {",
      "      \"name\": \"${1:Section name}\"",
      "    }",
      "  ]",
      "}",
      "{% endschema %}"
    ],
    "description": "Shopify section schema"
  },
  "Liquid For Loop": {
    "prefix": "forloop",
    "body": [
      "{% for ${1:item} in ${2:collection} %}",
      "  $3",
      "{% endfor %}"
    ],
    "description": "Liquid for loop"
  },
  "Liquid If Statement": {
    "prefix": "ifstatement",
    "body": [
      "{% if ${1:condition} %}",
      "  $2",
      "{% else %}",
      "  $3",
      "{% endif %}"
    ],
    "description": "Liquid if statement"
  },
  "Liquid Assign": {
    "prefix": "assign",
    "body": [
      "{% assign ${1:variable} = ${2:value} %}"
    ],
    "description": "Liquid assign variable"
  },
  "Liquid Capture": {
    "prefix": "capture",
    "body": [
      "{% capture ${1:variable} %}",
      "  $2",
      "{% endcapture %}"
    ],
    "description": "Liquid capture variable"
  }
}
```

## Launch Configuration

Create a `.vscode/launch.json` file for debugging:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Launch Chrome against localhost",
      "url": "http://localhost:9292",
      "webRoot": "${workspaceFolder}"
    }
  ]
}
```

## Editor Config

Create a `.editorconfig` file in your project root:

```editorconfig
root = true

[*]
charset = utf-8
end_of_line = lf
indent_size = 2
indent_style = space
insert_final_newline = true
trim_trailing_whitespace = true

[*.md]
trim_trailing_whitespace = false
```

## Terminal Integration

Set up integrated terminal commands in VS Code's Command Palette:

1. Press `Ctrl+Shift+P`
2. Type "Preferences: Configure User Snippets"
3. Select "shellscript.json"
4. Add these snippets:

```json
{
  "Shopify Theme Dev": {
    "prefix": "shopify-dev",
    "body": [
      "shopify theme dev --store=${1:your-store.myshopify.com}"
    ],
    "description": "Start Shopify theme development server"
  },
  "Shopify Theme Check": {
    "prefix": "shopify-check",
    "body": [
      "shopify theme check"
    ],
    "description": "Run Shopify theme check"
  },
  "Shopify Theme Push": {
    "prefix": "shopify-push",
    "body": [
      "shopify theme push --theme=${1:your-theme-id}"
    ],
    "description": "Push theme changes to Shopify"
  }
}
```
