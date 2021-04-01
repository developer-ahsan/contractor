import { Router } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/angular';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SignaturePad } from 'ngx-signaturepad/signature-pad';
import * as moment from 'moment';

@Component({
  selector: 'app-epmloyee-jobs',
  templateUrl: './epmloyee-jobs.component.html',
  styleUrls: ['./epmloyee-jobs.component.css'],
})
export class EpmloyeeJobsComponent implements OnInit {
  signatureImage: any;
  jobs: any = [];
  jobsArray: any = []
  jobsList: any = [];
  disPlayjob = true;

  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,next',
      right: 'title'
    },
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this), // bind is important!
    events: this.jobs,
    eventClick: (arg) => {
      this.router.navigateByUrl('/dashboard/jobdetails/'+arg.event.id)
    },
    height:500
  };

  handleDateClick(arg) {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide()
    }, 1000);
    this.jobsList = this.jobsArray.filter(date => date.date == arg.dateStr )
    if (this.jobsList.length > 0) {
      this.disPlayjob = false;
    }
    if (this.jobsList.length == 0) {
      this.disPlayjob == true;
    }
  }

  @ViewChild(SignaturePad, {static: true}) signaturePad: SignaturePad;
  public signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
    'minWidth': 5,
    'canvasWidth': 500,
    'canvasHeight': 300
  };
  isLoading = true;
  signatureform = new FormData;
  pendingJobs: any = [];
  acceptedJobs: any = [];
  completedJobs: any = [];
  constructor(
    public api: ApiService,
    private spinner: NgxSpinnerService,
    public toast: ToastrService,
    private router: Router
  ) { }
  ngOnInit() {
    this.getJobs();
  }
  AddSignature(jobid, formid) {
    this.spinner.show();
    const params = {
      job: jobid,
      form: formid,
      userid: localStorage.getItem('user_id')
    };
    this.api.post('createPDF', params).subscribe((data) => {
      this.spinner.hide();
      this.toast.success('Successfully Updated','' ,{
        timeOut: 1000
      });
      this.getJobs();
      window.open(this.api.imageUrl +  data.file)
    })
  }
  getJobs() {
    this.spinner.show();
    this.api.get('getJobsByEmployeeId/' + localStorage.getItem('user_id'), {}).subscribe((data) => {
      this.spinner.hide();
      this.isLoading = false;
      this.jobs = data.jobs;
      let color;
      for (let i=0; i< this.jobs.length; i++) {
        if (this.jobs[i].jobs.status == 'pending') {
          color = '#e8b010'
          this.pendingJobs.push(this.jobs[i].jobs)
        } else if (this.jobs[i].jobs.status == 'accepted'){
          this.acceptedJobs.push(this.jobs[i].jobs)
          color = '#1acc41'
        } else if (this.jobs[i].jobs.status == 'completed') {
          this.completedJobs.push(this.jobs[i].jobs)
          color = '#563d7c'
        }
        this.jobsArray[i] = {
          title: 'J' +  this.padLeft(this.jobs[i].jobs.id, '0', 5),
          id: this.jobs[i].jobs.id,
          date: this.jobs[i].jobs.date,
          name: this.jobs[i].jobs.title,
          status: this.jobs[i].jobs.status,
          client_name: this.jobs[i].jobs.client_name,
          swms_forms: this.jobs[i].jobs.swms_forms,
          color: color
        }

      }
      this.calendarOptions.events = this.jobsArray;
    });
  }
  ChangeJobStatus(id) {
    const params = {
      id: id,
      status: 'accepted'
    };
    this.api.post('updateStatusByJobId', params).subscribe((res: any) => {
      this.toast.success(res.msg,'' ,{
        timeOut: 1000
      });
      this.getJobs();
    });
  }
  padLeft(text:string, padChar:string, size:number): string {
    return (String(padChar).repeat(size) + text).substr( (size * -1), size) ;
  }
  timeFormat(time) {
    return moment(time,'h:mm').format('h:mm a');
  }
}
