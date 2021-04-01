import { ApiService } from './../../services/api.service';
import { PusherService } from './../../services/pusher.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild('navbarToggler', {static: true}) navbarToggler:ElementRef;

  imagePath = '/assets/static/logo.png';
  notifications = [];
  user = JSON.parse(localStorage.getItem('currentUser'));
  constructor(
    private auth: AuthService,
    private router: Router,
    private pusherService: PusherService,
    public api: ApiService
  ) {
   }

  ngOnInit() {
  }
  logout() {
    this.auth.logout();
    this.router.navigate(['']);
  }
  navBarTogglerIsVisible() {
    return this.navbarToggler.nativeElement.offsetParent !== null;
  }

  collapseNav() {
    if (this.navBarTogglerIsVisible()) {
      this.navbarToggler.nativeElement.click();
    }
  }
}
