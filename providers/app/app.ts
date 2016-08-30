import { Core } from '../../providers/core/core';
import { LoginPage } from '../../pages/login/login';
export class app {
    static title ( key:string, component:any ) {
        Core.translate( key, (x) => component.appTitle = x );
    }

    

}