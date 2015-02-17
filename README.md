Upgrade your xivo to 15.03.

Add a user in rabbitmq (example : user xivo, pass xivo)

    rabbitmqctl add_user xivo xivo
    rabbitmqctl set_user_tags xivo administrator
    rabbitmqctl set_permissions -p / xivo ".*" ".*" ".*" 

Change the informations for the connexion in channels.js

To run with docker :-)

    docker run -d -p 8000:80 -v $(pwd):/var/www/html dockerfile/nginx
