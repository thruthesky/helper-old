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
import { Xapi } from './providers/xapi/xapi';
@Component({
  templateUrl: 'build/app.html',
  providers: [ Database, Core, Xapi ],
  pipes: [ TranslatePipe ]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any;
  pages: Array<PanelMenu>  = [
      { key: 'HOME', title: 'Home', component: HomePage, icon : 'home' },
      { key: 'LOGIN', title: 'Login', component: LoginPage, icon : 'person-add' },
      { key: 'FORUM', title: 'Forum', component: ForumPage, icon : '' },
      { key: 'SETTING', title: 'Setting', component: SettingPage },
      { key: 'REGISTER', title: 'Register', component: RegisterPage },
  ];
  private events: Array<string> = [];
  static instance: MyApp;
  constructor(public platform: Platform,
      private db: Database,
      private core: Core,
      events: Events,
      private x: Xapi
      ) {

        MyApp.instance = this;
    this.initialziaeApp();
    events.subscribe('app', this.subscribeEvent );
  }
  static getInstance() : MyApp {
    return MyApp.instance;
  }
  hasEvent( code: string ) : boolean {
    return this.events.indexOf( code ) != -1;
  }
  saveEvent( event: any ) {
    this.events.push( event.code );
    /**
     * @note check if all event from Core has arrived.
     */
    if ( this.hasEvent( Core.code.login ) && this.hasEvent( Core.code.language ) ) {
      console.log('coreReady()');
      this.coreReady();
    }
  }
  subscribeEvent( events: any ) {
    let e = events[0];
    let a = MyApp.getInstance();
    console.log('MyApp: onEvents: ' + e.code);
    if ( e.code == Core.code.language ) { // language selection is now ready.
      console.log('Core language is set : ' + Core.language );
      a.initializePanel();
      a.saveEvent( e );
    }
    else if ( e.code == Core.code.login ) {
      a.saveEvent( e );
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
     
     
      console.log('coreReady()');
      this.goHome();

      this.testApp();

  }

  goHome() {
      // this.rootPage = HomePage;
      this.rootPage = LoginPage;
      // this.rootPage = SettingPage;
      // this.rootPage = RegisterPage;
  }
  testApp() {
    // this.rootPage = LoginPage;
    // this.rootPage = ForumPage;
    // this.rootPage = SettingPage; 

    
    let user_login = 'user' + new Date().getSeconds();
    let user =  {
      user_login: user_login,
      user_pass: '1234',
      user_email: user_login + '@gmail.com',
      mobile: '0917-467-8603',
      birthday: '731016',
      gender: 'M'
    };
/*
    this.x.register(user, (re) => {
      console.log(re);
      if ( re.success ) {
        console.log("RegisterPage::onClickRegister::success");
        Core.set( 'user', user, () => { } );
      }
      else {
        console.log("RegisterPage::onClickRegister::error");
      }
    });
    */

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
