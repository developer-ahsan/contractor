import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isAdmin: string;
  constructor(
    private router: Router
  ) {
    this.isAdmin = localStorage.getItem('isAdmin');
  }

  ngOnInit() {
    if(this.isAdmin == 'true') {
      this.router.navigate(['dashboard'], {replaceUrl: true});
    } else {
      this.router.navigate(['dashboard/client'],{replaceUrl: true});
    }
  }

}
