import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import {  Http, RequestOptions, Headers, Response } from '@angular/http';

@Injectable()
export class DataService {

  constructor(private http: Http) { }


  getAll(): Observable<any>{
    return this.http.get('/api/v1/top_n_ranking?price_type_id=2&n10', 
      this.jwt()).map(response => {
        response.json();
    });
}

  getById(id: number){
    // console.log(this.jwt());
    return this.http.get('/api/users/' + id, this.jwt()).map((response: Response) => {response.json();});
  }

  // create(){
  //   return this.http.post('/api/users', user, this.jwt()).map((response: Response) => {response.json();});
  // }

  // update(){
  //   return this.http.put('/api/users/'+user.id, user, this.jwt()).map((response: Response) => {response.json();});
  // }

  // delete(id: number){
  //   return this.http.delete('/api/users/' + id, this.jwt()).map((response: Response) => {response.json();});
  // }

  // private helper method 
  private jwt(){
    // create authorization header with jwt token
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(currentUser && currentUser.auth_token){
      let headers = new Headers({'Content-type':'application/json', 'Authorization': currentUser.auth_token});
      return new RequestOptions({headers: headers});
    }
  }
  
}
