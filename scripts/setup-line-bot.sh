#!/bin/bash

# Line Bot Setup Script
# This script helps configure Line Messaging API

echo "🤖 Line Bot Setup Assistant"
echo "=========================="

# Check if required environment variables are set
if [ -z "$LINE_CHANNEL_ACCESS_TOKEN" ]; then
    echo "❌ LINE_CHANNEL_ACCESS_TOKEN not set"
    echo "Please get your token from Line Developers Console"
    exit 1
fi

if [ -z "$LINE_CHANNEL_SECRET" ]; then
    echo "❌ LINE_CHANNEL_SECRET not set"
    echo "Please get your secret from Line Developers Console"
    exit 1
fi

if [ -z "$NEXT_PUBLIC_BASE_URL" ]; then
    echo "❌ NEXT_PUBLIC_BASE_URL not set"
    echo "Please set your deployment URL"
    exit 1
fi

echo "✅ Environment variables configured"
echo ""

# Test webhook URL
WEBHOOK_URL="${NEXT_PUBLIC_BASE_URL}/api/line/webhook"
echo "🔗 Testing webhook URL: $WEBHOOK_URL"

# Test if URL is accessible
if curl -s --head "$WEBHOOK_URL" | head -n 1 | grep -q "200 OK\|405 Method Not Allowed"; then
    echo "✅ Webhook URL is accessible"
else
    echo "❌ Webhook URL is not accessible"
    echo "Please check your deployment"
fi

echo ""
echo "📋 Line Bot Configuration Checklist:"
echo "1. ✅ Create Line Bot at developers.line.biz"
echo "2. ✅ Set webhook URL: $WEBHOOK_URL"
echo "3. ✅ Enable webhook in Line console"
echo "4. ✅ Disable auto-reply messages"
echo "5. ✅ Get Channel Access Token and Secret"
echo "6. ✅ Set environment variables"
echo ""
echo "🧪 Test your bot by sending a message!"
