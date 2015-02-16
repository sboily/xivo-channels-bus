var bus_host = '192.168.32.41';
var bus_username = 'sylvain';
var bus_password = 'sylvain';

var ws = new SockJS('http://' + bus_host + ':15674/stomp');
var client = Stomp.over(ws);
var debug = 0;

client.heartbeat.incoming = 0;
client.heartbeat.outgoing = 0;

$(document).ready(function() {
    tb = init_table();
    client.connect(bus_username, bus_password, on_connect, on_error, '/');
});

client.debug = function(e) {
  if (debug == 1)
    $('#debug').append($("<code>").text(e));
};

init_table = function() {
    var table = $('#channels').DataTable({
        "order": [[ 3, 'asc' ]],
        "createdRow": function(row, data, dataIndex) {
            $(row).attr("id", data[4]);
        },
        "searching": false,
        "info": false,
        "paging": false,
        "drawCallback": drawcallback
    });

    return table;
}

drawcallback = function(settings) {
    var api = this.api();
    var rows = api.rows( {page:'current'} ).nodes();
    var last = null;

    api.column(3, {page:'current'}).data().each(function (group, i) {
        if (last !== group) {
            $(rows).eq(i).before(
                '<tr class="group"><td colspan="7">LinkedID : '+group+'</td></tr>'
            );

            last = group;
        }
    });
}

onmessage = function(m) {
  msg = $.parseJSON(m.body);

  if (msg.data.EventName == "CHAN_START") {
      tb.row.add(['-',
                  msg.data.CallerIDnum,
                  msg.data.Exten,
                  msg.data.LinkedID,
                  msg.data.UniqueID,
                  msg.origin_uuid,
                  '00:00:00',
                 ])
            .draw();

      $('#channels').find('td:last')
                    .countdown({since: new Date(), compact: true, format: 'HMS'});
  }

  if (msg.data.EventName == "CHAN_END") {
      tb.rows('tr[id="' + msg.data.UniqueID + '"]')
        .remove()
        .draw();
  }

}
  
on_connect = function(x) {
    id = client.subscribe("/exchange/xivo/ami.CEL", onmessage);
    $('#conn').append("<i class='glyphicon glyphicon-flash'>");
};

var on_error =  function() {
    console.log('error');
    $('#conn').append("<i class='glyphicon glyphicon-remove'>");
};

