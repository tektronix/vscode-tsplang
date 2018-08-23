#
# Copyright 2018 Tektronix Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#

# Create a file containing license warnings generated by the
# license-compatibility-checker npm package

# Quit script on first build-in command error
$ErrorActionPreference = "Stop"

# Change the current directory
Set-Location "$PSScriptRoot/.."

# Create a new VSIX file
npm run package | Out-Null

# Move the resulting VSIX file, renaming it in the process
Move-Item .\*.vsix .\utils\target.zip -Force

# Create the unzip target directory
mkdir .\utils\target | Out-Null

# Unzip into target directory
Expand-Archive "$PSScriptRoot/target.zip" "$PSScriptRoot/target"

# Run license-compatibility-check
$hits = lcc "$PSScriptRoot/target/extension/package.json" "$PSScriptRoot/target/extension/node_modules" `
    <# Match against lines with red text #> `
    | Where-Object { $_ -match "\[31m" } `
    <# Remove blank lines #> `
    | Where-Object { $_ -notmatch "^$" } `
    <# Remove lines containing "License issues found" #> `
    | Where-Object { $_ -notmatch "License issues found" } `
    <# Replace escape codes #> `
    | ForEach-Object { $_ -replace "\x1B\[31m", "" } `
    | ForEach-Object { $_ -replace "\x1B\[33m", "" } `
    | ForEach-Object { $_ -replace "\x1B\[34m", "" } `
    | ForEach-Object { $_ -replace "\x1B\[39m", "" } `
    <# Remove modules that have been vetted and cleared #> `
    | Where-Object { $_ -notmatch "json-schema@0.2.3" } `
    | Where-Object { $_ -notmatch "jsonify@0.0.0" } `
    | Where-Object { $_ -notmatch "map-stream@0.1.0" } `
    | Where-Object { $_ -notmatch "node.extend@1.1.6" } `
    | Where-Object { $_ -notmatch "pause-stream@0.0.11" }

# Clean up
Remove-Item "$PSScriptRoot/target.zip" -Force
Remove-Item "$PSScriptRoot/target" -Recurse -Force

if ($hits.length -gt 0) {
    # Only echo if there is something to report
    Write-Host $hits

    exit 1
}
else {
    exit 0
}
