import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BeforeLoginService implements CanActivate {

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    // return !this.Token.loggedIn();
    const loggedIn = Boolean(localStorage.getItem('isAdmin'));
    if (!loggedIn) {
      // redirect to dashboard page
      this.router.navigateByUrl('');
      return false;
    } else {
      return true;
    }
  }
  constructor(private Token: TokenService, private router: Router) { }
}
