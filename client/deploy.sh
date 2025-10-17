#!/bin/bash

# 🚫 Stop on any error
set -e

# 🧾 Configuration
PEM_KEY="~/Downloads/krushi.pem"  # ✅ Make sure this path is correct
USER="ubuntu"
SERVER_IP="3.26.65.146"
TEMP_PATH="/home/ubuntu/frontend-temp"
TARGET_PATH="/var/www/html"

echo "🚀 Starting Deployment..."

# 🏗️ Step 1: Build React locally
echo "🔨 Building React app locally..."
npm run build || { echo "❌ Build failed"; exit 1; }

# 📡 Step 2: Upload to temp folder on server
echo "📡 Uploading build to temp directory on server..."
ssh -i "$PEM_KEY" $USER@$SERVER_IP "rm -rf $TEMP_PATH && mkdir -p $TEMP_PATH"
scp -i "$PEM_KEY" -r build/* "$USER@$SERVER_IP:$TEMP_PATH" || { echo "❌ Upload failed"; exit 1; }

# 🛠️ Step 3: Move build to live nginx directory with sudo
echo "📦 Deploying to Nginx directory..."
ssh -i "$PEM_KEY" $USER@$SERVER_IP << EOF
  sudo rm -rf $TARGET_PATH/*
  sudo cp -r $TEMP_PATH/* $TARGET_PATH/
  sudo chown -R www-data:www-data $TARGET_PATH
EOF

# 🔁 Step 4: Restart nginx
echo "🔄 Restarting Nginx..."
ssh -i "$PEM_KEY" $USER@$SERVER_IP "sudo systemctl restart nginx"

echo "✅ Deployment Complete! Your site should be live 🎉"