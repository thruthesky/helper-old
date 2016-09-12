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
import { PostEditPage } from './pages/post-edit/post-edit';
import { PostListPage } from './pages/post-list/post-list';
import { PolicyPage } from './pages/policy/policy';
import { SearchPage } from './pages/search/search';
import { Core } from './providers/core/core';
import { Events } from 'ionic-angular';
import { Xapi } from './providers/xapi/xapi';
import { app } from './providers/app/app';


import * as xi from './providers/xapi/interfaces';
import * as share from './providers/share/share';

@Component({
  templateUrl: 'build/app.html',
  providers: [ Database, Core, Xapi ],
  pipes: [ TranslatePipe ]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any;
  pages: share.PanelMenus  = share.panelMenus;
  private events: Array<string> = [];
  static instance: MyApp;
  constructor(public platform: Platform,
      private db: Database,
      private core: Core,
      events: Events,
      private x: Xapi
      ) {
        console.log( 'MyApp Component - root component');
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
    if ( e.code == 'showComponent' ) {

     let index = a.pages.findIndex( (page) => page.title == e.component ); // find index of the component
     console.log( 'index: ' + index + ', component: ' + a.pages[index].component );
     //a.nav.setRoot( a.pages[ index ].component );
     a.nav.push( a.pages[index].component );
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

  /**
   * View home after core initialization.
   */
  goHome() {
      this.rootPage = HomePage;
      // this.rootPage = LoginPage;
      // this.rootPage = SettingPage;
      // this.rootPage = RegisterPage;
      // this.rootPage = ForumPage;
      // this.rootPage = PostEditPage;
  }
  testApp() {

//     @ViewChild('fileInput') fileInput:ElementRef;


    setTimeout( () => {
      //this.nav.push( LoginPage );
      // this.nav.push( SettingPage );
      // this.nav.push( ForumPage );
      // this.nav.push( RegisterPage );
      // this.nav.push( PostListPage );
      //this.nav.push( PostEditPage );
      //this.nav.push( PostListPage );
      // this.nav.push( PostEditPage );
      //this.nav.push( PolicyPage );.
      //this.nav.push( SearchPage );
    }, 500);

    // this.rootPage = LoginPage;
    // this.rootPage = ForumPage;
    // this.rootPage = SettingPage;

    /*
    let user_login = 'user' + new Date().getSeconds();
    let user : xi.UserRegisterData =  {
      user_login: user_login,
      user_pass: '1234',
      user_email: user_login + '@gmail.com',
      mobile: '0917-467-8603',
      birthday: '731016',
      gender: 'M'
    };
    */



/*
    this.x.get_posts( <xi.PostListArgument>{}, res => {

    });
*/
  }



  openPage(page) {
    // this.nav.setRoot(page.component);
    this.nav.push( page.component );
  }

  initialziaeApp() {
    console.log("MyApp::initialziaeApp() ...");


    //alert( "App 41: " + app.isBrowser() );

    // Okay, so the platform is ready and our plugins are available.
    // Here you can do any higher level native things you might need.
    this.platform.ready().then(() => {

      console.log("MyApp::initialziaeApp(). App ready now!", this.platform);
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

    /**
     * @deprecated. use 'tranlsate' pipe.
    this.updateMenuText('HOME');
    this.updateMenuText('LOGIN');
    this.updateMenuText('FORUM');
    this.updateMenuText('SETTING');
    */

  }

  /**
   *
   * @deprecated. Just use 'translate pipe'.
   *
   * @note this translate menu text.
   *
  updateMenuText( key: string ) : void {
    let index:number = this.pages.findIndex( (x: PanelMenu) => x.key == key );
    Core.translate( key, (x) => {
      console.log('updateMenuText: x: ' + x);
      this.pages[index].title = x;
    } );
    // this.core.trans( key, (x) => this.pages[index].title = x );
    // this.language.get( key, (x: string) => this.pages[index].title = x );
  }
  */
}

ionicBootstrap(MyApp, [
  {
    provide: TranslateLoader,
    useFactory: ( http: Http ) => new TranslateStaticLoader( http, 'assets/i18n', '.json'),
    deps: [Http]
  },
  TranslateService
]);
