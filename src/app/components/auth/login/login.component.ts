import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  public error = '';
  public success = '';
  public loading = false;
  public submitted = false;

  constructor(
    private Token: TokenService,
    private Auth: AuthService,
    private api: ApiService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    // Initialize login form
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  // Submit form for login
  onSubmit() {
    this.submitted = true;
    this.spinner.show();
    if (this.loginForm.invalid) {
      this.spinner.hide();
      return false;
    }
    this.error = '';
    this.success = '';
    this.loading = true;
    this.api.post('login', this.loginForm.value).subscribe((resp) => {
      this.spinner.hide();
      this.submitted = false;

      if (resp.Error == false) {
        localStorage.setItem('user_id', resp.user.id);
        this.Auth.changeAuthStatus(true);
        this.Auth.setAuthUser(resp.user);
        if (resp.user.user_type == 'admin') {
          this.Auth.setIsAdmin(true);
        } 
        this.toastr.success(resp.msg);
        this.loginForm.reset();
        this.router.navigate(['/dashboard']);
      } else {
        this.toastr.error(resp.msg);
      }
    });
  }
}
