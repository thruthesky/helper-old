import { Core } from '../../providers/core/core';

export class app {

    static isCordova: boolean = false;

    static title ( key:string, component:any ) {
        Core.translate( key, (x) => {
            component.appTitle = x;
        } );
    }

    
    static isBrowser() {
        if ( document.URL.indexOf( 'http://' ) != -1 ) return true;
        if ( document.URL.indexOf( 'https://' ) != -1 ) return true;
        return false;
    }
}
