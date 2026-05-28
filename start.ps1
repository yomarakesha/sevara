#requires -Version 5.1
<#
    SillBridge launcher.
    - Ensures backend\.env exists (copies from .env.example on first run)
    - Installs npm dependencies if node_modules is missing
    - Runs the DB init script on first run (tracked via backend\.db-initialized)
    - Starts the server (npm start, or npm run dev with -Dev)
    - Opens http://localhost:<PORT> in the default browser unless -NoBrowser is passed
#>

[CmdletBinding()]
param(
    [switch]$Dev,
    [switch]$NoBrowser,
    [switch]$ReinitDb
)

$ErrorActionPreference = 'Stop'

$root        = Split-Path -Parent $MyInvocation.MyCommand.Path
$backendDir  = Join-Path $root 'backend'
$envFile     = Join-Path $backendDir '.env'
$envExample  = Join-Path $backendDir '.env.example'
$nodeModules = Join-Path $backendDir 'node_modules'
$initMarker  = Join-Path $backendDir '.db-initialized'

function Write-Step($msg) { Write-Host "==> $msg" -ForegroundColor Cyan }
function Write-Ok($msg)   { Write-Host "    $msg" -ForegroundColor Green }
function Write-Warn2($msg){ Write-Host "    $msg" -ForegroundColor Yellow }

if (-not (Test-Path $backendDir)) {
    throw "backend folder not found at $backendDir"
}

# 1. node + npm available?
Write-Step 'Checking Node.js and npm'
foreach ($cmd in 'node','npm') {
    if (-not (Get-Command $cmd -ErrorAction SilentlyContinue)) {
        throw "$cmd is not on PATH. Install Node.js from https://nodejs.org/ and re-run."
    }
}
Write-Ok ("node {0}  npm {1}" -f (node -v), (npm -v))

Set-Location $backendDir

# 2. .env
Write-Step 'Checking backend\.env'
if (-not (Test-Path $envFile)) {
    if (-not (Test-Path $envExample)) { throw '.env.example missing — cannot create .env' }
    Copy-Item $envExample $envFile
    Write-Warn2 'Created backend\.env from .env.example.'
    Write-Warn2 'Edit it now to set your DB credentials and JWT_SECRET, then re-run this script.'
    Start-Process notepad.exe $envFile
    exit 1
}
Write-Ok '.env present'

# 3. dependencies
Write-Step 'Checking npm dependencies'
if (-not (Test-Path $nodeModules)) {
    Write-Warn2 'node_modules missing — running npm install'
    npm install
    if ($LASTEXITCODE -ne 0) { throw 'npm install failed' }
} else {
    Write-Ok 'node_modules present'
}

# 4. DB init (first run, or forced via -ReinitDb)
if ($ReinitDb -or -not (Test-Path $initMarker)) {
    Write-Step 'Initializing database (npm run db:init)'
    npm run db:init
    if ($LASTEXITCODE -ne 0) {
        throw 'db:init failed. Check that PostgreSQL is running and the credentials in backend\.env are correct.'
    }
    Set-Content -Path $initMarker -Value (Get-Date -Format o) -Encoding utf8
    Write-Ok 'Database initialized'
} else {
    Write-Ok 'Database already initialized (delete backend\.db-initialized or pass -ReinitDb to redo)'
}

# 5. open browser shortly after start
if (-not $NoBrowser) {
    $port = 3000
    $portLine = Select-String -Path $envFile -Pattern '^\s*PORT\s*=\s*(\d+)' -ErrorAction SilentlyContinue
    if ($portLine) { $port = [int]$portLine.Matches[0].Groups[1].Value }
    $url = "http://localhost:$port"
    Start-Job -ScriptBlock {
        param($u) Start-Sleep -Seconds 3; Start-Process $u
    } -ArgumentList $url | Out-Null
    Write-Ok "Browser will open at $url"
}

# 6. start server (foreground — Ctrl+C to stop)
$script = if ($Dev) { 'dev' } else { 'start' }
Write-Step "Starting server (npm run $script)"
npm run $script
exit $LASTEXITCODE
