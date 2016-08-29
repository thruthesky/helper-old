import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../pages/home/home';
import { TranslatePipe } from 'ng2-translate/ng2-translate';
import { Core } from '../providers/core/core';
@Component({
    selector: 'app-header',
    template: `
    <ion-header>
        <ion-toolbar>

            <ion-buttons left>
            <button (click)="onClickHome()">
                <ion-icon name="home"></ion-icon>
            </button>
            </ion-buttons>

            <ion-title>
            {{ appTitle }}
            </ion-title>
            
            <ion-buttons right>
            
            <button primary login *ngIf="isLoggedIn">{{ 'LOGIN' | translate }}</button>

            <button><ion-icon name="search"></ion-icon></button>
            </ion-buttons>

            <button menuToggle right>
            <ion-icon name="menu"></ion-icon>
            </button>

        </ion-toolbar>
    </ion-header>
    `,
    providers: [ ],
    pipes: [ TranslatePipe ]
})
export class AppHeader {
    @Input() appTitle: string = "TITLE";
    static initialized: boolean = false;
    constructor(private navCtrl: NavController,
        private core: Core
    ) {
        this.init();
        //if ( this.init() ) return;
        //Core.event.subscribe( ( x: string ) => this.coreEvent( x ));
    }
    init() : boolean {
        if ( AppHeader.initialized ) {
            console.log('AppHeader::constructor() : already initialized !');
            return true;
        }        
        else {
            AppHeader.initialized = true;
            console.log('AppHeader::constructor() : initializing');
            return false;
        }
    }
    // coreEvent( x: string ) {
    //     console.log('AppHeader::contructor::coreEvent():' + x);
    //     if ( x == 'language-set' ) this.translate();
    // }
    onClickHome() {
        console.log("AppHeader::onClickHome");
        console.log( HomePage );
        this.navCtrl.setRoot( HomePage );
    }

    translate() {

    }
}