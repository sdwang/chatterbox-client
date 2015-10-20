// YOUR CODE HERE:
//https://api.parse.com/1/classes/chatterbox


var app = {
  url: "https://api.parse.com/1/classes/chatterbox",
  server: "https://api.parse.com/1/classes/chatterbox",
  type: undefined,
  success: undefined,
  chats: {},
  friends: {}
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
      // var roomClass = "." + name;
      // $('select ' + roomClass).attr('selected', true);
    }
    else{
      var chat = {};
      chat.text = $('#message input').val();
      chat.username = window.location.search.slice(10);
      chat.roomname = $('.room select').val();
      app.send(chat);
      app.addMessage(chat);
    }
  });

  //Room Changer
  $("select").change(function(){
    if($('.newRoom')[0].selected){
      $('#message input').attr('placeholder', 'Create new room');
      app.clearMessages();
    } else{
      $('#message input').attr('placeholder', 'Start chatting!');
      app.fetch();
      app.showMessages();
    }
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
  if(app.friends[message.username]) {
    var chat = '<div>' + '<span style="font-weight: bold;">' + message.username + '</span>' + ': ' + message.text + '</div>';
    $('#chats').prepend(chat);
  } else {
    var chat = '<div>' + '<span>' + message.username + '</span>' + ': ' + message.text + '</div>';
    $('#chats').prepend(chat);
  }
  $("#chats div span").on("click", function(){
    var clickedUser = $(this).text();
    if(app.friends[clickedUser]) {
      $('#chats div span').each(function(i, element){
        if(element.innerText === clickedUser){
          element.style.cssText = "font-weight: normal;";
        }
      });  
      $(this).css('font-weight', 'normal');
      app.friends[$(this).text()] = undefined;
    } else {
      $('#chats div span').each(function(i, element){
        if(element.innerText === clickedUser){
          element.style.cssText = "font-weight: bold;";
        }
      });  
      $(this).css('font-weight', 'bold');
      app.friends[$(this).text()] = $(this).text();
    }
  });
};

app.clearMessages = function() {
  $('#chats').empty();
};

app.addRoom = function(roomname){
  var room = '<option class=' + roomname + ' value=' + roomname + ">" + roomname + "</option>";
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

var obj = {Lobby: "Lobby"};
//app.fetch();
app.findRooms = function(){
  
  for (var i = 0; i < app.chats['results'].length; i++) {
    if(obj[app.chats.results[i].roomname] === undefined && obj[app.chats.results[i].room] === undefined){
      if(app.chats.results[i].roomname !== undefined) {
        obj[app.chats.results[i].roomname] = app.chats.results[i].roomname;
      } else {
        obj[app.chats.results[i].room] = app.chats.results[i].room;
      }
    }
  }
  for(var key in obj){
    //var roomClassName = "." + obj[key];
    //if($('select ' + roomClassName).attr('value') === undefined) {
      app.addRoom(obj[key]);
    //}
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



