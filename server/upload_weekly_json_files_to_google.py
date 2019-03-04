# Script by Wei Wei Chen & Jia Jun Yong, 2018
#
# GOAL: To upload weekly JSON files to Google Cloud Storage

from google.cloud import storage
from datetime import datetime,timedelta, date
import shutil
import os

bucket_name = 'cloud_computing_assign2_bucket_1'
storage_client = storage.Client()
bucket = storage_client.get_bucket(bucket_name)

file_datetime = date.today()
file_date_time = file_datetime.strftime('%Y%m%d')

file = 'weekly_json_file' + '_' + str(file_date_time) + str('.json')

source_file_name = file
destination_blob_name = file
blob = bucket.blob(destination_blob_name)
blob.upload_from_filename(source_file_name)
print('File {} uploaded to {}.'.format(source_file_name,destination_blob_name))

dst = 'weekly_json_file_backup/' + file

shutil.move(file,dst)