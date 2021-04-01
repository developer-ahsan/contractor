import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit } from '@angular/core';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pdfviewers',
  templateUrl: './pdfviewers.component.html',
  styleUrls: ['./pdfviewers.component.css']
})
export class PdfviewersComponent implements OnInit {
  pdfFilePath = "";
  form: any;
  jobId: any;
  formId: any = null;
  constructor(
    public api: ApiService,
    public spinner: NgxSpinnerService,
    public activeRoute: ActivatedRoute,
    public route: Router,
    private toast: ToastrService
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.activeRoute.params.subscribe(params => {
      this.jobId = params['job'];
      this.pdfFilePath = this.api.imageUrl + params['link'];
      if(params['formId']) {
        this.formId = params['formId'];
      }
    });
    setTimeout(() => {
      this.spinner.hide();
    }, 5000);
  }
  AddSignature() {
    this.spinner.show();
    let params;
    if(this.formId != null) {
      params = {
        job: this.jobId,
        form: this.formId,
        userid: localStorage.getItem('user_id')
      };
    } else {
      params = {
        job: this.jobId,
        userid: localStorage.getItem('user_id')
      };
    }

    this.api.post('createPDF', params).subscribe((data) => {
      this.spinner.hide();
      // window.open(this.api.imageUrl +  data.file)
      if(data.Error == '1') {
        this.toast.warning('Please add Your Signature First');
        this.route.navigateByUrl('/dashboard/signature');
      } else if(data.Error == '2') {
        this.toast.warning(data.msg);
      } else {
        this.route.navigateByUrl('/dashboard/jobdetails/'+this.jobId+'/show');
      }
    })
  }
}
