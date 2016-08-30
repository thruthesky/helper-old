import { Injectable } from '@angular/core';
import { TranslateService } from 'ng2-translate/ng2-translate';
//import { Subject }    from 'rxjs/Subject';
import { Database } from '../database/database';
import { Storage, Events } from 'ionic-angular';
export * from '../app/app';

@Injectable()
export class Core {



    static code = {
        logged_in: 'logged_in',
        logged_out: 'logged_out',
        language: 'language',
        login: 'login',
        session_id: 'session_id',
        user_login: 'user_login'
    };

    static user = {
        session_id: '',
        user_login: ''
    };

    //static event = new Subject<string>();
    static language:string = '';
    static _translate: TranslateService;

    static _db: Database;
    static events: Events;


    constructor( public translate: TranslateService,
        public __db: Database,
        private _events: Events
    ) {
        console.log("Core::constructor(): initializing");
        Core._translate = translate;
        this.initialize();
        Core._db = __db;
        Core.events = _events;
    }


    initialize() {
        if ( Core.language ) {
            console.log("Core initialize() : Core.language already set: " + Core.language);
            this.translate.setDefaultLang( Core.language );
        }
        else {
            console.log("Core initialize() : Going to set 'en' as default and get language from db");
            Core.language = 'en';
            this.translate.setDefaultLang('en');
            
            Core.get( Core.code.language, (x) => {
                if ( x ) {
                    this.translate.use(x);
                    Core.language = x;
                    console.log("Core::initialize() set language to : " + x );
                }
                else {
                    console.log("Core::initialize() got language from db but it's undefiend: " + x );
                }
                Core.events.publish( 'app', { 'code': Core.code.language } );
            } );
        }

        if ( ! Core.user.session_id ) {
            console.log("Core initialize() : Going to get session_id from DB ... ");
            Core.get( Core.code.session_id, (x) => {
                console.log('Core initialize() : Got session_id from DB: ' + x );
                if ( x ) Core.user.session_id = x;
                Core.events.publish( 'app', { 'code': Core.code.login } );
            });
            Core.get( Core.code.user_login, (x) => Core.user.user_login = x );
        }
        else {
            if ( Core.user.user_login ) {
                console.log("Core initialize() : user already logged in. session_id: " + Core.user.session_id);
            }
            else {
                console.log("Core initialize() : user not logged in.");
            }
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

    static doUserLogin( session_id: string ) {
        Core.set( Core.code.session_id, session_id );
        Core.user.session_id = session_id;
    }

    static doUserLogout() {
        Core.set( Core.code.session_id, '' );
        Core.user.session_id = '';
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
       this._translate
        .get(key, params)
        .subscribe( (x: string) => callback( x ));
   }

}

