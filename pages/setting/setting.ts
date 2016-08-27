import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppHeader } from '../../templates/app-header';
import { Language, TranslatePipe } from '../../providers/language/language';
import { Database } from '../../providers/database/database';
@Component({
  templateUrl: 'build/pages/setting/setting.html',
  directives: [ AppHeader ],
  providers: [Language, Database],
  pipes: [TranslatePipe]
})
export class SettingPage {
  private appTitle: string = '';
  private languages = { en: false, ko: false, ch: false };
  constructor(private navCtrl: NavController, private language: Language, private db: Database) {
    language.ready.subscribe( (x) => {
      language.get('setting.title', (x)=> this.appTitle = x);
    });

    this.db.get('language', (v) => {
      if ( v ) this.languages[ v ] = true;
    });
  }

  onClickLanguage( ln: string ) {
    // console.log( ln );
    this.db.set( 'language', ln );
    //this.navCtrl.setRoot( SettingPage );
    location.reload();
  }
}
