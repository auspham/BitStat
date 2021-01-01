<h1 align="center">
BitStat
</h1>

<h1 align="center">
  Source BitCoin Conversion Rates Timeline Visualisation
</h1>
<p align="center">
  <a href="#"><img src="https://img.shields.io/badge/License-MIT-blue.svg"></a>
  <a href="https://auspham.dev/BitStat/" target="_blank"><img src="https://img.shields.io/badge/Preview-Live-green.svg"></a>


Live preview here: https://auspham.dev/BitStat/


## Description

<b>BitStat</b> is a fully cloud-based web app that does conversion rates timeline visualisation from **BitCoin (BTC)** to a number of supported world currencies. The name itself is driven by our motivation to present reliable and trustable data that is not just in numbers, but also in the form of user friendly graphs, hence
providing a better understanding of how BTC currency rate has fluctuated over time. This project involves
real time data collection from a free public API run by blockchain.com that provides a 15min data point
at a time, with no historical data. However with BitStat, users can now perform **currency exchange from BTC to**
**their specified world currency** as well as **view currency exchange rates from hourly**, **daily to weekly all presented**
**in the form of graphs**. In addition, a trend indicator is also available on the site for reference. BitStat
features a responsive design that works across multiple platforms with a variety of form factors ranging
from smartphones, tablets, to desktop browsers. <b>BitStat can also be fully cloud-based</b>.

<hr />

## Introduction

The hype around cryptocurrencies, namely BitCoin (BTC), is getting hotter and hotter as the world is still faily new to this "virtual currency". As a motivation, we wanted to create a light-weight, cross-platform and yet simple tool to keep track of the BitCoin currency rates as well as to provide a quick way to perform conversion of BTC to world currency and view the visualised currency rates over the time. 

**BitStat has the following features:** 

- Visualising BTC to a specified world currency rates using table and charts with up-to-date data. 
- Convert value from a specified world currency to BTC value.
- Showing BTC exchange rate for a particular currency.
- See historical exchange rates, from hourly, daily to weekly. 

**BitCoin visualisation is a must-have application because:** 

- It facilitates the process of BitCoin rates analysis. Visualising numbers with graphs makes it simple for anyone to understand the fluctuation of BTC rates from time to time.
- As blockchain.com 's free API only provides data points for 15 minutes, it's possible to use the provided 15mins data points, accumulate and process them to create hourly, daily or even weekly data points. 

**BitStat is useful for users who are interested in BTC rates exchange and looking for a portable web application, that is:** 

- Fast and reliable
- Working across multiple devices.
- A quick and easy way to view, keep track and convert different currencies to BTC. 

## Software Design Architecture : Cloud-Based example

![image-20190307151636440](http://jjyong.me/images/BitStat%20Software%20Design.png)

BitStat can be divided into <b>2 components</b>, which both are equally as important as they complement each other to work properly. On the **backend** of BitStat is where the data generation happens and on the **front end** is where the visualisation of data generated happens. It's all cloud-based of course. 

On the left side of the diagram, we see that the VM deployed on **Amazon EC2** fetches a 15 min data point, <b>every 15 mins</b> from the **BlockChain API** using **Python, Bash scripts** as well as **Crontab**. The VM then collects and accumulates all the data points required to produce hourly, daily and weekly data. These files are stored in **JSON format** and uploaded to **Google Cloud Storage** once available. For example, when an hourly JSON file is available, it'll be uploaded right after. 

On the right side of the diagram, it can be clearly seen that the BitStat website is deployed on **Google App Engine**. When user visits the website, it will communicate with the custom API built on **Google Cloud Function**, requesting for specified data. The custom API executes appropriate instructions to fetch data from our own **Storage Bucket** on **Google Cloud Storage** and returns appropriate **blob URL to the API**. The API then again **returns a JSON file** for the data requested to proceed on data visualisation on the website. 

## Installation

**Clone the project:**

```bash
git clone https://github.com/rockmanvnx6/BitStat.git
```

**Configuring the server side:**

1. Install and configure [gsutil](https://cloud.google.com/storage/docs/gsutil_install), [Python3](https://docs.python-guide.org/starting/install3/linux/) and [cron](https://www.rosehosting.com/blog/ubuntu-crontab/).

2. Make sure that a bucket dedicated for this project is created on Google Cloud using [Cloud Storage](https://console.cloud.google.com/storage/).

3. Install **Google Cloud Storage client library** , set up authentication and set the environment variable *GOOGLE_APPLICATION_CREDENTIALS* to the JSON file downloaded by using [this guide](https://cloud.google.com/storage/docs/reference/libraries#client-libraries-usage-python).

4. Make your storage bucket **public** by following [this guide](https://cloud.google.com/storage/docs/access-control/making-data-public).

5. Navigate to *server/* and run the the installer:

6. ```bash
   chmod u+x install.sh && ./install.sh
   ```

**Configuring the API:**

1. Create a function on [Google Cloud Function](https://console.cloud.google.com/functions) using Python 3.7 as runtime.

2. Navigate to *server/*, then copy and paste the code from *cloudfunction.py* into the function *main.py* and everything from *cloudfunction_requirements.txt* in the folder into *requirements.txt* on the function.

3. Deploy!

4. Navigate to *client/* and run the the client side API configurator:

   ```bash
   chmod u+x apiconfig.sh && ./apiconfig.sh
   ```

**Building client side:**

Make sure that you're in *client/* and run the following code:

```bash
npm run build && npm run start
```

> By default, the app will run at *http://0.0.0.0:8080*

<hr />


## Technologies
<code>React.js</code>, <code>Chart.js</code>, <code>Bootstrap</code>, <code>Python</code>, <code>Amazon EC2</code>, <code>Google Cloud Storage</code>, <code>Google App Engine</code>, `Google Cloud Function`, <code>crontab</code>, <code>JSON</code>

## Team
- Austin Pham [@rockmanvnx6](https://github.com/rockmanvnx6) 
- Jia Jun Yong [@yongjiajun](https://github.com/yongjiajun) 
- Wei Wei Wen [@weiweiwen](https://github.com/weiweiwen) 
