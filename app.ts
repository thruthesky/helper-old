import { Component, ViewChild } from '@angular/core';
import { ionicBootstrap, Platform, Nav, Storage, SqlStorage } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { Http } from '@angular/http';
import { TranslateService, TranslateLoader, TranslateStaticLoader } from 'ng2-translate/ng2-translate';
// import { HomePage, Database, LoginPage, ForumPage } from './etc/all';
import { Database } from './providers/database/database';
import { HomePage } from './pages/home/home';
import { LoginPage } from './pages/login/login';
import { ForumPage } from './pages/forum/forum';
@Component({
  templateUrl: 'build/app.html',
  providers: [ Database ]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = HomePage;
  pages: Array<{ title: string, component: any}>;
  
  constructor(public platform: Platform, private db: Database) {
    this.initialziaeApp();
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Login', component: LoginPage },
      { title: 'Forum', component: ForumPage }
    ];

    this.testApp();


  }
  testApp() {
    // this.rootPage = LoginPage;
    //this.rootPage = ForumPage;
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
}

ionicBootstrap(MyApp, [
  {
    provide: TranslateLoader,
    useFactory: ( http: Http ) => new TranslateStaticLoader( http, 'assets/i18n', '.json'),
    deps: [Http]
  },
  TranslateService
]);
