import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppHeader } from '../../templates/app-header';

import { Xapi } from '../../providers/xapi/xapi';
import {TranslatePipe} from 'ng2-translate/ng2-translate';
import { Core, app } from '../../providers/core/core';
@Component({
  templateUrl: 'build/pages/policy/policy.html',
  directives: [ AppHeader ]
})
export class PolicyPage {

  constructor(private navCtrl: NavController) {
    app.title( 'policy.title', this );
  }

}
