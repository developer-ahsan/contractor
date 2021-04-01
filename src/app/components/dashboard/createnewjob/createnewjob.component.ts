import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from './../../../services/api.service';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import * as moment from 'moment';
import { DateAdapter } from '@angular/material';

@Component({
  selector: 'app-createnewjob',
  templateUrl: './createnewjob.component.html',
  styleUrls: ['./createnewjob.component.css']
})
export class CreatenewjobComponent implements OnInit {
  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '0',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
};
  ngSelcetforms: any = [];
  type: any;
  jobDetails: FormGroup;
  userData = JSON.parse(localStorage.getItem('currentUser'));
  formTypes = ['SWMS Painting', 'SWMS Plastering', 'SWMS'];
  employees: any;
  formData = new FormData;
  minDates: any;
  filePAth: string;
  selecteEmployee = [];
  check1 = false;
  check2 = false;
  check3 = false;
  file1 = false;
  file2 = false;
  file3 = false;
  constructor(
    private dateAdapter: DateAdapter<Date>,
    public auth: AuthService,
    public api: ApiService,
    public spinner: NgxSpinnerService,
    public toast: ToastrService,
    public router: Router,
    public activateRoute: ActivatedRoute
  ) {
      this.dateAdapter.setLocale('en-GB');

      const date = new Date();
      this.minDates =  moment(new Date()).format('YYYY-MM-DD');
   }

  ngOnInit() {
    this.type = this.activateRoute.snapshot.params.type;
    this.initialize();
    this.getEmployees();
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
      clientPhone: new FormControl('', [Validators.required,Validators.pattern(("[0-9]\\d{9}"))]),
      formType: new FormControl(''),
      formLink: new FormControl(''),
      SWMPLink: new FormControl(''),
      PaintLink: new FormControl(''),
      PlastLink: new FormControl(''),
      notes: new FormControl(''),
      employee: new FormControl('', [Validators.required]),
      user: new FormControl('', [Validators.required]),
    });
    this.jobDetails.get('user').setValue(this.userData.id);
  }
  getEmployees() {
    this.api.get('getEmployees', {}).subscribe(data => {
      this.employees = data.employees;
    });
  }
  createJob() {
    this.jobDetails.patchValue({
      date: moment(this.jobDetails.get('date').value).format('YYYY-MM-DD')
    })
    this.spinner.show();
    if (this.check1 == false && this.check2 == false && this.check3 == false) {
      this.toast.warning('Please Select Form File','' ,{
          timeOut: 1000
        });
    }  else {
      Object.keys(this.jobDetails.controls).forEach(key => {
        let val = this.jobDetails.get(key).value;
        this.formData.append(key, val);
      });
      this.formData.append('formData', this.jobDetails.value);
      this.api.post('createjobs', this.formData).subscribe((data) => {
        this.spinner.hide();
        this.toast.success('Created Successfully.','' ,{
          timeOut: 1000
        });
        console.log(data);
        this.router.navigate(['/dashboard/jobs']);
      });
    }
  }
  checkChange(ev) {
    if (!this.check1) {
      this.file1 = false
    }
    if (!this.check2) {
      this.file2 = false
    }
    if (!this.check3) {
      this.file3 = false
    }
  }
  onFileChange(event, value) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      console.log(event.target.files);
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
          console.log(event.target.files);
          if (value == 'swmp') {
            this.formData.append('swmp', event.target.files[0]);
            this.file3 = true
          } else if(value == 'paint') {
            this.formData.append('paint', event.target.files[0]);
            this.file1 = true
          } else {
            this.formData.append('plast', event.target.files[0]);
            this.file2 = true
          }
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
        user: data.jobs.user_id
      });
    });
  }
  updateJobs() {
    this.jobDetails.patchValue({
      date: moment(this.jobDetails.get('date').value).format('YYYY-MM-DD')
    })
    this.spinner.show();
    this.jobDetails.get('user').setValue(this.userData.id);
    Object.keys(this.jobDetails.controls).forEach(key => {
      let val = this.jobDetails.get(key).value;
      this.formData.append(key, val);
    });
    // this.formData.append('formData', this.jobDetails.value);
    this.api.post('updateJob/' + this.type, this.formData).subscribe((data) => {
      this.spinner.hide();
      this.toast.success('Updates Successfully.','' ,{
        timeOut: 1000
      });
      console.log(data);
      this.router.navigate(['/dashboard/jobs']);
    });
  }
  removeSelectedFile(value) {
    if (value == 'paint') {
      this.file1 = false;
      this.formData.delete('paint');
      this.jobDetails.patchValue({
        PaintLink: ''
      })
    }
    if (value == 'plast') {
      this.file2 = false;
      this.formData.delete('plast');
      this.jobDetails.patchValue({
        PlastLink: ''
      })
    }
    if (value == 'swmp') {
      this.file3 = false;
      this.formData.delete('swmp');
      this.jobDetails.patchValue({
        SWMPLink: ''
      })
    }
  }
}
