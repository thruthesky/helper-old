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
  get( key: string ) : Promise<any> {
      return this.db.get( key );
  }
}

