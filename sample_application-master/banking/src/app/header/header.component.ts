import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/services/shared.service';
import { AuthService } from '../core/shared/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  signOutEnable = false;

  // tslint:disable-next-line:variable-name
  constructor(private _sharedService: SharedService, private authService: AuthService) { }

  ngOnInit() {
    this._sharedService.signalEvent.subscribe(response => {
      console.log(response);
      if (response) {
        if (response.signOutEnable) {
          this.signOutEnable = true;
        } else {
          this.signOutEnable = false;
        }
      }
    });
  }

  serviceLogout(): void {
    sessionStorage.setItem('signedIn', JSON.stringify(false));
    sessionStorage.removeItem('token');
    this._sharedService.signalEvent.emit({signOutEnable: false});
    this.signOutEnable = false;
    this.authService.logout();
  }

}
