#!/bin/sh
echo "###########################"
echo "Installing Node and NPM"
echo "###########################"

sudo add-apt-repository -y ppa:chris-lea/node.js
sudo apt-get -y update
sudo apt-get -y install python-software-properties python g++ make nodejs
sudo apt-get -y remove npm  --purge
sudo apt-get -y remove node --purge

## The official version it is not working fine. 
## Using the package instead.
# curl https://www.npmjs.org/install.sh | sudo sh

sudo apt-get -y install nodejs
sudo apt-get -y install npm
sudo npm cache clear

echo "Installing Gulp and Bower"

sudo npm install gulp --global
sudo npm install bower --global

