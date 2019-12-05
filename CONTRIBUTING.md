# Contributing Guide

TSPLang is a part-time effort from a small team, so contributions are welcome! This document shows you how to get the project, run all provided tests, and generate a production-ready build.

## Dependencies

To make sure that the following instructions work, please install the following dependencies on your machine:

- Visual Studio Code
- Node.js (for the npm tool)
- Git

## Installation

To retrieve the TSPLang source code, clone the git repository with:

````
$ git clone https://github.com/tektronix/vscode-tsplang
````

This will clone the complete source to your local machine. Navigate to the project folder
and install all dependencies:

````
$ npm install
````

This this will install everything required to build and test the project.

## Testing

TSPLang uses [**Mocha**](https://mochajs.org/) as its testing framework and [**Istanbul**](https://istanbul.js.org/) to calculate test coverage.

### Source Linting: `npm run lint`

Performs linting on all source files. Also performed during the `test` and `prepackage` scripts.

### Unit Testing: `npm run test`

Executes unit tests located in [`test`](/test). Also performed during the `prepackage` script.

### Coverage Mapping: `npm run cover`

Runs unit tests and outputs a coverage map.

## Building

### Compiling: `npm run compile`

Transpiles TypeScript files into JavaScript and places the build artifacts in the `out` directory. This command performs a single compilation. For continuous file watching, refer to the [Developing](#developing) section.

### Packaging: `npm run package`

This script requires the [`vsce`](https://www.npmjs.com/package/vsce) npm package to be installed globally. This can be done by executing:
```
$ npm install -g vsce
```

For additional `vsce` help, please refer to its [documentation](https://code.visualstudio.com/docs/extensions/publish-extension).

## Developing

Visual Studio Code build tasks have been configured for both Client and Server and live in the [`.vscode/tasks.json`](/.vscode/tasks.json) file. To run both build tasks, press <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>B</kbd> on Windows and Linux or <kbd>&#8679;</kbd><kbd>&#8984;</kbd><kbd>B</kbd> on Mac.

### Client Watch: `npm run watch:client`

Watches Client files in [`src`](/src) and compiles any changes.

### Server Watch: `npm run watch:server`

Watches Server files in [`server`](/server) and compiles any changes.

## Contributing/Submitting Changes

* Create a fork from the latest `dev` branch and name it what you intend to do.
    * Branch names should start with:
        * `topic/`
        * `feature/`
        * `bugfix/`
    * Use one branch per feature/bugfix.
    * Words in the branch name should be hyphen (`-`) delimited.
    * Example:
        ```
        $ git remote update && git fetch
        $ git checkout -b topic/speed-improvements origin/dev
        ```
* Make your changes.
    * Add or edit unit tests as appropriate.
    * Run `npm run test`.
        * Ensure no linting errors are present.
        * All unit tests must pass.
    * Run `npm run cover`.
        * Coverage should be the same or better than when you started.
* Commit your changes.
    * Each commit should be as limited in scope as possible.
    * Ensure your commit messages are concise.
* Submit a pull request.
    * Make sure your PR is against the `dev` branch.

Your pull request will serve as a code review. All submissions, including those by project members, require review.

## Contributor License Agreement

Contributions to this project must be accompanied by a Contributor License Agreement. You (or your employer) retain the copyright to your contribution; this simply gives us permission to use and redistribute your contributions as part of the project.

You generally only need to submit a CLA once, so if you've already submitted one (even if it was for a different project), you probably don't need to do it again.



<!-- Modified by Tektronix. Original Content developed by the angular-translate team and Pascal Precht and their Contributing Guide available at https://github.com/angular-translate/angular-translate -->
