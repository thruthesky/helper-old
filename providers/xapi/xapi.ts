import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Headers, RequestOptions } from '@angular/http';
import * as xi from './interfaces.ts';
import * as share from '../share/share';
import { Core } from '../core/core';

import {AlertController} from 'ionic-angular';

@Injectable()
export class Xapi {
    
    public serverUrl: string = share.XAPI_SERVER_URL;
    static panelMenu: share.PanelMenus;
    constructor(private http: Http, private alertCtrl: AlertController ) {

        // this.http.get( 'http://work.org/wordpress/index.php?xapi=user.list' ).subscribe( res => {
        //     console.log(res);
        // });
        
        // this.http.post( 'http://work.org/wordpress/index.php?xapi=user.list', '' ).subscribe( res => {
        //     console.log(res);
        // });
    }
    /**
     * @param error - is error callback. This is called only on server fault.
     */
    get( url: string, callback, error? ) {
        console.log("Xforum::get : " + url );
        return this.http.get( url )
        .map( e => {
            return this.json(e['_body']);
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



    post( url: string, body: any, callback, callbackServerError? ) {
        console.log("Xforum::post : " + url, body );
        let headers = new Headers( { 'Content-Type': 'application/x-www-form-urlencoded' });
        //headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let options = new RequestOptions({ headers: headers });
        // body = JSON.stringify( body );
        body = this.buildQuery( body );
        console.log('url:', url);
        console.log('body:', body);
        return this.http.post( url, body, options )
            .map( e => {
                return this.json(e['_body']);
            } )
            .catch( (e) => {
                console.log( "Xapi::post() => catch() :", e );
                if ( callbackServerError ) callbackServerError( e );
                return Observable.throw( e );
            } )
            .subscribe( res => {
                callback( res );
            });
    }

    ping( callback ) {
        return this.get( this.serverUrl + "?xapi=ping", callback);
    }
    
    register( data: xi.UserRegisterData, callback: (res:xi.RegisterResponse) => void ) {
        let e = encodeURIComponent;
        let q = Object.keys( data )
            .map( k => e(k) + '=' + e( data[k] ) )
            .join( '&' );
        let url = this.serverUrl + '?xapi=user.register&' + q;
        console.log('Xforum::register() : ' + url);
        this.get( url, (x:xi.RegisterResponse) => callback(x));
    }

    login(user_login: string, user_pass: string, callback, error) {
        console.log('Xforum::login()');
        let url = this.serverUrl + "?xapi=user.login&user_login="+user_login+"&user_pass="+user_pass;
        return this.get( url, ( res : xi.LoginResponse ) => callback( res ), error );
    }
    
    errorHandler( err: any ) {
        let errMsg = (err.message) ?
            err.message :
            err.status ? `${err.status} - ${err.statusText}` : 'Server error. Please check if backend server is alive and there is no error.';
        this.error(errMsg);
        return Observable.throw(errMsg);
    }



    /**
     * 
     *      WORDPRESS FUNCTIONS
     * 
     */


    /**
     * Gets categories from WordPress.
     * @code
     * 
        let args: xi.CategoryListArgument = {};
        args.search = "my";
        this.x.get_categories( args, (res: Array<xi.Category>) => {
            this.categories = res;
        });
     * @endcode
     */
    get_categories( args: xi.CategoryQueryArgument, callback: (res: xi.Categories) => void, serverError ) {

        let params = Object.keys( args )
                    .map( k => k + '=' + args[k] )
                    .join( '&' );
        let url = this.serverUrl + 'categories?' + params;
        return this.get( url, (x: xi.Categories) => callback( <xi.Categories>x ), serverError );
    }
    /**
     * Gets a post.
     */
    get_post( post_ID : number | string, successCallback, errorCallback? ) {
        let url = this.serverUrl + '?xapi=wordpress.get_post&post_ID=' + post_ID;
        return this.get( url, successCallback, errorCallback);
    }
    delete_post( post_ID : any, successCallback, errorCallback? ) {
        let url: string;
        if ( typeof post_ID == 'number' || typeof post_ID == 'string' ) {
            url = this.serverUrl + '?xapi=wordpress.delete_post&post_ID=' + post_ID;
        }
        else {
            let obj = post_ID;
            post_ID = obj.post_ID;
            let password = obj.password;
            url = this.serverUrl + '?xapi=wordpress.delete_post&post_ID=' + post_ID + '&password=' + password;
        }
        return this.get( url, successCallback, errorCallback);
    }

    /**
     * Gets posts from WordPress
     */
    get_posts( arg: xi.PostQuery, callback, serverError ) {
        let params = Object.keys( arg )
                        .map( k => k + '=' + arg[k] )
                        .join( '&' );
        let url = this.serverUrl + '?' + params;
        return this.get( url, callback, serverError );
    }


    post_insert( data: xi.PostEdit, callback, serverError ) {
        // console.log('Xforum::post_insert()', data);

        /* TEST
        let url = this.serverUrl + '?xapi=post.insert&' + this.buildQuery( data );
        return this.get( url, callback, serverError );
        */
        return this.post( this.serverUrl + '?xapi=post.insert',
                data,
                callback,
                serverError );
    }

    wp_query( queryString, successCallback, errorCallback ) {

        let url = this.serverUrl + '?xapi=wordpress.wp_query&' + queryString;
        console.log( 'wp_query: ', url );
        return this.get( url, successCallback, errorCallback );

    }

    /**
     * @code
     *      this.x.alert("ERROR", "Failed on JSON.parse() try in onBrowserUploadComplete(). Please show this message to admin.");
     * @endcode
     */
    alert( title: string, content: string ) {
        let alert = this.alertCtrl.create({
        title: title,
        subTitle: content,
        buttons: ['OK']
        });
        alert.present();
    }

    error( message: string, e?: any ) {
        let error_message = '';
        if ( e && e.message ) error_message = e.message + ' - ';
        this.alert( 'ERROR', error_message + message );
    }

    errorCode( key: string ) {
        Core.translate( key, (x) => {
            this.error(x);
        } );
    }


    /**
     * Automatic report to server admin.
     * @todo when there is error, this client automatically reports and logs into server.
     */
    reportError() {

    }
    json( e ) {
        let res;
        if ( ! e ) {
            this.error("Xapi::Json() - Server returns empty data");
            return e;
        }
        try {
            res = JSON.parse( e );
        }
        catch (e) {
            this.reportError();
            this.error("Xapi::Json() - Failed to parse JSON data.");
            console.log(e);
        }
        return res;
    }

    buildQuery( obj ) {
        let e = encodeURIComponent;
        let q = Object.keys( obj )
            .map( k => e(k) + '=' + e( obj[k] ) )
            .join( '&' );
        return q;
    }
}
