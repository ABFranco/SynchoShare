// make connection
var socket = io.connect('http://localhost:3000');

// query DOM
var message = document.getElementById('message'),
      handle = document.getElementById('handle'),
      btn = document.getElementById('send'),
      output = document.getElementById('output'),
      feedback = document.getElementById('feedback');

var play = document.getElementById("play");
var stop = document.getElementById("stop");

// emit events

btn.addEventListener('click', function(){
  console.log("test");
	socket.emit('chat', {
		message: message.value,
		handle: handle.value
	});
	message.value = "";
	socket.emit('cancel');
});

/*
message.addEventListener('keypress', function(){
	socket.emit('typing', handle.value);
})
*/

message.addEventListener('keyup', function(){
	if(message.value.length === 0) {
		socket.emit('cancel');
	} else {
		socket.emit('typing', handle.value);
	}
})

// listen for events
socket.on('chat', function(data) {
	output.innerHTML += '<p><strong>' + data.handle + ':</strong>' + data.message + '</p>';
});

socket.on('typing', function(data) {
	feedback.innerHTML = '<p><em>' + data + ' is typing a messsage...</em></p>';
});

socket.on('cancel', function(data) {
	feedback.innerHTML = '';
});

// music events

function play(){
	var audio = document.getElementById("audio");
	var playPause = document.getElementById("playPause");
	if (audio.paused) {
		audio.play();
		playPause.innerHTML = 'Pause Music';
	} else {
		audio.pause();
		playPause.innerHTML = 'Play Music';
	}
}

function stop(){
	var audio = document.getElementById("audio");
	var playPause = document.getElementById("playPause");
	console.log(audio.currentTime);
	audio.currentTime = 0;
	audio.pause();
	playPause.innerHTML = 'Play Music';
}

play.addEventListener('click', function(){
	socket.emit('play');
	var audio = document.getElementById("audio");
	var playPause = document.getElementById("playPause");
	if (audio.paused) {
		audio.play();
		playPause.innerHTML = 'Pause Music';
	} else {
		audio.pause();
		playPause.innerHTML = 'Play Music';
	}
});

stop.addEventListener('click', function(){
	socket.emit('stop');
	var audio = document.getElementById("audio");
	var playPause = document.getElementById("playPause");
	console.log(audio.currentTime);
	audio.currentTime = 0;
	audio.pause();
	playPause.innerHTML = 'Play Music';
});

socket.on('play', function(data) {
	var audio = document.getElementById("audio");
	var playPause = document.getElementById("playPause");
	if (audio.paused) {
		audio.play();
		playPause.innerHTML = 'Pause Music';
	} else {
		audio.pause();
		playPause.innerHTML = 'Play Music';
	}
});

socket.on('stop', function(data) {
	var audio = document.getElementById("audio");
	var playPause = document.getElementById("playPause");
	console.log(audio.currentTime);
	audio.currentTime = 0;
	audio.pause();
	playPause.innerHTML = 'Play Music';
});
