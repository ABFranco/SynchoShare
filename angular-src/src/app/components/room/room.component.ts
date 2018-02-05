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


  constructor(private authService:AuthService, private router:Router) {
    //this.socket = socketIo('https://shrouded-badlands-38226.herokuapp.com/');
    this.socket = socketIo('localhost:3000');
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

}
