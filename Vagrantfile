# -*- mode: ruby -*-
# vi: set ft=ruby :

$script = <<SCRIPT
echo I am provisioning...
sh /vagrant/install.sh
SCRIPT

Vagrant.configure("2") do |config|
    config.vm.box = "precise32"
    config.vm.box_url = "http://files.vagrantup.com/precise32.box"

    # port of mysql
    config.vm.network :forwarded_port, guest: 3306, host: 33066

    # port of http apache server
    config.vm.network :forwarded_port, guest: 80, host: 8080

    # port of php xdebug
    # config.vm.network :forwarded_port, guest: 9000, host: 9000

    config.vm.synced_folder ".", "/vagrant", mount_options: ['dmode=777','fmode=666']

    config.vm.provider :virtualbox do |vb|
        vb.customize ["modifyvm", :id, "--memory", "360"]
    end

    config.vm.provision "shell", inline: $script
end