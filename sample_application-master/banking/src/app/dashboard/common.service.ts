import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap, debounceTime, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  serverUrl: any;
  constructor(private http: HttpClient) {
    this.serverUrl = 'http://localhost:8080/OOComp586/User';
  }


  getAllUsers(): Observable<any> {
    const  headers = new  HttpHeaders().set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    return this.http.get(this.serverUrl + '/all', {headers})
    .pipe(
      map((response: any) => {
          return response;
      }),
      catchError( error => of(`Bad Promise: ${error}`))
    );
  }


  getIndividualUser(userId: string): Observable<any> {
    const  headers = new  HttpHeaders().set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    return this.http.get(this.serverUrl + '/display/' + userId, {headers})
    .pipe(
      map((response: any) => {
          return response;
      }),
      catchError( error => of(`Bad Promise: ${error}`))
    );
  }

  modifyUser(userDetails: any): Observable<any> {
    const  headers = new  HttpHeaders().set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    const reqBody = {...userDetails};
    console.log(reqBody);
    delete reqBody.savings;
    return this.http.post(this.serverUrl + '/update', reqBody, {headers})
    .pipe(
      map((response: any) => {
          console.log(response);
          return response;
      }),
      catchError( error => of(`Bad Promise: ${error}`))
    );
  }

  authenticateUser(userInfo: any): Observable<any> {
    const reqBody = {...userInfo};
    return this.http.post(this.serverUrl + '/authenticate', reqBody)
    .pipe(
      map((response: any) => {
          console.log(response);
          return response;
      }),
      catchError( error => of(`Bad Promise: ${error}`))
    );
  }
}
