Edit your rabbitmq.config and changing tcp_listener to 0.0.0.0
Add a user in rabbitmq (example : user xivo, pass xivo)

rabbitmqctl add_user xivo xivo
rabbitmqctl set_user_tags xivo administrator
rabbitmqctl set_permissions -p / xivo ".*" ".*" ".*" 

Change the informations for the connexion in channels.js
