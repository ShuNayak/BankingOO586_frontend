import { Component, OnInit, Input } from '@angular/core';
import { BaseComponent } from 'src/app/core/framework/base.component';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-field-error-display',
  templateUrl: './field-error-display.component.html',
  styleUrls: ['./field-error-display.component.scss']
})
export class FieldErrorDisplayComponent extends BaseComponent implements OnInit {

  @Input() errorMsg: any;
  @Input() displayError: any;
  @Input() controlErrors: any;

  // tslint:disable-next-line:variable-name
  constructor(_translateService: TranslateService, _router: Router) {
    super(_router, _translateService);
   }

  ngOnInit() { }

}
