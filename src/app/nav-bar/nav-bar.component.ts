import { Component, OnInit } from '@angular/core';
import {AuthenticationService, TokenPayload} from "../auth.service";
import {Router} from "@angular/router";
// import {FlashMessageService} from "angular2-flash-message/module/flash-message.service";
// import {FlashMessage} from "angular2-flash-message/module/flash-message";
// import { FlashMessagesService } from '../../module/flash-messages.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
})
export class NavBarComponent implements OnInit {

  username : string = ''



  getUser() {
    this.username = this.auth.getUserDetails().username
    console.log((this.username))
  }

  constructor(public auth: AuthenticationService
              // private _flashMessagesService: FlashMessagesService
  ) {}

  // go() {
  //   this._flashMessagesService.grayOut(true);
  //   this._flashMessagesService.show('we were at home' + Math.random(), { cssClass: 'alert-success', timeout: 3000, closeOnClick:true });
  //   // this._flashMessagesService.show('Failure!', { cssClass: 'alert-danger' } );
  // }


  ngOnInit(): void {
    this.getUser
  }

}
