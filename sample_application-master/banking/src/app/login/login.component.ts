import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared/services/shared.service';
import { CommonService } from '../dashboard/common.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  employees = [];
  invalidCredentials = false;
  loader = false;
  userId: string;
  password: string;
  // tslint:disable-next-line:variable-name
  constructor(private _router: Router, private _sharedService: SharedService, private apiResourceService: CommonService,
              private http: HttpClient) {
                this.getJSON().subscribe(data => {
                  console.log(data);
                  this.loader = false;
                  this.employees = data;
              });

    }

    public getJSON(): Observable<any> {
      this.loader = true;
      return this.http.get('./assets/json/config.json');
  }

  ngOnInit() {
    const isSignedIn = JSON.parse(sessionStorage.getItem('signedIn'));
    if (isSignedIn) {
      this._sharedService.signalEvent.emit({signOutEnable: true});
      this._router.navigate(['/dashboard']);
    }
  }

  containsObject(obj, list): boolean {
    let x;
    for (x in list) {
        if (list.hasOwnProperty(x) && (list[x].userName === obj.userName) && (list[x].password === obj.password)) {
            return true;
        }
    }

    return false;
}

  onSubmit() {
    this.loader = true;
    this.apiResourceService.authenticateUser({userName: this.userId, password: this.password})
    .subscribe((response: any) => {
      this.loader = false;
      if (response.jwt) {
          if (this.containsObject({userName: this.userId, password: this.password}, this.employees)) {
          sessionStorage.setItem('token', response.jwt);
          sessionStorage.setItem('signedIn', JSON.stringify(true));
          this._sharedService.signalEvent.emit({signOutEnable: true});
          this._router.navigate(['/dashboard']);
          } else {
            this.invalidCredentials = true;
          }
      } else {
        this.invalidCredentials = true;
      }
    });
  }

}
