import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-updatepassword',
  templateUrl: './updatepassword.component.html',
  styleUrls: ['./updatepassword.component.css']
})
export class UpdatepasswordComponent implements OnInit {
  newForm: FormGroup;
  public submitted = false;

  constructor(
    private api: ApiService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.newForm = new FormGroup({
      new_pass: new FormControl('', [Validators.required]),
      c_pass: new FormControl('', [Validators.required]),
      user_id: new FormControl('', [Validators.required])
    });
    this.newForm.patchValue({
      user_id: localStorage.getItem('user_id')
    });
  }
  get f() { return this.newForm.controls; }
  onSubmit() {
    this.spinner.show();
    this.submitted = true;
    if (this.newForm.invalid) {
        this.spinner.hide();
        return false;
    } 
    if (this.newForm.value.new_pass != this.newForm.value.c_pass) {
        this.spinner.hide();
        this.toastr.warning('Passwords Are not Same');
    } else {
      this.api.post('updatePassword', this.newForm.value).subscribe(data => {
        this.spinner.hide();
        if (!data.Error) {
          this.submitted = false;
          this.newForm.reset();
          this.toastr.success('Password Changed SuccessFully');
        } else {
          this.toastr.warning(data.msg)
        }
      });
    }
  }
}