# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/) and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [v0.4.1] - 2018-09-23
### Changed
- Completions and signatures are now dynamically generated behind the scenes, resulting in a lower memory footprint. *(#19)*

### Fixed
- Fixed document unregistration in `tspManager` if it lacked a shebang. *(#19)*
- Corrected the completion label for `status.condition`. *(#19)*
- Added missing `smu.interlock` and `trigger.model` 2450 commands. *(#20)*
- Removed unnecessary asterisk escapes. *(#21)*
- Gutted and replaced the signature detection system. The displayed parameter help should now more accurately reflect the current function call. *(#26)*
- Fixed partial completions not being displayed when the Trigger Suggest keyboard shortcut was used. *(#28)*

## 0.4.0 - 2018-09-07
### Added
- Model 2450 support.
- Lua 5.0.3 support. *(#10)*

### Removed
- Models 2460, 2461, 2461-SYS, and 6500 from the release package.

[Unreleased]: https://github.com/tektronixofficial/vscode-tsplang/compare/v0.4.1...HEAD
[v0.4.1]: https://github.com/tektronixofficial/vscode-tsplang/compare/v0.4.0...v0.4.1
