import { Core } from '../../providers/core/core';

export class app {
    static title ( key:string, component:any ) {
        Core.translate( key, (x) => component.appTitle = x );
    }

    

}