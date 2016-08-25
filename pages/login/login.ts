import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppHeader } from '../../template/app-header';
import { Xforum } from '../../providers/xforum/xforum';
import { HomePage } from '../home/home';
import { Database } from '../../providers/database/database';
@Component({
  templateUrl: 'build/pages/login/login.html',
  providers: [ Xforum, Database ],
  directives: [AppHeader]
})
export class LoginPage {
  private appTitle: string = "Login";
  private user_login: string;
  private user_pass: string;
  private showLoader: boolean = false;
  private loadMessage: string;
  private showError: boolean = false;
  private errorMessage: string;
  constructor(private navCtrl: NavController, private xforum: Xforum, private db: Database ) {
    this.testApp();
  }

  onClickSignIn() {
    this.onShowLoader();
    console.log('LoginPage::onClickSignIn() user_login:  ' + this.user_login);
    this.xforum.login( this.user_login, this.user_pass).subscribe( (res) => {
      console.log( res );
      this.onHideLoader();
      let result = JSON.parse( res['_body'] );
      if ( result['success'] ) this.goHome();
      else this.onLoginError( result['data'] );
    } );
  }

  onShowLoader() {
    this.showLoader = true;
    this.loadMessage = "Connecting to server ...";
  }
  onHideLoader() {
    this.showLoader = false;
  }

  goHome() {
    console.log("LoginPage::goHome");
    this.navCtrl.setRoot(HomePage);
  }
  onLoginError( data: any ) {
    this.showError = true;
    this.errorMessage = data['message'];
  }

  testApp() {
    this.user_login = "test";
    this.user_pass = "1test";
    this.onClickSignIn();
  }

}
