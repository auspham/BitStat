# Script for Google Cloud Function by Jia Jun Yong, 2018
#
# GOAL: Acts as an API for the front-end to fetch data from the back-end

from google.cloud import storage
from datetime import datetime, date, timedelta
import json, requests
from flask import Flask, redirect, jsonify
from flask_cors import CORS, cross_origin

bloburl = ""
app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

@app.route("/")
@cross_origin()
def getsomething(request):
	today = utc_to_local(datetime.now()) #get current datetime
	today_date = today.strftime('%Y%m%d') #format the date
	bucket_name = "YOUR_BUCKET_NAME" #specify your bucket name here
	storage_client = storage.Client()
	bucket = storage_client.get_bucket(bucket_name)

	blobs = bucket.list_blobs()

	sth = str(request)

	if "?" in sth:
		unwanted, wanted, unwantedlol = sth.split('\'')
		unwanted, wantedlol = wanted.split('?')
		var, val = wantedlol.split('=')
		print("var = " + var)
		print("val = " + val)
		if var == "beforehour": 
			val = int(val)
			before_hour = utc_to_local(today - timedelta(hours=val))
			before_hour_date = str(before_hour.strftime('%Y%m%d'))
			before_hour_val = str(before_hour.strftime("%H"))
			print("***GETTING BEFORE HOUR FILE: hourly_json_file_" + before_hour_date + before_hour_val + ".json")
			for blob in blobs: #loops through Google Storage bucket to find relevant file
				if blob.name == "hourly_json_file_" + before_hour_date + before_hour_val + ".json":
					bloburl = blob.public_url
		elif var == "beforeday":
			val = int(val)
			before_day = utc_to_local(today - timedelta(val))
			before_day_date = str(before_day.strftime('%Y%m%d'))
			print("***GETTING BEFORE DAY FILE: daily_json_file_" + before_day_date + ".json")
			for blob in blobs: #loops through Google Storage bucket to find relevant file
				if blob.name == "daily_json_file_" + before_day_date + ".json":
					bloburl = blob.public_url
		elif var == "thishour":
			this_hour = utc_to_local(today)
			this_hour_date = str(this_hour.strftime('%Y%m%d'))
			this_hour_val = str(this_hour.strftime("%H"))
			print("***GETTING BEFORE HOUR FILE: hourly_json_file_" + this_hour_date + this_hour_val + ".json")
			for blob in blobs: #loops through Google Storage bucket to find relevant file
				if blob.name == "hourly_json_file_" + this_hour_date + this_hour_val + ".json":
					bloburl = blob.public_url
		elif var == "weekly":
			val = int(val)
			before_day = utc_to_local(today - timedelta(val))
			before_day_date = str(before_day.strftime('%Y%m%d'))
			print("***GETTING BEFORE WEEKLY FILE: weekly_json_file_" + before_day_date + ".json")
			for blob in blobs: #loops through Google Storage bucket to find relevant file
				if blob.name == "weekly_json_file_" + before_day_date + ".json":
					bloburl = blob.public_url
					return redirect(bloburl, code=302)
		elif var == "lastmins":
			before_min = utc_to_local(today)
			before_min_date = str(before_min.strftime('%Y%m%d'))
			before_min_val = str(before_min.strftime("%H"))
			before_min_min = int(before_min.minute)
			get_min = ''
			if (before_min_min >= 0 and before_min_min < 15):
				get_min = '0'
			elif (before_min_min >= 15 and before_min_min < 30):
				get_min = '15'
			elif (before_min_min >= 30 and before_min_min < 45):
				get_min = '30'
			elif (before_min_min >= 45 and before_min_min <= 59):
				get_min = '45'
			print("***GETTING BEFORE WEEKLY FILE: 15mins_before_json_file_" + before_min_date + before_min_val + get_min + ".json")
			for blob in blobs: #loops through Google Storage bucket to find relevant file
				if blob.name == "15mins_before_json_file_"+ before_min_date + before_min_val + get_min + ".json":
					bloburl = blob.public_url
					return redirect(bloburl, code=302)
	else:
		print("***GETTING TODAY'S DAILY FILE: daily_json_file_" + today_date + ".json")
		for blob in blobs: #loops through Google Storage bucket to find relevant file
			if blob.name == "daily_json_file_" + today_date + ".json":
				bloburl = blob.public_url
	
	data = requests.get(bloburl).json()
	return jsonify(data)

def utc_to_local(utc_dt):
	return (utc_dt + timedelta(hours=11) #to convert time from UTC to GMT+11

@app.after_request
def after_request(response):
	response.headers.add('Access-Control-Allow-Origin', '*')
	response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
	response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
	return response