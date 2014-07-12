#!/bin/sh
debconf-set-selections <<< 'mysql-server-5.5 mysql-server/root_password password vagrant'
debconf-set-selections <<< 'mysql-server-5.5 mysql-server/root_password_again password vagrant'
sudo apt-get -y install mysql-server
sudo apt-get -y install mysql-client
