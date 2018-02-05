import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import * as socketIo from 'socket.io-client';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  user:Object;
  name: String;
  message: String;
  socket: any;
  audio: any;
  playing: boolean;


  constructor(private authService:AuthService, private router:Router) {
    //this.socket = socketIo('https://shrouded-badlands-38226.herokuapp.com/');
    this.socket = socketIo('localhost:3000');
    this.audio = null;
    this.playing = false;
   }

  ngOnInit() {

    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;

    },
    err => {
      console.log(err);
      return false;
    });


    this.socket.on('hello', (data) => console.log(data));

    var message = document.getElementById('message'),
          handle = document.getElementById('name'),
          btn = document.getElementById('send'),
          output = document.getElementById('output'),
          feedback = document.getElementById('feedback');

    // listen for events
    this.socket.on('chat', function(data) {
    	output.innerHTML += '<p><strong>' + data.handle + ':</strong>' + data.message + '</p>';
    });

    this.socket.on('typing', function(data) {
    	feedback.innerHTML = '<p><em>' + data + ' is typing a messsage...</em></p>';
    });

    this.socket.on('cancel', function(data) {
    	feedback.innerHTML = '';
    });

    // music events


    this.socket.on('play', function(data) {
      var audio = new Audio();
      audio.src = "/music/Overjoyed.mp3"
      audio.load();
    	var playPause = document.getElementById("playPause");
    	if (audio.paused) {
    		audio.play();
    		playPause.innerHTML = 'Pause Music';
    	} else {
    		audio.pause();
    		playPause.innerHTML = 'Play Music';
    	}
    });

    this.socket.on('stop', function(data) {
      var audio = new Audio();
      audio.src = "/music/Overjoyed.mp3"
      audio.load();
    	var playPause = document.getElementById("playPause");
    	console.log(audio.currentTime);
    	audio.currentTime = 0;
    	audio.pause();
    	playPause.innerHTML = 'Play Music';
    });
  }

  send () {
    //var message = document.getElementById('message');
    //console.log(this.message);
    this.authService.send().subscribe(profile => {
      this.socket.emit('chat', {
    		message: this.message,
    		handle: profile.user.name
    	});
      this.message = "";
      this.socket.emit('cancel');
    },
    err => {
      console.log(err);
      return false;
    });


  }

  typing() {
    if(this.message.length === 0) {
      this.socket.emit('cancel');
    } else {
      this.socket.emit('typing', this.message);
    }
  }


  play() {
    //this.socket.emit('play');
    //var audio = document.getElementById("audio1");
    var playPause = document.getElementById("playPause");
    if (this.playing) {
      this.audio.pause();
      playPause.innerHTML = 'Play Music';
      this.playing = false;
    } else {
      if(this.audio != null) {
        this.audio.play();
        playPause.innerHTML = 'Pause Music';
        this.playing = true;
      } else {
        playPause.innerHTML = 'Select a song';
      }
    }

  }

  songReset(){
    this.audio.pause();
    var playPause = document.getElementById("playPause");
    playPause.innerHTML = 'Play Music';
    this.playing = false;
  }

  audio1() {
    if (this.playing) {
      this.songReset();
    }
    this.audio = new Audio();
    this.audio.src = "../../../assets/music/If-I-Aint-Got-You.mp3";
    this.audio.load();
  }
  audio2() {
    if (this.playing) {
      this.songReset();
    }
    this.audio = new Audio();
    this.audio.src = "../../../assets/music/I-Will-Always-Love-You.mp3";
    this.audio.load();
  }
  audio3() {
    if (this.playing) {
      this.songReset();
    }
    this.audio = new Audio();
    this.audio.src = "../../../assets/music/Overjoyed.mp3";
    this.audio.load();
  }
  audio4() {
    if (this.playing) {
      this.songReset();
    }
    this.audio = new Audio();
    this.audio.src = "../../../assets/music/Rocketeer.mp3";
    this.audio.load();
  }
  audio5() {
    if (this.playing) {
      this.songReset();
    }
    this.audio = new Audio();
    this.audio.src = "../../../assets/music/When-you-believe.mp3";
    this.audio.load();
  }



  stop() {
    if(this.audio == null) {
      var playPause = document.getElementById("playPause");
      playPause.innerHTML = 'Select a song';
    } else {
      this.socket.emit('stop');
      this.audio.currentTime = 0;
      this.audio.pause();
      this.playing = false;
      var playPause = document.getElementById("playPause");
      playPause.innerHTML = 'Play Music';
    }

  }




}
