import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { SharedService } from 'src/app/shared/services/shared.service';

@Injectable()
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(this.tokenAvailable());

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(
    private router: Router,
    private _sharedService: SharedService
  ) {}

  tokenAvailable(): boolean {
    const user = JSON.parse(localStorage.getItem('profile-info'));
    console.log(user);
    return !!(user && user.userName);
  }

  authCredentials(status: boolean, data?: any): any {
    if (!status) {
      this.router.navigate(['/dashboard']);
      this.loggedIn.next(true);
      localStorage.setItem('profile-info', data);
    }
  }

  logout() {
    this.loggedIn.next(false);
    this._sharedService.signalEvent.emit({signOutEnable: false});
    localStorage.removeItem('profile-info');
    this.router.navigateByUrl('/');
  }
}
