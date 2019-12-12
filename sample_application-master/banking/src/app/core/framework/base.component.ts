import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

export abstract class BaseComponent {

    constructor(protected _router: Router, protected _translateService: TranslateService) {
        this.init();
    }

    async init() {
        this._translateService.setDefaultLang('en');
        this._translateService.use('en');
    }
}
