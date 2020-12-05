import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gymapp';
  constructor(
    private router: Router,
    private auth: AuthService) {
      // this.auth.currentUser.subscribe((data) => {
      //   if (data) {
      //     this.router.navigate(['dashboard'], {replaceUrl: true});
      //   } else {
      //     this.router.navigate([''], {replaceUrl: true});
      //   }
      // });
  }
}
