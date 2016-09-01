import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { LoginResponse, RegisterResponse } from './interfaces.ts';
@Injectable()
export class Xapi {
    private serverUrl: string = "http://wordpress46b1.org/wp-json/wp/v2/";
    constructor(private http: Http) {}
    /**
     * @param error - is error callback. This is called only on server fault.
     */
    get( url, callback, error? ) {
        console.log("Xforum::get : " + url );
        return this.http.get( url )
        .map( (data) => {
            try {
                return data.json();
            }
            catch ( e ) {
                console.error( "Failed on map() data.json ", data);
            }
        } )
        .catch( ( e ) => {
            error( e );
            return this.errorHandler( e );
        } )
        .subscribe( (res) => {
            console.log(res);
            callback(res);
        } );
    }

    ping( callback ) {
        return this.get( this.serverUrl + "?xapi=ping", callback);
    }
    

    register( data: any, callback ) {
        let e = encodeURIComponent;
        let q = Object.keys( data )
            .map( (k) => e(k) + '=' + e( data[k] ) )
            .join( '&' );
        let url = this.serverUrl + '?xapi=user.register&' + q;
        console.log('Xforum::register() : ' + url);
        this.get( url, (x:RegisterResponse) => callback(x));
    }


    login(user_login: string, user_pass: string, callback, error) {
        console.log('Xforum::login()');
        let url = this.serverUrl + "?xapi=user.login&user_login="+user_login+"&user_pass="+user_pass;
        return this.get( url, ( res : LoginResponse ) => callback( res ), error );
    }


    
    errorHandler( err: any ) {
        let errMsg = (err.message) ?
            err.message :
            err.status ? `${err.status} - ${err.statusText}` : 'Xapi got server error. Please check if xapi server is alive and no error has been returned.';
        console.error('ERROR on Http.get(): ', errMsg);
        return Observable.throw(errMsg);
    }


}