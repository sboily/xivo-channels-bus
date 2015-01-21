var bus_host = '192.168.1.123';
var bus_username = 'xivo';
var bus_password = 'xivo';

var ws = new SockJS('http://' + bus_host + ':15674/stomp');
var client = Stomp.over(ws);
var debug = 0;

client.heartbeat.incoming = 0;
client.heartbeat.outgoing = 0;

client.debug = function(e) {
  if (debug == 1)
    $('#debug').append($("<code>").text(e));
};

onmessage = function(m) {
  msg = $.parseJSON(m.body);
  var $event_div = $('<tr>', {id: msg.data.LinkedID});
  var $get_div = $('tr[id="' + msg.data.LinkedID + '"]');

  if (msg.data.EventName == "CHAN_START" && $get_div.length == 0) {
      cnx = $( "#channels tr:visible" ).length;
      $('#channels').append($event_div
                      .append("<td>" +
                              cnx + "</td><td>" +
                              msg.data.CallerIDnum + "</td><td>" +
                              msg.data.Exten + "</td>" +
                              "<td>00:00:00</td>"
                             )
                           );

      $('#channels').find('td:last')
                    .append('<td>')
                    .countdown({since: new Date(), compact: true, format: 'HMS'});
  }

  if (msg.data.EventName == "CHAN_END") {
      $get_div.fadeOut("slow", function() {
        this.remove();
      });
  }

}

var on_connect = function(x) {
  id = client.subscribe("/exchange/xivo/ami.CEL", onmessage);
  $('#conn').append("<i class='glyphicon glyphicon-flash'>");
};

var on_error =  function() {
  console.log('error');
  $('#conn').append("<i class='glyphicon glyphicon-remove'>");
};

client.connect(bus_username, bus_password, on_connect, on_error, '/');
