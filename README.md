# xivo-channels-bus

What is it ?
============

This is only un proof of concept to use rabbitmq websocket stomp to get in realtime all channels open in XiVO. The interface is writing in javascript and html.

![Channels screenshot](/screenshots/channels.png?raw=true "Channels")

How to configure ?
==================

Upgrade your xivo to 15.03 minimum.

Add a user in rabbitmq (example : user xivo, pass xivo)

    rabbitmqctl add_user xivo xivo
    rabbitmqctl set_user_tags xivo administrator
    rabbitmqctl set_permissions -p / xivo ".*" ".*" ".*" 

Finally you need to activating the stomp web socket

    rabbitmq-plugins enable rabbitmq_web_stomp
    service rabbitmq-server restart

Updated the informations for the connexion in channels.js

To run with docker :-)

    docker run -d -p 8000:80 -v $(pwd):/var/www/html dockerfile/nginx

Asterisk users
==============

You can use this interface with a simple asterisk, you only install xivo-amid and a rabbitmq server. That possible to do this with docker easily :)
