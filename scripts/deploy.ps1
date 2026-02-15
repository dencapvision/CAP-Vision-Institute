# Build the project
Write-Host "Building the project..." -ForegroundColor Cyan
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed. Deployment aborted." -ForegroundColor Red
    exit $LASTEXITCODE
}

# Define deployment variables
$RemoteUser = "root"
$RemoteHost = "76.13.21.197"
$RemotePath = "/var/www/CAP-Vision-Institute/dist/"

Write-Host "Deploying to $RemoteUser@$RemoteHost : $RemotePath ..." -ForegroundColor Cyan

# Use SCP to upload dist folder contents
# Note: This assumes SSH keys are configured for passwordless login
scp -r dist/* "${RemoteUser}@${RemoteHost}:${RemotePath}"

if ($LASTEXITCODE -eq 0) {
    Write-Host "Deployment successful!" -ForegroundColor Green
} else {
    Write-Host "Deployment failed. Check your connection or SSH configuration." -ForegroundColor Red
}
