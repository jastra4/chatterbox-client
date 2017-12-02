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
    }); // do not use an anonymous function here
    $('.refresh').on('click', function(event) {
      event.preventDefault();
      app.fetch();
    });
    $('#roomButton').on('submit', function(event) {
      event.preventDefault();
      console.log($('#createRoom').val());
      $('#roomSelect').append('<option value="' + $('#createRoom').text() + '">' + $('#createRoom').text() + '</option>');
    });
    // $('body').on('click', function(event) {
    //   event.preventDefault();
    //   console.log('asdf');
    //   friends[$(this).first().first().val()] = $(this).first().first().val();
    //   //console.log(friends);
    // });
  },
  server: 'http://parse.atx.hackreactor.com/chatterbox/classes/messages',
  send: function(message) {
    //console.log('send ran');
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: this.server,
      type: 'POST',
      data: message, //JSON.stringify(message), // may need to apply JSON.stringify()
      //dataType: 'json', 
      //contentType: 'json',
      success: function (data) {
        app.fetch();
        //app.renderMessage(data);
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
    console.log($(this));
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
    console.log('function running');
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




// grab array
  // push room names into a new array var
  // create a room for each name
  // when that room is selected, filter the large array by roomname
  




