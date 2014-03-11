// YOUR CODE HERE:
var app = {};

app.server = 'https://api.parse.com/1/classes/chatterbox';

app.init = function() {

};

app.fetch = function() {
  $.ajax({
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'GET',
      dataType: 'json',
      data: {
        limit: 10,
        order: '-createdAt'
      },
      success: function(data) {
        for (var i=0; i<data.results.length; i++) {
          var message = data.results[i];
          app.addMessage(message);
        }
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
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message');
      }
    });
};

app.addMessage = function(message) {
  var username = JSON.stringify(message.username);
  var text = message.text;
  var roomname = message.roomname;
  var createdat = message.createdAt;
  var updatedat = message.updatedAt;
  $('<li></li>').text(username + ': '+ text).appendTo('#chats');
};

app.clearMessages = function() {
  $('#chats').empty();
  app.fetch();
  app.addMessage();
};

app.fetch();

$('document').ready(function() {
  $('#sendchat').click(function(){
    var message = {
      username: (window.location.search).split("").slice(10).join(""),
      text: $('#chat').val(),
      roomname: 'space!'
    };
    app.send(message);
    $('#chat').val('');
    app.clearMessages();

  });
});


// console.log($('button'));
// $('button').click(function() {
//   //event.preventDefault();
//   // var message = {
//   //   username: (window.location.search).split("").slice(10).join(""),
//   //   text: $('#chat').val(),
//   //   roomname: 'space!'
//   // };
//   // app.send(message);
//   alert("!!!!");
// });

