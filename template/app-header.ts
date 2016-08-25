import { Component, Input } from '@angular/core';
@Component({
    selector: 'app-header',
    template: `
    <ion-header>
        <ion-toolbar>

            <ion-buttons left>
            <button>
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
}