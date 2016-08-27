import { Component, ViewChild } from '@angular/core';
import { ionicBootstrap, Platform, Nav, Storage, SqlStorage } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { Http } from '@angular/http';
import { TranslatePipe, TranslateService, TranslateLoader, TranslateStaticLoader } from 'ng2-translate/ng2-translate';
import { Language } from './providers/language/language';
import { Database } from './providers/database/database';
import { HomePage } from './pages/home/home';
import { LoginPage } from './pages/login/login';
import { ForumPage } from './pages/forum/forum';
import { SettingPage } from './pages/setting/setting';
import { PanelMenu } from './interfaces/panel-menu';
import * as _ from 'lodash';
@Component({
  templateUrl: 'build/app.html',
  providers: [ Database, Language ],
  pipes: [ TranslatePipe ]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = HomePage;
  pages: Array<PanelMenu>  = [

      { key: 'home', title: 'Home', component: HomePage },
      { key: 'login', title: 'Login', component: LoginPage },
      { key: 'forum', title: 'Forum', component: ForumPage },
      { key: 'setting', title: 'Setting', component: SettingPage }

  ];
  constructor(public platform: Platform, private db: Database, private language: Language) {

    console.log( this.pages );
    this.initialziaeApp();
    this.testApp();

    //translate.get('MENU').subscribe( (x) => console.log(x) );
    language.get('MENU', (x) => console.log(x) );
    language.get('HOME', (x) => {
      let index = _.findIndex( this.pages, { key: 'home'} );
      this.pages[ index ]['title'] = x;
    });
    language.get("FORUM", (x) => {
      let index = _.findIndex( this.pages, { key: 'forum'} );
      this.pages[ index ]['title'] = x;
    });
    language.get("LOGIN", (x) => {
      let index = _.findIndex( this.pages, { key: 'login'} );
      this.pages[ index ]['title'] = x;
    });
}
  testApp() {
    // this.rootPage = LoginPage;
    // this.rootPage = ForumPage;
  }


  
  openPage(page) {
    this.nav.setRoot(page.component);
    //this.nav.push( page.component );
  }

  initialziaeApp() {


    // Okay, so the platform is ready and our plugins are available.
    // Here you can do any higher level native things you might need.
    this.platform.ready().then(() => {
      
      console.log("MyApp::initialziaeApp()");
      
      StatusBar.styleDefault();

      // this.db.createTable();
      // this.db.set( 'a', 'apple' );
      // this.db.get( 'a' ).then( (re) => console.log("a: " + re ));

    });

  }


  initializePanel() {


//    console.log( this.pages );
    //this.pages['home']['title'] = '홈';
    /*
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Login', component: LoginPage },
      { title: 'Forum', component: ForumPage },
      { title: 'Setting', component: SettingPage }
    ];
    */



  }

}

ionicBootstrap(MyApp, [
  {
    provide: TranslateLoader,
    useFactory: ( http: Http ) => new TranslateStaticLoader( http, 'assets/i18n', '.json'),
    deps: [Http]
  },
  TranslateService
]);
