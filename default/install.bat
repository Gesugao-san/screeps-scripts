@ECHO OFF
git -v | findstr /i /R  "git version" > nul
IF %ERRORLEVEL% == 9009 (
    ECHO Please install git:
    ECHO https://git-scm.com/
    PAUSE
    GOTO :EOF
    @REM EXIT /B %ERRORLEVEL%
)
CD /D %CD%
CD ..
IF EXIST ".git\" (
    ECHO Already installed. You can update with:
    ECHO git fetch
    ECHO git pull
    PAUSE
    GOTO :OEF
    @REM EXIT /B %ERRORLEVEL%
)

git init
git remote add "origin" git@github.com:Gesugao-san/screeps-scripts.git
git remote add "upstream" git@github.com:screeps/tutorial-scripts.git
git remote -v
@REM $ for i in git branch -a | grep remote | grep -v HEAD | grep -v master; do git branch --track ${i#remotes/origin/} $i; done
git fetch
git pull
ECHO Scripts should be installed.
PAUSE
