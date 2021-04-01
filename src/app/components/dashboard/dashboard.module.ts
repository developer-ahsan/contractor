import { CalendarComponent } from './calendar/calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
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
import { UserslistComponent } from './userslist/userslist.component';
import { SubadimsComponent } from './subadims/subadims.component';
import { NewUsersComponent } from './new-users/new-users.component';
import { JobdetailsComponent } from './jobdetails/jobdetails.component';
import { UpdatepasswordComponent } from './proflie/updatepassword/updatepassword.component';
import { EpmloyeeJobsComponent } from './epmloyee-jobs/epmloyee-jobs.component';
import { FileSaverModule } from 'ngx-filesaver';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { AngularEditorModule } from '@kolkov/angular-editor';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction'; // a pluvgin
import { SignaturePadModule } from 'ngx-signaturepad';
import { SignaturesComponent } from './signatures/signatures.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PdfviewersComponent } from './pdfviewers/pdfviewers.component';
import { EmployeejoblistComponent } from './employeejoblist/employeejoblist.component';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);
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
      {
        path: 'employeesList',
        component: UserslistComponent
      },
      {
        path: 'subadminList',
        component: SubadimsComponent
      },
      {
        path: 'jobdetails/:type',
        component: JobdetailsComponent
      },
      {
        path: 'jobdetails/:type/:toast',
        component: JobdetailsComponent
      },
      {
        path: 'profile/updatePass',
        component: UpdatepasswordComponent
      },
      {
        path: 'Employeejobs',
        component: EpmloyeeJobsComponent
      },
      {
        path: 'jobslist/:type/:length',
        component: EmployeejoblistComponent
      },
      {
        path: 'calendar',
        component: CalendarComponent
      },
      {
        path: 'signature',
        component: SignaturesComponent
      },
      {
        path: 'accept&sign/:job/:link/:formId',
        component: PdfviewersComponent
      },
      {
        path: 'accept&sign/:job/:link',
        component: PdfviewersComponent
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
    CreatenewjobComponent,
    UserslistComponent,
    SubadimsComponent,
    NewUsersComponent,
    JobdetailsComponent,
    UpdatepasswordComponent,
    EpmloyeeJobsComponent,
    CalendarComponent,
    SignaturesComponent,
    PdfviewersComponent,
    EmployeejoblistComponent
  ],
  imports: [
    SignaturePadModule,
    CommonModule,
    RouterModule.forChild(routes),
    DataTablesModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    FormsModule,
    ReactiveFormsModule,
    NgxMatFileInputModule,
    AngularEditorModule,
    FileSaverModule,
    FullCalendarModule,
    NgxDropzoneModule,PdfViewerModule,
    MatCheckboxModule,
    MatStepperModule, MatInputModule, MatButtonModule, MatSelectModule, MatDatepickerModule,
    MatSliderModule, MatNativeDateModule, NgxSpinnerModule, MatTimepickerModule, GooglePlaceModule, ChartsModule
  ]
})
export class DashboardModule { }
