@echo off
java org.antlr.v4.Tool -o %~dp0..\src\antlr4-tsplang -message-format gnu -listener -Dlanguage=JavaScript %~dp0Tsp.g4
