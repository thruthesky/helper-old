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
  constructor( public navCtrl: NavController, private x: Xforum ) {
    this.appTitle = 'My Korean Boss';

    this.x.ping( (re) => console.log( re ) );
    
  }
}
