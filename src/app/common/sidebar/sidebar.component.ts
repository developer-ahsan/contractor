import { Component, OnInit } from '@angular/core';

declare var $: any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isAdmin: string;
  constructor(
  ) {
    this.isAdmin = localStorage.getItem('isAdmin');
    console.log(this.isAdmin);
  }

  ngOnInit() {    
    // Toggle the side navigation
    if(window.innerWidth < 600) {
    if (!$('.sidebar').hasClass('toggled')) {
      $('.sidebar .collapse').collapse('hide');
      $('.sidebar').toggleClass('toggled');
    }
    }
    
  }
  onclick() {
    if(window.innerWidth < 600) {
    
    if (!$('.sidebar').hasClass('toggled')) {
      $('.sidebar .collapse').collapse('hide');
      $('.sidebar').toggleClass('toggled');
    }
  }
  }
  ngAfterViewInit(): void {
    const script = document.createElement('script');
    script.src = "./assets/admin-assets/js/sb-admin-2.min.js";
    document.body.appendChild(script); 
  }

}
