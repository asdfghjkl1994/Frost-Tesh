#!/bin/bash

# Service Booking System - Deployment Script
# This script automates the deployment process

echo "🚀 Starting deployment process..."

# Check if required tools are installed
command -v git >/dev/null 2>&1 || { echo "❌ Git is required but not installed. Aborting." >&2; exit 1; }
command -v npm >/dev/null 2>&1 || { echo "❌ npm is required but not installed. Aborting." >&2; exit 1; }

# Build the application
echo "📦 Building application..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "⚠️  Warning: .env.local not found. Make sure to set environment variables in your deployment platform."
fi

# Git operations
echo "📝 Preparing Git repository..."

# Initialize git if not already initialized
if [ ! -d .git ]; then
    git init
    echo "✅ Git repository initialized"
fi

# Add all files
git add .

# Commit changes
echo "💾 Committing changes..."
git commit -m "Deploy: Service Booking System $(date '+%Y-%m-%d %H:%M:%S')"

# Check if remote origin exists
if git remote get-url origin >/dev/null 2>&1; then
    echo "📤 Pushing to existing repository..."
    git push origin main
else
    echo "⚠️  No remote repository found. Please add your GitHub repository:"
    echo "   git remote add origin https://github.com/yourusername/service-booking-app.git"
    echo "   git push -u origin main"
fi

echo ""
echo "🎉 Deployment preparation complete!"
echo ""
echo "Next steps:"
echo "1. 🌐 Deploy to Vercel: https://vercel.com/new"
echo "2. 🤖 Configure Line Bot webhook"
echo "3. 🔧 Set environment variables"
echo "4. 🧪 Test your deployment"
echo ""
echo "📖 See DEPLOYMENT.md for detailed instructions"
