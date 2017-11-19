import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map'
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthenticationService {

  private headers: Headers = new Headers({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  });
  showLoginEmmiter = new EventEmitter<boolean>();
  // private urlAPI: string = 'https://forpus.herokuapp.com';
  private urlAPI: string = '';
  constructor(private http: Http) { }
  
  login(email: string, password: string){
    return this.http.post(this.urlAPI + '/api/v1/authenticate', 
    JSON.stringify({email: email, password: password}), {headers: this.headers})
    .map((response:  Response) => {
      console.log(response);
      // login successful if there is a jasonwebtoken (jwt) token in the response
      let user = response.json();
      if(user && user.auth_token){
        // store user details and jwt token in local storage to keep user logged in between page refreshes 
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.showLoginEmmiter.emit(false);
      } 
      return user;
    });
  }

  logout(){
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.showLoginEmmiter.emit(true);
  }
}
