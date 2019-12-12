import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

class SharedService {
    public signalEvent = new EventEmitter();
    constructor() {}
}

export  {SharedService};
