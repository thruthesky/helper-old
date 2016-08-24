import { Component, ViewChild } from '@angular/core';
import { ionicBootstrap, Platform, Nav } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { HomePage } from './pages/home/home';
import { LoginPage } from './pages/login/login';


@Component({
  templateUrl: 'build/app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = HomePage;
  pages: Array<{ title: string, component: any}>;
  

  constructor(public platform: Platform) {
    this.initialziaeApp();


    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Login', component: LoginPage }
    ];

  }


  
  openPage(page) {
    this.nav.setRoot(page.component);
  }

  initialziaeApp() {

    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });

  }
}

ionicBootstrap(MyApp);
