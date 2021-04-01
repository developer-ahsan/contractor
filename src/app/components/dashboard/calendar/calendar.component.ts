import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from './../../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  jobs: any = [];
  jobsList: any = [];
  jobsArray: any = []
  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,next',
      right: 'title',
    },
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this), // bind is important!
    events: this.jobs,
    eventClick: (arg) => {
      this.router.navigateByUrl('/dashboard/jobdetails/'+arg.event.id)
    },
    height:500
  };
  disPlayjob = true;
  isLoading = true;

  constructor(
    public api: ApiService,
    public toast: ToastrService,
    public spinner: NgxSpinnerService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getJobs();
  }
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
  padLeft(text:string, padChar:string, size:number): string {
    return (String(padChar).repeat(size) + text).substr( (size * -1), size) ;
  }
  getJobs() {
    // this.spinner.show();
    const params = {};
    this.api.get('getJobsByEmployeeId/' + localStorage.getItem('user_id'), params).subscribe((data) => {
      // this.spinner.hide();
      this.isLoading = false;
      this.jobs = data.jobs;
      let color;
      for (let i=0; i< this.jobs.length; i++) {
        if (this.jobs[i].jobs.status == 'pending') {
          color = '#e8b010'
        } else if (this.jobs[i].jobs.status == 'accepted'){
          color = '#1acc41'
        } else if (this.jobs[i].jobs.status == 'completed') {
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
}
