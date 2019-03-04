# Script by Wei Wei Chen, 2018
#
# GOAL: To upload daily JSON files to Google Cloud Storage

#! /home/ec2-user/softwares/python3.7/bin/python3 
# Import libraries
from google.cloud import storage
import os
import os.path
import glob
import pandas as pd
import shutil

path = os.listdir('./')
bucket_name = 'cloud_computing_assign2_bucket_1'
storage_client = storage.Client()
bucket = storage_client.get_bucket(bucket_name)

if os.path.exists('daily_json_file_backup'):
   os.chdir('./')
else: 
   os.mkdir('daily_json_file_backup')
source = './'
destin = 'daily_json_file_backup/'

if os.path.isfile('daily_combined_dataframe.csv'):
   os.remove('daily_combined_dataframe.csv')

files = glob.glob('daily_json_file_*.json')
for file in files:
    print(file)
    source_file_name = file
    destination_blob_name = file
    blob = bucket.blob(destination_blob_name)
    blob.upload_from_filename(source_file_name)
    print('File {} uploaded to {}.'.format(source_file_name,destination_blob_name))
    
    src = source + file
    dst = destin + file
    shutil.move(src,dst)
