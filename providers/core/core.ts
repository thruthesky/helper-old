import { Injectable } from '@angular/core';
import { TranslateService } from 'ng2-translate/ng2-translate';
//import { Subject }    from 'rxjs/Subject';
import { Database } from '../database/database';
import { Storage, Events } from 'ionic-angular';
import * as xi from '../xapi/interfaces';
export * from '../app/app';

@Injectable()
export class Core {



    static code = {
        logged_in: 'logged_in',
        logged_out: 'logged_out',
        language: 'language',
        login: 'login',
        session_id: 'session_id',
        user_login: 'user_login',
        user: 'user'
    };

    static user: xi.UserData = <xi.UserData>{};

    //static event = new Subject<string>();
    static language:string = '';
    static instanceOfTranslate: TranslateService;

    static events: Events;


    constructor( public trans: TranslateService,
        private _events: Events
    ) {
        console.log("Core::constructor(): initializing");
        Core.instanceOfTranslate = trans;
        this.initialize();
        Core.events = _events;
    }


    initialize() {
        let translate = this.trans;
        if ( Core.language ) {
            console.log("Core initialize() : Core.language already set: " + Core.language);
            translate.setDefaultLang( Core.language );
        }
        else {
            console.log("Core initialize() : Going to set 'en' as default and get language from db");
            Core.language = 'en';
            translate.setDefaultLang('en');
            
            Core.get( Core.code.language, (x) => {
                if ( x ) {
                    translate.use(x);
                    Core.language = x;
                    console.log("Core::initialize() set language to : " + x );
                }
                else {
                    console.log("Core::initialize() got language from db but it's undefiend: " + x );
                }
                Core.events.publish( 'app', { 'code': Core.code.language } );
            } );
        }

        if ( Core.user.session_id ) {
            
            if ( Core.user.user_login ) {
                console.log("Core initialize() : user already logged in. session_id: " + Core.user.session_id);
            }
            else {
                console.log("Core initialize() : user not logged in.");
            }

        }
        else {
            console.log("Core initialize() : Going to get session_id from DB ... ");
            Core.get( Core.code.user, (x) => {
                console.log('Core initialize() : Got user data from DB: ');
                if ( x ) {
                    try {
                        Core.user = JSON.parse(x);
                        console.log( Core.user );
                    }
                    catch ( e ) {
                        console.log( 'ERROR: on JSON.parse user info')
                    }
                }
                else {
                    console.log('User data is empty');
                }
                Core.events.publish( 'app', { 'code': Core.code.login } );
            });
            // Core.get( Core.code.user_login, (x) => Core.user.user_login = x );
            
        }

    }
    
    static get db () : Storage {
        return Database.storage;
    }

    /**
     * 
     * Returns a value from Database option/config table.
     * 
     */
    static get( key: string, callback ) : any {
        Core.db.get(  key ).then ( callback );
    }

    /**
     * 
     * Saves a key/value into App Database option/config table.
     * 
     */
    static set( key: string, value: any, callback? ) {
        Core.db.set( key, value ).then( callback );
    }

    static onLoginSuccess( res: xi.UserResponse ) {
        Core.setUserLogin( res );
    }
    static onUserRegisterSuccess( res: xi.UserResponse ) {
        Core.setUserLogin( res );
    }
    static setUserLogin( res: xi.UserResponse ) {
        Core.set( Core.code.user, JSON.stringify(res.data) );
        Core.user = res.data;
    }


    static doUserLogout() {
        Core.set( Core.code.user, '' );
        Core.user = <xi.UserData>{};
    }



    static get loggedIn() {
        return !! Core.user.session_id;
    }



    

    /**
     * Translate a text code.
     * @code
     *      Core.translate('login.title', (x) => this.appTitle = x );
     * @endcode
     */
    static translate( key: string, params?, callback?) {
       if ( typeof params !== 'object' ) {
           callback = params;
           params = {};
       }
       this.instanceOfTranslate
        .get(key, params)
        .subscribe( (x: string) => callback( x ));
   }

}

