import { Injectable } from '@angular/core';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { Subject }    from 'rxjs/Subject';
import { Database } from '../database/database';


@Injectable()
export class Core {

    // static eventCode = {
    //     logged_in: 'logged_in',
    //     logged_out: 'logged_out',
    //     language: 'language'
    // };
    // static event = new Subject<string>();
    static language:string = '';
    static _translate: TranslateService;


    constructor( public translate: TranslateService, public db: Database) {
        console.log("Core::constructor(): initializing");
        Core._translate = translate;
        this.initialize();
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
            this.db.get('language', (x) => {
                // console.log("Core::initialize() language: " + x );
                if ( x ) {
                    this.translate.use(x);
                    Core.language = x;
                }
            } );
        }
        

        // this.db.getUserSessionId( (x) => {
        //     if ( x ) Core.event.next( Core.eventCode.logged_in );
        //     else Core.event.next( Core.eventCode.logged_out );
        // } );        
        // this.translate.setDefaultLang('en');
        // this.db.get('language', (x) => {
        //     // console.log("Core::initialize() language: " + x );
        //     if ( x ) {
        //         this.translate.use(x);
        //         Core.language = x;
        //         Core.event.next( Core.eventCode.language );
        //     }
        // } );
        

    }

    

    /**
     * Translate a text code.
     * @code
     * Core.get('text-code', (x) => console.log(x) );
     * @endcode
     */
    static get( key: string, params?, callback?) {
       if ( typeof params !== 'object' ) {
           callback = params;
           params = {};
       }
       this._translate
        .get(key, params)
        .subscribe( (x: string) => callback( x ));
   }
}

