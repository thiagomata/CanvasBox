#!/bin/sh
echo "###########################"
echo "Installing Project Packages"
echo "###########################"
cd /vagrant
sudo sh ./src/shell/update.sh
sudo sh ./src/shell/basic.sh
sudo sh ./src/shell/node.sh
sudo sh ./src/shell/mysql.sh
sudo sh ./src/shell/php.sh
sudo sh ./src/shell/apache.sh
sudo sh ./src/shell/end.sh