import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AppHeader } from '../../templates/app-header';
import { Xapi } from '../../providers/xapi/xapi';
import { HomePage } from '../home/home';
import { TranslatePipe } from 'ng2-translate/ng2-translate';
import { SettingPage } from '../setting/setting';
import * as xi from '../../providers/xapi/interfaces';
import { Core, app } from '../../providers/core/core';

@Component({
  templateUrl: 'build/pages/login/login.html',
  providers: [ Xapi ],
  directives: [ AppHeader ],
  pipes: [ TranslatePipe ]
})
export class LoginPage {
  private appTitle: string = "";
  
  private user:any = {};
  private user_login: string;
  private user_pass: string;
  private user_email: string;
  private showLoader: boolean = false;
  private loadMessage: string;
  private showError: boolean = false;
  private errorMessage: string;
  private loggedIn: boolean = false;

  constructor(
      private navCtrl: NavController,
      private x: Xapi
  
  ) {
    console.log('LoginPage constructor()');
    app.title( 'login.title', this );
    this.loggedIn = Core.loggedIn;
    this.user = Core.user;

  }

  onClickLogout() {
    Core.doUserLogout();
    this.goHome();
  }

  onClickLogin() {
    this.onShowLoader();
    console.log('LoginPage::onClickSignIn() user_login: ...  ' + this.user_login);
    
    this.x.login( this.user_login, this.user_pass,
      ( res: xi.LoginResponse | xi.LoginError ) => {
        //console.log( res );
        this.onHideLoader();
        if ( res.success ) this.onLoginSuccess(res);
        else this.onLoginError( <xi.LoginError>res );
        },
      ( error: any ) => {
        Core.translate( 'server-error', x => this.onLoginError(x));
      }
    );

  }

  onShowLoader() {
    this.showLoader = true;
    this.loadMessage = "Connecting to server ...";
  }
  onHideLoader() {
    this.showLoader = false;
  }
  


  onLoginSuccess( res: xi.LoginResponse ) : void {
    Core.onLoginSuccess( res );
    this.goHome();
  }
  goHome() {
    console.log("LoginPage::goHome()");
    this.navCtrl.setRoot(HomePage); 
  }
  onLoginError( res: xi.LoginError ) : void {
    this.showError = true;
    this.errorMessage = res.data;
  }

  testApp() {
    this.user_login = "test";
    this.user_pass = "test";
    this.onClickLogin();
  }
  
}
