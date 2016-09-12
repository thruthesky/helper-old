import { Component } from '@angular/core';
import { Control } from '@angular/common';
import { NavController } from 'ionic-angular';
import 'rxjs/add/operator/debounceTime';

@Component({
  templateUrl: 'build/pages/search/search.html',
  providers: [ ]
})
export class SearchPage {
  searchTerm: string = '';
  searchControl: Control;
  items: any;

  constructor( public navCtrl: NavController ) {
    this.searchControl = new Control();
  }

  setFilteredItems() {

    //this.items = this.dataService.filterItems(this.searchTerm);

  }

}
