#!/bin/sh
echo "###########################"
echo "Update Ubuntu Packages"
echo "###########################"

sudo apt-get -y update
sudo echo grub-pc hold | sudo dpkg --set-selections
sudo apt-get -y upgrade
