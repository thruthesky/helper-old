import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppHeader } from '../../template/app-header';

@Component({
  templateUrl: 'build/pages/home/home.html',
  directives: [ AppHeader ]
})
export class HomePage {
  private appTitle: string = "Login";
  constructor(public navCtrl: NavController) {
    this.appTitle = 'My Korean Boss';
  }
}
