import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpClient : HttpClient,
    private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.isUserLoggedIn()){
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }

  isUserLoggedIn() {
    let user = JSON.parse(sessionStorage.getItem('user')!);
    return !(user === null);
  }

  logOut() {
    sessionStorage.removeItem('user');
    this.router.navigate(['']);
  }

  static getCurrentUser() : string {
    return sessionStorage.getItem('user')!;
  }

  static getJwtHeader() {
    return {headers: {'Content-Type':'application/json','Authorization':"Bearer " + JSON.parse(sessionStorage.getItem('user')!).token}};
  }

  static getJwtHeaderForFiles() {
    return {headers: {'Authorization':"Bearer " + JSON.parse(sessionStorage.getItem('user')!).token}};
  }
}
