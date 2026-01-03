#!/bin/bash

# For Execute
# sed -i 's/\r$//' setup.sh && bash setup.sh

echo "[setup.sh] Start to execute..."

echo "--> Setup NVM..."
export NVM_DIR="$HOME/.nvm"
source $NVM_DIR/nvm.sh

nvm install 22.16.0
nvm use 22.16.0

echo "--> Cleaning up build cache & port..."
sudo fuser -k 6104/tcp 2>/dev/null || true
rm -rf node_modules/.bin/next
rm -rf .next

echo "--> Install dependencies..."
npm ci

echo "--> Build application..."
npm run build

echo "--> Setting permissions..."
sudo chown -R www:www . 2>/dev/null || true
sudo find . \( -path ./node_modules -o -path ./vendor \) -prune -o -type d -exec chmod 755 {} \;
sudo find . \( -path ./node_modules -o -path ./vendor \) -prune -o -type f -exec chmod 644 {} \;
chmod +x node_modules/.bin/next

echo "--> Securing credentials files..."
sudo chmod 600 .env .env.local .env.production .well-known .git Makefile setup.sh 2>/dev/null

echo "--> Run application..."
npm run pm2:delete || true
npm run pm2:start
pm2 startup
pm2 save

echo "[setup.sh] Script has been executed successfully..."
