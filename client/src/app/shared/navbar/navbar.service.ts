import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class NavbarService {



    clickedNavChange: Subject<boolean> = new Subject<boolean>();
    navState$ = this.clickedNavChange.asObservable();

    constructor() { 
        
    }

    setNavBarState( state ) {
        this.clickedNavChange.next( state );
    }
}