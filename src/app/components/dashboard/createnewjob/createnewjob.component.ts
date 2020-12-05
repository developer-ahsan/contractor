import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from './../../../services/api.service';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-createnewjob',
  templateUrl: './createnewjob.component.html',
  styleUrls: ['./createnewjob.component.css']
})
export class CreatenewjobComponent implements OnInit {
  type: any;
  jobDetails: FormGroup;
  userData = JSON.parse(localStorage.getItem('currentUser'));
  formTypes = ['SWMS Painting', 'SWMS Plastering', 'SWMS'];
  employees = ['Adrian Pimento', 'Brandon Graves', 'Charles Boyle', 'Dominic Brooks',  'Francis Bass', 'Harvey Specter'];
  formData = new FormData;
  minDates: Date;
  filePAth: string;
  constructor(
    public auth: AuthService,
    public api: ApiService,
    public spinner: NgxSpinnerService,
    public toast: ToastrService,
    public router: Router,
    public activateRoute: ActivatedRoute
  ) {
      const date = new Date();
      this.minDates = date;
   }

  ngOnInit() {
    this.type = this.activateRoute.snapshot.params.type;
    this.initialize();
    if (this.type != 'new') {
      this.getJobForUpdate();
    }
  }
  initialize() {
    this.jobDetails = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      time: new FormControl('', [Validators.required]),
      clientName: new FormControl('', [Validators.required]),
      clientAddress: new FormControl('', [Validators.required]),
      clientPhone: new FormControl('', [Validators.required]),
      formType: new FormControl('', [Validators.required]),
      formLink: new FormControl('', [Validators.required]),
      notes: new FormControl('', [Validators.required]),
      employee: new FormControl('', [Validators.required]),
      user: new FormControl('', [Validators.required]),
    });
  }
  createJob() {
    this.spinner.show();
    this.jobDetails.get('user').setValue(this.userData.id);
    if (this.jobDetails.get('formLink').value == '') {
      this.toast.warning('Please Select Form File');
    }  else {
      Object.keys(this.jobDetails.controls).forEach(key => {
        let val = this.jobDetails.get(key).value;
        this.formData.append(key, val);
      });
      // this.formData.append('formData', this.jobDetails.value);
      this.api.post('createjobs', this.formData).subscribe((data) => {
        this.spinner.hide();
        this.toast.success('Created Successfully.');
        console.log(data);
        this.router.navigate(['/dashboard/jobs']);
      });
    }
  }
  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      console.log(event.target.files);
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
          console.log(event.target.files);

          this.formData.append('file', event.target.files[0]);
      };
    }
  }
  getJobForUpdate() {
    this.spinner.show();
    this.api.get('getjobs/' + this.type, {}).subscribe((data) => {
      this.spinner.hide();
      this.jobDetails.patchValue({
        title: data.jobs.title,
        description:  data.jobs.description,
        date:  data.jobs.date,
        time:  data.jobs.time,
        clientName:  data.jobs.client_name,
        clientAddress:  data.jobs.client_address,
        clientPhone:  data.jobs.client_phone,
        formType:  data.jobs.form_type,
        notes:  data.jobs.notes,
        employee:  data.jobs.employee_id,
        user: data.jobs.user_id
      });
    });
  }
  updateJobs() {
    this.spinner.show();
    this.jobDetails.get('user').setValue(this.userData.id);
    Object.keys(this.jobDetails.controls).forEach(key => {
      let val = this.jobDetails.get(key).value;
      this.formData.append(key, val);
    });
    // this.formData.append('formData', this.jobDetails.value);
    this.api.post('updateJob/' + this.type, this.formData).subscribe((data) => {
      this.spinner.hide();
      this.toast.success('Updates Successfully.');
      console.log(data);
      this.router.navigate(['/dashboard/jobs']);
    });
  }
}
