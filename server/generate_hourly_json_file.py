# Script for back-end by Wei Wei Chen, 2018
#
# GOAL: To generate hourly JSON files from CSV

from datetime import datetime,timedelta, date
import os
import glob
import csv
import pandas as pd
import operator
import json
import shutil

last_hour_date_time = datetime.now()
last_hour_date_time = last_hour_date_time.strftime('%H')

first = str(last_hour_date_time) + ":00"
second = str(last_hour_date_time) + ":15"
third = str(last_hour_date_time) + ":30"
forth = str(last_hour_date_time) + ":45"

time_matching = {0:first,1:second,2:third,3:forth}

sum = 0
average = 0
path = ('./bitcoin_files_15mins/*csv')
files = glob.glob(path)
files.sort()
files = sorted(files)
hourly_dataframe = pd.concat(pd.read_csv(file) for file in files)
hourly_dataframe.to_csv('hourly_combined_dataframe.csv',index=False)

path = ('./bitcoin_files_15mins/*csv')
files = glob.glob(path)
for file in files:
  file_date_time = file[31:41]

currency_info = ['USD','AUD','BRL','CAD','CHF','CLP','CNY','DKK','EUR','GBP','HKD','INR','ISK','JPY','KRW','NZD','PLN','RUB','SEK','SGD','THB','TWD']

hourly_json_file = 'hourly_json_file' + '_' + str(file_date_time) + str('.json')
hourly_json = open(hourly_json_file ,'w')

current_index = 0
index2 = 0
number = len(currency_info)
counter = 0
with open('hourly_combined_dataframe.csv') as hourly_dataframe:
  hourly_json.write('{' + '\n')
  for index1 in range(number):
    hourly_json.write('  ')
    json.dump(currency_info[index1],hourly_json)
    hourly_json.write(' : ' + '{')
    hourly_frame = csv.reader(hourly_dataframe,delimiter=',')
    for row in hourly_frame:
      if currency_info[index1] ==row[0]:
        for key,values in time_matching.items():
          if key == index2:
            json.dump(values,hourly_json)
            hourly_json.write(' : ')
            hourly_json.write(row[1])
            hourly_json.write(', ')
            sum = sum + float(row[1])
        index2 = index2 + 1
    json.dump('average',hourly_json)
    hourly_json.write(' : ')
    average =round(sum/index2,2)
    json.dump(average,hourly_json)
    hourly_json.write('}')
    counter += 1
    if counter != number:
       hourly_json.write(',')
    hourly_json.write('\n')
    index2 = 0
    sum = 0
    average = 0
    hourly_dataframe.seek(0,0)
  hourly_json.write('}')
hourly_dataframe.close()
hourly_json.close()

source = 'bitcoin_files_15mins/'
destination = 'bitcoin_files_15mins_backup/'
files = os.listdir(source)

if len(files) == 4:
  for file in files:
      if file != 'hourly_combined_dataframe.csv':
        if os.path.exists(destination):
          src = source + file
          dst = destination + file
          shutil.move(src,dst)
        else:
          os.mkdir(destination)
          src = source + file
          dst = destination + file
          shutil.move(src,dst)
  if os.path.isfile('hourly_combined_dataframe.csv'):
    os.remove('hourly_combined_dataframe.csv')
