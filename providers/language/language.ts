import { Injectable } from '@angular/core';
import { TranslateService } from 'ng2-translate/ng2-translate';
export { TranslatePipe } from 'ng2-translate/ng2-translate';
@Injectable()
export class Language {
  constructor( private translate: TranslateService ) {
    translate.setDefaultLang('en');
    translate.use('ko');
  }
  get( key: string, params?, callback?) {
      if ( typeof params !== 'object' ) {
          callback = params;
          params = {};
      }
      this.translate.get(key, params).subscribe( (res: string) => callback( res ));
  }
}
