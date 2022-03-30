@ECHO OFF
node deploy-commands.js
node index.js
:loop
echo The bot will restart in 15 seconds. Press N to cancel.
choice /t 15 /c yn /cs /d y /m "Start bot Yes/No?"
if errorlevel 3 goto :yes
if errorlevel 2 goto :no
if errorlevel 1 goto :yes
:yes
node deploy-commands.js
node index.js
GOTO :loop
:no
pause