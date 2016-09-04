import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppHeader } from '../../templates/app-header';
import { Core, app } from '../../providers/core/core';
import { TranslatePipe } from 'ng2-translate/ng2-translate';
import * as xi from '../../providers/xapi/interfaces';

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
  private post: xi.PostEdit = <xi.PostEdit> {};
  constructor(private navCtrl: NavController) {

  }
  ngOnInit () {
    app.title( this.appTitle, this);
    this.post.password = '1234';
    this.post.mobile = '09174678603';
    this.post.birthday = '19731016';
    this.post.gender = 'M';
    this.post.title = "Housemaid write. This is the title.";
    this.post.content = "Make it easy.";

    this.onClickPost();

  }

  onClickPost() {
    console.log( this.post );
  }


}
