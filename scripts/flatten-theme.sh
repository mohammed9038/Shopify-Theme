#!/bin/bash
# Script to flatten the Dawn theme directory structure for Shopify compatibility

# Configuration
ROOT_PATH="$PWD"
OUTPUT_PATH="$PWD-flattened"
FORCE=true

# Create output directory structure
echo "Creating output directory structure..."
DIRECTORIES=("assets" "config" "layout" "locales" "sections" "snippets" "templates")

# Create or clean the output directory
if [ -d "$OUTPUT_PATH" ]; then
  if [ "$FORCE" = true ]; then
    echo "Cleaning existing output directory..."
    rm -rf "$OUTPUT_PATH"
    mkdir -p "$OUTPUT_PATH"
  else
    echo "Output directory already exists. Use -f to force overwrite."
    exit 1
  fi
else
  mkdir -p "$OUTPUT_PATH"
fi

# Create the standard Shopify directories
for dir in "${DIRECTORIES[@]}"; do
  mkdir -p "$OUTPUT_PATH/$dir"
  echo "Created $dir directory"
done

# Copy root files
echo "Copying root files..."
find "$ROOT_PATH" -maxdepth 1 -type f | while read file; do
  cp "$file" "$OUTPUT_PATH/"
  echo "Copied $(basename "$file") to root"
done

# Process assets directory
echo "Flattening assets directory..."
if [ -d "$ROOT_PATH/assets" ]; then
  # First copy top-level assets
  find "$ROOT_PATH/assets" -maxdepth 1 -type f | while read file; do
    cp "$file" "$OUTPUT_PATH/assets/"
    echo "Copied $(basename "$file") to assets"
  done

  # Then process subdirectories
  find "$ROOT_PATH/assets" -mindepth 1 -type d | while read subdir; do
    subdirname=$(basename "$subdir")
    find "$subdir" -type f | while read file; do
      filename=$(basename "$file")
      rootfile="$ROOT_PATH/assets/$filename"

      # Check if there's a file with same name at root level
      if [ -f "$rootfile" ]; then
        # Skip if there's a conflict
        echo "Skipping $file - asset exists at root level"
      else
        # Use flat naming - add subdirectory name as prefix
        newname="$subdirname-$filename"
        cp "$file" "$OUTPUT_PATH/assets/$filename"
        echo "Copied $file to assets/$filename"
      fi
    done
  done
fi

# Copy config directory (typically no subdirectories)
echo "Copying config directory..."
if [ -d "$ROOT_PATH/config" ]; then
  cp -r "$ROOT_PATH/config"/* "$OUTPUT_PATH/config/"
  echo "Copied config files"
fi

# Copy layout directory (typically no subdirectories)
echo "Copying layout directory..."
if [ -d "$ROOT_PATH/layout" ]; then
  cp -r "$ROOT_PATH/layout"/* "$OUTPUT_PATH/layout/"
  echo "Copied layout files"
fi

# Copy locales directory (typically no subdirectories)
echo "Copying locales directory..."
if [ -d "$ROOT_PATH/locales" ]; then
  cp -r "$ROOT_PATH/locales"/* "$OUTPUT_PATH/locales/"
  echo "Copied locales files"
fi

# Process sections directory - respecting wrappers
echo "Flattening sections directory..."
if [ -d "$ROOT_PATH/sections" ]; then
  # First copy top-level sections
  find "$ROOT_PATH/sections" -maxdepth 1 -type f | while read file; do
    cp "$file" "$OUTPUT_PATH/sections/"
    echo "Copied $(basename "$file") to sections"
  done

  # Then process subdirectories
  find "$ROOT_PATH/sections" -mindepth 1 -type d | while read subdir; do
    subdirname=$(basename "$subdir")
    find "$subdir" -type f | while read file; do
      filename=$(basename "$file")
      rootfile="$ROOT_PATH/sections/$filename"

      # Check if there's a file with same name at root level
      if [ -f "$rootfile" ]; then
        echo "Skipping $file - wrapper exists at root level"
      else
        cp "$file" "$OUTPUT_PATH/sections/"
        echo "Copied $file to sections/$filename"
      fi
    done
  done
fi

# Process snippets directory - respecting wrappers
echo "Flattening snippets directory..."
if [ -d "$ROOT_PATH/snippets" ]; then
  # First copy top-level snippets
  find "$ROOT_PATH/snippets" -maxdepth 1 -type f | while read file; do
    cp "$file" "$OUTPUT_PATH/snippets/"
    echo "Copied $(basename "$file") to snippets"
  done

  # Then process subdirectories
  find "$ROOT_PATH/snippets" -mindepth 1 -type d | while read subdir; do
    subdirname=$(basename "$subdir")
    find "$subdir" -type f | while read file; do
      filename=$(basename "$file")
      rootfile="$ROOT_PATH/snippets/$filename"

      # Check if there's a file with same name at root level
      if [ -f "$rootfile" ]; then
        echo "Skipping $file - wrapper exists at root level"
      else
        cp "$file" "$OUTPUT_PATH/snippets/"
        echo "Copied $file to snippets/$filename"
      fi
    done
  done
fi

# Copy templates directory (typically no subdirectories)
echo "Copying templates directory..."
if [ -d "$ROOT_PATH/templates" ]; then
  cp -r "$ROOT_PATH/templates"/* "$OUTPUT_PATH/templates/"
  echo "Copied templates files"
fi

# Fix references in liquid files
echo "Updating liquid file references..."

# Find all liquid files and update references
find "$OUTPUT_PATH" -name "*.liquid" | while read file; do
  # Replace sections references
  sed -i 's/{%\s*section\s\+["'"'"']\([^/]\+\)\/\([^"'"'"']\+\)["'"'"']\s*%}/{% section "\2" %}/g' "$file"

  # Replace includes/renders references
  sed -i 's/{%\s*\(include\|render\)\s\+["'"'"']\([^/]\+\)\/\([^"'"'"']\+\)["'"'"']\s*%}/{% \1 "\3" %}/g' "$file"

  echo "Updated references in $file"
done

echo "Directory structure flattened successfully!"
echo "You can now deploy the flattened theme from: $OUTPUT_PATH"
