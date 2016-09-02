import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppHeader } from '../../templates/app-header';
import { TranslatePipe } from 'ng2-translate/ng2-translate';
import { Core, app } from '../../providers/core/core';
import { Xapi } from '../../providers/xapi/xapi';
import * as xi from '../../providers/xapi/interfaces';
@Component({
  templateUrl: 'build/pages/forum/forum.html',
  directives: [ AppHeader ],
  pipes: [TranslatePipe]
})
export class ForumPage implements OnInit {
  private appTitle: string = "Forum";
  private categories: Array<xi.Category> = [];
  constructor(
    private navCtrl: NavController,
    private x: Xapi
  ) {
    console.log("ForumPage::constrcutor()");
    app.title( 'forum.title', this );
    // Core.translate( 'forum.title', (x) => this.appTitle = x );
    // language.get('forum.title', (x)=> this.appTitle = x);

  }


  ngOnInit () {
    
    var catQuery: xi.CategoryQueryArgument = {};
    catQuery.search = "its";
    this.x.get_categories( catQuery, (res: xi.Categories) : void => {
      res.forEach( c => this.categories.push( c ) );
    },
    (x) => console.log(x));
    catQuery.search = "my";
    this.x.get_categories( catQuery, (res: xi.Categories) : void => {
      res.forEach( c => this.categories.push( c ) );
    },
    (x) => console.log(x));


    var postQuery: xi.PostQueryArgument = {};
    this.x.get_posts( postQuery, ( res: xi.Posts ) : void => {
      console.log(res);
    },
    (x) => console.log(x));


  }


  onClickForum( id: number ) {
    console.log(id);
  }
}
