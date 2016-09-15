import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AppHeader } from '../../templates/app-header';
import { Xapi } from '../../providers/xapi/xapi';
import {TranslatePipe} from 'ng2-translate/ng2-translate';
import { Core, app } from '../../providers/core/core';
import * as share from '../../providers/share/share';

@Component({
  templateUrl: 'build/pages/home/home.html',
  providers: [ Xapi ],
  directives: [ AppHeader ],
  pipes: [ TranslatePipe ]
})
export class HomePage implements OnDestroy, OnInit {
    private appTitle: string;
    static initialized: boolean = false;
    static sub: any;
    private design: number = 2;
    private panelMenus;
    constructor( public navCtrl: NavController,
        private x: Xapi,
        public alertCtrl: AlertController
    ) {
      this.initialize();
      this.panelMenus = Xapi.panelMenu;
      console.log('HomePage: construtor: language: ' + Core.language );
  }
  ngOnInit() {
      app.title( 'home.title', this );
  }
  ngOnDestroy() {
      console.log("HomePage: ngOnDescroty())");
  }
  initialize() : boolean {
      
      
      if ( HomePage.initialized ) {
          console.log('HomePage::constructor() : already initialized ... !');
          return true;
        }
        else {
            HomePage.initialized = true;
            console.log('HomePage::constructor() : initializing. You can do some preprocess and save it into satic.');
            return false;
        }
    }

    openPage( page ) {
        this.navCtrl.push( page.component );
    }
}
