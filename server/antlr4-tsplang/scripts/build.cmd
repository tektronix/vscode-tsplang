@echo off
java org.antlr.v4.Tool -o %~dp0..\.antlr -message-format gnu -listener -Dlanguage=JavaScript %~dp0..\Tsp.g4
node ./postbuild.js
