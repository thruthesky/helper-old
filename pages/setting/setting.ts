import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppHeader } from '../../templates/app-header';
@Component({
  templateUrl: 'build/pages/setting/setting.html',
  directives: [ AppHeader ]
})
export class SettingPage {
  private appTitle: string = 'Settings';
  constructor(private navCtrl: NavController) {

  }

}
