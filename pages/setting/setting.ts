import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppHeader } from '../../templates/app-header';
import { TranslatePipe } from 'ng2-translate/ng2-translate';
import { Core } from '../../providers/core/core';
@Component({
  templateUrl: 'build/pages/setting/setting.html',
  directives: [ AppHeader ],
  providers: [ ],
  pipes: [TranslatePipe]
})
export class SettingPage {
  private appTitle: string = 's';
  private languages = { en: false, ko: false, ch: false };

  static initialized: boolean = false;
  constructor(private navCtrl: NavController,
    private core: Core
    ) {


    this.initialize();
    this.translate();

    // console.log('core? : ' + Core.language);

    // if ( this.init() ) {
    //   SettingPage.sub.unsubscribe();
    // }
    // SettingPage.sub = Core.event.subscribe( (x: string) => this.coreEvent(x) );
  }
  initialize() : boolean {
    if ( SettingPage.initialized ) {
      console.log('SettingPage::constructor() : already initialized !');
      return true;
    }
    else {
      SettingPage.initialized = true;
      console.log('SettingPage::constructor() : initializing. Do preprocess and save it in static.');
      return false;
    }
  }
  translate() {
    Core.translate('setting.title', (x) => this.appTitle = x );

    Core.db.get( Core.code.language )
      .then( (v) => {
        if ( v ) this.languages[ v ] = true;
      });

  }





  /**
   * @attention README#Coding Guide#Settings
   */
  onClickLanguage( ln: string ) {
    
    Core.db.set( Core.code.language, ln ).then( () => location.reload() );
    
    // setTimeout(()=>location.reload(), 1000);
    
    
    // SettingPage.change.next('language-change');
    // this.language.get('setting.title', (x)=> this.appTitle = x);
  }
}
