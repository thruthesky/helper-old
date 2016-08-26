import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppHeader } from '../../etc/all';
import {TranslatePipe, TranslateService} from 'ng2-translate/ng2-translate';

@Component({
  templateUrl: 'build/pages/forum/forum.html',
  directives: [ AppHeader ],
  pipes: [TranslatePipe]
})
export class ForumPage {
  private appTitle: string = "Forum";
  constructor(private navCtrl: NavController, private translate: TranslateService) {
    translate.setDefaultLang('en');
    translate.use('ko');
    translate.get('forum.title').subscribe((res:string)=> this.appTitle = res );
  }
}
