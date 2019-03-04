# Script for back-end by Jia Jun Yong, 2018
#
# GOAL: To generate weekly JSON Files from daily JSON files

currencies = ['AUD', 'BRL', 'CAD', 'CHF', 'CLP', 'CNY', 'DKK', 'EUR', 'GBP', 'HKD', 'INR', 'ISK', 'JPY', 'KRW', 'NZD', 'PLN', 'RUB', 'SEK', 'SGD', 'THB', 'TWD', 'USD']

from datetime import datetime,timedelta, date
import os
import json
import shutil

dailyPath = 'daily_json_file_backup/'
file_datetime = date.today()
file_date_time = file_datetime.strftime('%Y%m%d')
file_datetimeA = date.today() - timedelta(7)
file_date_timeA = file_datetimeA.strftime('%Y%m%d')
file_dateA = file_datetimeA.strftime('%d/%m')
file_datetimeB = date.today() - timedelta(6)
file_date_timeB = file_datetimeB.strftime('%Y%m%d')
file_dateB = file_datetimeB.strftime('%d/%m')
file_datetimeC = date.today() - timedelta(5)
file_date_timeC = file_datetimeC.strftime('%Y%m%d')
file_dateC = file_datetimeC.strftime('%d/%m')
file_datetimeD = date.today() - timedelta(4)
file_date_timeD = file_datetimeD.strftime('%Y%m%d')
file_dateD = file_datetimeD.strftime('%d/%m')
file_datetimeE = date.today() - timedelta(3)
file_date_timeE = file_datetimeE.strftime('%Y%m%d')
file_dateE = file_datetimeE.strftime('%d/%m')
file_datetimeF = date.today() - timedelta(2)
file_date_timeF = file_datetimeF.strftime('%Y%m%d')
file_dateF = file_datetimeF.strftime('%d/%m')
file_datetimeG = date.today() - timedelta(1)
file_date_timeG = file_datetimeG.strftime('%Y%m%d')
file_dateG = file_datetimeG.strftime('%d/%m')

dailyFileA = 'daily_json_file_' + str(file_date_timeA) + '.json'
dailyFileB = 'daily_json_file_' + str(file_date_timeB) + '.json'
dailyFileC = 'daily_json_file_' + str(file_date_timeC) + '.json'
dailyFileD = 'daily_json_file_' + str(file_date_timeD) + '.json'
dailyFileE = 'daily_json_file_' + str(file_date_timeE) + '.json'
dailyFileF = 'daily_json_file_' + str(file_date_timeF) + '.json'
dailyFileG = 'daily_json_file_' + str(file_date_timeG) + '.json'

jsonFileA = open(dailyPath + dailyFileA)
jsonFileB = open(dailyPath + dailyFileB)
jsonFileC = open(dailyPath + dailyFileC)
jsonFileD = open(dailyPath + dailyFileD)
jsonFileE = open(dailyPath + dailyFileE)
jsonFileF = open(dailyPath + dailyFileF)
jsonFileG = open(dailyPath + dailyFileG)

jsonA = json.load(jsonFileA)
jsonB = json.load(jsonFileB)
jsonC = json.load(jsonFileC)
jsonD = json.load(jsonFileD)
jsonE = json.load(jsonFileE)
jsonF = json.load(jsonFileF)
jsonG = json.load(jsonFileG)

weekly_json_file = 'weekly_json_file' + '_' + str(file_date_time) + str('.json')
weekly_json = open(weekly_json_file ,'w')

weekly_json.write('{' + '\n')
for x in range(len(currencies)):
    weekly_json.write('  \"' + currencies[x] + '\" : {\"' +  str(file_dateA) + '\" : ' + str(jsonA[currencies[x]]['average']) + ', ' +  '\"' + str(file_dateB) + '\" : ' + str(jsonB[currencies[x]]['average']) + ', ' +  '\"' + str(file_dateC) + '\" : ' + str(jsonC[currencies[x]]['average']) + ', ' +  '\"' + str(file_dateD) + '\" : ' + str(jsonD[currencies[x]]['average']) + ', ' +  '\"' + str(file_dateE) + '\" : ' + str(jsonE[currencies[x]]['average']) + ', ' +  '\"' + str(file_dateF) + '\" : ' + str(jsonF[currencies[x]]['average']) + ', ' +  '\"' + str(file_dateG) + '\" : ' + str(jsonG[currencies[x]]['average']) + '}')
    if x+1 != len(currencies):
        weekly_json.write(',\n')
    else:
        weekly_json.write('\n')
weekly_json.write('}')

weekly_json.close()
jsonFileA.close()
jsonFileB.close()
jsonFileC.close()
jsonFileD.close()
jsonFileE.close()
jsonFileF.close()
jsonFileG.close()

print("Generated " + weekly_json_file)