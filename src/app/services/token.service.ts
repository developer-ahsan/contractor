import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private baseUrl = environment.apiUrl;
  private iss = {
    login: `${this.baseUrl}/login`,
  };
  
  constructor(private router: Router) { }

  public handle(token) {
    this.set(token);
  }

  public set(token) {
    localStorage.setItem('token', token);
  }

  public get() {
    return localStorage.getItem('token');
  }

  public remove() {
    localStorage.removeItem('token');
    localStorage.clear();
  }

  isValid() {
    const token = this.get();
    if (token) {
      const payload = this.payload(token);
      if (payload) {
        return (Object.values(this.iss).indexOf(payload.iss) > -1) ? true : false;
      }
    }
    return false;
  }

  payload(token) {
    const payload = token.split('.')[1];
    return this.decode(payload);
  }

  decode(payload) {
    return JSON.parse(atob(payload));
  }

  public loggedIn() {
    return this.isValid();
  }

  responseToToken(response) {
    if (response.token) {
      this.handle(response.token);
      return response.token;
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  tokenError(error) {
    this.remove();
    this.router.navigateByUrl('/login');
  }
}
