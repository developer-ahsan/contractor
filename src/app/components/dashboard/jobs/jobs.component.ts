import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationComponent } from './../../../common/confirmation/confirmation.component';
import { ApiService } from './../../../services/api.service';
import { AuthService } from './../../../services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { formatDate } from "@angular/common";
import * as moment from 'moment';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {

  isLoading = true;
  jobs: any;

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog,
    public toast: ToastrService,
    private http: HttpClient
  ) { }
  ngOnInit() {
    this.getJobs();
  }
  getJobs() {
    // this.spinner.show();
    const params = {};
    this.api.get('getjobs', params).subscribe((data) => {
      // this.spinner.hide();
      this.isLoading = false;
      this.jobs = data.jobs;
      console.log(data);
    });
  }
  openDialog(id): void {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '350px',
      data: 'Do you confirm the deletion of this data?'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.spinner.show();
        this.delJob(id);
      }
    });
  }
  delJob(jobId) {
    const params = {
      id: jobId
    };
    this.api.post('delJob', params).subscribe((data) => {
      this.spinner.hide();
      this.isLoading = true;
      this.toast.success('Deleted Successfully','' ,{
        timeOut: 1000
      });
      this.getJobs();
    });
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
