import { Component } from '@angular/core';
import { Control } from '@angular/common';
import { NavController } from 'ionic-angular';
import 'rxjs/add/operator/debounceTime';

@Component({
  templateUrl: 'build/pages/search/search.html',
  providers: [ ]
})
export class SearchPage {
  searchByName: string = '';
  searchByAddress: string = '';
  searchByAge: number;
  searchByFemale: boolean = true;
  searchByMale: boolean = false;
  searchControl: Control;
  items: any;
  searching: any = false;

  constructor( public navCtrl: NavController ) {
    this.searchControl = new Control();
  }

  ionViewLoaded() {

    this.setFilteredItems();

    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {

      this.searching = false;
      this.setFilteredItems();

    });


  }

  onSearchInput(){
    this.searching = true;
  }

  setFilteredItems() {


    //this.items = this.dataService.filterItems(this.searchTerm);

  }

}
