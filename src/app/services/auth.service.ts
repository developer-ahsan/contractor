import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public baseUrl = environment.apiUrl;

  public loggedIn = new BehaviorSubject<boolean>(this.Token.loggedIn());
  authStatus = this.loggedIn.asObservable();

  // Auth User
  public currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
  public isAdmin = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('isAdmin')));
  public currentUser = this.currentUserSubject.asObservable();

  constructor(
    private Token: TokenService,
    private http: HttpClient
  ) { }

  public changeAuthStatus(value: boolean) {
    this.loggedIn.next(value);
  }

  public setAuthUser(user: any) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('UserName', user.firstname + ' ' + user.lastname);
    this.currentUserSubject.next(user);
  }
  public setIsAdmin(user: any) {
    localStorage.setItem('isAdmin', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  public isLoggedIn() {
    return this.Token.loggedIn();
  }

  public logout() {
    // this.http.post(`${this.baseUrl}/logout`, '').subscribe(
    //   data => this.handleResponse(data),
    //   error => { console.log(error); }
    // );
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('UserName');
  }

  handleResponse(data) {
    // console.log(data);
    if (data.status_code == 200) {
      this.Token.remove();
      this.loggedIn.next(false);
      this.currentUserSubject.next(null);
      setTimeout(() => {
        window.location.href = '/login';
      }, 1000);
    }
  }
}
