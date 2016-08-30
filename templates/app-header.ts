import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../pages/home/home';
// import { LoginPage } from '../pages/login/login';
import { TranslatePipe } from 'ng2-translate/ng2-translate';
import { Events } from 'ionic-angular';
import { Core, app } from '../providers/core/core';
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
                <button primary login *ngIf=" ! loggedIn " (click)="onClickLogin()">{{ 'LOGIN' | translate }}</button>
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
    @Input() appTitle: string = "AppTitle";
    static initialized: boolean;
    private loggedIn: boolean;
    constructor(
        private navCtrl: NavController,
        private events: Events
    ) {
        this.initialize();
    }
    initialize() : boolean {
        this.loggedIn = Core.loggedIn;
        console.log("AppHeader initialize() : Core.loggedIn=" + Core.loggedIn + ", user session_id: " + Core.user.session_id );

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
        // console.log( HomePage );
        this.navCtrl.setRoot( HomePage );
    }

    onClickLogin() {
        console.log('app-header::onClickLogin() : ');
        // console.log( LoginPage );
        // this.navCtrl.setRoot( LoginPage );
        // app.showLoginPage();
        
        this.events.publish('app', { code:'show-component', 'component': 'LOGIN'} );
    }

    translate() {

    }
}