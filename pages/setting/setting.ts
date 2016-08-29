import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppHeader } from '../../templates/app-header';
import { TranslatePipe } from 'ng2-translate/ng2-translate';
import { Database } from '../../providers/database/database';
// import { Subject }    from 'rxjs/Subject';
import { Core } from '../../providers/core/core';
@Component({
  templateUrl: 'build/pages/setting/setting.html',
  directives: [ AppHeader ],
  providers: [ Database],
  pipes: [TranslatePipe]
})
export class SettingPage {
  private appTitle: string = 's';
  private languages = { en: false, ko: false, ch: false };

  static initialized: boolean = false;
  // static sub: any;

  // static change = new Subject<string>();
  constructor(private navCtrl: NavController,
    private core: Core,
    private db: Database
    ) {


    // language.ready.subscribe( (x) => {
    //   language.get('setting.title', (x)=> this.appTitle = x);
    // });

    this.db.get('language', (v) => {
      if ( v ) this.languages[ v ] = true;
    });
    this.init();

    console.log('core? : ' + Core.language);

    // if ( this.init() ) {
    //   SettingPage.sub.unsubscribe();
    // }
    // SettingPage.sub = Core.event.subscribe( (x: string) => this.coreEvent(x) );
  }

    init() : boolean {
        if ( SettingPage.initialized ) {
            console.log('SettingPage::constructor() : already initialized !');
            return true;
        }
        else {
            SettingPage.initialized = true;
            console.log('SettingPage::constructor() : initializing');
            return false;
        }
    }

  // coreEvent( x: string ) {
  //   if ( x == Core.eventCode.language ) {
  //     console.log('settings::coreEvent:x: ' + x);
  //     this.appTitle = 'gogogo';
  //     console.log(this);
  //   }
  //   // console.log('SettingPage::coreEvent():' + x);
  //   // if ( x == Core.eventCode.language ) {
  //   //   this.core.trans( 'SETTING', (x) => {

  //   //   console.log("SettingPage::trans:: x: " + x);
  //   //   setTimeout( () => {
  //   //     console.log('timeout: x: ' + x );
  //   //     this.appTitle = x;
  //   //   }, 1000 );
  //   //     this.appTitle = x;
  //   //     console.log('this:appTitle: ' + this.appTitle);
  //   //   } );
  //   // }
    
  // }

  /**
   * @attention README#Coding Guide#Settings
   */
  onClickLanguage( ln: string ) {
    this.db.set( 'language', ln );
    location.reload();
    
    // SettingPage.change.next('language-change');
    // this.language.get('setting.title', (x)=> this.appTitle = x);
  }
}
