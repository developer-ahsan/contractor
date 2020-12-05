import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  resetForm: FormGroup;

  public error = '';
  public success = '';
  public loading = false;
  public submitted = false;
  email: any;

  constructor(
    public activate: ActivatedRoute,
    public api: ApiService,
    public spinner: NgxSpinnerService,
    public toast: ToastrService,
    public router: Router
  ) {
  }

  ngOnInit() {
    this.email = localStorage.getItem('resetEmail');
    console.log(this.email);
    // Initialize login form
    this.resetForm = new FormGroup({
      password: new FormControl('', [Validators.required]),
      c_password: new FormControl('', [Validators.required])
    });
  }
  // convenience getter for easy access to form fields
  get f() { return this.resetForm.controls; }

  // Submit form for login
  onSubmit() {
    this.spinner.show();
    const params = {
      password: this.resetForm.value.password,
      email: this.email
    };
    this.submitted = true;
    if (this.resetForm.invalid) {
      return false;
    }
    this.error = '';
    this.success = '';
    this.loading = true;
    this.api.post('resetPassword', params).subscribe((data) => {
        this.spinner.hide();
        if (data.status) {
          this.toast.success('Password Changed');
          this.router.navigateByUrl('/login');
        }
    });
  }

}
