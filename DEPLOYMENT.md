# 🚀 Service Booking System - Deployment Guide

## Overview
This guide will help you deploy the Service Booking System to production using Vercel (recommended) or other platforms.

## 📋 Prerequisites

Before deploying, ensure you have:
- [ ] GitHub account
- [ ] Vercel account (free tier available)
- [ ] Line Developers account
- [ ] Firebase project (if using Firebase features)
- [ ] Domain name (optional, Vercel provides free subdomain)

## 🎯 Quick Deploy to Vercel (Recommended)

### Step 1: Prepare Your Repository

1. **Push to GitHub**:
   \`\`\`bash
   git init
   git add .
   git commit -m "Initial commit - Service Booking System"
   git branch -M main
   git remote add origin https://github.com/yourusername/service-booking-app.git
   git push -u origin main
   \`\`\`

### Step 2: Deploy to Vercel

1. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Select "Next.js" framework (auto-detected)

2. **Configure Environment Variables**:
   Add these in Vercel dashboard under "Environment Variables":

   \`\`\`env
   # Line Messaging API
   LINE_CHANNEL_ACCESS_TOKEN=your_channel_access_token
   LINE_CHANNEL_SECRET=your_channel_secret
   LINE_USER_ID=your_line_user_id

   # Application Settings
   NEXT_PUBLIC_BASE_URL=https://your-app-name.vercel.app
   PORT=3000

   # Firebase (if using)
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

   # Email (optional)
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your_email@gmail.com
   SMTP_PASS=your_app_password
   \`\`\`

3. **Deploy**:
   - Click "Deploy"
   - Wait for build to complete (2-3 minutes)
   - Your app will be live at `https://your-app-name.vercel.app`

## 🤖 Line Bot Configuration

### Step 1: Create Line Bot

1. **Line Developers Console**:
   - Go to [developers.line.biz](https://developers.line.biz/)
   - Create new provider (your company name)
   - Create new channel → "Messaging API"

2. **Channel Settings**:
   - Channel name: "Service Booking Bot"
   - Channel description: "24/7 Service booking and emergency assistance"
   - Category: Business
   - Subcategory: Professional Services

### Step 2: Configure Webhook

1. **Set Webhook URL**:
   \`\`\`
   https://your-app-name.vercel.app/api/line/webhook
   \`\`\`

2. **Enable Webhook**:
   - Go to "Messaging API" tab
   - Set webhook URL
   - Enable "Use webhook"
   - Disable "Auto-reply messages"
   - Disable "Greeting messages"

3. **Get Credentials**:
   - Copy "Channel Access Token" → Add to Vercel env vars
   - Copy "Channel Secret" → Add to Vercel env vars
   - Get your Line User ID → Add to Vercel env vars

### Step 3: Get Your Line User ID

1. **Add Line Official Account Manager**:
   - Search "@line" in Line app
   - Add "Line Official Account Manager"

2. **Send Message**:
   - Send any message to get your User ID
   - Or use Line Bot SDK to get user ID from webhook

## 🔧 Alternative Deployment Options

### Deploy to Railway

1. **Connect Repository**:
   \`\`\`bash
   npm install -g @railway/cli
   railway login
   railway init
   railway up
   \`\`\`

2. **Set Environment Variables**:
   \`\`\`bash
   railway variables:set LINE_CHANNEL_ACCESS_TOKEN=your_token
   railway variables:set LINE_CHANNEL_SECRET=your_secret
   railway variables:set LINE_USER_ID=your_user_id
   railway variables:set NEXT_PUBLIC_BASE_URL=https://your-app.railway.app
   \`\`\`

### Deploy to Netlify

1. **Build Settings**:
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Functions directory: `netlify/functions`

2. **Add Netlify Configuration**:
   \`\`\`toml
   # netlify.toml
   [build]
     command = "npm run build"
     publish = ".next"

   [[redirects]]
     from = "/api/*"
     to = "/.netlify/functions/:splat"
     status = 200
   \`\`\`

## 🌐 Custom Domain Setup

### Vercel Custom Domain

1. **Add Domain**:
   - Go to Vercel dashboard
   - Select your project
   - Go to "Domains" tab
   - Add your domain

2. **DNS Configuration**:
   \`\`\`
   Type: CNAME
   Name: www (or @)
   Value: cname.vercel-dns.com
   \`\`\`

3. **Update Environment Variables**:
   \`\`\`env
   NEXT_PUBLIC_BASE_URL=https://yourdomain.com
   \`\`\`

4. **Update Line Webhook**:
   \`\`\`
   https://yourdomain.com/api/line/webhook
   \`\`\`

## 🧪 Testing Your Deployment

### 1. Basic Functionality Test

- [ ] Homepage loads correctly
- [ ] Navigation works
- [ ] Booking form submits
- [ ] Emergency form submits
- [ ] Admin dashboard accessible

### 2. Line Bot Test

1. **Add Your Bot**:
   - Scan QR code from Line Developers Console
   - Add bot as friend

2. **Test Commands**:
   \`\`\`
   Send: "สวัสดี"
   Expected: Welcome message with service options

   Send: "จอง"
   Expected: Booking options with buttons

   Send: "ฉุกเฉิน"
   Expected: Emergency service information
   \`\`\`

### 3. Webhook Test

1. **Check Webhook Status**:
   - Go to Line Developers Console
   - Check webhook verification status
   - Should show "Success"

2. **Monitor Logs**:
   \`\`\`bash
   # Vercel
   vercel logs

   # Railway
   railway logs
   \`\`\`

## 🔒 Security Checklist

- [ ] Environment variables are set correctly
- [ ] Webhook signature verification is enabled
- [ ] HTTPS is enforced
- [ ] API routes are protected
- [ ] Admin routes require authentication
- [ ] Input validation is implemented

## 📊 Monitoring & Analytics

### Vercel Analytics

1. **Enable Analytics**:
   - Go to Vercel dashboard
   - Enable "Analytics" for your project
   - View real-time traffic data

### Error Monitoring

1. **Add Sentry (Optional)**:
   \`\`\`bash
   npm install @sentry/nextjs
   \`\`\`

2. **Configure Sentry**:
   \`\`\`javascript
   // sentry.client.config.js
   import * as Sentry from "@sentry/nextjs";

   Sentry.init({
     dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
   });
   \`\`\`

## 🚨 Troubleshooting

### Common Issues

1. **Webhook Not Working**:
   - Check webhook URL is correct
   - Verify SSL certificate
   - Check environment variables
   - Review server logs

2. **Build Failures**:
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Check for TypeScript errors

3. **Environment Variables**:
   - Ensure all required vars are set
   - Check for typos in variable names
   - Verify values are correct

### Debug Commands

\`\`\`bash
# Check deployment logs
vercel logs --follow

# Test webhook locally
ngrok http 3000
# Use ngrok URL for webhook testing

# Check environment variables
vercel env ls
\`\`\`

## 📞 Support

If you encounter issues:

1. **Check Documentation**: Review this deployment guide
2. **Check Logs**: Monitor application and webhook logs
3. **Test Locally**: Ensure everything works in development
4. **Community Support**: Check Vercel/Next.js communities

## 🎉 Post-Deployment

After successful deployment:

1. **Update Line Bot Profile**:
   - Add profile picture
   - Set greeting message
   - Configure rich menu (optional)

2. **Test All Features**:
   - Complete booking flow
   - Test emergency requests
   - Verify admin functions
   - Check Line bot responses

3. **Monitor Performance**:
   - Check response times
   - Monitor error rates
   - Review user feedback

Your Service Booking System is now live! 🚀
