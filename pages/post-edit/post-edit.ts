import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppHeader } from '../../templates/app-header';
import { Core, app } from '../../providers/core/core';
import { TranslatePipe } from 'ng2-translate/ng2-translate';

/*
  Generated class for the PostEditPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/post-edit/post-edit.html',
  directives: [ AppHeader ],
  pipes: [ TranslatePipe ]
})
export class PostEditPage {
  private appTitle: string = 'POSTWRITE';
  constructor(private navCtrl: NavController) {

  }

  ngOnInit () {
    app.title( this.appTitle, this);
  }


}
