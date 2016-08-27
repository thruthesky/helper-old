import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppHeader } from '../../templates/app-header';
import { Xforum } from '../../providers/xforum/xforum';
import {TranslatePipe, Language} from '../../providers/language/language';

@Component({
  templateUrl: 'build/pages/home/home.html',
  providers: [ Xforum, Language ],
  directives: [ AppHeader ],
  pipes: [TranslatePipe]
})
export class HomePage {
  private appTitle: string = "My Korean Boss";
  constructor( public navCtrl: NavController, private x: Xforum, private language: Language ) {
    this.x.ping( (re) => console.log( re ) );
    language.get('home.title', (x)=> this.appTitle = x );
  }
}
