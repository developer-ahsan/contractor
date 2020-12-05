import { AfterLoginService } from './services/afterlogin.service';
import { ResetPasswordComponent } from './components/auth/reset-password/reset-password.component';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ForgetPasswordComponent } from './components/auth/forget-password/forget-password.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { BeforeLoginService } from './services/before-login.service';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AfterLoginService]

  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AfterLoginService]
  },
  {
    path: 'forgetpassword',
    component: ForgetPasswordComponent,
    canActivate: [AfterLoginService]
  },
  {
    path: 'resetpassword',
    component: ResetPasswordComponent,
    canActivate: [AfterLoginService]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./components/dashboard/dashboard.module').then(mod => mod.DashboardModule),
    canActivate: [BeforeLoginService]
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
