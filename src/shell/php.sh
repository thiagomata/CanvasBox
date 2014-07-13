#!/bin/sh
echo "###########################"
echo "Installing PHP, Modules and PHPUnit"
echo "###########################"

sudo add-apt-repository -y ppa:ondrej/php5
sudo apt-get -y update

sudo apt-get -y install php5
sudo apt-get -y install php5-mcrypt
sudo apt-get -y install php5-gd
sudo apt-get -y install curl php5-curl
sudo apt-get -y install php5-mysql
sudo apt-get -y install php5-imagick

wget -O - https://getcomposer.org/installer | php
sudo mv composer.phar /usr/bin/composer

wget https://phar.phpunit.de/phpunit.phar --no-check-certificate
sudo chmod +x phpunit.phar
sudo mv phpunit.phar /usr/local/bin/phpunit