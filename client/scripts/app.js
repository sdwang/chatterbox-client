// YOUR CODE HERE:
//https://api.parse.com/1/classes/chatterbox

// var app = {};

// app.url = "https://api.parse.com/1/classes/chatterbox";
// app.type = 'GET';
// app.success = function(data) {
//   console.log(data);

//   $('#chats').append(data);
// };


// $.ajax(app);

var app = {
  url: "https://api.parse.com/1/classes/chatterbox",
  server: "https://api.parse.com/1/classes/chatterbox",
  type: undefined,
  success: undefined,

  chats: undefined

};

app.init = function() {
  //Calls other methods to startup the app
};

app.fetch = function() {
  app.type = 'GET';
  app.success = function(data) {
    app.chats = data;
  };
  $.ajax(app);
};

app.addMessage = function() {
  for(var i = 0; app.chats.results.length; i++) {
    var message = '<div>' + app.chats.results[i].username + ': ' + app.chats.results[i].text + '</div>';
    $('#chats').append(message);
  }
};

app.clearMessages = function() {
  $('#chats').empty();
};
