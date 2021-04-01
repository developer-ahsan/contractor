import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../../../services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from './../../../services/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import { ThemeService } from 'ng2-charts';
import { formatDate } from "@angular/common";

import * as moment from 'moment';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  jobs: any = [];
  jobsList: any = [];
  jobsArray: any = [{
    title: '',
    date: '',
    id: '',
    name: '',
    status: '',
    client_name: '',
    swms_forms: {}
  }]
  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth'
    },
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this), // bind is important!
    events: this.jobs,
    eventClick: (arg) => {
      this.router.navigateByUrl('/dashboard/jobdetails/'+arg.event.id)
    },
    height: 500
  };
  disPlayjob = true;
  isLoading = true;
  counters: any;
  isAdmin = localStorage.getItem('isAdmin');
  constructor(
    private api: ApiService,
    private spinner: NgxSpinnerService,
    private router: Router,
    public toast: ToastrService
  ) {
   }

  ngOnInit() {
    this.getCounters();
    this.getJobs();
  }

  getCounters() {
    const params = {};
    this.api.get('getcounters', params).subscribe((data) => {
      this.isLoading = false;
      this.counters = data;
    });
  }
  getJobs() {
    // this.spinner.show();
    const params = {};
    this.api.get('getjobs', params).subscribe((data) => {
      // this.spinner.hide();
      this.isLoading = false;
      this.jobs = data.jobs;
      for (let i=0; i<this.jobs.length; i++) {
        this.jobs[i].name =  this.jobs[i].title;
        this.jobs[i].title =  'J' + this.padLeft(this.jobs[i].id,'0', 5);
        if (this.jobs[i].status == 'pending') {
          this.jobs[i].color = '#e8b010'
        } else if (this.jobs[i].status == 'accepted'){
          this.jobs[i].color = '#1acc41'
        } else if (this.jobs[i].status == 'completed') {
          this.jobs[i].color = '#563d7c'
        }
      }
      this.calendarOptions.events = this.jobs;
    });
  }
  handleDateClick(arg) {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide()
    }, 1000);
    this.jobsList = this.jobs.filter(date => date.date == arg.dateStr)
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
  dateFormat(date) {
    const format = 'dd/MM/yyyy';
    const locale = 'en-US';
    const formattedDate = formatDate(date, format, locale);
    return formattedDate;
  }
  timeFormat(time) {
    return moment(time,'h:mm').format('h:mm a');

  }
}
