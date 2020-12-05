import { NgxSpinnerModule } from 'ngx-spinner';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from 'src/app/common/header/header.component';
import { FooterComponent } from 'src/app/common/footer/footer.component';
import { SidebarComponent } from 'src/app/common/sidebar/sidebar.component';
import { DataTablesModule } from 'angular-datatables';
import {MatStepperModule, MatInputModule, MatButtonModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatSliderModule} from '@angular/material'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTimepickerModule } from 'mat-timepicker';
import { BookedconsultationsComponent } from './bookedconsultations/bookedconsultations.component';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { ChartsModule } from 'ng2-charts';
import { JobsComponent } from './jobs/jobs.component';
import { CreatenewjobComponent } from './createnewjob/createnewjob.component';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'jobs',
        component: JobsComponent
      },
      {
        path: 'create-job/:type',
        component: CreatenewjobComponent
      },
    ]
  }
];

@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    BookedconsultationsComponent,
    JobsComponent,
    CreatenewjobComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMatFileInputModule,
    MatStepperModule, MatInputModule, MatButtonModule, MatSelectModule, MatDatepickerModule,
    MatSliderModule, MatNativeDateModule, NgxSpinnerModule, MatTimepickerModule, GooglePlaceModule, ChartsModule
  ]
})
export class DashboardModule { }
