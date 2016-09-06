import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppHeader } from '../../templates/app-header';
@Component({
  templateUrl: 'build/pages/policy/policy.html',
  directives: [ AppHeader ]
})
export class PolicyPage {

  constructor(private navCtrl: NavController) {

  }

}
