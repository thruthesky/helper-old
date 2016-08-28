import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

//import { AppHeader, Xforum, HomePage, Database } from '../../etc/all';
import { AppHeader } from '../../templates/app-header';
import { Xforum } from '../../providers/xforum/xforum';
import { HomePage } from '../home/home';
import { Database } from '../../providers/database/database';
import { Language, TranslatePipe } from '../../providers/language/language';

import { LoginResponse } from '../../providers/xforum/interfaces';

@Component({
  templateUrl: 'build/pages/login/login.html',
  providers: [ Xforum, Database, Language ],
  directives: [AppHeader],
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
  private alreadyLoggedIn: boolean = false;

  constructor(private navCtrl: NavController,
        private x: Xforum,
        private db: Database,
        private language: Language ) {
    
    // this.testApp();

    language.ready.subscribe( (x) => {
      language.get('login.title', (x) => this.appTitle = x );
    });

    this.ifAlreadyLoggedIn();


  }

  ifAlreadyLoggedIn() {

    this.db.getUserSessionId( (x) => this.alreadyLoggedIn = true );

  }

  onClickLogout() {
    this.db.setUserSessionId( '' );
    this.goHome();
  }

  onClickSignIn() {
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
    console.log(res);

    this.db.setUserSessionId( res.data.session_id );
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
    this.onClickSignIn();
  }

}
