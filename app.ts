import { Component, ViewChild } from '@angular/core';
import { ionicBootstrap, Platform, Nav, Storage, SqlStorage } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { Http } from '@angular/http';
import { TranslatePipe, TranslateService, TranslateLoader, TranslateStaticLoader } from 'ng2-translate/ng2-translate';
import { Database } from './providers/database/database';
import { HomePage } from './pages/home/home';
import { LoginPage } from './pages/login/login';
import { ForumPage } from './pages/forum/forum';
import { SettingPage } from './pages/setting/setting';
import { PanelMenu } from './interfaces/panel-menu';
import { Core } from './providers/core/core';
@Component({
  templateUrl: 'build/app.html',
  providers: [ Database, Core ],
  pipes: [ TranslatePipe ]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = HomePage;
  pages: Array<PanelMenu>  = [
      { key: 'HOME', title: 'Home', component: HomePage },
      { key: 'LOGIN', title: 'Login', component: LoginPage },
      { key: 'FORUM', title: 'Forum', component: ForumPage },
      { key: 'SETTING', title: 'Setting', component: SettingPage }
  ];
  constructor(public platform: Platform,
      private db: Database,
      private core: Core
      ) {
    
    this.initialziaeApp();
    this.testApp();

}
  testApp() {
     // this.rootPage = LoginPage;
    // this.rootPage = ForumPage;
    // this.rootPage = SettingPage; 
  }


  
  openPage(page) {
    this.nav.setRoot(page.component);
    //this.nav.push( page.component );
  }

  initialziaeApp() {

    // Core.event.subscribe( (x:string) => this.coreEvent(x) );

    // SettingPage.change.subscribe( (x) => console.log("Subscription in app.ts : " + x) );

    // this.language.ready.subscribe( (x) => {
    //   // console.log("app.ts : " + x);
    //   this.initializePanel();
    // } );


    
  
    // Okay, so the platform is ready and our plugins are available.
    // Here you can do any higher level native things you might need.
    this.platform.ready().then(() => {
      
      // console.log("MyApp::initialziaeApp()");
      
      StatusBar.styleDefault();

      // this.db.createTable();
      // this.db.set( 'a', 'apple' );
      // this.db.get( 'a' ).then( (re) => console.log("a: " + re ));

      this.db.set('run', Math.round(new Date().getTime() / 1000 ));
      // this.db.get('run', (v) => console.log(v));
    });

  }


  initializePanel() {

    this.updateMenuText('HOME');
    this.updateMenuText('LOGIN');
    this.updateMenuText('FORUM');
    this.updateMenuText('SETTING');

  }

  updateMenuText( key: string ) : void {
    let index:number = this.pages.findIndex( (x: PanelMenu) => x.key == key );
    Core.get( key, (x) => this.pages[index].title = x );
    // this.core.trans( key, (x) => this.pages[index].title = x );
    // this.language.get( key, (x: string) => this.pages[index].title = x );
  }

  // coreEvent( x: string ) {
  //   if ( x == Core.eventCode.language ) {
  //     this.initializePanel();
  //   }
  // }

}

ionicBootstrap(MyApp, [
  {
    provide: TranslateLoader,
    useFactory: ( http: Http ) => new TranslateStaticLoader( http, 'assets/i18n', '.json'),
    deps: [Http]
  },
  TranslateService
]);
