import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';


@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.css']
})
export class MusicComponent implements OnInit {
  songName: String;
  artist: String;
  album: String;
  genre: String;

  constructor(
    private validateService: ValidateService,
    private flashMessage:FlashMessagesService,
    private authService:AuthService,
    private router:Router
  ) { }

  ngOnInit() {
  }

  upload(){
    const song = {
      songName: this.songName,
      artist: this.artist,
      album: this.album,
      genre: this.genre
    }

    // upload song to database
    /*
    this.authService.uploadSong(song).subscribe(data => {
      if(data.success){
        this.flashMessage.show('song uploaded', {cssClass: 'alert-success', timeout: 2000});
      } else{
        this.flashMessage.show('Something went wrong...', {cssClass: 'alert-danger', timeout: 2000});
      }
    });
    */
  }
}
