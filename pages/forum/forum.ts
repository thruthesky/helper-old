import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppHeader } from '../../templates/app-header';
import { TranslatePipe } from 'ng2-translate/ng2-translate';
import { Core } from '../../providers/core/core';
@Component({
  templateUrl: 'build/pages/forum/forum.html',
  directives: [ AppHeader ],
  pipes: [TranslatePipe]
})
export class ForumPage {
  private appTitle: string = "Forum";
  constructor(private navCtrl: NavController,
    private core: Core
  ) {
    // language.get('forum.title', (x)=> this.appTitle = x);
  }
}
