import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/services/api.service';
import * as moment from 'moment';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-employeejoblist',
  templateUrl: './employeejoblist.component.html',
  styleUrls: ['./employeejoblist.component.css']
})
export class EmployeejoblistComponent implements OnInit {
  type: any;
  jobs: any;
  length: any;
  filterForm: FormGroup;
  constructor(
    public activeRoute: ActivatedRoute,
    public api: ApiService,
    public spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.filterForm = new FormGroup({
      start: new FormControl('',[Validators.required]),
      end: new FormControl('',[Validators.required]),
      type: new FormControl('',[Validators.required]),
    })
    this.type = this.activeRoute.snapshot.params.type;
    this.filterForm.patchValue({
      type: this.type,
      start: localStorage.getItem('start'),
      end: localStorage.getItem('end')
    });
    this.length = this.activeRoute.snapshot.params.length;
    this.getJobsByStatus(this.activeRoute.snapshot.params.type);
  }
  getJobsByStatus(type) {
    this.spinner.show()
    this.api.get('getEmployeeJobsByStatus/'+type+'/'+localStorage.getItem('user_id')).subscribe((data) => {
      this.spinner.hide();
      this.jobs = data.jobs;
    })
  }
  padLeft(text:string, padChar:string, size:number): string {
    return (String(padChar).repeat(size) + text).substr( (size * -1), size) ;
  }
  timeFormat(time) {
    return moment(time,'h:mm').format('h:mm a');
  }
  filterJobs() {
    this.jobs = null;
    this.spinner.show()
    localStorage.setItem('start', this.filterForm.get('start').value)
    localStorage.setItem('end', this.filterForm.get('end').value)
    this.api.post('filterEmployeeJobsByStatus/'+localStorage.getItem('user_id'), this.filterForm.value).subscribe((data) => {
      this.spinner.hide();
      this.jobs = data.jobs;
    })
  }
}
