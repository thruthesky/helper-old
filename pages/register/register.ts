import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppHeader } from '../../templates/app-header';
import { TranslatePipe } from 'ng2-translate/ng2-translate';
//import { Xforum } from '../../providers/xforum/xforum';
import { Xapi } from '../../providers/xapi/xapi';
import { Core, app } from '../../providers/core/core';
import { HomePage } from '../home/home';
import * as xi from '../../providers/xapi/interfaces';
@Component({
  templateUrl: 'build/pages/register/register.html',
  providers: [ Xapi ],
  directives: [ AppHeader ],
  pipes: [ TranslatePipe ]
})
export class RegisterPage {

  private appTitle: string = 'R...';
  private user: xi.UserRegisterData  = xi.userRegisterData;



  constructor(
    private navCtrl: NavController,
    private x: Xapi
  ) {
    console.log('RegisterPage::constructor()');
    app.title( 'register.title', this);
  }




  onClickRegister() {
    console.log('RegisterPage::onClickRegister()');

    console.log('user form data : ', this.user );
    this.x.register( this.user, (res: xi.RegisterResponse) => {
      if ( res.success ) {
        console.log("RegisterPage::onClickRegister::success");
        Core.onUserRegisterSuccess( res );
        this.goHome();
        //Core.set( Core.code.user, JSON.stringify(re.data), () => { } );
      }
      else {
        // @todo display error message.
        console.log("RegisterPage::onClickRegister::error");
      }
    });
  }

  
  goHome() {
    console.log("RegisterPage::goHome");
    this.navCtrl.setRoot(HomePage); 
  }


}
