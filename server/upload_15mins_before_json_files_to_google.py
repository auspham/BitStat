# Script by Wei Wei Chen & Jia Jun Yong, 2018
#
# GOAL: To upload last 15 mins JSON files to Google Cloud Storage

from google.cloud import storage
from datetime import datetime,timedelta, date
import shutil
import os

bucket_name = 'REPLACE'
storage_client = storage.Client()
bucket = storage_client.get_bucket(bucket_name)

current_min = datetime.now()
current_min_date = str(current_min.strftime('%Y%m%d'))
current_min_val = str(current_min.strftime("%H"))
current_min_min = str(current_min.minute)

file = '15mins_before_json_file' + '_' + str(current_min_date) + str(current_min_val) + str(current_min_min) + '.json'

source_file_name = file
destination_blob_name = file
blob = bucket.blob(destination_blob_name)
blob.upload_from_filename(source_file_name)
print('File {} uploaded to {}.'.format(source_file_name,destination_blob_name))

dst = '15mins_json_file_backup/' + file

shutil.move(file,dst)