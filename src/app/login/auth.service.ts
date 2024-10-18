import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  public isAuthenticated = false;
  private apiUrl: string = environment.backendUser;
  private authInfo: any;
  public meInfo!: any;

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  async validateLogin(dataLogin: any) {
    return this.http.post(this.apiUrl + "/auth", dataLogin).toPromise()
    .then((res: any) => {
      this.authInfo = res;
      console.log(this.authInfo);
      localStorage.setItem('token', this.authInfo.token);
      this.isAuthenticated = true;
      return this.authInfo;
    });
  }

  async getMeInfo(token: string) {
    return this.http.get(this.apiUrl+"/me", {
      headers: {'Authorization': 'Bearer ' + token}}
    ).toPromise()
    .then((res: any) => {
      this.meInfo = res;
      console.log(this.meInfo);
      localStorage.setItem('meInfo', JSON.stringify(this.meInfo));
      return this.meInfo;
    });
  }

  logout() {
    this.isAuthenticated = false;
    this.router.navigate(['']);
    localStorage.removeItem('token');
    localStorage.removeItem('meInfo');
  }

  isActive() { 
    if (!this.isAuthenticated) {
      this.router.navigate(['']);
    }
  }

  getLoggedUser() {
    return JSON.parse(localStorage.getItem('meInfo') || '{}');
  }

}
