# Script for back-end by Jia Jun Yong, 2018
#
# GOAL: To generate daily JSON files from hourly JSON files

currencies = ['AUD', 'BRL', 'CAD', 'CHF', 'CLP', 'CNY', 'DKK', 'EUR', 'GBP', 'HKD', 'INR', 'ISK', 'JPY', 'KRW', 'NZD', 'PLN', 'RUB', 'SEK', 'SGD', 'THB', 'TWD', 'USD']

from datetime import datetime,timedelta, date

import os
import json
import shutil

hourlypath = 'hourly_json_file_backup/'

now = datetime.now()
date_now = str(now.strftime('%Y%m%d'))
hour_now = str(now.strftime("%H"))
int_hour_now = int(hour_now)

daily_file_name = 'daily_json_file_' + date_now + '.json'

current_index = 0

daily_json = open(daily_file_name, 'w')

num_files = int_hour_now + 1

avg_array = [[0 for x in range(len(currencies))] for y in range(num_files)] 

while current_index <= int_hour_now:
    if current_index < 10:
        to_open_file_name = 'hourly_json_file_' + date_now + '0' + current_index + '.json'
    else:
        to_open_file_name = 'hourly_json_file_' + date_now + current_index + '.json'
    
    open_file = open(hourlypath + to_open_file_name)
    json_read = json.load(open_file)

    for x in range(len(currencies)):
        avg_array[current_index][x] = str(json_read[currencies[x]]['average'])
        x += 1

    open_file.close()

    current_index += 1

daily_json.write('{' + '\n')

for x in range(len(currencies)):
    daily_json.write('  \"' + currencies[x] + '\" : {') 
    current_index = 0
    avg = 0
    while current_index <= int_hour_now:
        if current_index < 10:
            daily_json.write('\"0' + current_index + ':00 : ' + avg_array[current_index][x])
        else:
            daily_json.write('\"' + current_index + ':00 : ' + avg_array[current_index][x])

        if (current_index != int_hour_now):
            daily_json.write(', ')
        avg += avg_array[current_index][x]
        current_index += 1
    avg = avg/current_index
    daily_json.write('\"average\" : ' + avg)
    if x+1 != len(currencies):
        daily_json.write('},\n')
    else:
        daily_json.write('}\n}')
    x += 1

daily_json.close()

print("Generated " + daily_file_name)