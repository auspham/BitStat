#!/bin/bash
source ~/.bash_profile 
cd REPLACE && PYTHON upload_daily_json_files_to_google.py >> upload_daily.log
