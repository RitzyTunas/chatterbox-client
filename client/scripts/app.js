// YOUR CODE HERE:
var app = {};

app.users = {};
app.rooms = {};

app.server = 'https://api.parse.com/1/classes/chatterbox';

app.init = function() {

};

app.fetch = function(callback) {
  $.ajax({
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'GET',
      dataType: 'json',
      data: {
        //limit: 10,
        order: '-createdAt'
      },
      success: function(data) {
        app.clearMessages();
        for (var i=0; i<11; i++) {
          var message = data.results[i];
          app.addMessage(message);
        }
        for (var j=0; j<data.results.length; j++) {
          var message = data.results[j];
          app.users[message.username] = true;
          app.rooms[message.roomname] = true;
        }
        callback(app.users);
      },
      error: function () {
        console.error('chatterbox: Failed to get messages');
      }
    });
};

app.send = function(message) {
    $.ajax({
      // always use this url
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function () {
        app.refresh();
      },
      error: function () {
        console.error('chatterbox: Failed to send message');
      }
    });
  };

app.addMessage = function(message) {
  var username = message.username;
  var text = message.text;
  var roomname = message.roomname;
  var createdat = message.createdAt;
  var updatedat = message.updatedAt;
  $('<li></li>').text(username + ': '+ text + ' ' + roomname).appendTo('#chats');
};

app.getUsers = function(obj) {
  console.log(app.users);
  console.log(obj);
  for (var key in obj) {
    console.log('HERE');
    console.dir(key);
    $('<option></option>').text(key).appendTo('#users');
  }
};

app.clearMessages = function() {
  $('#chats').empty();
};

app.refresh = function() {
  app.fetch();
};

$('document').ready(function() {
  var username = username || (window.location.search).split('').slice(10).join('');
  app.fetch(app.getUsers);
  $('#sendchat').click(function(){
    var message = {
      username: username,
      text: $('#chat').val(),
      roomname: 'space!'
    };
    app.send(message);
    $('#chat').val('');
  });

  $('#refresh').click(function(event){
    event.preventDefault();
    app.refresh();
  });

  $('#setname').click(function(event){
    event.preventDefault();
    username = $('#name').val();
  });
  // app.getUsers(app.users);
});


