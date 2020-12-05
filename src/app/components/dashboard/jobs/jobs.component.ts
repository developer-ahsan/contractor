import { ToastrService } from 'ngx-toastr';
import { ConfirmationComponent } from './../../../common/confirmation/confirmation.component';
import { ApiService } from './../../../services/api.service';
import { AuthService } from './../../../services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material';
import { Component, OnInit } from '@angular/core';

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
    public toast: ToastrService
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
      this.toast.success('Deleted Successfully');
      this.getJobs();
    });
  }
}
