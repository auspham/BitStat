# BitStat
<h1 align="center">
  The Ultimate Open Source Bitcoin Visualisation
</h1>
<p align="center">
<img src="https://img.shields.io/badge/%E2%9C%94%20Code%20Quality-A-green.svg">
<img src="https://img.shields.io/badge/Mobile%20Compatibility-A-red.svg">
<img src="https://img.shields.io/badge/lisence-MIT-blue.svg">
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

**Build client side**
```bash
cd client && npm run build && npm run start
```

> By default, the app will run at *http://0.0.0.0:8080*

<hr />

## Technolgy
<code>React.js</code>, <code>Chart.js</code>, <code>Bootstrap</code>, <code>Python</code>, <code>Google Bigquery</code>, <code>Google Cloud Storage</code>, <code>Google App Engine</code>

## Team
- Austin Pham [@rockmanvnx6](https://github.com/rockmanvnx6)
- Yong Jia Jun [@yongjiajun](https://github.com/yongjiajun)
- Wei wei Wen [@weiweiwen](https://github.com/weiweiwen)