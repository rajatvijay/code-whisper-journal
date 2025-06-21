#!/bin/bash

# Image Optimization Script
# Converts PNG images to WebP format for better performance
# Usage: ./scripts/optimize-images.sh

echo "🖼️  Starting image optimization..."

# Check if cwebp is installed
if ! command -v cwebp &> /dev/null; then
    echo "❌ cwebp is not installed. Please install it first:"
    echo "   macOS: brew install webp"
    echo "   Ubuntu: sudo apt-get install webp"
    exit 1
fi

# Define images to convert (keeping originals for compatibility)
IMAGES_TO_CONVERT=(
    "public/screenshot-wide.png"
    "public/screenshot-narrow.png" 
    "public/og-image.png"
    "public/logo.png"
)

# Convert images
for image in "${IMAGES_TO_CONVERT[@]}"; do
    if [ -f "$image" ]; then
        # Get filename without extension
        filename=$(basename "$image" .png)
        directory=$(dirname "$image")
        webp_path="$directory/$filename.webp"
        
        echo "  Converting $image to $webp_path..."
        
        # Convert with high quality (90) and optimization
        cwebp -q 90 -m 6 "$image" -o "$webp_path"
        
        if [ $? -eq 0 ]; then
            # Show file size comparison
            original_size=$(du -h "$image" | cut -f1)
            webp_size=$(du -h "$webp_path" | cut -f1) 
            echo "    ✅ $filename: $original_size → $webp_size"
        else
            echo "    ❌ Failed to convert $image"
        fi
    else
        echo "    ⚠️  File not found: $image"
    fi
done

echo ""
echo "📊 Optimization Summary:"
echo "   - Converted images are saved alongside originals"
echo "   - Update your code to use .webp versions where supported"
echo "   - Keep .png versions as fallbacks for older browsers"
echo ""
echo "✅ Image optimization complete!"