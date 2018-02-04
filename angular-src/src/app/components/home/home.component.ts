import { Component, OnInit } from '@angular/core';
import * as socketIo from 'socket.io-client';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  name: String;
  message: String;
  socket;

  constructor() {
    this.socket = socketIo('http://localhost:3000'); }

  ngOnInit() {
    this.socket.on('hello', (data) => console.log(data));

    var message = document.getElementById('message'),
          handle = document.getElementById('handle'),
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
    console.log(this.message);
    this.socket.emit('chat', {
  		message: this.message,
  		handle: this.name
  	});
  	this.message = "";
  	this.socket.emit('cancel');
  }

  typing() {
    if(this.message.length === 0) {
      this.socket.emit('cancel');
    } else {
      this.socket.emit('typing', this.message);
    }
  }

}
