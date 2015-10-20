// YOUR CODE HERE:
//https://api.parse.com/1/classes/chatterbox

var app = {
  url: "https://api.parse.com/1/classes/chatterbox",
  server: "https://api.parse.com/1/classes/chatterbox",
  type: undefined,
  success: undefined,

  chats: undefined

};



app.init = function() {
  //Calls other methods to startup the app
  //fetch
  //loop through chats
    //Call addMessage

// var message = {
//   username: 'shawndrost',
//   text: 'trololo',
//   roomname: '4chan'
// };

  $(document).ready(function(){
    $(".submit").on("click", function(){
      var chat = {};
      chat.text = $('#message input').val();
      chat.username = window.location.search.slice(10);
      chat.roomname = $('.room select option').val();
      app.send(chat);
      app.addMessage(chat);
    });
  });
};

app.fetch = function() {
  app.type = 'GET';
  app.success = function(data) {
    app.chats = data;
  };
  $.ajax(app);
};

app.addMessage = function(message) {
  var chat = '<div>' + message.username + ': ' + message.text + '</div>';
  $('#chats').prepend(chat);
};

app.clearMessages = function() {
  $('#chats').empty();
};

app.addRoom = function(roomname){
  var room = '<option value=' + roomname + ">" + roomname + "</option>";
  $('select').append(room);
};

app.send = function(message) {
  app.type = "POST";
  app.data = JSON.stringify(message);
  app.success = function(data){
    console.log('Message sent!');
  };

  app.error = function(data){
    console.log("Failed to send message");
  };
  $.ajax(app);
};

app.findRooms = function(){
  var obj = {Lobby:"Lobby"};
  app.fetch();
  for (var i = 0; i < app.chats.results.length; i++) {
    if(app.chats.results[i].roomname === "Lobby") {
      debugger;
    }
    if(obj[app.chats.results[i].roomname] === undefined){
      obj[app.chats.results[i].roomname] = app.chats.results[i].roomname;
    }
  }
  for(var key in obj){
    app.addRoom(obj[key]);
  }
};






app.init();


