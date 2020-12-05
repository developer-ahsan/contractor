import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from './../../../services/auth.service';
import { ApiService } from './../../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-bookedconsultations',
  templateUrl: './bookedconsultations.component.html',
  styleUrls: ['./bookedconsultations.component.css']
})
export class BookedconsultationsComponent implements OnInit {

  isLoading = true;
  user_id: string;
  consultations: any;
  tableType: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private api: ApiService,
    private auth: AuthService,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.user_id = localStorage.getItem('user_id');
    this.getConsultations();
  }
  getConsultations() {
    const params = {
      client_id: this.user_id
    };
    this.api.post('getConsultation', params).subscribe((data) => {
      this.isLoading = false;
      console.log(data);
      if (data.status) {
        this.consultations = data.data;
      }
    });
  }
  delConsultation(id) {
    this.isLoading = true;
    const params = {
      id: id
    };
    this.api.post('delConsultation', params).subscribe((data) => {
      this.isLoading = false;
      console.log(data);
      if (data.status) {
        this.getConsultations();
      }
    });
  }

}
