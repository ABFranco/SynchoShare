import { Component, OnInit } from '@angular/core';
//import * as socketIo from 'socket.io-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {//implements OnInit{
  title = 'app works';
  /*
  ngOnInit(): void {
    const socket = socketIo('http://localhost:3000');

    socket.on('hello', (data) => console.log(data));

  }
  */
}
