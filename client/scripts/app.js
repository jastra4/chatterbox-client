// YOUR CODE HERE:
window.user = window.location.search.split('=')[1];
window.user = 'Bob';
var rooms = [];
var app = {
  init: function() {
    this.fetch();
    $('.username').on('click', function() {
      app.handleUsernameClick();
    });    
    $('#send').on('submit', function(event) {
       event.preventDefault();
       app.handleSubmit();
    }); // do not use an anonymous function here
    $('.refresh').on('click', function(event) {
      event.preventDefault();
      app.fetch();
    });
  },
  server: 'http://parse.atx.hackreactor.com/chatterbox/classes/messages',
  send: function(message) {
    console.log('send ran');
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
      data: { limit: 50, order: "-createdAt" }, //message, 
      contentType: 'application/json',
      success: function (data) {
        for (var i = data.results.length - 1; i >= 0; i--) {
          //debugger;
          if (!rooms.includes(data.results[i].roomname) && data.results[i].roomname !== undefined) {
            rooms.push(data.results[i].roomname);
            $('#roomSelect').append('<option value="' + data.results[i].roomname + '">' + data.results[i].roomname + '</option>');
          } else if (!rooms.includes(data.results[i].roomName) && data.results[i].roomName !== undefined) {
            rooms.push(data.results[i].roomName);
            $('#roomSelect').append('<option value="' + data.results[i].roomName + '">' + data.results[i].roomName + '</option>');
          }
        }
        //$('#roomSelect').children().remove();
        for (var j = 0; j < data.results.length; j++) {
          if (data.results[j].roomname !== undefined) {
            console.log($('select:option selected').val());
            if (data.results[j].roomname === $('#roomSelect option:selected').text()) { 
              console.log('running roomname');
              app.renderMessage(data.results[j]);
            }
          } else {
            if (data.results[j].roomName === $('#roomSelect option:selected').text()) {
              console.log('running roomName capitalized');
              app.renderMessage(data.results[j]);
            }
          }
        }
        console.log(data);
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
    //console.log(message);
    const $box = $('<div class="box"></div>');
    const $user = $('<p id="user" class="username"></p>');
    const $message = $('<p id="message" class="messages"></p>');
    $user.text(message.username);
    $message.text(message.text);
    $box.prepend($message);
    $box.prepend($user);
    $('#chats').prepend($box);
    //$('#chats').prepend('<div class="box"><p id="user" class="username">' + message.username + ':</p><p id="message" class="messages">' + message.text + '</p></div>');
  },
  renderRoom: function(roomname) {
    $('#roomSelect').append('<option>' + roomname + '</option');
  },
  handleUsernameClick: function() {
    //console.log('function running');
  },
  handleSubmit: function() {
    //console.log($('#message').val());
    var message = {
      username: window.user,
      text: $('#message').val(),
      roomname: 'lobby'
    };
    //message = JSON.stringify(message);
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
  




