#!/bin/sh
add-apt-repository -y ppa:chris-lea/node.js
apt-get -y update
apt-get -y install python-software-properties python g++ make nodejs
apt-get -y install node
curl https://www.npmjs.org/install.sh | sudo sh
sudo apt-get -y install npm