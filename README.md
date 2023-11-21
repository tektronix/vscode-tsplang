# TSPLang

[![build](https://travis-ci.com/tektronix/vscode-tsplang.svg?branch=master)](https://travis-ci.com/tektronix/vscode-tsplang)
[![codecov](https://codecov.io/gh/tektronix/vscode-tsplang/branch/master/graph/badge.svg)](https://codecov.io/gh/tektronix/vscode-tsplang)

The TSP language extension for [Visual Studio Code](https://code.visualstudio.com/) provides command completions for [supported](#supported-instruments) TSP-enabled Keithley Instruments.

## Requirements

To enable TSP command completions for supported instruments, a shebang line is required. TSP shebangs take the form of
```
--#!<model>
```
where `<model>` is a supported instrument model. Shebangs __must__ be placed on the first line of a file with a `.tsp` extension.

After installation, if you have not restarted VSCode, you may have to manually select the TSP language for your files. By default, this can be done by pressing <kbd>Ctrl</kbd>+<kbd>K</kbd> <kbd>M</kbd> on Windows and Linux or <kbd>&#8984;</kbd><kbd>K</kbd> <kbd>M</kbd> on Mac and selecting "TSP" while editing your file.

## Supported Instruments

Release builds are available as VSIX files in the [Releases](https://github.com/tektronix/vscode-tsplang/releases) section. Currently supported instrument models include:
* 2450

## Contribute

See a typo? Know how to fix an issue? Implement a requested feature?

We'd love to accept your patches and contributions! The [Contributing](CONTRIBUTING.md) document guides you through checkout, unit testing, and building.

## Maintainer

* [Evan Hall](https://github.com/ethall)

## Disclaimer

This is not an officially supported Tektronix product. It is maintained by a small group of employees in their spare time. We lack the resources typical of most Tektronix products, so please bear with us! We will do our best to address your issues and answer any questions directly related to this extension in a timely manner.

## License

Licensed under Apache 2.0
<br/>
<br/>
Made with :heart: at Keithley Instruments
