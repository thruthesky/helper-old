import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../pages/home/home';
import { TranslatePipe, Language } from '../providers/language/language';
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
            <button primary login>{{ 'LOGIN' | translate }}</button>
            <button><ion-icon name="search"></ion-icon></button>
            </ion-buttons>

            <button menuToggle right>
            <ion-icon name="menu"></ion-icon>
            </button>

        </ion-toolbar>
    </ion-header>
    `,
    providers: [ Language ],
    pipes: [ TranslatePipe ]
})
export class AppHeader {
    @Input() appTitle: string = "App Title";
    constructor(private navCtrl: NavController, private language: Language) {

    }
    onClickHome() {
        console.log("AppHeader::onClickHome");
        console.log( HomePage );
        this.navCtrl.setRoot( HomePage );
    }
}