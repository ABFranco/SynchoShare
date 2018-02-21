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
      console.log("chat");
    	output.innerHTML += '<p _ngcontent-c2><strong _ngcontent-c2>' + data.handle + ':</strong>' + data.message + '</p>';
    });

    this.socket.on('typing', function(data) {
    	feedback.innerHTML = '<p><em>' + data + ' is typing a messsage...</em></p>';
    });

    this.socket.on('cancel', function(data) {
    	feedback.innerHTML = '';
    });

    // music events


    this.socket.on('play', function(data) {
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
    });

    this.socket.on('stop', function(data) {
      if(this.audio == null) {
        var playPause = document.getElementById("playPause");
        playPause.innerHTML = 'Select a song';
      } else {
        this.audio.currentTime = 0;
        this.audio.pause();
        this.playing = false;
        var playPause = document.getElementById("playPause");
        playPause.innerHTML = 'Play Music';
      }
    });


    this.socket.on('audio1', function() {
      if (this.playing) {
        this.audio.pause();
        var playPause = document.getElementById("playPause");
        playPause.innerHTML = 'Play Music';
        this.playing = false;
      }
      this.audio = new Audio();
      this.audio.src = "../../../assets/music/If-I-Aint-Got-You.mp3";
      this.audio.load();
    });
    this.socket.on('audio2', function() {
      if (this.playing) {
        this.audio.pause();
        var playPause = document.getElementById("playPause");
        playPause.innerHTML = 'Play Music';
        this.playing = false;
      }
      this.audio = new Audio();
      this.audio.src = "../../../assets/music/I-Will-Always-Love-You.mp3";
      this.audio.load();
    });
    this.socket.on('audio3', function() {
      if (this.playing) {
        this.audio.pause();
        var playPause = document.getElementById("playPause");
        playPause.innerHTML = 'Play Music';
        this.playing = false;
      }
      this.audio = new Audio();
      this.audio.src = "../../../assets/music/Overjoyed.mp3";
      this.audio.load();
    });
    this.socket.on('audio4', function() {
      if (this.playing) {
        this.audio.pause();
        var playPause = document.getElementById("playPause");
        playPause.innerHTML = 'Play Music';
        this.playing = false;
      }
      this.audio = new Audio();
      this.audio.src = "../../../assets/music/Rocketeer.mp3";
      this.audio.load();
    });
    this.socket.on('audio5', function() {
      if (this.playing) {
        this.audio.pause();
        var playPause = document.getElementById("playPause");
        playPause.innerHTML = 'Play Music';
        this.playing = false;
      }
      this.audio = new Audio();
      this.audio.src = "../../../assets/music/When-you-believe.mp3";
      this.audio.load();
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
    this.socket.emit('play');
  }

  songReset(){
    this.audio.pause();
    var playPause = document.getElementById("playPause");
    playPause.innerHTML = 'Play Music';
    this.playing = false;
  }

  audio1() {
    this.socket.emit('audio1');
  }
  audio2() {
    this.socket.emit('audio2');
  }
  audio3() {
    this.socket.emit('audio3');
  }
  audio4() {
    this.socket.emit('audio4');
  }
  audio5() {
    this.socket.emit('audio5');
  }

  stop() {
    this.socket.emit('stop');
  }




}
