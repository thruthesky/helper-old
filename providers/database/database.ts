import { Injectable } from '@angular/core';
import { Storage, SqlStorage } from 'ionic-angular';
@Injectable()
export class Database {
  static storage: Storage = null;
  constructor() {
      console.log("Database::constructor()");
      if ( Database.storage ) {
          console.log("App is already connected to storage.");
      }
      else {
          console.log("Connecting to SqlStorage...");
          Database.storage = new Storage( SqlStorage, {name: 'appDb'} );
      }
  }
  createTable() {
      console.log("Database::createTable()");
      this.db.query('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, address TEXT)');
  }
  get db () : Storage {
      return Database.storage;
  }
  set( key: string, value: any ) : void {
      this.db.set( key, value );
  }
  /**
   * 
   * @code
   * this.db.set('run', Math.round(new Date().getTime() / 1000 ));
      this.db.get('run', (v) => console.log(v));
      @endcode
   */
  get( key: string, callback: any ) : void {
      this.db.get( key )
        .then( (x) => callback(x) );
  }
}

