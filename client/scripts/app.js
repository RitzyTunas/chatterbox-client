// YOUR CODE HERE:
var app = {};

app.server = 'https://api.parse.com/1/classes/chatterbox';

app.init = function() {

};

app.send = function(message) {
//   $.ajax({
//   // always use this url
//   url: 'https://api.parse.com/1/classes/chatterbox',
//   type: 'POST',
//   data: JSON.stringify(message),
//   contentType: 'application/json',
//   success: function (data) {
//     console.log('chatterbox: Message sent');
//   },
//   error: function (data) {
//     // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
//     console.error('chatterbox: Failed to send message');
//   }
// });
};

app.fetch = function() {
  $.ajax({
      url: app.server,
      type: 'GET',
      dataType: 'json',
      success: function(data) {
        for (var i=0; i<data.results.length; i++) {
          var message = data.results[i];
          app.addMessage(message);
    }
  },
    error: function () {
      console.error('chatterbox: Failed to send message');
    }
  });
};

app.addMessage = function(message) {
  $('#chats').append('<li>' + message.text + '</li>');
};

app.clearMessages = function() {
  $('#chats').empty();
};



app.fetch();

