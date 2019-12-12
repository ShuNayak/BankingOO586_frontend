import { Component, OnInit, Renderer, ElementRef, ViewChild, AfterViewInit, OnChanges } from '@angular/core';
import { CommonService } from '../common.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {


  allUsers: any[];
  individualUser: any;
  userObtained = false;
  loader = false;
  formEditable = false;
  individualUserCopy: any;

  // tslint:disable-next-line:variable-name
  constructor(private _commonService: CommonService, private router: Router, private elRef: ElementRef,
              // tslint:disable-next-line:variable-name
              private _sharedService: SharedService) { }

  ngOnInit() {

    const isSignedIn = JSON.parse(sessionStorage.getItem('signedIn'));
    if (isSignedIn) {
      this._sharedService.signalEvent.emit({signOutEnable: true});
    } else {
      this.router.navigate(['']);
    }


    this.loader = true;
    this._commonService.getAllUsers().subscribe((response) =>  {
      this.loader = false;
      console.log((response));
      this.allUsers = response;
    });
  }

  getDetails(user, index): void {
    this.individualUser = {};
    this.loader = true;
    this._commonService.getIndividualUser(user.userId).subscribe(response => {
      this.loader = false;
      this.userObtained = true;
      this.individualUser = response;
      setTimeout(() => {
        document.getElementById('userObtained').scrollIntoView();
      });
      // this.elRef.nativeElement.querySelector('#userObtained').focus();
    });
  }

  updateUser(): void {
    this.formEditable = true;
    this.individualUserCopy = JSON.parse(JSON.stringify(this.individualUser));
  }

  cancelUpdate(): void {
    this.formEditable = false;
    this.individualUser = JSON.parse(JSON.stringify(this.individualUserCopy));
  }

  modifyUser(): void {
    this.formEditable = false;
    this.allUsers.every((user, key) => {
      if (user.userId === this.individualUser.userId) {
        // tslint:disable-next-line:radix
        user.name = this.individualUser.name;
        user.address = this.individualUser.address;
        user.email = this.individualUser.email;
        return false;
      }
      return true;
    });
    this._commonService.modifyUser(this.individualUser).subscribe(response => {
      console.log(response);
    });
  }

}
