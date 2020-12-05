import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../../../services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from './../../../services/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLoading = true;
  counters: any;
  constructor(
    private api: ApiService,
    private spinner: NgxSpinnerService,
    private auth: AuthService,
    public toast: ToastrService
  ) {
   }

  ngOnInit() {
    this.getCounters();
  }
  getCounters() {
    const params = {};
    this.api.get('getcounters', params).subscribe((data) => {
      this.isLoading = false;
      this.counters = data;
    });
  }
}
