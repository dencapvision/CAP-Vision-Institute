# Configuration
$SERVER_IP = "76.13.21.197"
$REMOTE_PATH = "/var/www/cap-vision-admin"
$ADMIN_DIR = "cap-vision-admin"

# Enter Admin Portal directory
Write-Host "--- Entering Admin Portal Directory ---"
Set-Location $ADMIN_DIR

# Build the app
Write-Host "Building the Admin Portal..."
npm install
npm run build

# Final Sync with Compression for speed
Write-Host "Compressing and deploying to root@${SERVER_IP}:${REMOTE_PATH} ..."

# Use tar to compress files (Windows tar works similarly to Linux tar in PowerShell)
tar -czf dist.tar.gz .next public package.json package-lock.json .env.local

# SCP the compressed file
scp dist.tar.gz "root@${SERVER_IP}:${REMOTE_PATH}/"

# Unpack on server and restart process
Write-Host "Unpacking and restarting on server..."
ssh "root@${SERVER_IP}" "cd ${REMOTE_PATH} && tar -xzf dist.tar.gz && rm dist.tar.gz && npm install --production && pm2 restart cap-vision-admin"

# Cleanup local archive
Remove-Item dist.tar.gz

Write-Host "--- Admin Deployment successful! ---"
