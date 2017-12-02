// YOUR CODE HERE:

var app = {
  init: function() {
    this.fetch();
    $('.username').on('click', function() {
      app.handleUsernameClick();
    });
    $('#send').on('submit', app.handleSubmit); // do not use an anonymous function here

  },
  server: 'http://parse.atx.hackreactor.com/chatterbox/classes/messages',
  send: function(message) {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: this.server,
      type: 'POST',
      data: message, // may need to apply JSON.stringify()
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },
  fetch: function(message) {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: this.server,
      type: 'GET',
      data: message, 
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message received');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
    
  },
  clearMessages: function() {
    $('#chats').children().remove();
  },
  renderMessage: function(message) {
    $('#chats').append('<p id="message" class="username">' + message.username + '</p>');
  },
  renderRoom: function(roomName) {
    $('#roomSelect').append('<option>' + roomName + '</option');
  },
  handleUsernameClick: function() {
    //console.log('function running');
  },
  handleSubmit: function() {
    //console.log($('#message').val());
    app.send();
    var message = {
      username: 'fakeName',
      text: $('#message').val(),
      roomname: 'fakeRoom'
    };
    message = JSON.stringify(message);
    app.send(message);
     
  }
};

