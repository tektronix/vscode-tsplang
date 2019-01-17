@echo off
java org.antlr.v4.Tool -o %~dp0..\src\antlr4-tspfast -Dlanguage=JavaScript %~dp0TspFast.g4
