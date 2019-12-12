import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { TranslateService } from '@ngx-translate/core';
import { SharedService } from '../../../shared/services/shared.service';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private _translateService: TranslateService,
    private _sharedServices: SharedService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {

    const statesIndividual = state.url.split('/');
    console.log(statesIndividual);
    statesIndividual.shift();
    if (statesIndividual.indexOf('dashboard') !== -1) {
      this._sharedServices.signalEvent.emit({'singoutEnable': true});
    }
    return this.authService.isLoggedIn
      .pipe(
        take(1),
        map((isLoggedIn: boolean) => {
          if (!isLoggedIn) {
            this.router.navigate(['/']);
            return false;
          }
          return true;
        })
      );

  }
}
