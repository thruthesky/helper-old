import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


/*
  Generated class for the Xforum provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Xforum {

  //private serverUrl: string = "http://wordpress46b1.org/index.php";
  private serverUrl: string = "http://work.org/wordpress/index.php";

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
    return this.get( url, callback );
  }

  get( url, callback ) {
    console.log("Xforum::get : " + url );
    return this.http.get( url )
      .map( (data) => data.json() )
      .catch( ( err: any ) => {
        let errMsg = (err.message) ?
          err.message :
          err.status ? `${err.status} - ${err.statusText}` : 'Xforum got server error. Please check if server is alive and no error has been returned.';
        console.error('ERROR on Http.get(): ', errMsg);
        return Observable.throw(errMsg);
      } )
      .subscribe( (re) => callback(re) );
  }
}

