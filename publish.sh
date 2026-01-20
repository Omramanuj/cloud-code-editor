#!/bin/bash

# Publishing script for cloud-code-editor package

echo "🚀 Publishing cloud-code-editor package..."
echo ""

# Check if logged in
if ! npm whoami &> /dev/null; then
    echo "❌ Not logged in to npm"
    echo "📝 Run: npm login"
    exit 1
fi

echo "✅ Logged in as: $(npm whoami)"
echo ""

# Build the package
echo "📦 Building package..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

echo "✅ Build successful!"
echo ""

# Show what will be published
echo "📋 Files to be published:"
npm pack --dry-run 2>&1 | grep -E "^\w" | head -20
echo ""

# Ask for confirmation
read -p "🤔 Ready to publish? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Publishing cancelled"
    exit 1
fi

# Publish
echo "🚀 Publishing to npm..."
npm publish

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Published successfully!"
    echo "📦 Package: https://www.npmjs.com/package/cloud-code-editor"
    echo ""
    echo "🧪 Test installation:"
    echo "   npm install cloud-code-editor"
else
    echo "❌ Publishing failed!"
    exit 1
fi
