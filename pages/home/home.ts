import { Component, OnDestroy } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppHeader } from '../../templates/app-header';
import { Xforum } from '../../providers/xforum/xforum';
import {TranslatePipe} from 'ng2-translate/ng2-translate';
import { Core, app } from '../../providers/core/core';

@Component({
  templateUrl: 'build/pages/home/home.html',
  providers: [ Xforum ],
  directives: [ AppHeader ],
  pipes: [TranslatePipe]
})
export class HomePage implements OnDestroy {
    private appTitle: string;
    static initialized: boolean = false;
    static sub: any;
    constructor( public navCtrl: NavController,
        private x: Xforum
    ) {
      this.initialize();
      console.log('HomePage: construtor: language: ' + Core.language );
  }
  ngOnDestroy() {
      console.log("HomePage: ngOnDescroty())");
  }
  initialize() : boolean {
      // Core.translate('home.title', (x) => this.appTitle = x );
      app.title( 'home.title', this );
      if ( HomePage.initialized ) {
          console.log('HomePage::constructor() : already initialized !');
          return true;
        }        
        else {
            HomePage.initialized = true;
            console.log('HomePage::constructor() : initializing. You can do some preprocess and save it into satic.');
            return false;
        }
    }
}
