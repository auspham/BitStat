# Script by Wei Wei Chen, 2018
#
# GOAL: To upload hourly JSON files to Google Cloud Storage

#!/home/ec2-user/softwares/python3.7/bin/python3 
# Import libraries
from google.cloud import storage
import os
import os.path
import glob
import shutil

path = os.listdir('./')
<<<<<<< HEAD
bucket_name = 'cloud_computing_assign2_bucket_1'
=======
bucket_name = 'REPLACE'
>>>>>>> 88bdaeddffa2b91d27f92822735d735ce617b73c
storage_client = storage.Client()
bucket = storage_client.get_bucket(bucket_name)

if os.path.exists('hourly_json_file_backup'):
   os.chdir('./')
else: 
   os.mkdir('hourly_json_file_backup')

source = './'
destin = 'hourly_json_file_backup/'

if os.path.isfile('bitcoin_4_in_1.csv'):
   os.remove('bitcoin_4_in_1.csv')

files = glob.glob('hourly_json_file_*.json')
for file in files:
<<<<<<< HEAD
  if file != 'cloud-computing-assignment2-e691975434d0.json':
    source_file_name = file
    destination_blob_name = file
    blob = bucket.blob(destination_blob_name)
    blob.upload_from_filename(source_file_name)
    print('File {} uploaded to {}.'.format(source_file_name,destination_blob_name))
    
    src = source + file
    dst = destin + file
    shutil.move(src,dst)
=======
  source_file_name = file
  destination_blob_name = file
  blob = bucket.blob(destination_blob_name)
  blob.upload_from_filename(source_file_name)
  print('File {} uploaded to {}.'.format(source_file_name,destination_blob_name))
  
  src = source + file
  dst = destin + file
  shutil.move(src,dst)
>>>>>>> 88bdaeddffa2b91d27f92822735d735ce617b73c
