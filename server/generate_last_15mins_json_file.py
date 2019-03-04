# Script for back-end by Jia Jun Yong, 2018
#
# GOAL: To generate JSON files with datapoints of last 15 mins

currencies = ['AUD', 'BRL', 'CAD', 'CHF', 'CLP', 'CNY', 'DKK', 'EUR', 'GBP', 'HKD', 'INR', 'ISK', 'JPY', 'KRW', 'NZD', 'PLN', 'RUB', 'SEK', 'SGD', 'THB', 'TWD', 'USD']

from datetime import datetime,timedelta, date
import os
import json
import shutil

hourlyPath = 'hourly_json_file_backup/'

before_min = datetime.now() - timedelta(minutes=15)
before_min_date = str(before_min.strftime('%Y%m%d'))
before_min_val = str(before_min.strftime("%H"))
before_min_min = str(before_min.minute)
if len(before_min_min) == 1:
    before_min_min = '0' + before_min_min
before_min_full = before_min_val + ':' + before_min_min

current_min = datetime.now()
current_min_date = str(current_min.strftime('%Y%m%d'))
current_min_val = str(current_min.strftime("%H"))
current_min_min = str(current_min.minute)

hourlyFileA = 'hourly_json_file_' + str(before_min_date) + str(before_min_val) + '.json'
print(hourlyFileA)

jsonFileA = open(hourlyPath + hourlyFileA)

jsonA = json.load(jsonFileA)

mins_json_file = '15mins_before_json_file' + '_' + str(current_min_date) + str(current_min_val) + str(current_min_min) + '.json'
mins_json = open(mins_json_file ,'w')

mins_json.write('{' + '\n')
temp_index = 0
for x in range(len(currencies)):
    mins_json.write('  \"' + currencies[x] + '\" : ' + str(jsonA[currencies[x]][before_min_full]))
    if x+1 != len(currencies):
         mins_json.write(',\n')
    else:
        mins_json.write('\n')
    x += 1
mins_json.write('}')

mins_json.close()
jsonFileA.close()

print("Generated " + mins_json_file)