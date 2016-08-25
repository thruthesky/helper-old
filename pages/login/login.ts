import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppHeader } from '../../template/app-header';
@Component({
  templateUrl: 'build/pages/login/login.html',
  directives: [AppHeader]
})
export class LoginPage {
  private appTitle: string = "Login";
  constructor(private navCtrl: NavController) {

  }

}
