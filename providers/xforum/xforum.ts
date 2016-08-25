import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Xforum provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Xforum {

  private serverUrl: string = "http://wordpress46b1.org/index.php";

  constructor(private http: Http) {}



  /**
   * this.xforum.ping().subscribe( (re) => console.log(JSON.parse(re['_body']).data.server_name) );
   */
  ping() {
    return this.http.get( this.serverUrl + "?forum=api&action=ping");
  }

  login(user_login: string, user_pass: string) {
    console.log('Xforum::login()');
    let url = this.serverUrl + "?forum=user_login_check&response=ajax&user_login="+user_login+"&user_pass="+user_pass;
    return this.http.get( url );
  }

}

