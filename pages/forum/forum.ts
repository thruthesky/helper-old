import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppHeader } from '../../templates/app-header';
import { Language, TranslatePipe } from '../../providers/language/language';
@Component({
  templateUrl: 'build/pages/forum/forum.html',
  directives: [ AppHeader ],
  providers: [Language],
  pipes: [TranslatePipe]
})
export class ForumPage {
  private appTitle: string = "Forum";
  constructor(private navCtrl: NavController, private language: Language) {
    language.get('forum.title', (x)=> this.appTitle = x);
  }
}
