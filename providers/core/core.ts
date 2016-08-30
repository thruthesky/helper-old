import { Injectable } from '@angular/core';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { Subject }    from 'rxjs/Subject';
import { Database } from '../database/database';
import { Storage } from 'ionic-angular';

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
    static event = new Subject<string>();
    static language:string = '';
    static _translate: TranslateService;

    static _db: Database;


    constructor( public translate: TranslateService,
                    public __db: Database
    ) {
        console.log("Core::constructor(): initializing");
        Core._translate = translate;
        this.initialize();
        Core._db = __db;
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
            
            Core.db.get( Core.code.language ).then ( (x) => {
                if ( x ) {
                    this.translate.use(x);
                    Core.language = x;
                    console.log("Core::initialize() set language to : " + x );
                }
                else {
                    console.log("Core::initialize() got language from db but it's undefiend: " + x );
                }
                Core.event.next( Core.code.language );
            } );
        }

        if ( ! Core.user.session_id ) {
            console.log("Core initialize() : Going to get session_id from DB ... ");
            Core.db.get( Core.code.session_id ) .then ( (x) => {
                console.log('Core initialize() : Got session_id from DB: ' + x );
                if ( x ) Core.user.session_id = x;
                Core.event.next( Core.code.login );
            });
            Core.db.get( Core.code.user_login ) .then( (x) => Core.user.user_login = x );
            // this.__db.get( Core.code.user_login, (x) => Core.user.user_login = x );
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

    static doUserLogin( session_id: string ) {
        Core.db.set( Core.code.session_id, session_id );
        Core.user.session_id = session_id;
        //Core._db.setUserSessionId( session_id );
    }

    static doUserLogout() {
        Core.db.set( Core.code.session_id, '' );
        Core.user.session_id = '';
        //Core._db.setUserSessionId( '' );
    }


    static get loggedIn() {
        return !! Core.user.session_id;
    }


    

    /**
     * Translate a text code.
     * @code
     * Core.get('text-code', (x) => console.log(x) );
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

/*
   static dbGet( key: string, callback: any ) {
       Core._db.get( key, (x) => callback(x) );
   }
   static dbSet( key: string, value: any, callback?: any ) {
       Core._db.set( key, value, callback );
   }
   */
}

