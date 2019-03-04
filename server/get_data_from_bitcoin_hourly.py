#! /home/ec2-user/softwares/python3.7/bin/python3
# Import libraries
from datetime import date
import time
import requests
import json
import os

api_url = "https://blockchain.info/ticker"
resp = requests.get(api_url)

#Define function get_task
def get_task():
    return requests.post(api_url)
task = get_task()
task.json()

#Define function get_filename_datetime
def get_filename_datetime():
    return "bitcoin-"  + time.strftime('%Y%m%d%H') + ".csv"
filename = get_filename_datetime()

if os.path.exists('./bitcoin_files_hourly'):
   os.chdir('./bitcoin_files_hourly')
else:
   os.mkdir('./bitcoin_files_hourly')
   os.chdir('./bitcoin_files_hourly')

with open(filename,"w+") as file:
    file.write("Currency,Buy,Sell,Symbol\n")
    for key,value in task.json().items():
            file.write(key + ",")
            for key,value in value.items():
                if(key == "buy"):
                    file.write(str(value) + ",")
                if(key == "sell"):
                    file.write(str(value) + ",")
                if(key == "symbol"):
                    file.write(value)
            file.write("\n")
