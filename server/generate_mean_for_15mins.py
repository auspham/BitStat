# Script for back-end by Wei Wei Chen, 2018
#
# GOAL: To generate mean of datapoints from latest fetched data (15 mins)

#! /home/ec2-user/softwares/python3.7/bin/python3 
#Import libraries
from google.cloud import storage
import os
import os.path
import csv
import glob
import pandas as pd
import time
import shutil

path = "./bitcoin_files_15mins/"
list = os.listdir(path)
for i in range(4):
  list = os.listdir(path)
  if len(list) < 4:     
     os.system('python3 get_data_from_bitcoin_15mins.py')
  else:
     break

files = glob.iglob(os.path.join(path,"*.csv"),recursive=True)
dataframes = (pd.read_csv(file) for file in files)
big_dataframe = pd.concat(dataframes,ignore_index=True)
big_dataframe.to_csv('bitcoin_4_in_1.csv',index=False)

sum_buy = 0
sum_sell = 0

#Define function get_filename_datetime
def get_filename_datetime():
    return "bitcoin_mean_hourly_"  + time.strftime('%Y%m%d%H') + ".csv"
filename = get_filename_datetime()

bitcoin_mean = open(filename,"w")

with open('./bitcoin_4_in_1.csv') as reader:
  reader1 = csv.reader(reader,delimiter=',')
  bitcoin_mean.write("Currency,Buy,Sell,Symbol\n")
  currency_info = {'USD':'$','AUD':'$','BRL':'R$','CAD':'$','CHF':'CHF','CLP':'$','CNY':'¥','DKK':'kr','EUR':'€','GBP':'£','HKD':'$','INR':'₹','ISK':'kr','JPY':'¥','KRW':'₩','NZD':'$','PLN':'zł','RUB':'RUB','SEK':'kr','SGD':'$','THB':'฿','TWD':'NT$'}
  for key,values in currency_info.items():
    bitcoin_mean.write(key + ',')
    for row in reader1 :
      if key == row[0]:
         sum_buy = sum_buy + float(row[1])
         sum_sell = sum_sell + float(row[2])
    mean_buy = round(sum_buy/4,2)
    mean_sell = round(sum_sell/4,2)
    bitcoin_mean.write(str(mean_buy) + ',')
    bitcoin_mean.write(str(mean_sell) + ',')
    bitcoin_mean.write(values + '\n')
    sum_buy = 0
    sum_sell = 0
    reader.seek(0,0)
  reader.close()
bitcoin_mean.close()

source = './bitcoin_files_15mins/'
destination = './bitcoin_files_15mins_backup/'
files = os.listdir(source)
for file in files:
    if os.path.exists(destination):
       src = source + file
       dst = destination + file
       shutil.move(src,dst)
    else:
       os.mkdir(destination)
       src = source + file
       dst = destination + file
       shutil.move(src,dst)
