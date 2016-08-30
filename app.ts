import { Component, ViewChild } from '@angular/core';
import { ionicBootstrap, Platform, Nav, Storage, SqlStorage } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { Http } from '@angular/http';
import { TranslatePipe, TranslateService, TranslateLoader, TranslateStaticLoader } from 'ng2-translate/ng2-translate';
import { Database } from './providers/database/database';
import { HomePage } from './pages/home/home';
import { LoginPage } from './pages/login/login';
import { RegisterPage } from './pages/register/register';
import { ForumPage } from './pages/forum/forum';
import { SettingPage } from './pages/setting/setting';
import { PanelMenu } from './interfaces/panel-menu';
import { Core } from './providers/core/core';
import { Events } from 'ionic-angular';
@Component({
  templateUrl: 'build/app.html',
  providers: [ Database, Core ],
  pipes: [ TranslatePipe ]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any;
  pages: Array<PanelMenu>  = [
      { key: 'HOME', title: 'Home', component: HomePage },
      { key: 'LOGIN', title: 'Login', component: LoginPage },
      { key: 'FORUM', title: 'Forum', component: ForumPage },
      { key: 'SETTING', title: 'Setting', component: SettingPage },
      { key: 'REGISTER', title: 'Register', component: RegisterPage },
  ];
  private eventStack: Array<string> = [];
  static _this: MyApp;
  constructor(public platform: Platform,
      private db: Database,
      private core: Core,
      private events: Events
      ) {

        MyApp._this = this;
    this.initialziaeApp();

    //Core.event.subscribe( (x:string) => this.coreEvent(x) );
    this.testApp();

    events.subscribe('app', this.onEvents );
  }
  

  onEvents( events: any ) {
    let e = events[0];
    let a = MyApp._this;
    console.log('MyApp: onEvents: ' + e.code);
    if ( e.code == Core.code.language ) { // language selection is now ready.
      console.log('Core language is set : ' + Core.language );
      a.initializePanel();
      a.eventStack.push( e.code );
      a.coreReady();
     
    }
    if ( e.code == Core.code.login ) {
      a.eventStack.push( e.code );
      a.coreReady();
    }
    

    /**
     * 
     * Move to or show another component by event.
     * 
     * @note since circular improt of component is not working ( producing an error ),
     *    it does with event.
     * 
     */
    if ( e.code == 'show-component' ) {
     let index = a.pages.findIndex( (page) => page.key == e.component );
     console.log( 'index: ' + index + ', component: ' + a.pages[index].component );
     a.nav.setRoot( a.pages[ index ].component );
    }

  }

  /**
   * Core is ready now.
   * @note this method is called when the core is ready to play.
   */
  coreReady() {
     
    /**
     * @note check if all event from Core has arrived.
     */
    if ( this.eventStack.indexOf( Core.code.login ) != -1 && this.eventStack.indexOf( Core.code.language ) != -1 ) {
      
      console.log('coreReady()');
      this.goHome();

    }

  }

  goHome() {
      // this.rootPage = HomePage;
      // this.rootPage = LoginPage;
      // this.rootPage = SettingPage;
      this.rootPage = RegisterPage;
  }
  testApp() {
    // this.rootPage = LoginPage;
    // this.rootPage = ForumPage;
    // this.rootPage = SettingPage; 
  }


  
  openPage(page) {
    this.nav.setRoot(page.component);
  }

  initialziaeApp() {
  
    // Okay, so the platform is ready and our plugins are available.
    // Here you can do any higher level native things you might need.
    this.platform.ready().then(() => {
      
      console.log("MyApp::initialziaeApp(). App ready now!");
      
      StatusBar.styleDefault();

      // this.db.createTable();
      // this.db.set( 'a', 'apple' );
      // this.db.get( 'a' ).then( (re) => console.log("a: " + re ));

      // this.db.set('run', Math.round(new Date().getTime() / 1000 ));
      // this.db.get('run', (v) => console.log(v));
    });

  }


  initializePanel() {

    console.log('MyApp initializePanel()');
    this.updateMenuText('HOME');
    this.updateMenuText('LOGIN');
    this.updateMenuText('FORUM');
    this.updateMenuText('SETTING');

  }

  updateMenuText( key: string ) : void {
    let index:number = this.pages.findIndex( (x: PanelMenu) => x.key == key );
    Core.translate( key, (x) => {
      console.log('updateMenuText: x: ' + x);
      this.pages[index].title = x;
    } );
    // this.core.trans( key, (x) => this.pages[index].title = x );
    // this.language.get( key, (x: string) => this.pages[index].title = x );
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
