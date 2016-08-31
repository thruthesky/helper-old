import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { LoginResponse } from '../../providers/xforum/interfaces';
@Injectable()
export class Xforum {

  private serverUrl: string = "http://wordpress46b1.org/index.php";
  //private serverUrl: string = "http://work.org/wordpress/index.php";

  constructor(private http: Http) {}

  /**
   * this.xforum.ping().subscribe( (re) => console.log(JSON.parse(re['_body']).data.server_name) );
   */
  ping( callback ) {
    return this.get( this.serverUrl + "?forum=api&action=ping", callback);
  }

  login(user_login: string, user_pass: string, callback) {
    console.log('Xforum::login()');
    let url = this.serverUrl + "?forum=user_login_check&response=ajax&user_login="+user_login+"&user_pass="+user_pass;
    return this.get( url, ( res : LoginResponse ) => callback( res ) );
  }


  register( data: any, callback ) {

    let e = encodeURIComponent;
    let q = Object.keys( data )
      .map( (k) => e(k) + '=' + e( data[k] ) )
      .join( '&' );
    let url = this.serverUrl + '?forum=user_register&' + q;

    console.log('Xforum::register() : ' + url);

    this.get( url, (x) => callback(x));
  }


  get( url, callback ) {
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
      .catch( ( e ) => this.errorHandler( e ) )
      .subscribe( (res) => {
        console.log(res);
        callback(res);
      } );
  }

  errorHandler( err: any ) {
    let errMsg = (err.message) ?
          err.message :
          err.status ? `${err.status} - ${err.statusText}` : 'Xforum got server error. Please check if server is alive and no error has been returned.';
    console.error('ERROR on Http.get(): ', errMsg);
    return Observable.throw(errMsg);
  }
}

