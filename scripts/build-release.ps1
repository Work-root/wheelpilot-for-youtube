param(
  [string]$OutputPath = "youtube-speed-booster.zip"
)

$ErrorActionPreference = "Stop"
$repositoryRoot = Split-Path -Parent $PSScriptRoot
$extensionRoot = Join-Path $repositoryRoot "youtube-speed-booster"
$outputFullPath = [System.IO.Path]::GetFullPath((Join-Path $repositoryRoot $OutputPath))
$stagingRoot = Join-Path ([System.IO.Path]::GetTempPath()) (
  "youtube-speed-booster-release-" + [guid]::NewGuid().ToString("N")
)

try {
  New-Item -ItemType Directory -Path $stagingRoot | Out-Null

  $trackedFiles = git -C $repositoryRoot ls-files --cached --others --exclude-standard "youtube-speed-booster"
  if ($LASTEXITCODE -ne 0 -or -not $trackedFiles) {
    throw "Could not list tracked extension files."
  }

  foreach ($relativePath in $trackedFiles) {
    $extensionRelativePath = $relativePath -replace '^youtube-speed-booster/', ''
    $sourcePath = Join-Path $repositoryRoot ($relativePath -replace '/', '\')
    $destinationPath = Join-Path $stagingRoot ($extensionRelativePath -replace '/', '\')
    $destinationDirectory = Split-Path -Parent $destinationPath
    if ($destinationDirectory) {
      New-Item -ItemType Directory -Path $destinationDirectory -Force | Out-Null
    }
    Copy-Item -LiteralPath $sourcePath -Destination $destinationPath
  }

  if (Test-Path -LiteralPath $outputFullPath) {
    Remove-Item -LiteralPath $outputFullPath -Force
  }
  Compress-Archive -Path (Join-Path $stagingRoot "*") -DestinationPath $outputFullPath
  Write-Output $outputFullPath
} finally {
  if (Test-Path -LiteralPath $stagingRoot) {
    [System.IO.Directory]::Delete($stagingRoot, $true)
  }
}
