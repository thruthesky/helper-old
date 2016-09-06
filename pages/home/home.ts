import { Component, OnDestroy } from '@angular/core';
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
export class HomePage implements OnDestroy {
    private appTitle: string;
    static initialized: boolean = false;
    static sub: any;
    private panelMenus = share.panelMenus;
    private design: number = 2;
    private testRadioOpen : boolean;
    private testRadioResult : string;
    constructor( public navCtrl: NavController,
        private x: Xapi,
        public alertCtrl: AlertController
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

    openPage( page ) {
        this.navCtrl.push( page.component );
    }

    showRadio() {
      let alert = this.alertCtrl.create();
      alert.setTitle('Select your language');

      alert.addInput({
        type: 'radio',
        label: ( Core.language == 'en' ? 'English' : ( Core.language == 'ko' ? '영어' : '영어' ) ),
        value: 'en',
        checked: Core.language == 'en'
      });

      alert.addInput({
        type: 'radio',
        label: ( Core.language == 'en' ? 'Korean' : ( Core.language == 'ko' ? '한국어' : '한국어' ) ),
        value: 'ko',
        checked: Core.language == 'ko'
      });

      alert.addInput({
        type: 'radio',
        label: ( Core.language == 'en' ? 'Chinese' : ( Core.language == 'ko' ? '중국어' : '중국어' ) ),
        value: 'ch',
        checked: Core.language == 'ch'
      });
      alert.addButton('Cancel');
      alert.addButton({
        text: 'Ok',
        handler: data => {
          console.log('Radio data:', data);
          this.testRadioOpen = false;
          this.testRadioResult = data;
          Core.set( Core.code.language, data, () => location.reload() );
        }
      });

      alert.present().then(() => {
        this.testRadioOpen = true;
      });
    }


}
