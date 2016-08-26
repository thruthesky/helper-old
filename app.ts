import { Component, ViewChild } from '@angular/core';
import { ionicBootstrap, Platform, Nav, Storage, SqlStorage } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { HomePage, LoginPage, Database } from './etc/imports';


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
      { title: 'Login', component: LoginPage }
    ];

    this.testApp();


  }
  testApp() {
    this.rootPage = LoginPage;
  }


  
  openPage(page) {
    this.nav.setRoot(page.component);
  }

  initialziaeApp() {


    // Okay, so the platform is ready and our plugins are available.
    // Here you can do any higher level native things you might need.
    this.platform.ready().then(() => {
      
      console.log("MyApp::initialziaeApp()");
      
      StatusBar.styleDefault();
      this.db.createTable();
      this.db.set( 'a', 'apple' );
      this.db.get( 'a' ).then( (re) => console.log("a: " + re ));

    });



  }
}

ionicBootstrap(MyApp);
