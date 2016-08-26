import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
//import { HomePage } from '../etc/pages';
import { HomePage } from '../etc/all';
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
            <button primary>Login</button>
            <button><ion-icon name="search"></ion-icon></button>
            </ion-buttons>

            <button menuToggle right>
            <ion-icon name="menu"></ion-icon>
            </button>

        </ion-toolbar>
    </ion-header>
    `
})
export class AppHeader {
    @Input() appTitle: string = "App Title";
    constructor(private navCtrl: NavController) {

    }
    onClickHome() {
        console.log("AppHeader::onClickHome");
        this.navCtrl.setRoot( HomePage );
    }
}