import { Injectable, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { userRolesResult } from '../../models/user-role';
import { user } from '../../models/user';

@Injectable({
    providedIn: 'root'
  })
  export class RegisterUserService {
    private baseUrl = 'http://localhost:5000/api'
    private baseNodeUrl = 'http://localhost:8080/api'
  ​  private getUserRolesUrl = '/UserRoles?%24select=id%2Cname';
    private addUserUrl = '/register';

    errorMessage = "";
  ​
    constructor(private httpClient:HttpClient) { }
  ​
    getUserRoles() : Observable<userRolesResult>  {
      return this.httpClient.get<userRolesResult>(this.baseUrl + this.getUserRolesUrl);
    }

    addUser(user: user) : Observable<any> {
      const {id, ...payload } = user;
      const headers = { 'content-type': 'application/json'};
      const body=JSON.stringify(payload);
      console.log(body);
      return this.httpClient.post(this.baseNodeUrl + this.addUserUrl, body,{'headers':headers});
    }

  }