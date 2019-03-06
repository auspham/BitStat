# BitStat
<h1 align="center">
  The Ultimate Open Source Bitcoin Visualisation
</h1>
<p align="center">
<img src="https://img.shields.io/badge/%E2%9C%94%20Code%20Quality-A-green.svg">
<img src="https://img.shields.io/badge/Mobile%20Compatibility-A-red.svg">
<img src="https://img.shields.io/badge/License-MIT-blue.svg">
</p>

## Description

BitStat is a site that visualises Bitcoin currency info and does currency exchange from Bitcoin (BTC) to selected currencies.

Data will be collected from Blockchain.com's API. To achieve the main features, 2 instances of virtual machines will be needed. One will collect the required data from the Blockchain API periodically using scripts (Bash and Python) and store the data on the Google Cloud Storage.

The other virtual machine will then read the data from Google Cloud Storage then process it and make it into CSV so that data can be stored using DynamoDB. Google App Engine will be used to host the website, data will be visualised with graphs and charts.
<hr />

## Installation

**Clone the project:**

```bash
git clone https://github.com/rockmanvnx6/BitStat.git
```

**Build server side**

1. Install and configure [gsutil](https://cloud.google.com/storage/docs/gsutil_install), [Python3](https://docs.python-guide.org/starting/install3/linux/) and [cron](https://www.rosehosting.com/blog/ubuntu-crontab/).

2. Make sure that a bucket dedicated for this project is created on Google Cloud using [Cloud Storage](https://console.cloud.google.com/storage/).

3. Install Google Cloud Storage client library , set up authentication and set the environment variable *GOOGLE_APPLICATION_CREDENTIALS* to the JSON file downloaded by using [this guide](https://cloud.google.com/storage/docs/reference/libraries#client-libraries-usage-python).

4. Navigate to *server/* and run the the installer:

5. ```bash
   chmod u+x install.sh && ./install.sh
   ```

**Build API**

1. Create a function on [Google Cloud Function](https://console.cloud.google.com/functions) using Python 3.7 as runtime.

2. Navigate to *server/*, then copy and paste the code from *cloudfunction.py* into the function *main.py* and everything from *cloudfunction_requirements.txt* in the folder into *requirements.txt* on the function.

3. Deploy!

4. Navigate to *client/* and run the the client side API configurator:

   ```bash
   chmod u+x apiconfig.sh && ./apiconfig.sh
   ```

**Build client side**

Make sure that you're in *client/* and run the following code:

```bash
npm run build && npm run start
```

> By default, the app will run at *http://0.0.0.0:8080*

<hr />

## Technolgy
<code>React.js</code>, <code>Chart.js</code>, <code>Bootstrap</code>, <code>Python</code>, <code>Google Bigquery</code>, <code>Google Cloud Storage</code>, <code>Google App Engine</code>, `Google Lambda Function`

## Team
- Austin Pham [@rockmanvnx6](https://github.com/rockmanvnx6) - For front-end/client
- Jia Jun Yong [@yongjiajun](https://github.com/yongjiajun) - For API/back-end
- Wei Wei Wen [@weiweiwen](https://github.com/weiweiwen) - For back-end
