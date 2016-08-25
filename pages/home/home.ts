import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppHeader } from '../../template/app-header';
import { Xforum } from '../../providers/xforum/xforum';

@Component({
  templateUrl: 'build/pages/home/home.html',
  providers: [ Xforum ],
  directives: [ AppHeader ]
})
export class HomePage {
  private appTitle: string = "Login";
  constructor( public navCtrl: NavController, private xforum: Xforum ) {
    this.appTitle = 'My Korean Boss';

    this.xforum.ping().subscribe( (re) => console.log(JSON.parse(re['_body']).data.server_name) );

  }
}
