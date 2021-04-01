import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ForgetPasswordComponent } from './components/auth/forget-password/forget-password.component';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ResetPasswordComponent } from './components/auth/reset-password/reset-password.component';
import { ToastrModule } from 'ngx-toastr';
import { ChartsModule } from 'ng2-charts';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationComponent } from './common/confirmation/confirmation.component';
import {MatDialogModule} from '@angular/material';
import { AngularEditorModule } from '@kolkov/angular-editor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    ConfirmationComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    ToastrModule.forRoot(),
    ChartsModule,
    NgxSpinnerModule,
    NgxMatFileInputModule,
    MatDialogModule,
    AngularEditorModule,
  ],
  providers: [
    NgxSpinnerService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ConfirmationComponent
  ],
})
export class AppModule { }
