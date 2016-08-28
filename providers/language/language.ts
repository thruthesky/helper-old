import { Injectable } from '@angular/core';
import { TranslateService } from 'ng2-translate/ng2-translate';
export { TranslatePipe } from 'ng2-translate/ng2-translate';
import { Database } from '../database/database';
import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';
@Injectable()
export class Language {
  ready = new Subject<string>();
  constructor( private translate: TranslateService, private db: Database ) {
    translate.setDefaultLang('en');
    this.db.get('language', (x) => {
      // console.log("language: " + x );
      if ( x ) translate.use(x);
      else translate.use('en');
      setTimeout( () => {
        this.ready.next('language-set');
      }, 50 );
      
    })

//    translate.use('en');
  }
  get( key: string, params?, callback?) {
      if ( typeof params !== 'object' ) {
          callback = params;
          params = {};
      }
      this.translate.get(key, params).subscribe( (res: string) => callback( res ));
  }
}
