import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppHeader } from '../../template/app-header';
import { Xforum } from '../../providers/xforum/xforum';
import {TranslatePipe, TranslateService} from 'ng2-translate/ng2-translate';

@Component({
  templateUrl: 'build/pages/home/home.html',
  providers: [ Xforum ],
  directives: [ AppHeader ],
  pipes: [TranslatePipe]
})
export class HomePage {
  private appTitle: string = "My Korean Boss";
  constructor( public navCtrl: NavController, private x: Xforum, private translate: TranslateService ) {
    this.x.ping( (re) => console.log( re ) );
    translate.setDefaultLang('en');
    translate.use('ko');
    translate.get('home.title').subscribe((res:string)=> this.appTitle = res );
  }
}
