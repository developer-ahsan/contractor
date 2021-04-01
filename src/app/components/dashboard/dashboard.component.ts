import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
declare var JQuery;
declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isAdmin: string;
  constructor(
    private auth: AuthService,
    private router: Router,
  ) {
    this.isAdmin = localStorage.getItem('isAdmin');
  }
  ngOnInit() {
    if(this.isAdmin == 'employee') {
      this.router.navigate(['dashboard/Employeejobs'], {replaceUrl: true});
    } else {
      this.router.navigate(['dashboard'],{replaceUrl: true});
    }
  }
  closeNav() {
    $('.navbar-collapse').collapse('hide');
  }
  logout() {
    this.auth.logout();
    this.router.navigate(['']);
  }

}
