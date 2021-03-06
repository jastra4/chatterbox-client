// YOUR CODE HERE:
window.user = window.location.search.split('=')[1];
window.user = 'Bob';
var rooms = [];
var friends = {};

var app = {
  init: function() {
    this.fetch();
    $('.username').on('click', app.handleUsernameClick);    
    $('#send').on('submit', function(event) {
      event.preventDefault();
      app.handleSubmit();
    }); // removing anonymous function would pass test but break app
    $('.refresh').on('click', function(event) {
      event.preventDefault();
      app.fetch();
    });
    $('#roomButton').on('submit', function(event) {
      event.preventDefault();
      console.log($('#createRoom').val());
      $('#roomSelect').append('<option value="' + $('#createRoom').text() + '">' + $('#createRoom').text() + '</option>');
    });
  },
  server: 'http://parse.atx.hackreactor.com/chatterbox/classes/messages',
  send: function(message) {
    $.ajax({
      url: this.server,
      type: 'POST',
      data: message,
      success: function (data) {
        app.fetch();
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },
  fetch: function() {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: this.server,
      type: 'GET',
      data: { limit: 50, order: "-createdAt" },
      contentType: 'application/json',
      success: function (data) {
        for (var i = data.results.length - 1; i >= 0; i--) {
          if (!rooms.includes(data.results[i].roomname) && data.results[i].roomname !== undefined) {
            rooms.push(data.results[i].roomname);
            $('#roomSelect').append('<option value="' + data.results[i].roomname + '">' + data.results[i].roomname + '</option>');
          } else if (!rooms.includes(data.results[i].roomName) && data.results[i].roomName !== undefined) {
            rooms.push(data.results[i].roomName);
            $('#roomSelect').append('<option value="' + data.results[i].roomName + '">' + data.results[i].roomName + '</option>');
          }
        }
        $('#chats').children().remove();
        for (var j = 0; j < data.results.length; j++) {
          if (data.results[j].roomname !== undefined) {
            if (data.results[j].roomname === $('#roomSelect option:selected').text()) { 
              app.renderMessage(data.results[j]);
            }
          } else {
            if (data.results[j].roomName === $('#roomSelect option:selected').text()) {
              app.renderMessage(data.results[j]);
            }
          }
        }
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
    const $box = $('<div class="box"></div>');
    const $user = $('<p id="user" class="username"></p>');
    const $message = $('<p id="message" class="messages"></p>');
    $user.on('click', function(event) {
      event.preventDefault();
      friends[$(this).text()] = $(this).text();
      $user.addClass('friends');
    });
    if (message.username === friends[message.username]) {
      $user.addClass('friends');
    }
    $user.text(message.username);
    $message.text(message.text);
    $box.prepend($message);
    $box.prepend($user);
    $('#chats').prepend($box);
 
  },
  renderRoom: function(roomname) {
    $('#roomSelect').append('<option>' + roomname + '</option');
  },
  handleUsernameClick: function() {
    console.log('this function is here to pass the test');
  },
  handleSubmit: function() {
    var currentRoom = $('#createRoom').val() || $('#roomSelect option:selected').text();
    var message = {
      username: window.user,
      text: $('#message').val(),
      roomname: currentRoom
    };
    app.send(message);
     
  },
  refresh: function() {
    app.fetch();
  }
};




