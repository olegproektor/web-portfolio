# Fix Node.js PATH issue
# Add Node.js to PATH if not already present

$nodePath = "C:\Program Files\nodejs"
$currentPath = [Environment]::GetEnvironmentVariable("PATH", [EnvironmentVariableTarget]::User)

if (-not ($currentPath -like "*$nodePath*")) {
    $newPath = "$currentPath;$nodePath"
    [Environment]::SetEnvironmentVariable("PATH", $newPath, [EnvironmentVariableTarget]::User)
    Write-Host "Added Node.js to PATH. Please restart your PowerShell session for changes to take effect."
} else {
    Write-Host "Node.js is already in PATH."
}

# Also update the current session PATH
$env:Path += ";$nodePath"
Write-Host "Updated current session PATH."