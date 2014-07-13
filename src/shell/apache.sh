#!/bin/sh
echo "###########################"
echo "Installing Apache2"
echo "###########################"

#sed -i "/<Directory .>/,+5d" /etc/apache2/apache2.conf
echo 'ServerName 127.0.0.1' >> /etc/apache2/apache2.conf

cat > /etc/apache2/sites-available/myproject.conf <<DELIM
<VirtualHost *:80>
        DocumentRoot /vagrant/public

        <Directory /vagrant/public>
                RewriteEngine On
                Options Indexes FollowSymLinks MultiViews
                AllowOverride All
                Order allow,deny
                allow from all
                Require all granted

                RewriteEngine On
                RewriteCond %{REQUEST_FILENAME} !-s
                RewriteCond %{REQUEST_FILENAME} !-d
                RewriteCond %{REQUEST_FILENAME} !-f
                RewriteRule ^.*$ index.php [NC,L]
        </Directory>
</VirtualHost>
DELIM

a2dissite 000-default
a2ensite myproject
a2enmod rewrite
service apache2 restart