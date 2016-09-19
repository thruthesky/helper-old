import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../pages/home/home';
// import { PostEditPage } from '../pages/post-edit/post-edit';
// import { LoginPage } from '../pages/login/login';
import { TranslatePipe } from 'ng2-translate/ng2-translate';
import { Events } from 'ionic-angular';
import { Core, app } from '../providers/core/core';
import {SearchPage} from '../pages/search/search';

@Component({
    selector: 'app-header',
    template: `

        <ion-navbar>
            <!--
            <ion-buttons left>
                <button (click)="onClickHome()">
                    <ion-icon name="home"></ion-icon>
                </button>
            </ion-buttons>
            -->

            <ion-title>
                {{ appTitle }}
            </ion-title>
            
            <ion-buttons right>
                <!--<button primary login *ngIf=" ! loggedIn " (click)="onClickLogin()">{{ 'LOGIN' | translate }}</button>-->
                <button (click)="onClickPostEdit()" *ngIf="!hideCreateButton"><ion-icon name="create"></ion-icon></button>
                <button (click)="onClickSearch()"><ion-icon name="search"></ion-icon></button>
            </ion-buttons>

            <button menuToggle right>
                <ion-icon name="menu"></ion-icon>
            </button>
        </ion-navbar>

    `,
    providers: [ ],
    pipes: [ TranslatePipe ],
    directives: [ ]
})
export class AppHeader {
    @Input() appTitle: string = "AppTitle";
    @Input() hideCreateButton: boolean;
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
        // console.log("AppHeader initialize() : Core.loggedIn=" + Core.loggedIn + ", user session_id: " + Core.user.session_id );

        if ( AppHeader.initialized ) {
            // console.log('AppHeader::constructor() : already initialized !');
            return true;
        }
        else {
            AppHeader.initialized = true;
            // console.log('AppHeader::constructor() : initializing');
            return false;
        }
    }

    // coreEvent( x: string ) {
    //     console.log('AppHeader::contructor::coreEvent():' + x);
    //     if ( x == 'language-set' ) this.translate();
    // }

    /**
     * Goes home on toolbar.
     */
    onClickHome() {
        console.log("AppHeader::onClickHome");
        // console.log( HomePage );
        // this.navCtrl.setRoot( HomePage );
    }

    onClickLogin() {
        console.log('app-header::onClickLogin() : ');
        // console.log( LoginPage );
        // this.navCtrl.setRoot( LoginPage );
        // app.showLoginPage();

        // this.events.publish('app', { code:'showComponent', 'component': 'LOGIN'} );
    }
    onClickPostEdit() {
        this.events.publish('app', { code:'showComponent', 'component': 'POST'} );
        // this.navCtrl.push( PostEditPage );
    }

    onClickSearch () {
      this.navCtrl.push( SearchPage );
    }

    translate() {

    }
}
