#!/bin/bash
source ~/.bash_profile
cd REPLACE && PYTHON upload_hourly_json_files_to_google.py >> upload_hourly.log
