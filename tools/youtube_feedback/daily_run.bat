@echo off
REM YouTube Feedback Pipeline - 日次実行用バッチファイル
REM タスクスケジューラから呼び出される

cd /d "%~dp0"
echo [%date% %time%] Pipeline started >> daily_run.log
node run.js >> daily_run.log 2>&1
echo [%date% %time%] Pipeline finished (exit code: %ERRORLEVEL%) >> daily_run.log
echo. >> daily_run.log
