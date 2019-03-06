#!/bin/bash

# Script by Jia Jun Yong, 2019
#
# GOAL: To configure client side to work with API

echo "Please enter the link of your API in full:"

read apilink

replacestr="s/REPLACE/$apilink/g"
sed -i $replacestr src/components/ViewDetails.js

echo "Successfully configured API link to work with client side."
echo "If it's not configured correctly, please configure it at client/src/components/ViewDetails.js:187 and replace the API link."
