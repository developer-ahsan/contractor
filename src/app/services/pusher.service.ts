import { AuthService } from 'src/app/services/auth.service';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

declare const Pusher: any;
@Injectable({
  providedIn: 'root'
})
export class PusherService {

  pusher: any;
  channel: any;
  AuthUser: any;

  constructor(
    private auth: AuthService
  ) {

    this.pusher = new Pusher(environment.PUSHER_API_KEY, {
      logToConsole: true,
      cluster: environment.PUSHER_API_CLUSTER,
      encrypted: true,
      forceTLS: true,
      // disableStats: true,
      authEndpoint : environment.apiUrl + '/pusher/auth',
    });
    this.pusher.logToConsole = true;
    setTimeout(() => {
      this.auth.currentUserSubject.subscribe(user => {
        this.AuthUser = user;
      });
      if (this.AuthUser && this.AuthUser.userid) {
        this.channel = this.pusher.subscribe("my-channel." + this.AuthUser.userid);
      }
    }, 1000);
  }
}
