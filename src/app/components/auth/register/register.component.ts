import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

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
    this.registerForm = new FormGroup({
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      checkbox: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  // Submit form for login
  onSubmit() {
    this.spinner.show();
    this.submitted = true;
    if (this.registerForm.invalid) {
      return false;
    }
    this.error = '';
    this.success = '';
    this.api.post('createUser', this.registerForm.value).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  // Handle success respone
  handleResponse(data) {
    this.spinner.hide();
    // console.log(data);
    if (data.status) {
      this.toastr.success('User Register Successfully');
      this.registerForm.reset();
      this.router.navigateByUrl('/login');
    } else {
      this.registerForm.reset();
      this.toastr.error(data.msg);
      this.handleError(data);
      this.submitted = false;
    }
  }

  // Handle errors response
  handleError(error) {
    this.spinner.hide();
    if (error.status === 401) {
      this.error = error.error.message;
    } else {
      this.error = 'Something went wrong. please try again later.';
    }
    this.registerForm.patchValue({ password: '' });
    this.loading = false;
  }

}
