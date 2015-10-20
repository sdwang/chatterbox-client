// YOUR CODE HERE:
//https://api.parse.com/1/classes/chatterbox


var app = {
  url: "https://api.parse.com/1/classes/chatterbox",
  server: "https://api.parse.com/1/classes/chatterbox",
  type: undefined,
  success: undefined,
  chats: {}
};


app.init = function() {
// var message = {
//   username: 'shawndrost',
//   text: 'trololo',
//   roomname: '4chan'
// };
$(document).ready(function(){
  
  $(".submit").on("click", function(){
    
    if($('.newRoom')[0].selected) {
      var name = $('#message input').val();
      app.addRoom(name);

    }


    var chat = {};
    chat.text = $('#message input').val();
    chat.username = window.location.search.slice(10);
    chat.roomname = $('.room select option').val();
    app.send(chat);
    app.addMessage(chat);
  });

  $(".newRoom").on('click', function(){
    $('#message input').attr('placeholder', 'Create new room');
    app.clearMessages();

  });
});
  
  app.fetch();
  

};


app.fetch = function() {
  app.type = 'GET';
  app.success = function(data) {
    app.chats = data;
    app.findRooms();
  };
  app.error = function(data) {
    console.error('Failed to fetch messages');
  }
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


//app.fetch();
app.findRooms = function(){
  var obj = {Lobby: "Lobby"};
  for (var i = 0; i < app.chats['results'].length; i++) {
    if(obj[app.chats.results[i].roomname] === undefined){
      obj[app.chats.results[i].roomname] = app.chats.results[i].roomname;
    }
  }
  for(var key in obj){
    app.addRoom(obj[key]);
  }
};

//Call before:
//  app.fetch();
app.showMessages = function() {

  var room;
  $(".room select").children().each(function(index, element){
    if(element.selected === true){
      room = element.value;
    }
  });
  app.clearMessages();
  for(var i = 0; i < app.chats.results.length; i++) {
    if(app.chats.results[i].roomname === room) {
      app.addMessage(app.chats.results[i]);
    }
  }
};

app.init();



