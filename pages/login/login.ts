import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AppHeader } from '../../templates/app-header';
import { Xforum } from '../../providers/xforum/xforum';
import { HomePage } from '../home/home';
import { TranslatePipe } from 'ng2-translate/ng2-translate';
import { SettingPage } from '../setting/setting';
import { LoginResponse } from '../../providers/xforum/interfaces';
import { Core } from '../../providers/core/core';
@Component({
  templateUrl: 'build/pages/login/login.html',
  providers: [ Xforum ],
  directives: [ AppHeader ],
  pipes: [ TranslatePipe ]
})
export class LoginPage {
  private appTitle: string = "";
  
  private user_login: string;
  private user_pass: string;
  private showLoader: boolean = false;
  private loadMessage: string;
  private showError: boolean = false;
  private errorMessage: string;
  private loggedIn: boolean = false;

  constructor(
      private navCtrl: NavController,
      private x: Xforum
  ) {
    console.log('LoginPage constructor()');
    Core.translate('login.title', (x) => this.appTitle = x );
    this.loggedIn = Core.loggedIn;
  }


  onClickLogout() {
    Core.doUserLogout();
    this.goHome();
  }

  onClickLogin() {
    this.onShowLoader();
    console.log('LoginPage::onClickSignIn() user_login:  ' + this.user_login);
    
    this.x.login( this.user_login, this.user_pass, ( res: LoginResponse ) => {
      console.log( res );
      this.onHideLoader();
      if ( res.success ) this.onLoginSuccess(res);
      else this.onLoginError( res );
    } );
    
  }

  onShowLoader() {
    this.showLoader = true;
    this.loadMessage = "Connecting to server ...";
  }
  onHideLoader() {
    this.showLoader = false;
  }

  onLoginSuccess( res: LoginResponse ) : void {
    Core.doUserLogin(res.data.session_id);
    this.goHome();
  }
  goHome() {
    console.log("LoginPage::goHome");
    this.navCtrl.setRoot(HomePage); 
  }
  onLoginError( res: LoginResponse ) : void {
    this.showError = true;
    this.errorMessage = res.data.message;
  }

  testApp() {
    this.user_login = "test";
    this.user_pass = "test";
    this.onClickLogin();
  }
  
}
