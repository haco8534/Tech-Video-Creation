@echo off
REM Windows タスクスケジューラに日次実行タスクを登録する
REM 管理者権限で実行してください

set TASK_NAME=YouTubeFeedbackPipeline
set SCRIPT_PATH=%~dp0daily_run.bat
set RUN_TIME=09:00

echo タスクスケジューラに登録します:
echo   タスク名: %TASK_NAME%
echo   実行時刻: 毎日 %RUN_TIME%
echo   スクリプト: %SCRIPT_PATH%
echo.

schtasks /create /tn "%TASK_NAME%" /tr "\"%SCRIPT_PATH%\"" /sc daily /st %RUN_TIME% /f

if %ERRORLEVEL% equ 0 (
    echo.
    echo 登録完了！毎日 %RUN_TIME% に自動実行されます。
    echo.
    echo 確認:   schtasks /query /tn "%TASK_NAME%"
    echo 削除:   schtasks /delete /tn "%TASK_NAME%" /f
    echo 手動実行: schtasks /run /tn "%TASK_NAME%"
) else (
    echo.
    echo 登録失敗。管理者権限で実行してください。
)

pause
