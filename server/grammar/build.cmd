@echo off
java org.antlr.v4.Tool -o %~dp0..\antlr4-tsplang\src -message-format gnu -listener -Dlanguage=JavaScript %~dp0Tsp.g4
