import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  forgetForm: FormGroup;

  public error = '';
  public success = '';
  public loading = false;
  public submitted = false;

  constructor(
    private api: ApiService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    // Initialize login form
    this.forgetForm = new FormGroup({
      email: new FormControl('', [Validators.required])
    });
  }
  // convenience getter for easy access to form fields
  get f() { return this.forgetForm.controls; }

  // Submit form for login
  onSubmit() {
    localStorage.setItem('resetEmail', this.forgetForm.value.email);
    this.spinner.show();
    this.submitted = true;
    if (this.forgetForm.invalid) {
      return false;
    }
    this.error = '';
    this.success = '';
    this.api.post('forgetPassword', this.forgetForm.value).subscribe((data) => {
      this.spinner.hide();
      this.submitted = false;
      if (data.status) {
        this.toastr.success(data.msg);
        this.router.navigateByUrl('/login');
      } else {
        this.toastr.error(data.msg);
      }
    });
  }

}
