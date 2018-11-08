@echo off
java org.antlr.v4.Tool -o %~dp0..\src\tsp -Dlanguage=JavaScript %~dp0Tsp.g4

rem for %%f in (%~dp0..\src\tsp\*.js) do (
rem     echo // tslint:disable>%%~dpnf.ts
rem     type %%f >> %%~dpnf.ts
rem     del %%f
rem )
