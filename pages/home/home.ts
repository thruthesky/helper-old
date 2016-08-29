import { Component, OnDestroy } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppHeader } from '../../templates/app-header';
import { Xforum } from '../../providers/xforum/xforum';
import {TranslatePipe} from 'ng2-translate/ng2-translate';
import { Core } from '../../providers/core/core';

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
      private core: Core,
      private x: Xforum ) {
      // HomePage.sub = Core.event.subscribe( (x: string) => this.coreEvent(x) );

      this.init();
      console.log('HomePage: construtor: language: ' + Core.language );
  }
  ngOnDestroy() {
      //HomePage.sub.unsubscribe();
      console.log("HomePage: ngOnDescroty: unsubscribed");
  }

    init() : boolean {

        if ( HomePage.initialized ) {
            console.log('HomePage::constructor() : already initialized !');
            return true;
        }        
        else {
            HomePage.initialized = true;
            console.log('HomePage::constructor() : initializing');
            return false;
        }
    }
  // coreEvent( x: string ) {
  //   console.log('HomePage::contructor::coreEvent():' + x);
  //   if ( x == Core.eventCode.language ) {
  //     this.core.trans( 'home.title', (x) => this.appTitle = x );
  //   }
    
  // }
}
